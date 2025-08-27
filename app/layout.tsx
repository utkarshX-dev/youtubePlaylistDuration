import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Playlist Duration Calculator | Utkarsh",
  description:
    "Instantly calculate the total duration of any YouTube playlist. See video count, creator info, and playback time at different speeds.",
  keywords: [
    "YouTube Playlist Duration",
    "YouTube Playlist Calculator",
    "Playlist Time Calculator",
    "YouTube Productivity Tool",
    "YouTube Total Hours",
  ],
  authors: [{ name: "Utkarsh Bhandari" }],
  creator: "Utkarsh Bhandari",
  metadataBase: new URL("https://youtube-playlist-duration-steel.vercel.app"),
  openGraph: {
    title: "YouTube Playlist Duration",
    description:
      "Paste any YouTube playlist URL and get total duration, creator info, and playback estimates at different speeds.",
    url: "https://youtube-playlist-duration-steel.vercel.app",
    siteName: "YouTube Playlist Calculator",
    images: [
      {
        url: "https://youtube-playlist-duration-steel.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Playlist Duration Calculator preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Playlist Duration Calculator | Utkarsh",
    description:
      "Easily calculate total YouTube playlist duration and details.",
    images: [
      "https://youtube-playlist-duration-steel.vercel.app/og-image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
