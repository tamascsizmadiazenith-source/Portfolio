"use client";

import * as React from "react";
import AcquisitionOverlay from "@/components/commerce/AcquisitionOverlay";
import CartIndicator from "@/components/commerce/CartIndicator";
import CheckoutOverlay from "@/components/commerce/CheckoutOverlay";
import VirtualWall from "@/components/virtual-wall/VirtualWall";
import { photoItems, type PhotoItem } from "@/data/gallery-photos";

import Image from "next/image";
import { useTranslation } from "@/i18n/dictionary";

// Category filter chips are derived from whatever folders exist under public/photos/Gallery.
const categoryLabelByValue = new Map<string, string>();
for (const item of photoItems) {
  if (!categoryLabelByValue.has(item.category)) {
    categoryLabelByValue.set(item.category, item.categoryLabel);
  }
}

const categorySlugs = Array.from(categoryLabelByValue.keys());

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
const photosByCategory = new Map<string, PhotoItem[]>();
for (const item of photoItems) {
  const list = photosByCategory.get(item.category);
  if (list) list.push(item);
  else photosByCategory.set(item.category, [item]);
}

const featuredCollections = featuredCollectionDefs.flatMap((def) => {
  const photos = photosByCategory.get(def.category);
  if (!photos || photos.length === 0) return [];
  const cover = photos.find((photo) => photo.isFavorite) ?? photos[0];
  return [{ ...def, image: cover.image }];
});

export default function Gallery() {
  const { t } = useTranslation();
  const categories = [
    { value: "all", label: t("gallery.myFavorites") },
    ...categorySlugs.map((value) => ({ value, label: t(`categories.${value}`) })),
  ];
  const [activePhoto, setActivePhoto] = React.useState<PhotoItem | null>(null);
  const [wallOpen, setWallOpen] = React.useState(false);
  const [acquireOpen, setAcquireOpen] = React.useState(false);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [lightboxPhoto, setLightboxPhoto] = React.useState<PhotoItem | null>(null);
  const [lightboxLoading, setLightboxLoading] = React.useState(false);
  const [lightboxError, setLightboxError] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [activeScrollIndex, setActiveScrollIndex] = React.useState(0);
  const featuredScrollRef = React.useRef<HTMLDivElement | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? photoItems.filter((item) => item.isFavorite)
      : photoItems.filter(
          (item) => item.category === selectedCategory && !item.isFavorite,
        );

  function openWall(photo: PhotoItem) {
    setActivePhoto(photo);
    setWallOpen(true);
  }

  function openAcquire(photo: PhotoItem) {
    setActivePhoto(photo);
    setAcquireOpen(true);
  }

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
      <CartIndicator onOpen={() => setCheckoutOpen(true)} />
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
              {featuredCollections.map((collection, index) => (
                <button
                  key={collection.category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(collection.category);
                    scrollToFeatured(index);
                  }}
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
                </button>
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
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`rounded-full border-2 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition ${
                  selectedCategory === category.value
                    ? "border-[#D4AF37] bg-[#D4AF37] text-[#0A0C10] shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-[#D4AF37]/50 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.id}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] shadow-[0_30px_80px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-white/15"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setLightboxLoading(true);
                  setLightboxError(false);
                  setLightboxPhoto(photo);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setLightboxLoading(true);
                    setLightboxError(false);
                    setLightboxPhoto(photo);
                  }
                }}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-t-[28px] border-b border-white/10"
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  loading="lazy"
                  unoptimized
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="rounded-3xl bg-black/70 px-4 py-3 text-sm text-white/90 backdrop-blur-sm">
                    <div className="font-semibold">{photo.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.35em] text-white/70">
                      {t(`categories.${photo.category}`)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-white/50">
                  <span>{t(`categories.${photo.category}`)}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{photo.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{t(`categories.${photo.category}`)} {t("gallery.collectionWord")}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openWall(photo)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    {t("gallery.viewOnWall")}
                  </button>
                  <button
                    type="button"
                    onClick={() => openAcquire(photo)}
                    className="rounded-full border border-white/15 bg-[#D4AF37]/5 px-4 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
                  >
                    {t("gallery.acquirePiece")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxLoading(true);
                      setLightboxError(false);
                      setLightboxPhoto(photo);
                    }}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    {t("gallery.viewFullSize")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activePhoto && wallOpen && (
        <VirtualWall photo={activePhoto} onClose={() => setWallOpen(false)} />
      )}

      {activePhoto && acquireOpen && (
        <AcquisitionOverlay photo={activePhoto} onClose={() => setAcquireOpen(false)} />
      )}

      {lightboxPhoto && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/95 px-4 py-8 backdrop-blur-sm sm:items-center">
          <button
            type="button"
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close full size view"
            style={{ top: "max(1rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
            className="fixed z-[70] rounded-full border border-white/15 bg-[#11131A] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/40 transition hover:bg-white/10"
          >
            {t("gallery.close")}
          </button>

          <div className="relative mt-14 w-full max-w-[95rem] overflow-hidden rounded-[32px] border border-white/10 bg-[#11131A] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.8)] sm:mt-0 sm:p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">{lightboxPhoto.title}</h3>
              <p className="mt-2 text-sm text-white/70">{t(`categories.${lightboxPhoto.category}`)}</p>
            </div>

            <div className="relative mx-auto min-h-[60vh] max-h-[calc(100vh-10rem)] max-w-[1500px] overflow-hidden rounded-[28px] bg-slate-950 shadow-inner shadow-black/50 sm:min-h-[930px] sm:max-h-[calc(100vh-6rem)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black"
                onContextMenu={(event) => event.preventDefault()}
              >
                <div className="relative h-full w-full overflow-hidden">
                  {lightboxLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
                      <div className="flex flex-col items-center gap-3 rounded-[24px] border border-white/10 bg-black/80 px-6 py-5 text-center text-white/75 shadow-lg">
                        <div className="h-3 w-56 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-3/4 animate-pulse rounded-full bg-white/40" />
                        </div>
                        <div className="text-sm">{t("gallery.loadingPreview")}</div>
                      </div>
                    </div>
                  )}

                  {lightboxError ? (
                    <div className="flex min-h-[220px] w-full items-center justify-center rounded-[24px] border border-dashed border-white/20 bg-[#0B0D13] px-6 py-8 text-center text-sm text-white/70">
                      {t("gallery.unableToLoad")}
                      <br />
                      {t("gallery.tryAgain")}
                    </div>
                  ) : (
                    <Image
                      key={lightboxPhoto.id}
                      src={lightboxPhoto.image}
                      alt={lightboxPhoto.title}
                      fill
                      className={`object-contain transition duration-300 ${
                        lightboxLoading ? "opacity-0" : "opacity-100"
                      }`}
                      sizes="(max-width: 1500px) 100vw, 1500px"
                      unoptimized
                      onLoad={() => setLightboxLoading(false)}
                      onError={() => {
                        setLightboxLoading(false);
                        setLightboxError(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && <CheckoutOverlay onClose={() => setCheckoutOpen(false)} />}
    </section>
  );
}
