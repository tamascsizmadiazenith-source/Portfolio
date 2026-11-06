"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/dictionary";
import { sizeGuideImages } from "@/data/size-guide-images";

type AcquisitionOverlayProps = {
  photo: {
    id: string;
    title: string;
    category: string;
    description: string;
    location: string;
    image?: string;
    orientation?: "horizontal" | "vertical" | "panorama";
  };
  onClose: () => void;
};

type SizeOption = {
  label: string;
  price?: number;
};

const mediaOptions = ["Paper", "Canvas"];
const paperLandscapeOptions: SizeOption[] = [
  { label: "50 x 40 cm", price: 200 },
  { label: "60 x 40 cm", price: 240 },
  { label: "60 x 45 cm", price: 250 },
  { label: "75 x 50 cm", price: 280 },
  { label: "80 x 60 cm", price: 350 },
  { label: "90 x 60 cm", price: 420 },
  { label: "100 x 75 cm", price: 480 },
  { label: "100 x 80 cm", price: 490 },
];
const canvasLandscapeOptions: SizeOption[] = [
  { label: "50 x 40 cm", price: 180 },
  { label: "60 x 40 cm", price: 220 },
  { label: "60 x 45 cm", price: 230 },
  { label: "75 x 50 cm", price: 260 },
  { label: "80 x 60 cm", price: 300 },
  { label: "90 x 60 cm", price: 350 },
  { label: "100 x 75 cm", price: 400 },
  { label: "100 x 80 cm", price: 420 },
];

function rotateSizeLabel(option: string) {
  const match = option.match(/(\d+)\s*x\s*(\d+)\s*cm/);
  if (!match) return option;
  return `${match[2]} x ${match[1]} cm`;
}

const canvasPortraitOptions: SizeOption[] = canvasLandscapeOptions.map(({ label, price }) => ({
  label: rotateSizeLabel(label),
  price,
}));
const paperPortraitOptions: SizeOption[] = paperLandscapeOptions.map(({ label, price }) => ({
  label: rotateSizeLabel(label),
  price,
}));
const panoramaSizeOptions: SizeOption[] = [
  { label: "60 x 30 cm" },
  { label: "65 x 24 cm" },
  { label: "81 x 30 cm" },
  { label: "90 x 30 cm" },
  { label: "108 x 40 cm" },
  { label: "120 x 40 cm" },
];

function getSizeRatio(option: string) {
  const match = option.match(/(\d+)\s*x\s*(\d+)\s*cm/);
  if (!match) return 50 / 40;
  return parseInt(match[1], 10) / parseInt(match[2], 10);
}

export default function AcquisitionOverlay({ photo, onClose }: AcquisitionOverlayProps) {
  const { t } = useTranslation();
  const [media, setMedia] = useState(mediaOptions[0]);
  const [size, setSize] = useState(paperLandscapeOptions[1].label);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeGuideIndex, setSizeGuideIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (showSizeGuide) setSizeGuideIndex(0);
  }, [showSizeGuide]);

  const handleAcquire = () => {
    addItem({
      id: `${photo.id}-${media}-${size}`,
      title: photo.title,
      artworkId: photo.id,
      category: photo.category,
      media,
      size,
      quantity: 1,
      price,
    });
    onClose();
  };

  const parsedSize = useMemo(() => {
    const match = size.match(/(\d+)\s*x\s*(\d+)\s*cm/);
    if (!match) return { w: 50, h: 40, ratio: 50 / 40 };
    const w = parseInt(match[1], 10);
    const h = parseInt(match[2], 10);
    return { w, h, ratio: w / h };
  }, [size]);

  // fit mode: 'contain' -> extend (fit) ; 'cover' -> crop
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover");
  const [rotation, setRotation] = useState(0); // degrees
  const [pos, setPos] = useState({ x: 50, y: 50 }); // percentage object-position for cover mode
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  // natural image size for ratio warning
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!photo.image) return;
    const img = new window.Image();
    img.src = photo.image;
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
  }, [photo.image]);

  const isPortraitPhoto = useMemo(() => {
    if (!natural) return false;
    return natural.h > natural.w;
  }, [natural]);

  const isPanorama = photo.orientation === "panorama";

  const sizeOptions = useMemo<SizeOption[]>(() => {
    if (isPanorama) return panoramaSizeOptions;

    if (media === "Canvas") {
      return isPortraitPhoto ? canvasPortraitOptions : canvasLandscapeOptions;
    }

    return isPortraitPhoto ? paperPortraitOptions : paperLandscapeOptions;
  }, [isPanorama, isPortraitPhoto, media]);

  const price = useMemo(() => {
    const selectedOption = sizeOptions.find((option) => option.label === size);
    if (selectedOption?.price != null) return selectedOption.price;

    const unitPaper = 0.21; // EUR per cm^2
    const unitCanvas = 0.30;
    const area = parsedSize.w * parsedSize.h;
    const base = media === "Canvas" ? Math.round(area * unitCanvas) : Math.round(area * unitPaper);
    // round to nearest 5
    return Math.round(base / 5) * 5;
  }, [media, parsedSize, size, sizeOptions]);

  const closestSizeOption = useMemo(() => {
    const fallback = sizeOptions[1]?.label ?? sizeOptions[0]?.label;
    if (!natural || !fallback) return fallback;

    const photoRatio = natural.w / natural.h;
    return sizeOptions.reduce((closest, option) => {
      const closestDelta = Math.abs(getSizeRatio(closest) - photoRatio);
      const currentDelta = Math.abs(getSizeRatio(option.label) - photoRatio);
      return currentDelta < closestDelta ? option.label : closest;
    }, fallback);
  }, [natural, sizeOptions]);

  useEffect(() => {
    if (!closestSizeOption) return;
    if (sizeOptions.some((option) => option.label === size)) return;
    setSize(closestSizeOption);
  }, [closestSizeOption, size, sizeOptions]);

  useEffect(() => {
    if (!closestSizeOption) return;
    setSize(closestSizeOption);
    setFitMode("cover");
    setPos({ x: 50, y: 50 });
    setRotation(0);
  }, [photo.id, closestSizeOption]);

  const ratioMismatch = useMemo(() => {
    if (!natural) return 0;
    const photoRatio = natural.w / natural.h;
    return Math.abs(photoRatio - parsedSize.ratio) / Math.max(photoRatio, parsedSize.ratio);
  }, [natural, parsedSize]);

  const previewFrame = useMemo(() => {
    const ratio = parsedSize.ratio;
    const maxWidth = 420;
    const maxHeight = 520;

    let width = ratio >= 1 ? maxWidth : maxHeight * ratio;
    width = Math.min(width, maxWidth);

    let height = width / ratio;
    if (height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }

    return { ratio, width, height };
  }, [parsedSize]);

  // dragging handlers for panning
  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!isDragging || !dragRef.current) return;
      const rect = dragRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 100;
      const ny = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: Math.max(0, Math.min(100, nx)), y: Math.max(0, Math.min(100, ny)) });
    }
    function onPointerUp() {
      setIsDragging(false);
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-[51] rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/10"
      >
        {t("acquisition.close")}
      </button>

      <div className="relative mx-auto max-h-[90vh] w-full max-w-[72rem] overflow-y-auto overscroll-contain rounded-[32px] border border-white/10 bg-[#11131A] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        <div className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.95fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">{t("acquisition.eyebrow")}</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{photo.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{t("acquisition.subtitle")}</p>
            </div>

            <div className="space-y-4 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("acquisition.material")}</div>
              <div className="grid gap-3 sm:grid-cols-2 sm:max-w-[36rem]">
                {mediaOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMedia(option)}
                    className={`flex w-full min-w-0 items-center justify-center rounded-2xl border px-4 py-3 text-sm transition overflow-hidden whitespace-normal ${
                      media === option
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/10 bg-white/5 text-white/80"
                    }`}
                  >
                    <span className="break-words text-center leading-tight">{t(`acquisition.materials.${option}`)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("acquisition.size")}</div>
              <div className="grid gap-3 sm:max-w-[36rem]">
                {sizeOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSize(option.label)}
                    className={`flex w-full min-w-0 items-center rounded-2xl border px-4 py-3 text-left text-sm transition overflow-hidden whitespace-normal ${
                      size === option.label
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/10 bg-white/5 text-white/80"
                    }`}
                  >
                    <span className="break-words leading-tight">{option.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="mt-3 text-sm text-white/60 hover:text-[#D4AF37] transition"
              >
                {t("acquisition.whichSize")}
              </button>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("acquisition.orderSummary")}</div>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>{t("acquisition.material")}</span>
                  <span>{t(`acquisition.materials.${media}`)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>{t("acquisition.size")}</span>
                  <span>{size}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-semibold text-white">
                  <span>{t("acquisition.total")}</span>
                    <span>€{price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#0F1218] p-8">
            <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">{t("acquisition.preview")}</div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="mx-auto max-w-[420px] rounded-[24px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-1">
                <div
                  ref={dragRef}
                  onPointerDown={(e) => {
                    // only start dragging for cover mode
                    if (fitMode === "cover") {
                      setIsDragging(true);
                    }
                  }}
                  className="relative overflow-hidden rounded-[23px] bg-[#0b0c0f]"
                  style={{
                    aspectRatio: `${previewFrame.ratio}`,
                    width: previewFrame.width,
                    height: previewFrame.height,
                  }}
                >
                  {photo.image ? (
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      style={{
                        objectFit: fitMode,
                        objectPosition: `${pos.x}% ${pos.y}%`,
                        transform: `rotate(${rotation}deg)`,
                      }}
                      className="rounded-[23px]"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFitMode(fitMode === "cover" ? "contain" : "cover")}
                className="rounded-full border px-3 py-2 text-sm text-white/90"
              >
                {fitMode === "cover" ? t("acquisition.crop") : t("acquisition.extend")}
              </button>
              <button type="button" onClick={() => setRotation((r) => (r - 90) % 360)} className="rounded-full border px-3 py-2 text-sm text-white/90">
                ↺
              </button>
              <button type="button" onClick={() => setRotation((r) => (r + 90) % 360)} className="rounded-full border px-3 py-2 text-sm text-white/90">
                ↻
              </button>
              <button
                type="button"
                onClick={() => {
                  setPos({ x: 50, y: 50 });
                  setRotation(0);
                }}
                className="rounded-full border px-3 py-2 text-sm text-white/70"
              >
                {t("acquisition.reset")}
              </button>
            </div>
            {ratioMismatch > 0.12 && (
              <div className="mt-3 rounded-md border border-amber-600/30 bg-amber-900/10 p-3 text-sm text-amber-300">
                {t("acquisition.ratioWarning")}
              </div>
            )}
            <button
              type="button"
              onClick={handleAcquire}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#0A0C10] transition hover:bg-[#c5992f]"
            >
              {t("acquisition.addToCart")} — €{price}
            </button>
          </div>
        </div>
      </div>

      {showSizeGuide && sizeGuideImages.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setShowSizeGuide(false)}
            className="fixed right-4 top-4 z-[61] rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm hover:bg-white/15"
          >
            ✕
          </button>

          <div className="relative mx-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-[24px] border border-white/10 bg-[#11131A] p-8">
            <h3 className="text-2xl font-semibold text-white">{t("acquisition.sizeGuideTitle")}</h3>
            <p className="mt-2 text-sm text-white/70">{t("acquisition.sizeGuideDescription")}</p>

            <div className="mt-6 overflow-hidden rounded-[16px] bg-white/5">
              <Image
                src={sizeGuideImages[sizeGuideIndex].image}
                alt={`Size example ${sizeGuideIndex + 1}`}
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
            {sizeGuideImages[sizeGuideIndex].label && (
              <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                {sizeGuideImages[sizeGuideIndex].label}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSizeGuideIndex((i) => (i - 1 + sizeGuideImages.length) % sizeGuideImages.length)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                ‹
              </button>

              <div className="text-sm text-white/70">
                {sizeGuideIndex + 1} / {sizeGuideImages.length}
              </div>

              <button
                type="button"
                onClick={() => setSizeGuideIndex((i) => (i + 1) % sizeGuideImages.length)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
