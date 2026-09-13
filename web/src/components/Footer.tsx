"use client";

import { useTranslation } from "@/i18n/dictionary";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-xs uppercase tracking-[0.35em] text-white/40 sm:px-10 lg:px-16">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
