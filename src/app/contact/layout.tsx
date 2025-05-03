import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Inter} from "next/font/google";
import "./global.css";
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
  title: "Contact Us - Election Website",
  description: "Get in touch with us for any inquiries or support.",
};

export default function ContactLayout({
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
