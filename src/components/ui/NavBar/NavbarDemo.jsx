"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function NavbarDemo() {
  const [isMounted, setIsMounted] = useState(false); // ✅ Prevent mismatched render
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Candidates", link: "/candidate" },
    { name: "Vote", link: "/login" },
    { name: "Results", link: "/result" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // ✅ Avoid SSR mismatch

  return (
    <div className={`${inter.className} relative w-full`}>
      <Navbar className="relative top-1">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={() => setIsMobileMenuOpen(false)} />

          <div className="flex items-center gap-4 ml-auto">
            <Link href="/signup">
              <NavbarButton variant="primary">SignUp</NavbarButton>
            </Link>
            <Link href="/login">
              <NavbarButton variant="secondary">Login</NavbarButton>
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                className="relative text-neutral-600 dark:text-neutral-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block py-2">{item.name}</span>
              </Link>
            ))}

            <div className="mt-4 flex w-full flex-col gap-4">
              <Link href="/login">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              </Link>
              <Link href="/signup">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  SignUp
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
