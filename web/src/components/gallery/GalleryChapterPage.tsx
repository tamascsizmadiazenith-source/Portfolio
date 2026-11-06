"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import ChapterSwitcher from "@/components/gallery/ChapterSwitcher";
import { useTranslation } from "@/i18n/dictionary";
import { photosByCategory } from "@/lib/gallery-categories";

type GalleryChapterPageProps = {
  category: string;
};

export default function GalleryChapterPage({ category }: GalleryChapterPageProps) {
  const { t } = useTranslation();
  const photos = photosByCategory.get(category) ?? [];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <Link
            href="/#gallery"
            className="text-sm text-white/50 transition hover:text-[#D4AF37]"
          >
            ← {t("gallery.backToGallery")}
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/60">
            {t("gallery.chapterEyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            {t(`categories.${category}`)}
          </h1>

          <div className="mt-12">
            <PhotoGrid photos={photos} />
          </div>
        </div>
      </section>
      <Footer />
      <ChapterSwitcher current={category} />
    </div>
  );
}
