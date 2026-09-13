"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const itinerary = [
  {
    day: "Day 0",
    title: "Arrival",
    text:
      "Arrival in the afternoon at an apartment near Lienz with a south-facing mountain panorama, ideal for optional nightscape photography. Dinner, followed by a briefing on the hiking weekend, safety and equipment, and a demonstration of Milky Way photography tools such as astro trackers, wedges and polar scopes.",
  },
  {
    day: "Day 1",
    title: "Karlsbader Hütte",
    text:
      "After an inclusive breakfast at 7 AM, we drive to the Dolomiten-Hütte parking lot, then hike 5 km with 650 m elevation gain to the Karlsbader Hütte — an easy 2-3 hour trail. Lunch, photo time and a walk around the lake follow. We descend the same route (1.5-2 hours); dinner is decided spontaneously. Sleeping in the same location as the first night.",
  },
  {
    day: "Day 2",
    title: "Lago di Braies & Mont Elmo",
    text:
      "A very early departure by car to Lago di Braies in Italy for sunrise, with breakfast (likely takeaway) afterwards. We park at the mountain lift station and ride up towards Mont Elmo, hiking the final 400 m elevation to the summit cross. Along the ridge, the SilianerHütte serves as our lunch or snack stop depending on arrival time. About 200 m further, WWI bunkers offer a perfect urbex/landscape opportunity with the Sexten Dolomites as a backdrop. Dinner at the Silianer Hütte around 6 PM, with a hopeful Milky Way photography session at night. Sleeping in a mattress lager in the hut.",
  },
  {
    day: "Day 3",
    title: "Descent & departure",
    text:
      "Descending the same way, with optional nearby stops for further photography themes depending on group agreement. Driving home around 12 PM.",
  },
];

const difficulty = [
  "T1-T2 trail, no special alpine experience needed, for beginners eligible.",
  "650 m elevation in 1 day could be tiring but with a minimum active life manageable for everyone.",
  "Altitude: above 2000 m you will experience tiredness, lack of breath sometimes, but the risk of high altitude sickness is negligible.",
];

const packlist = "/workshop/2027070104/packlist.png";

type ToBringItem = string | { text: ReactNode; sub?: ReactNode[]; note?: ReactNode };

const whatToBring: {
  title: string;
  intro?: ReactNode;
  items: ToBringItem[];
  note?: ReactNode;
}[] = [
  {
    title: "Backpack",
    items: [
      "28–32 L if you have a separate camera bag (hip bag, holster bag)",
      "35–45 L if you need dedicated space for the camera inside the backpack (e.g. with a camera insert)",
    ],
  },
  {
    title: "Camera Equipment",
    items: [
      "Camera bag or padded camera insert (to carry/protect the camera inside your backpack)",
      "Camera – any camera is fine as long as it has full manual controls and shoots in RAW.",
      {
        text: "Lenses",
        sub: [
          "At least 24mm (APS-C: 16mm) wide-angle lens",
          "A lens covering approximately 70–200mm (APS-C: 45–140mm)",
          "Optional: 28–50mm (APS-C: 18–35mm) standard/medium focal length – great for shooting panorama sections",
          "Optional: 14–24mm (APS-C: 9–16mm) lens with approximately f/1.4–2.8 aperture for astrophotography",
        ],
      },
      "SD cards (bring a spare)",
      "Batteries (bring spare batteries)",
      "Tripod (I have 2–3 smaller/larger tripods available to borrow)",
      "CPL filter (circular polarizing filter)",
      "Camera rain cover (e.g. Peak Design Shell)",
      "Microfiber cloth (for wiping off dust and rain)",
      "Remote shutter release – particularly useful for precise Milky Way photography",
      "Drone: you are welcome to bring one – please read the details at the bottom of the page!",
    ],
  },
  {
    title: "Clothing",
    intro:
      "Temperatures in the valley can reach 24–28°C during the day, while temperatures in the mountains can drop to as low as 3–5°C at night. Layering is essential!",
    items: [
      "Base layers (microfiber or merino, 2–3 sets; always keep one spare set in your backpack)",
      "Fleece jacket/sweater (2; one is enough for each hike)",
      "Trousers/pants (2 pairs, preferably quick-drying)",
      "Insulated jacket (puffy jacket – for nighttime photography or as a replacement for a wet fleece)",
      "Rain jacket or poncho (a poncho is less practical, but there is no need to buy a new jacket just for this trip)",
      "Warm hat/beanie (a simple thin one is fine for cold evenings; the hood of your puffy jacket can also replace it)",
      "Baseball cap or sun hat (UV protection – helps prevent sunstroke)",
      "Scarf or neck gaiter (a tube-style gaiter is preferable, e.g. Buff or Decathlon)",
      {
        text: "Socks (3–4 pairs, preferably at least 30% merino)",
        note: "Always keep one spare pair in your backpack to prevent getting cold feet and blisters.",
      },
      {
        text: "Hiking shoes or boots (waterproof, high-ankle boots are recommended, although low-cut shoes are also fine if you find them more comfortable)",
        sub: [
          "Recommended types: Trekking boots, hiking shoes, hiking boots, approach shoes",
          "Recommended categories: A/B, B, B/C (standard A-category shoes may not be robust enough; C and D categories are designed for mountaineering)",
          <>
            Any Decathlon hiking shoe is fine, just don&apos;t choose the cheapest models, as
            their soles can be dangerously slippery on wet ground. For example:{" "}
            <a
              href="https://www.decathlon.hu/p/ferfi-turabakancs-vizhatlan-mh100/_/R-p-342591?mc=8795990"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline"
            >
              QUECHUA Men&apos;s Mid-Cut Waterproof Hiking Boots – MH100
            </a>
          </>,
          "Gore-Tex is advantageous for waterproofing and breathability, but belongs to the more expensive category",
          "Models with Vibram soles are among the best, but again, they tend to be more expensive",
          "If you don't plan to hike regularly, there is no need to spend a fortune on footwear",
          "Choose ½–1 size larger than your normal street shoe size, as your feet tend to swell during long walks.",
        ],
      },
    ],
    note:
      "You do not need to carry everything with you at once. There will be several opportunities to reorganize your equipment at the car.",
  },
  {
    title: "Food & Drinks",
    items: [
      "Water bottle or hydration bladder: 1.5–2 liters",
      "Snacks: energy bars, protein bars, seeds, nuts, dried/fresh fruit, etc.",
    ],
  },
  {
    title: "Other Equipment",
    items: [
      "Hiking poles (at least 1 is recommended; I can lend 2–3 pairs)",
      {
        text: "Sleeping bag liner: mandatory for sleeping in the hut (microfiber or silk; small and lightweight)",
        note: "A large sleeping bag is not necessary.",
      },
      "Dry sack – compression bag/cover for compacting clothes and protecting them from rain (e.g. a 12–20 L Forclaz model from Decathlon, but even a simple nylon/plastic bag will work as a cheaper alternative)",
      "Sunscreen (SPF 50/50+)",
      "Lip balm (very helpful in windy conditions)",
      "Earplugs for sleeping",
      "Eye mask for sleeping",
      "Power bank and/or phone charger",
    ],
  },
  {
    title: "Hygiene",
    items: [
      "Personal toiletries",
      "Toothbrush and toothpaste",
      "Shower gel",
      "Small microfiber towel (approximately 60–120 cm long)",
    ],
  },
  {
    title: "Medication",
    items: [
      "Muscle/pain relief gel – e.g. one containing diclofenac",
      "Band-aids and/or blister plasters",
      "Knee support – if you have known knee problems",
      {
        text: "Diamox-based medication (acetazolamide) if anyone is concerned about altitude sickness",
        note: "Unfortunately, I cannot provide this, as it is difficult to obtain in Germany, even with a prescription.",
      },
    ],
    note:
      "I always carry a first-aid kit; hopefully we won't need it, but it's better to be safe. I will also have instant magnesium available for muscle cramps.",
  },
];

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

const costs = [
  { label: "Apartment, 2 nights with breakfast", value: "xy Euro" },
  { label: "Silianer Hütte, 1 night with half board", value: "xy Euro" },
  { label: "Cable car to Mont Elmo", value: "xy Euro" },
  {
    label: "Tour leading",
    value: "60 Euro",
    note: "Free for Képolvasók Fotoclub members who joined latest last year",
  },
  {
    label: "Milky-way workshop (in case of nice weather)",
    value: "40 Euro",
    note: "Free for Képolvasók Fotoclub members who joined latest last year",
  },
];

export default function LienzerDolomitenTourPage() {
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
              Photo Hiking Tour
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
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">About this tour</p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Lienzer Dolomites — 4 Days of Hiking &amp; Photography
          </h2>
          <p className="mt-4 text-lg font-semibold text-white">
            Four days. Two countries. Endless mountain stories.
          </p>
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

          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-white/10 py-8 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Dates</dt>
              <dd className="mt-2 text-base text-white">01 – 04 July 2027</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Location</dt>
              <dd className="mt-2 text-base text-white">Lienzer Dolomiten, Austria</dd>
            </div>
          </dl>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Itinerary
          </h2>
          <div className="mt-8 space-y-8">
            {itinerary.map((day) => (
              <div key={day.day} className="border-l-2 border-[#D4AF37]/60 pl-6">
                <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">{day.day}</div>
                <h3 className="mt-1 text-xl font-semibold text-white">{day.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/72">{day.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Difficulty
          </h2>
          <ul className="mt-8 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {difficulty.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/50">
            New to trail grades or hiking gear? Read the{" "}
            <Link href="/hiking-basics" className="text-[#D4AF37] hover:underline">
              Hiking Basic Knowledge
            </Link>{" "}
            reference guide.
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            What to Bring
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
            {whatToBring.map((section) => (
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
            Costs
          </h2>
          <ul className="mt-8 space-y-3">
            {costs.map((item) => (
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
            Extra costs: dinner, parking ticket, Autobahn Vignette, drinks.
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Gallery
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
                Close
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
              Join this tour
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
