"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-transparent backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link href="/#top" className="flex items-center gap-4" onClick={() => setMenuOpen(false)}>
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-lg shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]/10 sm:h-16 sm:w-16">
            <Image
              src="/logo%20rovas%20nev.png"
              alt="Tamás Csizmadia in Hungarian rune script"
              fill
              className="object-contain p-3 filter invert"
              sizes="64px"
              loading="eager"
            />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-base">
              Tamás Csizmadia
            </div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/50 sm:text-sm">
              Landscape Vision
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.35em] text-white/70 md:flex">
          <Link href="/#gallery" className="transition hover:text-[#D4AF37]">Gallery</Link>
          <Link href="/photo-tours" className="transition hover:text-[#D4AF37]">Photo Tours</Link>
          <Link href="/#about" className="transition hover:text-[#D4AF37]">About</Link>
          <Link href="/contact" className="transition hover:text-[#D4AF37]">Contact</Link>
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="relative z-40 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 md:hidden"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-5 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-5 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#0A0C10]/98 px-6 py-4 text-sm uppercase tracking-[0.35em] text-white/80 md:hidden">
          <Link href="/#gallery" className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/photo-tours" className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Photo Tours</Link>
          <Link href="/#about" className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
