import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PipelineIQ | DevOps Intelligence Agent",
  description: "AI-powered operational memory for software delivery. Predict deployment risks, retrieve historical insights, and resolve incidents with Hindsight.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0D0F14] text-[#F0F2FF]">
        {children}
      </body>
    </html>
  );
}
