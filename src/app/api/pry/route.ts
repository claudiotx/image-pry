import { NextRequest, NextResponse } from 'next/server';

async function followRedirects(url: string): Promise<string> {
  let currentUrl = url;
  const maxRedirects = 5;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    const response = await fetch(currentUrl, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        currentUrl = new URL(location, currentUrl).href;
        redirectCount++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return currentUrl;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    let finalUrl = url;

    // Handle Pinterest shortened URLs (pin.it)
    if (url.includes('pin.it')) {
      finalUrl = await followRedirects(url);
    }

    // Validate that it's a Pinterest URL (after following redirects)
    if (!finalUrl.includes('pinterest.com')) {
      return NextResponse.json(
        { error: 'Only Pinterest URLs are supported' },
        { status: 400 }
      );
    }

    // Fetch the Pinterest page using the final URL
    const response = await fetch(finalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Pinterest page' },
        { status: 500 }
      );
    }

    const html = await response.text();
    
    let imageUrl: string | undefined;

    // Extract image URL from JSON script data
    const jsonScriptMatch = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
    if (jsonScriptMatch) {
      try {
        const jsonData = JSON.parse(jsonScriptMatch[1]);
        const pinData = jsonData?.response?.data?.v3GetPinQuery?.data;
        
        if (pinData) {
          // Try to get the highest quality image
          imageUrl = pinData.imageSpec_orig?.url || 
                    pinData.imageSpec_736x?.url || 
                    pinData.imageSpec_564x?.url || 
                    pinData.imageSpec_474x?.url;
        }
      } catch (parseError) {
        console.error('Failed to parse JSON data:', parseError);
      }
    }

    // Fallback: Look for imageSpec URLs in the HTML text
    if (!imageUrl) {
      const imageSpecMatch = html.match(/"imageSpec_736x":\{"url":"([^"]+)"/);
      if (imageSpecMatch) {
        imageUrl = imageSpecMatch[1];
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image found on this Pinterest page' },
        { status: 404 }
      );
    }

    // Ensure the URL is absolute
    if (imageUrl.startsWith('//')) {
      imageUrl = 'https:' + imageUrl;
    } else if (imageUrl.startsWith('/')) {
      imageUrl = 'https://i.pinimg.com' + imageUrl;
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      originalUrl: url,
      contentType: 'pinterest_pin'
    });

  } catch (error) {
    console.error('Error scraping Pinterest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
