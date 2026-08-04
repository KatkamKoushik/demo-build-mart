import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildMart — High-End Construction Materials",
  description:
    "Curated selection of structural and finishing materials for modern architectural projects.",
  openGraph: {
    title: "BuildMart — Structural Integrity meets Architectural Beauty.",
    description: "Premium materials for your next project.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-alabaster text-carbon selection:bg-carbon selection:text-white">
        <Providers>
          {children}
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
