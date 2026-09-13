"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full px-2.5 py-1 transition ${locale === "en" ? "bg-[#D4AF37] text-[#0A0C10]" : "text-white/60 hover:text-white"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hu")}
        aria-pressed={locale === "hu"}
        className={`rounded-full px-2.5 py-1 transition ${locale === "hu" ? "bg-[#D4AF37] text-[#0A0C10]" : "text-white/60 hover:text-white"}`}
      >
        HU
      </button>
    </div>
  );
}
