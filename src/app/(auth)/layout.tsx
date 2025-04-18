// /app/(auth)/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Election Signup",
  description: "Signup page without navbar or footer",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
