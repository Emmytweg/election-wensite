import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Inter} from "next/font/google";
import "./globals.css";
import {NavbarDemo} from "@/components/ui/NavBar/NavbarDemo";
import { Variable } from "lucide-react";
import Footer from "@/components/ui/Footer/Footer";
import logo from '../../src/app/favicon.ico'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
})
export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
  title: "Election Website",
  description: "Created By TWEG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} antialiased`}
      >
        <NavbarDemo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
