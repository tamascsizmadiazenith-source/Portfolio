"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/dictionary";
import { categorySlugs } from "@/lib/gallery-categories";

type GalleryNavDropdownProps = {
  linkClassName: string;
  rowClassName?: string;
  onNavigate?: () => void;
};

export default function GalleryNavDropdown({ linkClassName, rowClassName, onNavigate }: GalleryNavDropdownProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function openNow() {
    clearCloseTimeout();
    setOpen(true);
  }

  function closeSoon() {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 300);
  }

  React.useEffect(() => clearCloseTimeout, []);

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function close() {
    clearCloseTimeout();
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <div className={`flex items-center gap-1 ${rowClassName ?? ""}`}>
        <Link href="/#gallery" className={linkClassName} onClick={close}>
          {t("nav.gallery")}
        </Link>
        <button
          type="button"
          onClick={() => (open ? close() : openNow())}
          aria-expanded={open}
          aria-label="Toggle gallery chapters"
          className="rounded-full p-1 text-white/50 transition hover:text-[#D4AF37]"
        >
          <span aria-hidden="true" className={`inline-block text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="max-h-[70vh] w-60 overflow-y-auto overscroll-contain rounded-[20px] border border-white/10 bg-[#11131A]/98 p-2 text-left normal-case tracking-normal shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {categorySlugs.map((slug) => (
              <Link
                key={slug}
                href={`/gallery/${slug}`}
                onClick={close}
                className="block rounded-2xl px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/5 hover:text-[#D4AF37]"
              >
                {t(`categories.${slug}`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
