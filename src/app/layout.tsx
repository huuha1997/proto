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
  title: "Tam Phan Minh – Full-Stack Developer",
  description:
    "Portfolio of Tam Phan Minh, Full-Stack Developer specializing in React, Next.js, NestJs, Flutter, and AI-assisted development.",
  metadataBase: new URL("https://tamphan.vercel.app"),
  openGraph: {
    title: "Tam Phan Minh – Full-Stack Developer",
    description:
      "Portfolio of Tam Phan Minh, Full-Stack Developer specializing in React, Next.js, NestJs, Flutter, and AI-assisted development.",
    url: "https://tamphan.vercel.app",
    siteName: "Tam Phan Minh",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tam Phan Minh – Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tam Phan Minh – Full-Stack Developer",
    description:
      "Portfolio of Tam Phan Minh, Full-Stack Developer specializing in React, Next.js, NestJs, Flutter, and AI-assisted development.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
