"use client";

import * as React from "react";
import Image from "next/image";
import AcquisitionOverlay from "@/components/commerce/AcquisitionOverlay";
import CartIndicator from "@/components/commerce/CartIndicator";
import CheckoutOverlay from "@/components/commerce/CheckoutOverlay";
import { useTranslation } from "@/i18n/dictionary";
import type { PhotoItem } from "@/data/gallery-photos";

type PhotoGridProps = {
  photos: PhotoItem[];
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const { t } = useTranslation();
  const [activePhoto, setActivePhoto] = React.useState<PhotoItem | null>(null);
  const [acquireOpen, setAcquireOpen] = React.useState(false);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [lightboxPhoto, setLightboxPhoto] = React.useState<PhotoItem | null>(null);
  const [lightboxLoading, setLightboxLoading] = React.useState(false);
  const [lightboxError, setLightboxError] = React.useState(false);

  function openAcquire(photo: PhotoItem) {
    setActivePhoto(photo);
    setAcquireOpen(true);
  }

  function openLightbox(photo: PhotoItem) {
    setLightboxLoading(true);
    setLightboxError(false);
    setLightboxPhoto(photo);
  }

  return (
    <>
      <CartIndicator onOpen={() => setCheckoutOpen(true)} />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] shadow-[0_30px_80px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-white/15"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(photo)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(photo);
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
                  onClick={() => openAcquire(photo)}
                  className="rounded-full border border-white/15 bg-[#D4AF37]/5 px-4 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
                >
                  {t("gallery.acquirePiece")}
                </button>
                <button
                  type="button"
                  onClick={() => openLightbox(photo)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  {t("gallery.viewFullSize")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

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
    </>
  );
}
