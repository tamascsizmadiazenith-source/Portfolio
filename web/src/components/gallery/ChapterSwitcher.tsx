"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/dictionary";
import { categorySlugs, categoryLabelByValue } from "@/lib/gallery-categories";

type ChapterSwitcherProps = {
  current: string;
};

export default function ChapterSwitcher({ current }: ChapterSwitcherProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
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

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          style={{ bottom: "max(5.5rem, calc(env(safe-area-inset-bottom) + 5rem))", right: "max(1rem, env(safe-area-inset-right))" }}
          className="fixed z-[55] max-h-[60vh] w-64 overflow-y-auto overscroll-contain rounded-[20px] border border-white/10 bg-[#11131A]/95 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <Link
            href="/#gallery"
            onClick={() => setOpen(false)}
            className="block rounded-2xl px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            {t("gallery.myFavorites")}
          </Link>
          <div className="my-1 border-t border-white/10" />
          {categorySlugs.map((slug) => (
            <Link
              key={slug}
              href={`/gallery/${slug}`}
              onClick={() => setOpen(false)}
              className={`block rounded-2xl px-4 py-2.5 text-sm transition ${
                slug === current
                  ? "bg-[#D4AF37]/10 font-semibold text-[#D4AF37]"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              {t(`categories.${slug}`)}
            </Link>
          ))}
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
        className="fixed z-[55] flex items-center gap-2 rounded-full border border-white/10 bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0A0C10] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition hover:bg-[#c5992f]"
      >
        <span>{categoryLabelByValue.get(current) ? t(`categories.${current}`) : current}</span>
        <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
    </>
  );
}
