"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/dictionary";

type VirtualWallProps = {
  photo: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    image: string;
  };
  onClose: () => void;
};

const wallSizes = ["60 x 40 cm", "80 x 60 cm", "100 x 75 cm"];
const wallSurfaces = ["Gallery white", "Textured grey", "Warm timber"];
const wallRooms = [
  {
    id: "gallery",
    label: "Gallery space",
    image: "/photos-web/walls/An art gallery interior with clean white walls, empty wall space, wooden or polished concrete floors, track lighting or spotlights, minimalist modern gallery space, perfect for displaying photos, museum-like atmosphere, bright and spacious.png",
  },
  {
    id: "living-room",
    label: "Living room",
    image: "/photos-web/walls/A modern living room interior with a large clean white wall, minimalist furniture, sofa, coffee table, natural lighting from windows, empty white wall space perfect for displaying photos, contemporary design.png",
  },
  {
    id: "bedroom",
    label: "Bedroom wall",
    image: "/photos-web/walls/A modern bedroom interior with a large clean white wall, bed with neutral bedding, minimalist furniture, natural lighting from windows, empty white wall space perfect for displaying photos, contemporary design, calm and serene atmosphere.png",
  },
  {
    id: "apartment",
    label: "Apartment wall",
    image: "/photos-web/walls/A modern apartment room interior with an exposed brick wall, minimalist furniture, natural lighting from windows, empty brick wall space perfect for displaying photos, industrial contemporary design, warm and inviting atmosphere.png",
  },
  {
    id: "office",
    label: "Home office",
    image: "/photos-web/walls/A modern home office interior with clean walls, desk with chair, computer setup, bookshelves, natural lighting from windows, empty wall space perfect for displaying photos, contemporary design, productive and organized atmosphere.png",
  },
];

export default function VirtualWall({ photo, onClose }: VirtualWallProps) {
  const { t } = useTranslation();
  const [roomIndex, setRoomIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const currentRoom = wallRooms[roomIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#11131A] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          {t("virtualWall.close")}
        </button>

        <div className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0F1218] p-6">
            <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">{t("virtualWall.title")}</div>
            <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0D12] p-6">
              <div className="absolute inset-0">
                <Image
                  src={currentRoom.image}
                  alt={currentRoom.label}
                  fill
                  className="absolute inset-0 object-cover object-center opacity-90"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full w-full max-w-[320px] overflow-hidden rounded-[20px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.26)]">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/70" />
                <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-black/50 px-4 py-3 text-sm text-white/90 backdrop-blur-sm">
                  <div className="font-semibold">{photo.title}</div>
                  <div className="mt-1 text-xs text-white/70">{t(`categories.${photo.category}`)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.35em] text-white/50">{t("virtualWall.artwork")}</div>
              <h3 className="text-2xl font-semibold text-white">{photo.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{photo.description}</p>
            </div>

            <div className="space-y-5 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("virtualWall.roomSelection")}</div>
              <div className="grid gap-3">
                {wallRooms.map((room, index) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setRoomIndex(index)}
                    className={`group flex items-center gap-4 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      roomIndex === index
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="relative h-16 w-24 overflow-hidden rounded-2xl bg-slate-900">
                      <Image
                        src={room.image}
                        alt={room.label}
                        fill
                        className="object-cover object-center"
                        sizes="96px"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      {roomIndex === index ? (
                        <span className="absolute left-2 top-2 rounded-full bg-[#D4AF37] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950">
                          {t("virtualWall.selected")}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{t(`virtualWall.rooms.${room.id}`)}</div>
                      <div className="mt-1 text-xs text-white/60">{t("virtualWall.previewRoom")}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("virtualWall.frameSize")}</div>
              <div className="grid gap-3">
                {wallSizes.map((size, index) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSizeIndex(index)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      sizeIndex === index
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{t("virtualWall.wallSurface")}</div>
              <div className="grid gap-3">
                {wallSurfaces.map((surface, index) => (
                  <button
                    key={surface}
                    type="button"
                    onClick={() => setSurfaceIndex(index)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      surfaceIndex === index
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {t(`virtualWall.surfaces.${surface}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
