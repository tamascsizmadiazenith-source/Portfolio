"use client";

import { useLanguage } from "@/context/LanguageContext";

// Short, reused UI strings. Long page-specific prose lives next to its English
// source in each page file (see the `en`/`hu` content pairs there) rather than here.
const dictionary = {
  en: {
    nav: {
      gallery: "Gallery",
      photoTours: "Photo Tours",
      about: "About",
      contact: "Contact",
    },
    footer: {
      rights: "© Tamás Csizmadia. All rights reserved 2026",
    },
    hero: {
      badge: "Fine Art Landscape & Nightscape",
      name: "Tamás Csizmadia",
      tagline: "Fineart Photos and Mountain Spirit",
      copy: "A moody, modern portfolio for mountain light, alpine exploration, and extraordinary prints designed for collectors, exhibitions, and lovers of high-altitude atmosphere.",
      exploreGallery: "Explore the Gallery",
      aboutArtist: "About the Artist",
    },
    gallery: {
      eyebrow: "Gallery",
      heading: "Select a series of mountain moods.",
      intro:
        "Explore curated themes with immersive previews and prepare to bring these scenes into your space through premium prints.",
      featuredEyebrow: "Featured collections",
      featuredHeading: "Curated pillars of the portfolio.",
      featuredIntro: "Swipe through the strongest themes, then explore the gallery filtered to match.",
      exploreCollection: "Explore collection",
      myFavorites: "My Favorites",
      viewOnWall: "View on wall",
      acquirePiece: "Acquire this piece",
      viewFullSize: "View full size",
      close: "Close",
      loadingPreview: "Loading preview…",
      unableToLoad: "Unable to load preview.",
      tryAgain: "Please close and try again.",
      collectionWord: "collection",
      featured: {
        nightscape: { title: "Nocturnal Vistas", description: "Deep skies, still horizons, and the silence of the night." },
        "swiss-alps": { title: "Alpine Light", description: "Ridge lines, glaciers, and timeless mountain architecture." },
        himalayas: { title: "Sacred Peaks", description: "Quiet power and soul in every alpine frame." },
        norway: { title: "Fjord Nights", description: "Aurora-drenched water and northern solitude." },
        birdeye: { title: "Aerial Perspective", description: "High-altitude vistas with a sense of scale and serenity." },
      },
    },
    about: {
      eyebrow: "About the Artist",
    },
    virtualWall: {
      title: "Virtual wall preview",
      artwork: "Artwork",
      roomSelection: "Room selection",
      previewRoom: "Preview the artwork in this room",
      selected: "Selected",
      frameSize: "Frame size",
      wallSurface: "Wall surface",
      close: "Close",
      rooms: {
        gallery: "Gallery space",
        "living-room": "Living room",
        bedroom: "Bedroom wall",
        apartment: "Apartment wall",
        office: "Home office",
      },
      surfaces: {
        "Gallery white": "Gallery white",
        "Textured grey": "Textured grey",
        "Warm timber": "Warm timber",
      },
    },
    acquisition: {
      eyebrow: "Acquire this piece",
      subtitle: "Select your preferred material and size for a premium print order.",
      material: "Material",
      size: "Size",
      orderSummary: "Order summary",
      total: "Total",
      preview: "Preview",
      crop: "Crop (cover)",
      extend: "Extend (fit)",
      reset: "Reset",
      ratioWarning:
        "Warning: the selected print ratio differs substantially from the photo ratio — composition may be cropped or letterboxed.",
      addToCart: "Add to Cart",
      close: "Close",
      materials: {
        Paper: "Paper",
        Canvas: "Canvas",
      },
    },
    checkout: {
      currentOrder: "Current order",
      reviewSelection: "Review your selection",
      emptyTitle: "Your cart is empty.",
      emptyBody: "Select a print and material to begin the premium acquisition experience.",
      remove: "Remove",
      orderTotal: "Order total",
      checkoutButton: "Checkout with Stripe",
      preparingCheckout: "Preparing checkout…",
      genericError: "Unable to create checkout. Please try again.",
      stripeUnavailable: "Stripe checkout is currently unavailable. Please try again later.",
      close: "Close",
    },
    cart: {
      title: "Cart",
      item: "item",
      items: "items",
    },
    categories: {
      adventure: "Adventure",
      austria: "Austria",
      birdeye: "Birdeye",
      france: "France",
      germany: "Germany",
      himalayas: "Himalayas",
      hungary: "Hungary",
      italy: "Italy",
      "la-palma-canaries": "La Palma - Canaries",
      nightscape: "Nightscape",
      norway: "Norway",
      scotland: "Scotland",
      slowenia: "Slowenia",
      "swiss-alps": "Swiss Alps",
      wildlife: "Wildlife",
    },
  },
  hu: {
    nav: {
      gallery: "Galéria",
      photoTours: "Foto túrák",
      about: "Rólam",
      contact: "Kapcsolat",
    },
    footer: {
      rights: "© Csizmadia Tamás. Minden jog fenntartva 2026",
    },
    hero: {
      badge: "Fine Art Tájkép és Éjszakai Fotózás",
      name: "Csizmadia Tamás",
      tagline: "Fineart fotók és hegyi lélek",
      copy: "Hangulatos, modern portfólió a hegyi fényről, alpesi kalandokról és különleges nyomatokról, gyűjtők, kiállítások és a magashegyi hangulat szerelmeseinek.",
      exploreGallery: "Galéria megtekintése",
      aboutArtist: "A művészről",
    },
    gallery: {
      eyebrow: "Galéria",
      heading: "Válassz egy hegyi hangulatsorozatot.",
      intro:
        "Fedezd fel a válogatott témákat magával ragadó előnézetekkel, és hozd el ezeket a jeleneteket otthonodba prémium nyomatok formájában.",
      featuredEyebrow: "Kiemelt gyűjtemények",
      featuredHeading: "A portfólió válogatott alapjai.",
      featuredIntro: "Görgesd végig a legerősebb témákat, majd fedezd fel a hozzájuk illő galériát.",
      exploreCollection: "Gyűjtemény megtekintése",
      myFavorites: "Kedvenceim",
      viewOnWall: "Megtekintés a falon",
      acquirePiece: "Ezt a képet szeretném",
      viewFullSize: "Teljes méret",
      close: "Bezárás",
      loadingPreview: "Előnézet betöltése…",
      unableToLoad: "Az előnézet nem tölthető be.",
      tryAgain: "Kérlek zárd be, és próbáld újra.",
      collectionWord: "gyűjtemény",
      featured: {
        nightscape: { title: "Éjszakai látképek", description: "Mély égbolt, csendes horizontok és az éjszaka csendje." },
        "swiss-alps": { title: "Alpesi fény", description: "Gerincvonalak, gleccserek és időtlen hegyi architektúra." },
        himalayas: { title: "Szent csúcsok", description: "Csendes erő és lélek minden alpesi képkockában." },
        norway: { title: "Fjord éjszakák", description: "Aurora-áztatta víz és északi magány." },
        birdeye: { title: "Légi perspektíva", description: "Magaslati látványok, amelyek méretarányt és nyugalmat sugallnak." },
      },
    },
    about: {
      eyebrow: "A művészről",
    },
    virtualWall: {
      title: "Virtuális fal előnézet",
      artwork: "Alkotás",
      roomSelection: "Helyiség kiválasztása",
      previewRoom: "Alkotás előnézete ebben a helyiségben",
      selected: "Kiválasztva",
      frameSize: "Keretméret",
      wallSurface: "Falfelület",
      close: "Bezárás",
      rooms: {
        gallery: "Galéria tér",
        "living-room": "Nappali",
        bedroom: "Hálószoba fal",
        apartment: "Lakás fal",
        office: "Otthoni iroda",
      },
      surfaces: {
        "Gallery white": "Galéria fehér",
        "Textured grey": "Struktúrált szürke",
        "Warm timber": "Meleg fa",
      },
    },
    acquisition: {
      eyebrow: "Ezt a képet szeretném",
      subtitle: "Válaszd ki a kívánt anyagot és méretet a prémium nyomat megrendeléséhez.",
      material: "Anyag",
      size: "Méret",
      orderSummary: "Rendelés összesítő",
      total: "Összesen",
      preview: "Előnézet",
      crop: "Kivágás (kitöltés)",
      extend: "Kiterjesztés (illesztés)",
      reset: "Visszaállítás",
      ratioWarning:
        "Figyelem: a kiválasztott nyomat aránya jelentősen eltér a fotó arányától — a kompozíció levágásra vagy szegélyezésre kerülhet.",
      addToCart: "Kosárba",
      close: "Bezárás",
      materials: {
        Paper: "Papír",
        Canvas: "Vászon",
      },
    },
    checkout: {
      currentOrder: "Jelenlegi rendelés",
      reviewSelection: "Tekintsd át a kiválasztott elemeket",
      emptyTitle: "A kosarad üres.",
      emptyBody: "Válassz egy nyomatot és anyagot a prémium vásárlási élmény megkezdéséhez.",
      remove: "Eltávolítás",
      orderTotal: "Rendelés összesen",
      checkoutButton: "Fizetés Stripe-pal",
      preparingCheckout: "Fizetés előkészítése…",
      genericError: "A fizetés nem hozható létre. Kérlek próbáld újra.",
      stripeUnavailable: "A Stripe fizetés jelenleg nem elérhető. Kérlek próbáld újra később.",
      close: "Bezárás",
    },
    cart: {
      title: "Kosár",
      item: "termék",
      items: "termék",
    },
    categories: {
      adventure: "Kalandtúra",
      austria: "Ausztria",
      birdeye: "Madártávlat",
      france: "Franciaország",
      germany: "Németország",
      himalayas: "Himalája",
      hungary: "Magyarország",
      italy: "Olaszország",
      "la-palma-canaries": "La Palma - Kanári-szigetek",
      nightscape: "Éjszakai tájkép",
      norway: "Norvégia",
      scotland: "Skócia",
      slowenia: "Szlovénia",
      "swiss-alps": "Svájci Alpok",
      wildlife: "Vadvilág",
    },
  },
} as const;

function getPath(obj: unknown, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : path;
}

export function useTranslation() {
  const { locale } = useLanguage();
  const dict = dictionary[locale];
  const t = (path: string) => getPath(dict, path);
  return { t, locale };
}
