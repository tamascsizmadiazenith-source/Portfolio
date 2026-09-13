"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  difficultyLevels,
  gradeExamples,
  clothingStrategies,
  layeringBasics,
  layeringExamples,
  backpackLoading,
  backpackFit,
  poleBenefits,
  poleUsage,
} from "./content";

export default function HikingBasicsPage() {
  const { locale } = useLanguage();
  const hu = locale === "hu";

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">{hu ? "Segédlet" : "Reference"}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            {hu ? "Túrázási alapismeretek" : "Hiking Basic Knowledge"}
          </h1>

          {/* Table of contents */}
          <nav className="mt-10 rounded-[28px] border border-white/10 bg-[#11131A] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">{hu ? "Tartalomjegyzék" : "Table of contents"}</p>
            <ul className="mt-4 space-y-2 text-base text-white/80">
              <li><a href="#difficulty" className="hover:text-[#D4AF37]">{hu ? "Nehézségi szintek" : "Difficulty levels"}</a></li>
              <li><a href="#clothing" className="hover:text-[#D4AF37]">{hu ? "Ruházat" : "Clothing"}</a></li>
              <li><a href="#backpack" className="hover:text-[#D4AF37]">{hu ? "A hátizsák csomagolása és viselése" : "Packing and wearing your backpack"}</a></li>
              <li><a href="#poles" className="hover:text-[#D4AF37]">{hu ? "A túrabot helyes használata" : "Using trekking poles"}</a></li>
            </ul>
          </nav>

          {/* Difficulty levels */}
          <h2 id="difficulty" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Nehézségi szintek" : "Difficulty levels"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">
            {hu
              ? "A hegyi és alpesi túrákat általában T1–T6 skálán osztályozzák, amely az útvonal állapotát, az exponáltságot és a szükséges tapasztalatot írja le."
              : "Mountain and alpine hikes are commonly graded T1–T6, a scale describing trail condition, exposure and the experience required."}
          </p>
          <div className="mt-8 space-y-6">
            {difficultyLevels[locale].map((level) => (
              <div key={level.grade} className="rounded-[28px] border border-white/10 bg-[#11131A] p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">{level.grade}</span>
                  <h3 className="text-xl font-semibold text-white">{level.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">{hu ? "Jelölés" : "Marker"}: {level.marker}</span>
                </div>
                <p className="mt-3 text-base leading-7 text-white/72"><strong className="text-white">{hu ? "Útvonal/terep" : "Trail/terrain"}:</strong> {level.terrain}</p>
                <p className="mt-2 text-base leading-7 text-white/72"><strong className="text-white">{hu ? "Követelmények" : "Requirements"}:</strong> {level.requirements}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">{hu ? "Példák" : "Examples"}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-7 text-white/72">
              {gradeExamples[locale].map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>

          {/* Clothing */}
          <h2 id="clothing" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "Ruházat" : "Clothing"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">
            {hu ? "Tartsd szem előtt ezeket a stratégiákat az ideális túraöltözet összeállításakor:" : "Keep these strategies in mind when putting together the ideal hiking outfit:"}
          </p>
          <div className="mt-6 space-y-6">
            {clothingStrategies[locale].map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/72">{item.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "A rétegezés alapjai" : "Layering basics"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "Ahhoz, hogy megértsd, hogyan rétegezd a ruházatod szabadtéri tevékenységekhez, érdemes ismerni az egyes rétegek funkcióját:"
              : "To understand how to layer clothing for outdoor activities, it helps to know the function of each layer:"}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {layeringBasics[locale].map((layer) => (
              <li key={layer.name}><strong className="text-white">{layer.name}:</strong> {layer.text}</li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-7 text-white/72">
            {hu
              ? "Még ha nem is veszed fel mind a három réteget indulásnál, érdemes mindig magaddal vinni őket — egy réteget levehetsz, ha melegebb lesz, de olyat, amit nem hoztál magaddal, nem tudsz felvenni."
              : "Even if you don't wear all three layers at the start, it's worth bringing them along every time — you can take a layer off if you get warm, but you can't put on layers you didn't bring."}
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "Rétegezési példák hideg, esős és meleg időre" : "Layering examples for cold, rainy and hot weather"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "Gyakran kérdezik tőlünk, hogyan rétegezzünk adott időjárási körülmények között. Az időjárás alapú javaslatok figyelmen kívül hagyhatnak olyan fontos tényezőket, mint az aktivitási szint és a személyes anyagcsere, de az alábbi példák egy olyan hipotetikus személyre illenek, aki nem fázik és nem is melegszik különösebben, és egy közepes féltúrás gyalogtúrára indul:"
              : "We're often asked how to layer for specific weather conditions. Weather-based suggestions can ignore important factors like activity level and personal metabolism, but the examples below suit a hypothetical person who doesn't run especially hot or cold, heading out on a moderate half-day hike:"}
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-white/72">
            {layeringExamples[locale].map((example) => (
              <li key={example.weather}><strong className="text-white">{example.weather}:</strong> {example.text}</li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-7 text-white/72">
            {hu
              ? "Minden réteghez több tucat alternatíva közül választhatsz — a lényeg, hogy olyan opciókat válassz, amelyek leginkább illenek az úti célodhoz, a tevékenységedhez és a költségvetésedhez. Szánj időt a rétegek igazítására, ahogy a körülmények változnak: vedd le a héjréteget, amint eláll az eső és a szél, adj hozzá egy középréteget, ha maga a gyaloglás nem tart eléggé melegen, és sokan a pihenőknél vesznek fel egy közép- és/vagy külső réteget, hogy ne hűljenek le."
              : "For every layer you can choose from dozens of alternatives — the key is to pick options that best suit your destination, activity and budget. Take time to adjust your layers as conditions change: shed the shell once rain and wind stop, add a mid layer if the hiking itself isn't keeping you warm enough, and many people put on a mid and/or outer layer at rest stops to avoid cooling down."}
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "Alsóréteg: nedvességkezelés" : "Base layer: moisture management"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "Az alsóréteg, amelyet közvetlenül a bőrödön viselsz, elvezeti a verejtéket a testedről — ezt hívjuk „wickingnek”. Hűvös vagy hideg időben a nedvességelvezető alsóréteg elengedhetetlen ahhoz, hogy a bőröd száraz maradjon, ami segít megelőzni a lehűlést vagy rosszabb esetben a hipotermiát. Gyakori anyagok a szintetikus poliészter és nejlon, vagy a természetes szálak, mint a merinó gyapjú és a selyem; mindegyik kicsit másképp teljesít nedvességelvezetésben, száradási sebességben, szagállóságban és tartósságban, így gyakran a személyes preferencia dönt. A súlyuk jellemzően könnyűtől nehézig terjed (néha „ultralight” vagy „expedíciós” súlyig) — a nehezebb anyagok általában melegebbek, bár a melegen tartás nem az alsóréteg elsődleges feladata. Meleg időben a hosszú alsónemű nem hangzik vonzónak, de a száraz bőr bármilyen körülmények között kényelmesebb; keress nedvességelvezető nyári pólókat, és vedd figyelembe, hogy a télen kerülendő pamut egy szuper száraz, meleg nyári napon megfelelő lehet."
              : "The base layer, worn directly against your skin, moves sweat away from your body — also called \"wicking\". In cool or cold weather, moisture-wicking base layers are essential to keep your skin dry, which helps prevent chills or, worse, hypothermia. Common fabrics include synthetics like polyester and nylon, or natural fibers like merino wool and silk; each differs slightly in wicking, drying speed, odor resistance and durability, so personal preference often decides. Weights typically range from lightweight to heavyweight (sometimes even \"ultralight\" or \"expedition weight\") — heavier fabrics tend to run warmer, though warmth isn't the base layer's primary job. In hot weather, long underwear may not sound appealing, but dry skin is more comfortable in any conditions; look for summer shirts that wick moisture, and note that cotton, best avoided in winter, can be fine on a super dry, hot summer day."}
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "Középréteg: szigetelés" : "Mid layer: insulation"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "A szigetelő középréteg segít megtartani a tested által termelt hőt — minél hatékonyabban zárja be azt a hőt, annál melegebben leszel. Az alsórétegekhez hasonlóan itt is széles a szintetikus és természetes anyagok választéka; a vastagabb vagy pihésebb rétegek általában melegebbek, bár a szigetelés hatékonysága is számít. Gyakori választás a poliészter polár (könnyű, közepes és nehéz súlyú — gyakran 100-as, 200-as és 300-as súlyként hirdetve), amely nedvesen is melegen tart, gyorsan szárad és jól szellőzik, bár a szél átfújhat rajta, ezért felette héjrétegre van szükség; a pihdzsekik, amelyek jól összenyomhatók könnyű csomagolás céljából, és a legjobb melegség/súly arányt nyújtják (a kitöltési erő, azaz fill power alapján, nagyjából 450–900 között), bár a pihe nedvesen elveszti szigetelő képességét; és a szintetikus szigetelésű dzsekik, amelyek nem nyomhatók össze olyan jól, mint a pihe, de nedvesen is szigetelnek, ezért esős körülmények között népszerű választás."
              : "The insulating mid layer helps retain the heat your body generates — the more effectively it traps that heat, the warmer you'll be. As with base layers, there's a wide range of synthetic and natural materials; thicker or puffier layers are generally warmer, though the efficiency of the insulation matters too. Common choices include polyester fleece (light, mid and heavyweight — often marketed as 100, 200 and 300 weight), which stays warm even when wet and dries quickly and breathes well, though wind can cut through it, so a shell layer is needed on top; down jackets, which compress well for easy packing and offer the best warmth-to-weight ratio (rated by fill power, roughly 450–900), though down loses its insulating power when wet; and synthetic insulated jackets, which don't compress as well as down but keep insulating even when wet, making them a popular choice in rainy conditions."}
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "Külső réteg: eső- és szélvédelem" : "Outer layer: rain and wind protection"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "A külső réteg (vagy héj) véd a széltől, esőtől és hótól, a nagy teljesítményű hegymászó dzsekiktől az egyszerű szélkabátokig terjedő skálán. A legtöbb legalább némi verejték elpárolgását engedi, és tartós vízlepergető (DWR) bevonattal rendelkezik, amely lepergeti a vizet a felületről. A héj kritikus fontosságú viharos időben, mivel a belső rétegeidet érő szél és víz gyorsan komoly lehűlést okozhat. A héjak jellemzően néhány kategóriába sorolhatók: vízálló/lélegző dzsekik, a legfunkcionálisabb (és legdrágább) választás, viharos körülményekhez a legjobb, a drágább modellek általában szárazabban tartanak és tovább kitartanak; vízlepergető/lélegző dzsekik, amelyek inkább szitáló esőhöz, szélhez és magas aktivitási szinthez illenek, olcsóbbak, jellemzően szorosan szőtt nejlonból vagy poliészterből készülnek, amely blokkolja az enyhe szelet és esőt; softshell dzsekik, amelyek a lélegzőképességet helyezik előtérbe, gyakran rugalmas anyagokat kombinálva enyhe eső- és szélvédelemmel, valamint némi szigeteléssel, két réteget egyesítve egybe; és vízálló/nem lélegző héjak, alapvető héjak esős, kevés mozgással járó napokra (pl. horgászat vagy városnézés), jellemzően bevonatos nejlonból, amely víz- és szélálló, de ha megerőlteted magad benne, a belső rétegeid nedvesek maradnak a verejtéktől."
              : "The outer layer (or shell) protects you from wind, rain and snow, ranging from high-performance mountaineering jackets to simple windbreakers. Most allow at least some sweat to evaporate and carry a durable water-repellent (DWR) coating that beads water off the fabric surface. The shell is critical in stormy weather, since wind and water reaching your inner layers can quickly cause serious chilling. Shells generally fall into a few categories: waterproof/breathable jackets, the most functional (and most expensive) choice, best for stormy conditions, with pricier models usually keeping you drier and lasting longer; water-resistant/breathable jackets, better suited to drizzle, wind and high activity levels, cheaper and typically made from tightly-woven nylon or polyester that blocks light wind and rain; softshell jackets, which prioritize breathability, often combining stretch fabrics with light rain and wind protection plus mild insulation, effectively merging two layers into one; and waterproof/non-breathable shells, basic shells suited to rainy days with little or no activity (e.g. fishing or sightseeing), typically coated nylon that's water- and windproof but will leave your inner layers damp with sweat if you exert yourself while wearing one."}
          </p>

          {/* Backpack */}
          <h2 id="backpack" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "A hátizsák csomagolása és viselése" : "Packing and wearing your backpack"}
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-white">{hu ? "Csomagolj okosan" : "Pack smart"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu ? "Valójában két fontos szabály van a hátizsák csomagolásakor:" : "There are really two important rules when packing a backpack:"}
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/72">
            <li>{hu ? "A legnehezebb tárgyakat tartsd a hátad közepéhez legközelebb." : "Keep the heaviest items closest to the center of your back."}</li>
            <li>{hu ? "A túra közben sürgősen szükséges tárgyakat tartsd könnyen elérhető helyen." : "Keep items you'll need urgently during the hike within easy reach."}</li>
          </ol>
          <p className="mt-4 text-base leading-7 text-white/72">
            {hu
              ? "Miért számít ez? Egy rosszul csomagolt hátizsák egyenetlenül osztja el a súlyt: a hátizsák súlypontja (bárhol is vannak a legnehezebb tárgyak) messze kerül a tested súlypontjától (a hátad közepétől). Ez folyamatosan kibillent az egyensúlyból, extra fáradtságot okozva — egy fáradt test pedig, amely veszélyes terepen veszíti el az egyensúlyát, valóban életveszélyes helyzetté válhat."
              : "Why does this matter? A poorly packed backpack distributes weight badly: the pack's center of gravity (wherever the heaviest items sit) ends up far from your body's center of gravity (the middle of your back). This constantly pulls you off balance, causing extra fatigue — and a tired body losing its balance on dangerous terrain can turn into a genuinely life-threatening situation."}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {backpackLoading[locale].map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <h3 className="mt-12 text-xl font-semibold text-white">{hu ? "Ennyi pánt és csat — mire valók?" : "So many straps and buckles — what are they for?"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "A kezdő túrázók gyakran belegabalyodnak az összes pántba, vagy megpróbálják figyelmen kívül hagyni őket, feltételezve, hogy bármelyik hátizsák elég jól illeszkedik, és hogy egy rövid sétához nem éri meg beállítani. A tapasztalt túrázók tudják, hogy egy megfelelően illesztett és beállított hátizsák sok felesleges fáradtságtól kímél meg. Egy tipikus modern túrahátizsáknak 2 pár pántja és 2 pár állítható csatja van:"
              : "Beginner hikers often get tangled in all the straps, or try to ignore them, assuming any backpack will fit well enough and that adjusting it isn't worth the effort for a short walk. Experienced hikers know that a properly fitted and adjusted backpack saves a lot of unnecessary fatigue. A typical modern hiking backpack has 2 pairs of straps and 2 pairs of adjustable buckles:"}
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/72">
            {backpackFit[locale].map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          {/* Trekking poles */}
          <h2 id="poles" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            {hu ? "A túrabot helyes használata" : "Using trekking poles correctly"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">{hu ? "A túrabot sokféleképpen hasznos társ — a bot:" : "A trekking pole is a helpful companion in several ways — it:"}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {poleBenefits[locale].map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>

          <h3 className="mt-10 text-xl font-semibold text-white">{hu ? "A hossz beállítása" : "Adjusting the length"}</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "Fogd meg a botot ellazított vállal és derékszögben behajlított könyökkel — ez az ideális kézmagasság, ehhez igazítsd a bot hosszát. Néhány botnak fix hossza van (főleg a sí- és tájfutóbotoknak); ha ilyet választasz, vegyél olyat, amely eleve a megfelelő hosszúságú, bár ezek kevésbé alkalmasak gyalog- és trekkingtúrákhoz."
              : "Grip the pole with your shoulder relaxed and your elbow at a right angle — that's the ideal hand height, so adjust the pole length to match. Some poles have a fixed length (mostly ski and orienteering poles); if so, buy one already at the right length, though these are less suited to hiking and trekking."}
          </p>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "A botok anyaga jellemzően hagyományos fa, alumínium vagy karbon (karbonszálas epoxi kompozit). A hagyományos fa botok elég nehezek és nem túl praktikusak, de szükség esetén jobbak a semminél. Az alumínium botok megfizethető árúak, és tökéletesen megfelelnek az átlagos túrázónak. A karbon botok befektetést jelentenek a hobbiba — könnyebbek és jobban elnyelik a rezgést, de mélyebben a zsebedbe kell nyúlnod az üzletben."
              : "Pole materials are typically traditional wood, aluminum, or carbon (carbon-fiber epoxy composite). Traditional wood poles are fairly heavy and not very practical, but better than nothing in a pinch. Aluminum poles are affordably priced and perfectly fine for the average hiker. Carbon poles are an investment in the hobby — lighter and better at absorbing vibration, but you'll need to dig deeper into your pocket at the shop."}
          </p>
          <p className="mt-3 text-base leading-7 text-white/72">
            {hu
              ? "A fix hosszúságú botokon kívül léteznek összecsukható és teleszkópos változatok is: a teleszkópos botok jobban bírják a terhelést, míg az összecsukhatók kisebbre pakolhatók — igazából ízlés kérdése."
              : "Beyond fixed-length poles, there are also folding and telescopic versions: telescopic poles handle load better, while folding poles pack smaller — really a matter of personal preference."}
          </p>

          <h3 className="mt-10 text-xl font-semibold text-white">{hu ? "Hogyan használd az ösvényen" : "How to use it on the trail"}</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {poleUsage[locale].map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-white/40">
            {hu ? "Forrás a ruházati fejezetekhez: Rei.com" : "Source for the clothing chapters: Rei.com"}
          </p>

          <div className="mt-16 flex justify-center">
            <Link
              href="/photo-tours"
              className="rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A0C10] transition hover:bg-[#e2c15a]"
            >
              {hu ? "Vissza a fotós túrákhoz" : "Back to Photo Tours"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
