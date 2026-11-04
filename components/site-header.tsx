"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Collection", href: "/collection" },
  { label: "The house", href: "/#house" },
  { label: "Visit / enquire", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-border bg-ink px-6 py-2 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/75">
        Complimentary scent consultation · Kolkata, West Bengal, India
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-ink"
            aria-label="Al Qasr home"
          >
            Al Qasr<span className="text-brass">.</span>
          </Link>
          <nav
            className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  link.href === "/collection" &&
                    pathname.startsWith("/collection") &&
                    "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="tel:+919876543210"
            className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink md:flex"
          >
            <Phone className="size-3.5 text-brass" /> Speak to us
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="flex flex-col gap-5 border-t border-border px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] md:hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
