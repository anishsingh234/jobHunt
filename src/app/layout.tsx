//@ts-nocheck
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContext from "@/components/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobHunt - Find Your Dream Career",
  description: "Discover thousands of job opportunities from top companies. Your next career move starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-slate-50`}
      >
        <ThemeContext>
          {children}
        </ThemeContext>
      </body>
    </html>
  );
}
