import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pry images from the web",
  description: "Extract and pry images from any URL on the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-900 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
