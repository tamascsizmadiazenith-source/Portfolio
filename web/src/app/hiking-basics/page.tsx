import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const difficultyLevels = [
  {
    grade: "T1",
    title: "Easy hike",
    marker: "Yellow",
    terrain:
      "Well-maintained path. Exposed sections, if any, are very well secured. Under normal behavior, the risk of falling can largely be ruled out.",
    requirements: "None — can be done even in sneakers. Route-finding is simple, usually possible without a map.",
  },
  {
    grade: "T2",
    title: "Easy mountain hike",
    marker: "White-red-white",
    terrain:
      "Continuous trail. The terrain is partly steep; the risk of falling cannot be fully excluded.",
    requirements: "Some surefootedness. Trekking shoes recommended. Basic orientation skills.",
  },
  {
    grade: "T3",
    title: "Challenging mountain hike",
    marker: "White-red-white",
    terrain:
      "The route may not always be visible on the ground. Exposed sections may be secured with ropes or chains. Hands may occasionally be needed for balance — partly exposed spots with fall risk, scree slopes, rocky terrain without a path.",
    requirements: "Good surefootedness. Good trekking shoes. Average orientation skills. Basic alpine experience.",
  },
  {
    grade: "T4",
    title: "Alpine hike",
    marker: "White-blue-white",
    terrain:
      "Trail traces may not always be visible. Hands are needed for progress on certain sections. The terrain is already quite exposed — difficult grassy slopes, rocks, simple snowfields and bare glacier crossings.",
    requirements:
      "Familiarity with exposed terrain. Sturdy trekking shoes. Some terrain-assessment and good orientation skills. Alpine experience. Retreat can be difficult if the weather changes suddenly.",
  },
  {
    grade: "T5",
    title: "Challenging alpine hike",
    marker: "White-blue-white",
    terrain:
      "Often without a path. Individual simple climbing spots. Exposed, difficult terrain, steep rocks. Bare glaciers and snowfields with slipping risk.",
    requirements:
      "Mountain boots. Reliable terrain-assessment and very good orientation skills. Good alpine experience and knowledge of high-mountain terrain. Basic knowledge of ice axe and rope use.",
  },
  {
    grade: "T6",
    title: "Difficult alpine hike",
    marker: "Mostly unmarked",
    terrain:
      "Mostly without a path. Climbing spots up to grade II. Often very exposed. Difficult rocky terrain. Bare glaciers with increased slipping risk.",
    requirements:
      "Excellent orientation skills. Mature alpine experience and knowledge of using alpine technical aids.",
  },
];

const gradeExamples = [
  "T1 — the trail to Seealpsee",
  "T2 — the terrain to the Plauener Hütte",
  "T3 — the terrain around the Olperer Hütte",
  "T4 — the terrain up to the Entschenkopf",
  "T5 — the terrain up to the Hundstein",
];

const clothingStrategies = [
  {
    title: "Layer your clothing",
    text: "In this well-proven strategy every clothing layer has a specific function, and you can add or remove them as the weather changes. Start with a moisture-wicking base layer directly on your skin, then add an insulating mid layer and a waterproof outer layer, such as a rain jacket, so you're prepared for anything.",
  },
  {
    title: "Choose polyester, nylon or merino wool base layers",
    text: "Unlike cotton, these moisture-wicking fabrics move sweat away from your skin quickly and dry fast, making them ideal as a base layer for underwear, sports bras, t-shirts, long-sleeve tops and socks. Merino socks stay warm in winter and breathe well in summer, and moisture-wicking reduces the risk of blisters.",
  },
  {
    title: "Focus on function first (and only then on style)",
    text: "Nobody looks good if they feel bad. Fortunately today's brands focus on comfort and technical performance as well as looks — just make sure whatever you choose is up to the task.",
  },
  {
    title: "Prepare for the weather",
    text: "Dressing appropriately for the weather has a direct effect on your comfort and safety. Forecasts can be wrong or change, and elevation changes can also alter the weather, so be prepared for it to turn colder, wetter, snowier or warmer than expected. Wear or pack layers accordingly, and remember you'll also need different gear across the seasons — think of a warm wool hat and gloves for a winter hike, or a brimmed sun hat for a summer one.",
  },
  {
    title: "Know the terrain",
    text: "If you'll be hiking through brushy forests, tall grass or wooded areas, consider long sleeves, pants, built-in insect repellent clothing or bug netting to protect against ticks, mosquitoes and other pests. In the desert, higher-cut hiking boots can offer extra protection. For urban hikes, you may want more versatile, stylish clothing so you can switch quickly between the city and nature.",
  },
];

const layeringBasics = [
  { name: "Base layer (next-to-skin layer)", text: "moves sweat away from your skin" },
  { name: "Mid layer (insulating layer)", text: "retains body heat to keep you warm" },
  { name: "Outer layer (shell)", text: "protects you against wind and rain" },
];

const layeringExamples = [
  {
    weather: "Cold weather layers",
    text: "Medium-weight polyester base layer top and bottom; synthetic-insulated jacket; medium-weight fleece pants; waterproof/breathable rain jacket and pants.",
  },
  {
    weather: "Rainy weather layers (cool temperatures)",
    text: "Lightweight polyester base layer top and bottom; light fleece jacket; synthetic hiking pants; lightweight waterproof/breathable rain jacket and pants (with plenty of venting).",
  },
  {
    weather: "Hot weather layers",
    text: "Polyester underwear and a short-sleeve synthetic shirt; convertible nylon hiking pants; a light windbreaker.",
  },
];

const backpackLoading = [
  "Bulky but relatively light items, such as a sleeping bag (or just a liner), go at the bottom of the pack — it's usually only needed at the end of the day. Pack it, along with your spare clothes, into a waterproof dry sack, compress it, and place it at the bottom.",
  "If cold or rainy weather is expected, keep your power bank in the same dry sack so it stays dry and the clothes keep it warm.",
  "If your pack has a separate, easily reachable lower compartment, that's a good place for your puffy jacket and/or rain jacket — instantly accessible without weighing the pack down.",
  "Camera gear is often the heaviest item for photographers on a hike — keep it in a camera cube close to your back, around the middle of the pack, so it throws you off balance as little as possible.",
  "If you carry water in a bladder rather than a bottle, the roughly 2 kg of liquid also belongs close to your back, in the compartment designed for it. A bottle can go in the side pockets, though that's less ideal for weight distribution.",
  "Light but frequently needed items — hat, gloves, cap, headlamp, sunglasses — belong in the top pocket or outer mesh pockets: they weigh little but need quick access. Mesh/elastic pockets are also great for airing out wet clothes on the move so they dry faster.",
  "Never pack the first-aid kit at the bottom — you never know when you'll need it, and emptying the whole pack in an emergency is not an option.",
  "Small items like a knife, energy bars, a microfiber cloth and tissues are best kept in the hip-belt pockets, reachable even while walking.",
];

const backpackFit = [
  "Lift the pack onto your back with loosened straps. If it's a heavy trekking pack, resting it on one knee first reduces the lift — slide one arm through the shoulder strap, hold the top handle with the other hand, and help lift it into place.",
  "Once it's on your back, pull down both shoulder straps (the ones under your arms) until the pack no longer rests on your backside. The pack's center of gravity should align with the center of your back.",
  "Buckle and tighten the hip belt: it shouldn't squeeze your lunch, but it should feel noticeably snug — this takes a significant load off your shoulders.",
  "Buckle the chest strap: roughly mid-chest for men, around the breastbone for women. It doesn't need to be very tight, just enough that the pack can't swing sideways on your back, reducing the risk of losing your balance.",
  "Load-lifter straps (the small straps over your shoulders): pull the top of the pack closer to the shoulder straps, and so closer to your body. Tighten until it's noticeably closer to your center of mass without being uncomfortable — this adds stability and further reduces the risk of being thrown off balance.",
];

const poleBenefits = [
  "takes load off your legs while walking, especially helpful on ascents",
  "increases cardio effort through more varied movement",
  "gives you something to lean on if you stumble",
  "adds safety when descending a slope",
  "reduces slipping risk on old snow, and can even be used to check snow depth",
];

const poleUsage = [
  "On flat terrain or a gentle incline: use it opposite to your feet, so diagonally you always have two stable points, front and back.",
  "On a steep ascent: plant both poles ahead of you at once, so you can pull yourself up with both arms and take significant load off your legs.",
  "On a steep descent: plant both poles ahead of you at once, leaning on them protects your knees, and if you slip or stumble, two poles add stability.",
  "Traversing a steep slope: plant the pole into the ground at a 30–45° angle to lean on, helping if you slip or stumble. Even without planting it, keep the pole on the uphill side, never the downhill/ravine side — if you slide towards the drop, you'll have something to hold onto instead of sliding down together with the pole.",
  "With a single pole: everything works the same, just with less assistance — plus a bonus sense of being a wizard with a staff. On an ascent keep the pole on the side opposite your leading leg; on a descent, keep it on the same side, so you can lean on it as you lower your weight onto the downhill leg in case of a slip.",
];

export default function HikingBasicsPage() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Reference</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Hiking Basic Knowledge
          </h1>

          {/* Table of contents */}
          <nav className="mt-10 rounded-[28px] border border-white/10 bg-[#11131A] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Table of contents</p>
            <ul className="mt-4 space-y-2 text-base text-white/80">
              <li><a href="#difficulty" className="hover:text-[#D4AF37]">Difficulty levels</a></li>
              <li><a href="#clothing" className="hover:text-[#D4AF37]">Clothing</a></li>
              <li><a href="#backpack" className="hover:text-[#D4AF37]">Packing and wearing your backpack</a></li>
              <li><a href="#poles" className="hover:text-[#D4AF37]">Using trekking poles</a></li>
            </ul>
          </nav>

          {/* Difficulty levels */}
          <h2 id="difficulty" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Difficulty levels
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">
            Mountain and alpine hikes are commonly graded T1–T6, a scale describing trail
            condition, exposure and the experience required.
          </p>
          <div className="mt-8 space-y-6">
            {difficultyLevels.map((level) => (
              <div key={level.grade} className="rounded-[28px] border border-white/10 bg-[#11131A] p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">{level.grade}</span>
                  <h3 className="text-xl font-semibold text-white">{level.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">Marker: {level.marker}</span>
                </div>
                <p className="mt-3 text-base leading-7 text-white/72"><strong className="text-white">Trail/terrain:</strong> {level.terrain}</p>
                <p className="mt-2 text-base leading-7 text-white/72"><strong className="text-white">Requirements:</strong> {level.requirements}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Examples</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-7 text-white/72">
              {gradeExamples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>

          {/* Clothing */}
          <h2 id="clothing" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Clothing
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">
            Keep these strategies in mind when putting together the ideal hiking outfit:
          </p>
          <div className="mt-6 space-y-6">
            {clothingStrategies.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/72">{item.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-xl font-semibold text-white">Layering basics</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            To understand how to layer clothing for outdoor activities, it helps to know the
            function of each layer:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {layeringBasics.map((layer) => (
              <li key={layer.name}><strong className="text-white">{layer.name}:</strong> {layer.text}</li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-7 text-white/72">
            Even if you don&apos;t wear all three layers at the start, it&apos;s worth bringing
            them along every time — you can take a layer off if you get warm, but you can&apos;t
            put on layers you didn&apos;t bring.
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">Layering examples for cold, rainy and hot weather</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            We&apos;re often asked how to layer for specific weather conditions. Weather-based
            suggestions can ignore important factors like activity level and personal metabolism,
            but the examples below suit a hypothetical person who doesn&apos;t run especially hot
            or cold, heading out on a moderate half-day hike:
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-white/72">
            {layeringExamples.map((example) => (
              <li key={example.weather}><strong className="text-white">{example.weather}:</strong> {example.text}</li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-7 text-white/72">
            For every layer you can choose from dozens of alternatives — the key is to pick
            options that best suit your destination, activity and budget. Take time to adjust
            your layers as conditions change: shed the shell once rain and wind stop, add a mid
            layer if the hiking itself isn&apos;t keeping you warm enough, and many people put on
            a mid and/or outer layer at rest stops to avoid cooling down.
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">Base layer: moisture management</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            The base layer, worn directly against your skin, moves sweat away from your body —
            also called &quot;wicking&quot;. In cool or cold weather, moisture-wicking base layers
            are essential to keep your skin dry, which helps prevent chills or, worse, hypothermia.
            Common fabrics include synthetics like polyester and nylon, or natural fibers like
            merino wool and silk; each differs slightly in wicking, drying speed, odor resistance
            and durability, so personal preference often decides. Weights typically range from
            lightweight to heavyweight (sometimes even &quot;ultralight&quot; or &quot;expedition
            weight&quot;) — heavier fabrics tend to run warmer, though warmth isn&apos;t the base
            layer&apos;s primary job. In hot weather, long underwear may not sound appealing, but
            dry skin is more comfortable in any conditions; look for summer shirts that wick
            moisture, and note that cotton, best avoided in winter, can be fine on a super dry, hot
            summer day.
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">Mid layer: insulation</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            The insulating mid layer helps retain the heat your body generates — the more
            effectively it traps that heat, the warmer you&apos;ll be. As with base layers, there&apos;s
            a wide range of synthetic and natural materials; thicker or puffier layers are
            generally warmer, though the efficiency of the insulation matters too. Common choices
            include polyester fleece (light, mid and heavyweight — often marketed as 100, 200 and
            300 weight), which stays warm even when wet and dries quickly and breathes well, though
            wind can cut through it, so a shell layer is needed on top; down jackets, which
            compress well for easy packing and offer the best warmth-to-weight ratio (rated by fill
            power, roughly 450–900), though down loses its insulating power when wet; and synthetic
            insulated jackets, which don&apos;t compress as well as down but keep insulating even
            when wet, making them a popular choice in rainy conditions.
          </p>

          <h3 className="mt-12 text-xl font-semibold text-white">Outer layer: rain and wind protection</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            The outer layer (or shell) protects you from wind, rain and snow, ranging from
            high-performance mountaineering jackets to simple windbreakers. Most allow at least
            some sweat to evaporate and carry a durable water-repellent (DWR) coating that beads
            water off the fabric surface. The shell is critical in stormy weather, since wind and
            water reaching your inner layers can quickly cause serious chilling. Shells generally
            fall into a few categories: waterproof/breathable jackets, the most functional (and
            most expensive) choice, best for stormy conditions, with pricier models usually keeping
            you drier and lasting longer; water-resistant/breathable jackets, better suited to
            drizzle, wind and high activity levels, cheaper and typically made from tightly-woven
            nylon or polyester that blocks light wind and rain; softshell jackets, which prioritize
            breathability, often combining stretch fabrics with light rain and wind protection plus
            mild insulation, effectively merging two layers into one; and waterproof/non-breathable
            shells, basic shells suited to rainy days with little or no activity (e.g. fishing or
            sightseeing), typically coated nylon that&apos;s water- and windproof but will leave
            your inner layers damp with sweat if you exert yourself while wearing one.
          </p>

          {/* Backpack */}
          <h2 id="backpack" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Packing and wearing your backpack
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-white">Pack smart</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            There are really two important rules when packing a backpack:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/72">
            <li>Keep the heaviest items closest to the center of your back.</li>
            <li>Keep items you&apos;ll need urgently during the hike within easy reach.</li>
          </ol>
          <p className="mt-4 text-base leading-7 text-white/72">
            Why does this matter? A poorly packed backpack distributes weight badly: the pack&apos;s
            center of gravity (wherever the heaviest items sit) ends up far from your body&apos;s
            center of gravity (the middle of your back). This constantly pulls you off balance,
            causing extra fatigue — and a tired body losing its balance on dangerous terrain can
            turn into a genuinely life-threatening situation.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {backpackLoading.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <h3 className="mt-12 text-xl font-semibold text-white">So many straps and buckles — what are they for?</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            Beginner hikers often get tangled in all the straps, or try to ignore them, assuming
            any backpack will fit well enough and that adjusting it isn&apos;t worth the effort for
            a short walk. Experienced hikers know that a properly fitted and adjusted backpack
            saves a lot of unnecessary fatigue. A typical modern hiking backpack has 2 pairs of
            straps and 2 pairs of adjustable buckles:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/72">
            {backpackFit.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          {/* Trekking poles */}
          <h2 id="poles" className="mt-20 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Using trekking poles correctly
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/72">A trekking pole is a helpful companion in several ways — it:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {poleBenefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>

          <h3 className="mt-10 text-xl font-semibold text-white">Adjusting the length</h3>
          <p className="mt-3 text-base leading-7 text-white/72">
            Grip the pole with your shoulder relaxed and your elbow at a right angle — that&apos;s
            the ideal hand height, so adjust the pole length to match. Some poles have a fixed
            length (mostly ski and orienteering poles); if so, buy one already at the right length,
            though these are less suited to hiking and trekking.
          </p>
          <p className="mt-3 text-base leading-7 text-white/72">
            Pole materials are typically traditional wood, aluminum, or carbon (carbon-fiber
            epoxy composite). Traditional wood poles are fairly heavy and not very practical, but
            better than nothing in a pinch. Aluminum poles are affordably priced and perfectly
            fine for the average hiker. Carbon poles are an investment in the hobby — lighter and
            better at absorbing vibration, but you&apos;ll need to dig deeper into your pocket at
            the shop.
          </p>
          <p className="mt-3 text-base leading-7 text-white/72">
            Beyond fixed-length poles, there are also folding and telescopic versions: telescopic
            poles handle load better, while folding poles pack smaller — really a matter of
            personal preference.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-white">How to use it on the trail</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/72">
            {poleUsage.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-white/40">
            Source for the clothing chapters: Rei.com
          </p>

          <div className="mt-16 flex justify-center">
            <Link
              href="/photo-tours"
              className="rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A0C10] transition hover:bg-[#e2c15a]"
            >
              Back to Photo Tours
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
