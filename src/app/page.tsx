'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProgressBar from "./components/ProgressBar";

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/pry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        window.location.href = data.imageUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-6">
        <Image 
          src="/logo2.png" 
          alt="Image Pry Logo" 
          width={240} 
          height={240} 
          className="h-24 w-auto"
          style={{
            filter: 'hue-rotate(27deg) saturate(1.1) brightness(2.9)'
          }}
        />
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">About</a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">FAQ</a>
        </nav>
        <div className="md:hidden">
          <button className="text-slate-100 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen text-center -mt-20">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Paste link with image</h2>
          <p className="text-slate-400 mb-8">Paste a URL below to extract and pry images from the web.</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type="url" 
                placeholder="https://example.com" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                required
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto"
              >
                {isLoading ? 'Prying...' : 'Go!'}
              </button>
            </div>
          </form>

          {isLoading && (
            <ProgressBar progress={45} message="Prying images in progress..." />
          )}

        </div>
      </main>
    </div>
  );
}
