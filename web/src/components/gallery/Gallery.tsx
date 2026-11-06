"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import { photoItems } from "@/data/gallery-photos";
import { categoryLabelByValue, categorySlugs, photosByCategory } from "@/lib/gallery-categories";

import { useTranslation } from "@/i18n/dictionary";

const featuredCollectionDefs = [
  {
    category: "nightscape",
    title: "Nocturnal Vistas",
    description: "Deep skies, still horizons, and the silence of the night.",
  },
  {
    category: "swiss-alps",
    title: "Alpine Light",
    description: "Ridge lines, glaciers, and timeless mountain architecture.",
  },
  {
    category: "himalayas",
    title: "Sacred Peaks",
    description: "Quiet power and soul in every alpine frame.",
  },
  {
    category: "norway",
    title: "Fjord Nights",
    description: "Aurora-drenched water and northern solitude.",
  },
  {
    category: "birdeye",
    title: "Aerial Perspective",
    description: "High-altitude vistas with a sense of scale and serenity.",
  },
];

// Cover images are picked from whatever currently exists in each category, so a folder
// refresh (renamed/removed files) can never leave a featured card pointing at a 404.
const featuredCollections = featuredCollectionDefs.flatMap((def) => {
  const photos = photosByCategory.get(def.category);
  if (!photos || photos.length === 0) return [];
  const cover = photos.find((photo) => photo.isFavorite) ?? photos[0];
  return [{ ...def, image: cover.image }];
});

const favoritePhotos = photoItems.filter((item) => item.isFavorite);

export default function Gallery() {
  const { t } = useTranslation();
  const [activeScrollIndex, setActiveScrollIndex] = React.useState(0);
  const featuredScrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = featuredScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.firstElementChild?.clientWidth ?? 1;
      const gap = 20;
      const index = Math.round(container.scrollLeft / (cardWidth + gap));
      setActiveScrollIndex(Math.min(Math.max(index, 0), featuredCollections.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const container = featuredScrollRef.current;
    if (!container) return;
    if (window.innerWidth > 1024) return;

    const interval = window.setInterval(() => {
      const nextIndex = (activeScrollIndex + 1) % featuredCollections.length;
      const cardWidth = container.firstElementChild?.clientWidth ?? 0;
      const gap = 20;
      container.scrollTo({
        left: nextIndex * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveScrollIndex(nextIndex);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeScrollIndex]);

  const scrollToFeatured = (index: number) => {
    const container = featuredScrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth ?? 0;
    const gap = 20;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
    setActiveScrollIndex(index);
  };

  return (
    <section id="gallery" className="relative bg-[#0A0C10] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/60">
              {t("gallery.eyebrow")}
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {t("gallery.heading")}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/70 sm:text-right">
            {t("gallery.intro")}
          </p>
        </div>

        <div className="mb-10 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">
                {t("gallery.featuredEyebrow")}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                {t("gallery.featuredHeading")}
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-right">
              {t("gallery.featuredIntro")}
            </p>
          </div>

          <div className="-mx-6 overflow-x-auto pb-4 px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16" ref={featuredScrollRef}>
            <div className="flex gap-5 snap-x snap-mandatory">
              {featuredCollections.map((collection) => (
                <Link
                  key={collection.category}
                  href={`/gallery/${collection.category}`}
                  className="group w-[82vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] text-left transition hover:-translate-y-1 hover:border-white/15 sm:w-[320px]"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      loading="lazy"
                      unoptimized
                      className="object-cover object-center transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                    <div className="absolute inset-x-0 bottom-0 py-4 px-5 backdrop-blur-sm">
                      <div className="text-xs uppercase tracking-[0.35em] text-white/80">
                        {categoryLabelByValue.get(collection.category) ? t(`categories.${collection.category}`) : collection.category}
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{t(`gallery.featured.${collection.category}.title`)}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <p className="text-sm leading-7 text-white/70">{t(`gallery.featured.${collection.category}.description`)}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                      <span>{t("gallery.exploreCollection")}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4">
            {featuredCollections.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToFeatured(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeScrollIndex
                    ? "bg-[#D4AF37]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Scroll to featured collection ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 mb-10 rounded-[28px] border border-white/10 bg-[#11131A] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">
            {t("gallery.categoriesEyebrow")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {t("gallery.categoriesHeading")}
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {categorySlugs.map((slug) => (
              <Link
                key={slug}
                href={`/gallery/${slug}`}
                className="rounded-full border-2 border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
              >
                {t(`categories.${slug}`)}
              </Link>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/50">
          {t("gallery.myFavorites")}
        </p>
        <PhotoGrid photos={favoritePhotos} />
      </div>
    </section>
  );
}
