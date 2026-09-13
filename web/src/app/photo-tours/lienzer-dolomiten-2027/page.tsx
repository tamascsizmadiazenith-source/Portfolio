"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { itinerary, difficulty, costs, whatToBring, type ToBringItem } from "./content";

const banner = "/workshop/2027070104/banner.jpg";

const galleryPhotos = [
  "/workshop/2027070104/Dolomiten_02-07-23_0992aff.jpg",
  "/workshop/2027070104/IMG_0199.jpg",
  "/workshop/2027070104/IMG_0593.JPG",
  "/workshop/2027070104/LienzerDolomiten_10-07-25_0446.jpg",
  "/workshop/2027070104/LienzerDolomiten_11-07-25_0580.jpg",
  "/workshop/2027070104/Sillian_07-07-25_0180 M.jpg",
  "/workshop/2027070104/Sillian_07-07-25_0226 M.jpg",
  "/workshop/2027070104/Sillian_07-07-25_0236 M.jpg",
  "/workshop/2027070104/Sillian_07-07-25_0250.jpg",
];

const packlist = "/workshop/2027070104/packlist.png";

function ToBringList({ items }: { items: ToBringItem[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
      {items.map((item, i) => {
        const key = typeof item === "string" ? item : i;
        if (typeof item === "string") return <li key={key}>{item}</li>;
        return (
          <li key={key}>
            {item.text}
            {item.note && <div className="mt-1 text-sm text-white/50">{item.note}</div>}
            {item.sub && (
              <ul className="mt-2 list-[circle] space-y-1 pl-5">
                {item.sub.map((sub, j) => (
                  <li key={j}>{sub}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function LienzerDolomitenTourPage() {
  const { locale } = useLanguage();
  const hu = locale === "hu";
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <main>
        {/* Hero */}
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={banner}
            alt="Lienzer Dolomiten 01-04.07.2027."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              {hu ? "Fotós gyalogtúra" : "Photo Hiking Tour"}
            </p>
            <h1 className="mt-4 text-4xl font-bold uppercase tracking-[0.05em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl">
              Lienzer Dolomiten
            </h1>
            <p className="mt-4 text-lg font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-2xl">
              01 – 04 July 2027
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">{hu ? "A túráról" : "About this tour"}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            {hu ? "Lienzeni Dolomitok — 4 nap túra és fotózás" : "Lienzer Dolomites — 4 Days of Hiking & Photography"}
          </h2>
          <p className="mt-4 text-lg font-semibold text-white">
            {hu ? "Négy nap. Két ország. Végtelen hegyi történetek." : "Four days. Two countries. Endless mountain stories."}
          </p>
          {hu ? (
            <>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Csatlakozz hozzánk egy feledhetetlen fotós kalandra a lenyűgöző{" "}
                <strong className="font-semibold text-white">Lienzeni Dolomitokon és Dél-Tirolon</strong> keresztül.
                A drámai alpesi tavaktól és panorámikus gerincektől a történelmi I. világháborús bunkerekig és a
                sötét hegyi égboltig minden nap új lehetőséget kínál a táj megörökítésére.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Felgyalogolunk a <strong className="font-semibold text-white">Karlsbader Hüttéhez</strong>,
                felfedezzük a <strong className="font-semibold text-white">Lago di Braiest</strong> napkeltekor,
                felmászunk a <strong className="font-semibold text-white">Mont Elmo és a SilianerHütte</strong> felé,
                és a kalandot a csillagok alatt fejezzük be, lehetőséggel a{" "}
                <strong className="font-semibold text-white">Tejút</strong> fotózására a Dolomitok előtt.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Az út során a nyugodt gyaloglást összekapcsoljuk dedikált fotózási idővel, megosztjuk
                technikáinkat és kreatív ötleteinket, és felfedezzük a{" "}
                <strong className="font-semibold text-white">Tejút- és éjszakai tájfotózást</strong>,
                beleértve az{" "}
                <strong className="font-semibold text-white">asztrokövető, ék, poláris kereső és egyéb eszközök</strong> gyakorlati használatát.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Számíts látványos kilátásokra, alpesi menedékházakra, hegyi tavakra, történelmi romokra,
                remek ételekre, csillagos éjszakákra — és rengeteg időre a kamera mögött.
              </p>
              <p className="mt-6 text-lg font-semibold leading-8 text-white">
                Egy hétvége túrázóknak, fotósoknak, és mindenkinek, aki más perspektívából szeretné
                megtapasztalni az Alpokat.
              </p>
            </>
          ) : (
            <>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Join us for an unforgettable photography adventure through the spectacular{" "}
                <strong className="font-semibold text-white">Lienzer Dolomites and South Tyrol</strong>.
                From dramatic alpine lakes and panoramic ridgelines to historic WWI bunkers and dark
                mountain skies, every day offers a new opportunity to capture the landscape.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                We&apos;ll hike to the <strong className="font-semibold text-white">Karlsbader Hütte</strong>,
                explore <strong className="font-semibold text-white">Lago di Braies</strong> at sunrise,
                climb towards <strong className="font-semibold text-white">Mont Elmo and the SilianerHütte</strong>,
                and finish the adventure under the stars with the chance to photograph the{" "}
                <strong className="font-semibold text-white">Milky Way</strong> against the Dolomites.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Along the way, we&apos;ll combine relaxed hiking with dedicated photography time, share
                techniques and creative ideas, and explore{" "}
                <strong className="font-semibold text-white">Milky Way and nightscape photography</strong>,
                including practical use of an{" "}
                <strong className="font-semibold text-white">astro tracker, wedge, polar scope and other tools</strong>.
              </p>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Expect spectacular views, alpine huts, mountain lakes, historic ruins, great food,
                starry nights—and plenty of time behind the camera.
              </p>
              <p className="mt-6 text-lg font-semibold leading-8 text-white">
                A weekend for hikers, photographers, and anyone who wants to experience the Alps from
                a different perspective.
              </p>
            </>
          )}

          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-white/10 py-8 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/50">{hu ? "Időpont" : "Dates"}</dt>
              <dd className="mt-2 text-base text-white">01 – 04 July 2027</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/50">{hu ? "Helyszín" : "Location"}</dt>
              <dd className="mt-2 text-base text-white">Lienzer Dolomiten, Austria</dd>
            </div>
          </dl>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Útiterv" : "Itinerary"}
          </h2>
          <div className="mt-8 space-y-8">
            {itinerary[locale].map((day) => (
              <div key={day.day} className="border-l-2 border-[#D4AF37]/60 pl-6">
                <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">{day.day}</div>
                <h3 className="mt-1 text-xl font-semibold text-white">{day.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/72">{day.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Nehézség" : "Difficulty"}
          </h2>
          <ul className="mt-8 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {difficulty[locale].map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/50">
            {hu ? (
              <>
                Új vagy a túraszintek vagy a felszerelés terén? Olvasd el a{" "}
                <Link href="/hiking-basics" className="text-[#D4AF37] hover:underline">
                  Túrázási alapismeretek
                </Link>{" "}
                segédletet.
              </>
            ) : (
              <>
                New to trail grades or hiking gear? Read the{" "}
                <Link href="/hiking-basics" className="text-[#D4AF37] hover:underline">
                  Hiking Basic Knowledge
                </Link>{" "}
                reference guide.
              </>
            )}
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Mit hozz" : "What to Bring"}
          </h2>
          <div className="relative mt-8 aspect-[5/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
            <Image
              src={packlist}
              alt="Packing list for the Lienzer Dolomiten photo hiking tour"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
            />
          </div>

          <div className="mt-10 space-y-10">
            {whatToBring[locale].map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                {section.intro && (
                  <p className="mt-2 text-sm italic text-white/50">{section.intro}</p>
                )}
                <ToBringList items={section.items} />
                {section.note && <p className="mt-3 text-sm text-white/50">{section.note}</p>}
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Költségek" : "Costs"}
          </h2>
          <ul className="mt-8 space-y-3">
            {costs[locale].map((item) => (
              <li key={item.label} className="border-b border-white/10 pb-3">
                <div className="flex items-baseline justify-between gap-4 text-base text-white/72">
                  <span>{item.label}</span>
                  <span className="whitespace-nowrap font-semibold text-white">{item.value}</span>
                </div>
                {item.note && <p className="mt-1 text-sm text-white/50">{item.note}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/50">
            {hu ? "Extra költségek: vacsora, parkolójegy, autópálya-matrica, italok." : "Extra costs: dinner, parking ticket, Autobahn Vignette, drinks."}
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Galéria" : "Gallery"}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo) => (
              <button
                key={photo}
                type="button"
                onClick={() => setLightboxPhoto(photo)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={photo}
                  alt="Lienzer Dolomiten photo tour"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          {lightboxPhoto && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
              onClick={() => setLightboxPhoto(null)}
            >
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                {hu ? "Bezárás" : "Close"}
              </button>
              <div
                className="relative h-[85vh] w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxPhoto}
                  alt="Lienzer Dolomiten photo tour"
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link
              href="/contact"
              className="rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A0C10] transition hover:bg-[#e2c15a]"
            >
              {hu ? "Csatlakozom a túrához" : "Join this tour"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
