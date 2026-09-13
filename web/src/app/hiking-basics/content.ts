export const difficultyLevels = {
  en: [
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
  ],
  hu: [
    {
      grade: "T1",
      title: "Könnyű túra",
      marker: "Sárga",
      terrain:
        "Jól karbantartott ösvény. Az esetleges exponált szakaszok nagyon jól biztosítottak. Normál viselkedés mellett a leesés veszélye jórészt kizárható.",
      requirements: "Nincs különösebb követelmény — akár sportcipőben is megtehető. Az útvonalkeresés egyszerű, általában térkép nélkül is lehetséges.",
    },
    {
      grade: "T2",
      title: "Könnyű hegyi túra",
      marker: "Fehér-piros-fehér",
      terrain: "Folyamatos ösvény. A terep helyenként meredek; a leesés veszélye nem zárható ki teljesen.",
      requirements: "Bizonyos fokú biztos lábú járás. Túrabakancs ajánlott. Alapszintű tájékozódási készség.",
    },
    {
      grade: "T3",
      title: "Igényes hegyi túra",
      marker: "Fehér-piros-fehér",
      terrain:
        "Az útvonal a terepen nem mindig látható. Az exponált szakaszok kötelekkel vagy láncokkal biztosítottak lehetnek. Az egyensúlyhoz időnként kézre is szükség lehet — részben exponált, leesésveszélyes pontok, kőgörgeteg, ösvény nélküli sziklás terep.",
      requirements: "Jó biztos lábú járás. Jó túrabakancs. Átlagos tájékozódási készség. Alapvető alpesi tapasztalat.",
    },
    {
      grade: "T4",
      title: "Alpesi túra",
      marker: "Fehér-kék-fehér",
      terrain:
        "Az ösvény nyomai nem mindig láthatók. Bizonyos szakaszokon a haladáshoz kézre is szükség van. A terep már meglehetősen exponált — nehéz füves lejtők, sziklák, egyszerű hómezők és csupasz gleccserátkelések.",
      requirements:
        "Exponált terep ismerete. Strapabíró túrabakancs. Bizonyos terepértékelési és jó tájékozódási készség. Alpesi tapasztalat. Hirtelen időjárás-változás esetén a visszavonulás nehéz lehet.",
    },
    {
      grade: "T5",
      title: "Igényes alpesi túra",
      marker: "Fehér-kék-fehér",
      terrain:
        "Gyakran ösvény nélkül. Egyes egyszerű mászási pontok. Exponált, nehéz terep, meredek sziklák. Csupasz gleccserek és hómezők csúszásveszéllyel.",
      requirements:
        "Hegyi bakancs. Megbízható terepértékelés és nagyon jó tájékozódási készség. Jó alpesi tapasztalat és magashegyi terepismeret. Jégcsákány és kötél alapszintű ismerete.",
    },
    {
      grade: "T6",
      title: "Nehéz alpesi túra",
      marker: "Többnyire jelöletlen",
      terrain:
        "Többnyire ösvény nélkül. II. fokozatig terjedő mászási pontok. Gyakran nagyon exponált. Nehéz sziklás terep. Csupasz gleccserek fokozott csúszásveszéllyel.",
      requirements:
        "Kiváló tájékozódási készség. Érett alpesi tapasztalat és az alpesi technikai eszközök használatának ismerete.",
    },
  ],
};

export const gradeExamples = {
  en: [
    "T1 — the trail to Seealpsee",
    "T2 — the terrain to the Plauener Hütte",
    "T3 — the terrain around the Olperer Hütte",
    "T4 — the terrain up to the Entschenkopf",
    "T5 — the terrain up to the Hundstein",
  ],
  hu: [
    "T1 — az útvonal a Seealpsee-hez",
    "T2 — a terep a Plauener Hütte-hez",
    "T3 — a terep az Olperer Hütte környékén",
    "T4 — a terep az Entschenkopfig",
    "T5 — a terep a Hundstein-ig",
  ],
};

export const clothingStrategies = {
  en: [
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
  ],
  hu: [
    {
      title: "Öltözz rétegesen",
      text: "Ebben a jól bevált stratégiában minden ruharétegnek konkrét funkciója van, és az időjárás változásával hozzáadhatod vagy leveheted őket. Kezdd egy nedvességelvezető alsóréteggel közvetlenül a bőrödön, majd adj hozzá egy szigetelő középréteget és egy vízálló külső réteget, például egy esőkabátot, hogy bármire felkészülj.",
    },
    {
      title: "Válassz poliészter, nejlon vagy merinó gyapjú alsóréteget",
      text: "A pamuttal ellentétben ezek a nedvességelvezető anyagok gyorsan elvezetik a verejtéket a bőrödről, és gyorsan száradnak, így ideálisak alsóneműnek, sportmelltartónak, pólónak, hosszú ujjú felsőnek és zokninak. A merinó zokni télen melegen tart, nyáron jól szellőzik, a nedvességelvezetés pedig csökkenti a felhólyagosodás kockázatát.",
    },
    {
      title: "Először a funkció (csak utána a stílus)",
      text: "Senki nem néz ki jól, ha rosszul érzi magát. Szerencsére a mai márkák a kényelemre és a technikai teljesítményre is odafigyelnek a kinézet mellett — csak győződj meg róla, hogy amit választasz, alkalmas a feladatra.",
    },
    {
      title: "Készülj fel az időjárásra",
      text: "Az időjárásnak megfelelő öltözködés közvetlenül befolyásolja a kényelmedet és a biztonságodat. Az előrejelzések tévedhetnek vagy változhatnak, a magasságváltozás is módosíthatja az időjárást, ezért készülj fel arra, hogy hidegebb, vizesebb, havasabb vagy melegebb lehet a vártnál. Ennek megfelelően viselj vagy csomagolj rétegeket, és ne feledd, hogy évszakonként is más felszerelésre lesz szükséged — gondolj egy meleg gyapjú sapkára és kesztyűre egy téli túrához, vagy egy karimás napkalapra egy nyárihoz.",
    },
    {
      title: "Ismerd a terepet",
      text: "Ha bozótos erdőkön, magas füvön vagy erdős területeken túrázol, fontold meg a hosszú ujjú ruházatot, nadrágot, beépített rovarriasztós ruhát vagy szúnyoghálót a kullancsok, szúnyogok és más kártevők ellen. Sivatagban a magasabb szárú túrabakancs extra védelmet nyújthat. Városi túrákhoz praktikusabb, stílusosabb ruházatot érdemes választani, hogy gyorsan válthass a város és a természet között.",
    },
  ],
};

export const layeringBasics = {
  en: [
    { name: "Base layer (next-to-skin layer)", text: "moves sweat away from your skin" },
    { name: "Mid layer (insulating layer)", text: "retains body heat to keep you warm" },
    { name: "Outer layer (shell)", text: "protects you against wind and rain" },
  ],
  hu: [
    { name: "Alsóréteg (bőrhöz közeli réteg)", text: "elvezeti a verejtéket a bőrödről" },
    { name: "Középréteg (szigetelő réteg)", text: "megtartja a testhőt, hogy melegen tartson" },
    { name: "Külső réteg (héj)", text: "megvéd a széltől és az esőtől" },
  ],
};

export const layeringExamples = {
  en: [
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
  ],
  hu: [
    {
      weather: "Hideg időjárási rétegek",
      text: "Közepes súlyú poliészter alsóréteg felül-alul; szintetikus szigetelésű dzseki; közepes súlyú polár nadrág; vízálló/lélegző esőkabát és nadrág.",
    },
    {
      weather: "Esős időjárási rétegek (hűvös hőmérséklet)",
      text: "Könnyű poliészter alsóréteg felül-alul; könnyű polár dzseki; szintetikus túranadrág; könnyű vízálló/lélegző esőkabát és nadrág (bő szellőzéssel).",
    },
    {
      weather: "Meleg időjárási rétegek",
      text: "Poliészter alsónemű és rövid ujjú szintetikus póló; levehető szárú nejlon túranadrág; könnyű szélkabát.",
    },
  ],
};

export const backpackLoading = {
  en: [
    "Bulky but relatively light items, such as a sleeping bag (or just a liner), go at the bottom of the pack — it's usually only needed at the end of the day. Pack it, along with your spare clothes, into a waterproof dry sack, compress it, and place it at the bottom.",
    "If cold or rainy weather is expected, keep your power bank in the same dry sack so it stays dry and the clothes keep it warm.",
    "If your pack has a separate, easily reachable lower compartment, that's a good place for your puffy jacket and/or rain jacket — instantly accessible without weighing the pack down.",
    "Camera gear is often the heaviest item for photographers on a hike — keep it in a camera cube close to your back, around the middle of the pack, so it throws you off balance as little as possible.",
    "If you carry water in a bladder rather than a bottle, the roughly 2 kg of liquid also belongs close to your back, in the compartment designed for it. A bottle can go in the side pockets, though that's less ideal for weight distribution.",
    "Light but frequently needed items — hat, gloves, cap, headlamp, sunglasses — belong in the top pocket or outer mesh pockets: they weigh little but need quick access. Mesh/elastic pockets are also great for airing out wet clothes on the move so they dry faster.",
    "Never pack the first-aid kit at the bottom — you never know when you'll need it, and emptying the whole pack in an emergency is not an option.",
    "Small items like a knife, energy bars, a microfiber cloth and tissues are best kept in the hip-belt pockets, reachable even while walking.",
  ],
  hu: [
    "A terjedelmes, de viszonylag könnyű tárgyak, például a hálózsák (vagy csak a betét), a hátizsák aljára kerülnek — általában csak a nap végén van rájuk szükség. Csomagold vízálló dry sackbe a tartalék ruhákkal együtt, préseld össze, és tedd az aljára.",
    "Ha hideg vagy esős idő várható, tartsd a power bankot ugyanabban a dry sackben, hogy szárazon maradjon, a ruhák pedig melegen tartsák.",
    "Ha a hátizsákodnak van külön, könnyen elérhető alsó rekesze, az jó hely a pufidzsekinek és/vagy esőkabátnak — azonnal elérhető anélkül, hogy terhelné a csomagot.",
    "A fotósoknál gyakran a fényképezőgép a legnehezebb tárgy egy túrán — tartsd egy kamerakockában közel a hátadhoz, a hátizsák közepe táján, hogy a lehető legkevésbé billentsen ki az egyensúlyból.",
    "Ha ivózsákban és nem palackban hordod a vizet, a nagyjából 2 kg folyadék szintén közel legyen a hátadhoz, az erre tervezett rekeszben. A palack mehet az oldalzsebekbe, bár ez kevésbé ideális a súlyelosztás szempontjából.",
    "A könnyű, de gyakran szükséges tárgyak — sapka, kesztyű, baseballsapka, fejlámpa, napszemüveg — a felső zsebbe vagy a külső hálós zsebekbe valók: alig nyomnak valamit, de gyors hozzáférés kell hozzájuk. A hálós/gumis zsebek remekek arra is, hogy menet közben szellőztesd a nedves ruhákat, hogy gyorsabban száradjanak.",
    "Sose csomagold az elsősegély-készletet az aljára — sosem tudhatod, mikor lesz rá szükséged, és vészhelyzetben nem opció az egész hátizsák kiürítése.",
    "A kis tárgyakat, mint a kés, energiaszelet, mikroszálas kendő és zsebkendő, a legjobb a csípőöv zsebeiben tartani, amelyek járás közben is elérhetők.",
  ],
};

export const backpackFit = {
  en: [
    "Lift the pack onto your back with loosened straps. If it's a heavy trekking pack, resting it on one knee first reduces the lift — slide one arm through the shoulder strap, hold the top handle with the other hand, and help lift it into place.",
    "Once it's on your back, pull down both shoulder straps (the ones under your arms) until the pack no longer rests on your backside. The pack's center of gravity should align with the center of your back.",
    "Buckle and tighten the hip belt: it shouldn't squeeze your lunch, but it should feel noticeably snug — this takes a significant load off your shoulders.",
    "Buckle the chest strap: roughly mid-chest for men, around the breastbone for women. It doesn't need to be very tight, just enough that the pack can't swing sideways on your back, reducing the risk of losing your balance.",
    "Load-lifter straps (the small straps over your shoulders): pull the top of the pack closer to the shoulder straps, and so closer to your body. Tighten until it's noticeably closer to your center of mass without being uncomfortable — this adds stability and further reduces the risk of being thrown off balance.",
  ],
  hu: [
    "Emeld a hátizsákot a hátadra kilazított pántokkal. Ha nehéz trekking-hátizsákról van szó, ha először a térdedre teszed, azzal könnyítesz az emelésen — csúsztasd az egyik karod a vállpántba, a másik kezeddel fogd meg a felső fogantyút, és segíts a helyére emelni.",
    "Amint a hátadon van, húzd le mindkét vállpántot (a hónaljad alatti részeket), amíg a hátizsák már nem a fenekeden nyugszik. A hátizsák súlypontjának a hátad közepéhez kell igazodnia.",
    "Csatold be és húzd meg a csípőövet: ne szorítsa az ebédedet, de érezhetően szorosnak kell lennie — ez jelentős terhet vesz le a válladról.",
    "Csatold be a mellpántot: férfiaknál nagyjából mellközépen, nőknél a szegycsont körül. Nem kell nagyon szorosra húzni, csak annyira, hogy a hátizsák ne tudjon oldalra lengeni a hátadon, csökkentve az egyensúlyvesztés kockázatát.",
    "Teherfelvevő pántok (a kis pántok a válladon): húzd közelebb a hátizsák tetejét a vállpántokhoz, és így közelebb a testedhez. Húzd addig, amíg érezhetően közelebb kerül a súlypontodhoz anélkül, hogy kényelmetlen lenne — ez stabilitást ad, és tovább csökkenti a kibillenés kockázatát.",
  ],
};

export const poleBenefits = {
  en: [
    "takes load off your legs while walking, especially helpful on ascents",
    "increases cardio effort through more varied movement",
    "gives you something to lean on if you stumble",
    "adds safety when descending a slope",
    "reduces slipping risk on old snow, and can even be used to check snow depth",
  ],
  hu: [
    "tehermentesíti a lábadat séta közben, különösen emelkedőn hasznos",
    "a változatosabb mozgás révén növeli a kardió terhelést",
    "van mire támaszkodnod, ha megbotlasz",
    "biztonságosabbá teszi a lejtőn való ereszkedést",
    "csökkenti a régi havon való megcsúszás kockázatát, sőt a hó mélységének ellenőrzésére is használható",
  ],
};

export const poleUsage = {
  en: [
    "On flat terrain or a gentle incline: use it opposite to your feet, so diagonally you always have two stable points, front and back.",
    "On a steep ascent: plant both poles ahead of you at once, so you can pull yourself up with both arms and take significant load off your legs.",
    "On a steep descent: plant both poles ahead of you at once, leaning on them protects your knees, and if you slip or stumble, two poles add stability.",
    "Traversing a steep slope: plant the pole into the ground at a 30–45° angle to lean on, helping if you slip or stumble. Even without planting it, keep the pole on the uphill side, never the downhill/ravine side — if you slide towards the drop, you'll have something to hold onto instead of sliding down together with the pole.",
    "With a single pole: everything works the same, just with less assistance — plus a bonus sense of being a wizard with a staff. On an ascent keep the pole on the side opposite your leading leg; on a descent, keep it on the same side, so you can lean on it as you lower your weight onto the downhill leg in case of a slip.",
  ],
  hu: [
    "Sík terepen vagy enyhe lejtőn: használd a lábaddal ellentétesen, így átlósan mindig van két stabil pontod, elöl és hátul.",
    "Meredek emelkedőn: szúrd le mindkét botot egyszerre magad elé, így mindkét karoddal felhúzhatod magad, és jelentősen tehermentesíted a lábadat.",
    "Meredek lejtőn: szúrd le mindkét botot egyszerre magad elé, a rájuk támaszkodás védi a térdedet, és ha megcsúszol vagy megbotlasz, a két bot stabilitást ad.",
    "Meredek lejtő keresztezésekor: szúrd a botot a talajba 30–45°-os szögben, hogy támaszkodhass rá, ez segít, ha megcsúszol vagy megbotlasz. Leszúrás nélkül is tartsd a botot a hegy felőli oldalon, sose a lejtő/szakadék felőlin — ha a mélység felé csúszol, lesz mibe megkapaszkodnod, ahelyett hogy a bottal együtt csúsznál le.",
    "Egy bottal: minden ugyanúgy működik, csak kevesebb segítséggel — plusz bónuszként olyan érzés, mintha varázslóbotod lenne. Emelkedőn tartsd a botot a vezető lábaddal ellentétes oldalon; lejtőn tartsd ugyanazon az oldalon, hogy rátámaszkodhass, amikor a súlyodat a lejtő felőli lábra helyezed csúszás esetén.",
  ],
};
