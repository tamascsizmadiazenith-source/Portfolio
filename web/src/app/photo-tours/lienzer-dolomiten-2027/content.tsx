import type { ReactNode } from "react";

export const itinerary = {
  en: [
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
  ],
  hu: [
    {
      day: "0. nap",
      title: "Érkezés",
      text:
        "Délutáni érkezés egy Lienz melletti apartmanhoz, dél felé néző hegyi panorámával, amely ideális az opcionális éjszakai tájfotózáshoz. Vacsora, majd eligazítás a túrahétvégéről, a biztonságról és a felszerelésről, valamint a Tejút-fotózás eszközeinek — asztrokövető, ék, poláris kereső — bemutatója.",
    },
    {
      day: "1. nap",
      title: "Karlsbader Hütte",
      text:
        "A reggeli 7 órakor, majd a Dolomiten-Hütte parkolójához hajtunk, ahonnan 5 km-t gyalogolunk 650 m szintemelkedéssel a Karlsbader Hütte-ig — egy könnyű, 2-3 órás útvonal. Ebéd, fotózás és séta a tó körül következik. Ugyanazon az útvonalon ereszkedünk le (1,5-2 óra); a vacsora spontán dől el. Az első éjszakával megegyező helyen alszunk.",
    },
    {
      day: "2. nap",
      title: "Lago di Braies és Mont Elmo",
      text:
        "Nagyon korai indulás autóval a Lago di Braies-hez Olaszországban a napkeltéhez, utána reggelivel (valószínűleg elvitelre). A hegyi felvonó állomásánál parkolunk, és felmegyünk a Mont Elmo felé, majd az utolsó 400 méteres szintet gyalogolva érjük el a csúcskeresztet. A gerincen a SilianerHütte szolgál ebéd- vagy uzsonnamegállóként, az érkezési időtől függően. Kb. 200 méterrel arrébb I. világháborús bunkerek kínálnak tökéletes urbex/tájfotó lehetőséget a Sextenwerk-dolomitokkal a háttérben. Vacsora a Silianer Hüttén kb. 18 órakor, este pedig reményeink szerint Tejút-fotózás. Éjszaka matracos szálláson alszunk a menedékházban.",
    },
    {
      day: "3. nap",
      title: "Ereszkedés és hazaút",
      text:
        "Ugyanazon az úton ereszkedünk le, opcionális közeli megállókkal további fotótémákhoz, a csoport egyetértése szerint. Hazaindulás kb. déli 12 órakor.",
    },
  ],
};

export const difficulty = {
  en: [
    "T1-T2 trail, no special alpine experience needed, for beginners eligible.",
    "650 m elevation in 1 day could be tiring but with a minimum active life manageable for everyone.",
    "Altitude: above 2000 m you will experience tiredness, lack of breath sometimes, but the risk of high altitude sickness is negligible.",
  ],
  hu: [
    "T1-T2 útvonal, nincs szükség különleges alpesi tapasztalatra, kezdők számára is alkalmas.",
    "650 m szintemelkedés 1 nap alatt fárasztó lehet, de minimálisan aktív életmóddal mindenki számára kezelhető.",
    "Magasság: 2000 m felett fáradtságot, néha légszomjat tapasztalhatsz, de a magassági betegség kockázata elhanyagolható.",
  ],
};

export const costs = {
  en: [
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
  ],
  hu: [
    { label: "Apartman, 2 éjszaka reggelivel", value: "xy euró" },
    { label: "Silianer Hütte, 1 éjszaka félpanzióval", value: "xy euró" },
    { label: "Felvonó a Mont Elmóra", value: "xy euró" },
    {
      label: "Túravezetés",
      value: "60 euró",
      note: "Ingyenes a Képolvasók Fotóklub azon tagjainak, akik legkésőbb tavaly csatlakoztak",
    },
    {
      label: "Tejút workshop (jó idő esetén)",
      value: "40 euró",
      note: "Ingyenes a Képolvasók Fotóklub azon tagjainak, akik legkésőbb tavaly csatlakoztak",
    },
  ],
};

export type ToBringItem = string | { text: ReactNode; sub?: ReactNode[]; note?: ReactNode };

export type ToBringSection = {
  title: string;
  intro?: ReactNode;
  items: ToBringItem[];
  note?: ReactNode;
};

function decathlonLink(hu: boolean) {
  return (
    <>
      {hu ? (
        <>
          Bármelyik Decathlon túrabakancs megfelelő, csak ne a legolcsóbb modelleket válaszd,
          mert a talpuk veszélyesen csúszós lehet nedves talajon. Például:{" "}
        </>
      ) : (
        <>
          Any Decathlon hiking shoe is fine, just don&apos;t choose the cheapest models, as
          their soles can be dangerously slippery on wet ground. For example:{" "}
        </>
      )}
      <a
        href="https://www.decathlon.hu/p/ferfi-turabakancs-vizhatlan-mh100/_/R-p-342591?mc=8795990"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D4AF37] hover:underline"
      >
        {hu ? "QUECHUA férfi vízálló, magas szárú túrabakancs – MH100" : "QUECHUA Men's Mid-Cut Waterproof Hiking Boots – MH100"}
      </a>
    </>
  );
}

export const whatToBring: { en: ToBringSection[]; hu: ToBringSection[] } = {
  en: [
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
            decathlonLink(false),
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
  ],
  hu: [
    {
      title: "Hátizsák",
      items: [
        "28–32 L, ha külön kameratáskád van (csípőtáska, oldaltáska)",
        "35–45 L, ha a hátizsákon belül dedikált helyre van szükséged a kamerának (pl. kamerabetéttel)",
      ],
    },
    {
      title: "Fotós felszerelés",
      items: [
        "Kameratáska vagy párnázott kamerabetét (a fényképezőgép hordozásához/védelméhez a hátizsákban)",
        "Fényképezőgép – bármilyen gép megfelel, amíg teljes manuális vezérléssel rendelkezik és RAW-ban fotóz.",
        {
          text: "Objektívek",
          sub: [
            "Legalább 24mm-es (APS-C: 16mm) nagylátószögű objektív",
            "Kb. 70–200mm-t (APS-C: 45–140mm) lefedő objektív",
            "Opcionális: 28–50mm-es (APS-C: 18–35mm) normál/közepes fókusztávolság – remek panorámaszakaszok fotózásához",
            "Opcionális: 14–24mm-es (APS-C: 9–16mm) objektív kb. f/1,4–2,8 rekesznyílással asztrofotózáshoz",
          ],
        },
        "SD kártyák (hozz tartalékot)",
        "Akkumulátorok (hozz tartalék akkumulátorokat)",
        "Állvány (van 2–3 kisebb/nagyobb állványom kölcsönözhető)",
        "CPL szűrő (cirkuláris polarizációs szűrő)",
        "Esővédő a kamerához (pl. Peak Design Shell)",
        "Mikroszálas kendő (por és eső letörléséhez)",
        "Távkioldó – különösen hasznos a precíz Tejút-fotózáshoz",
        "Drón: szívesen látjuk, ha hozol egyet – kérlek olvasd el a részleteket az oldal alján!",
      ],
    },
    {
      title: "Ruházat",
      intro:
        "A völgyben napközben 24–28°C is lehet, míg a hegyekben éjszaka akár 3–5°C-ra is lehűlhet. A rétegezés elengedhetetlen!",
      items: [
        "Alsóréteg (mikroszálas vagy merinó, 2–3 szett; mindig tarts egy tartalék szettet a hátizsákodban)",
        "Polár dzseki/pulóver (2 db; egy elég minden túrára)",
        "Nadrág (2 pár, lehetőleg gyorsan száradó)",
        "Szigetelt dzseki (pufidzseki – éjszakai fotózáshoz vagy egy nedves polár helyettesítésére)",
        "Esőkabát vagy poncsó (a poncsó kevésbé praktikus, de nem kell új kabátot venned csak erre az útra)",
        "Meleg sapka (egy egyszerű vékony is megfelel hideg estékre; a pufidzseki kapucnija is helyettesítheti)",
        "Baseballsapka vagy napkalap (UV-védelem – segít megelőzni a napszúrást)",
        "Sál vagy nyakmelegítő (a cső formájú változat előnyösebb, pl. Buff vagy Decathlon)",
        {
          text: "Zokni (3–4 pár, lehetőleg legalább 30% merinó)",
          note: "Mindig tarts egy tartalék párat a hátizsákodban, hogy elkerüld a hideg lábfejet és a felhólyagosodást.",
        },
        {
          text: "Túrabakancs vagy -cipő (vízálló, magas szárú bakancs ajánlott, bár az alacsony szárú cipő is megfelel, ha kényelmesebbnek találod)",
          sub: [
            "Ajánlott típusok: Trekkingbakancs, túracipő, hegymászóbakancs, approach cipő",
            "Ajánlott kategóriák: A/B, B, B/C (a standard A-kategóriás cipők nem biztos, hogy elég strapabíróak; a C és D kategória hegymászásra tervezett)",
            decathlonLink(true),
            "A Gore-Tex előnyös vízállóság és lélegzőképesség szempontjából, de a drágább kategóriába tartozik",
            "A Vibram talpas modellek a legjobbak közé tartoznak, de ismét, hajlamosak drágábbak lenni",
            "Ha nem tervezel rendszeresen túrázni, nem kell vagyonokat költened lábbelire",
            "Válassz ½–1 számmal nagyobbat, mint a szokásos utcai cipőméreted, mivel a lábad hosszú gyaloglás közben megduzzad.",
          ],
        },
      ],
      note:
        "Nem kell mindent egyszerre magaddal cipelned. Több alkalommal is lesz lehetőség a felszerelés újrarendezésére az autónál.",
    },
    {
      title: "Étel és ital",
      items: [
        "Kulacs vagy ivózsák: 1,5–2 liter",
        "Snackek: energiaszelet, fehérjeszelet, magvak, diófélék, aszalt/friss gyümölcs stb.",
      ],
    },
    {
      title: "Egyéb felszerelés",
      items: [
        "Túrabot (legalább 1 db ajánlott; tudok kölcsönözni 2–3 párat)",
        {
          text: "Hálózsákbetét: kötelező a menedékházban alváshoz (mikroszálas vagy selyem; kicsi és könnyű)",
          note: "Nagy hálózsákra nincs szükség.",
        },
        "Dry sack – kompressziós zsák/huzat a ruhák összepréseléséhez és esőtől való védelméhez (pl. egy 12–20 literes Forclaz modell a Decathlonból, de egy egyszerű nejlon/műanyag zsák is megteszi olcsóbb alternatívaként)",
        "Fényvédő krém (SPF 50/50+)",
        "Ajakápoló (nagyon hasznos szeles körülmények között)",
        "Füldugó alváshoz",
        "Alvómaszk",
        "Power bank és/vagy telefontöltő",
      ],
    },
    {
      title: "Higiénia",
      items: [
        "Személyes tisztálkodószerek",
        "Fogkefe és fogkrém",
        "Tusfürdő",
        "Kis mikroszálas törölköző (kb. 60–120 cm hosszú)",
      ],
    },
    {
      title: "Gyógyszerek",
      items: [
        "Izom-/fájdalomcsillapító gél – pl. diklofenak tartalmú",
        "Sebtapasz és/vagy hólyagtapasz",
        "Térdrögzítő – ha ismert térdproblémád van",
        {
          text: "Diamox alapú gyógyszer (acetazolamid), ha valaki tart a magassági betegségtől",
          note: "Sajnos ezt nem tudom biztosítani, mivel Németországban nehezen szerezhető be, még receptre is.",
        },
      ],
      note:
        "Mindig van nálam elsősegélycsomag; reméljük nem lesz rá szükség, de jobb, ha készen állunk. Izomgörcsökre instant magnéziumot is tartok.",
    },
  ],
};
