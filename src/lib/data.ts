export type Photo = { src: string; alt: string; w: number; h: number };

const p = (file: string, alt: string, w = 1600, h = 900): Photo => ({
  src: `/foto/${file}`,
  alt,
  w,
  h,
});

export const company = {
  name: "MontHaly s.r.o.",
  street: "Pavlovská 21",
  city: "623 00 Brno",
  country: "Česká republika",
  ico: "24015903",
  dic: "CZ24015903",
  register: "Krajský soud v Brně, oddíl C, vložka 148626",
  dataBox: "7uc4fw3",
  phone: "+420727882623",
  phoneLabel: "727 882 623",
  phoneIntl: "+420 727 882 623",
  email: "info@mont-haly.cz",
};

export const contacts = [
  { name: "Roman Chalupka", role: "Prodej hal", phone: "+420727882623", phoneLabel: "+420 727 882 623", lead: true },
  { name: "Ing. Romana Chalupková", role: "Pronájem", phone: "+420724323672", phoneLabel: "+420 724 323 672", lead: true },
  { name: "Ing. Samir Asfour", role: "Projektant", phone: "+420731506612", phoneLabel: "+420 731 506 612" },
  { name: "Ing. Libor Švaříček", role: "Projektant", phone: "+420722720010", phoneLabel: "+420 722 720 010" },
  { name: "Ing. Ilona Divišová", role: "Účetní", phone: "+420777876727", phoneLabel: "+420 777 876 727" },
];

export type HallGroup = "skladovani-vyroba" | "sport" | "zemedelstvi-jezdectvi" | "dalsi";

export const hallGroups: { id: HallGroup; label: string }[] = [
  { id: "skladovani-vyroba", label: "Skladování a výroba" },
  { id: "sport", label: "Sport" },
  { id: "zemedelstvi-jezdectvi", label: "Zemědělství a jezdectví" },
  { id: "dalsi", label: "Další využití" },
];

export type Hall = {
  slug: string;
  name: string;
  short: string;
  group: HallGroup;
  title: [string, string];
  lead: string;
  features: { title: string; text: string }[];
  uses: string[];
  prompt: { title: string; text: string };
  photos: Photo[];
  related: string[];
};

export const halls: Hall[] = [
  {
    slug: "skladove-haly",
    name: "Skladové haly",
    short: "Zboží, materiál a logistika.",
    group: "skladovani-vyroba",
    title: ["Místo pro zásoby.", "Prostor pro růst."],
    lead: "Sklad má usnadňovat každý pracovní den. Společně navrhneme rozměry, vjezdy a opláštění podle toho, co ukládáte a jak s materiálem manipulujete.",
    features: [
      { title: "Plynulý pohyb", text: "Poloha a rozměry vrat se odvíjejí od vaší manipulační techniky a provozu." },
      { title: "Vhodné prostředí", text: "Plachta, plech nebo zateplené opláštění podle požadavků skladovaného zboží." },
      { title: "Možnost rozšíření", text: "Při návrhu můžeme počítat s budoucím prodloužením modulové konstrukce." },
    ],
    uses: ["Skladování zboží a materiálu", "Logistika a expedice", "Kryté parkování techniky"],
    prompt: {
      title: "Co budete skladovat a jak se bude zboží pohybovat?",
      text: "Připravte si přibližnou výšku skladování, rozměry techniky a požadavky na teplotu. Pomůže i jednoduchý nákres pozemku.",
    },
    photos: [
      p("skladove-haly.webp", "Dlouhá bílá skladová hala s paletami před vjezdem"),
      p("skladove-haly-1.webp", "Skladová hala z trapézového plechu s modrými vraty"),
      p("skladove-haly-2.webp", "Šedá skladová hala s prosklenou čelní stěnou"),
    ],
    related: ["skladova-hala-lhotka-nad-becvou", "skladova-hala-steti", "skladova-hala-libeznice"],
  },
  {
    slug: "sportovni-haly",
    name: "Sportovní haly",
    short: "Trénink, zápasy a volný čas.",
    group: "sport",
    title: ["Více prostoru", "pro každou hru."],
    lead: "Pro trénink, zápasy i volný čas. Sportovní halu připravíme kolem konkrétního sportu, potřebné světlé výšky a podmínek celoročního nebo sezónního provozu.",
    features: [
      { title: "Volná hrací plocha", text: "Dispozice bez vnitřních podpěr podle zvoleného konstrukčního systému." },
      { title: "Světlo a vzduch", text: "Řešení prosvětlení, větrání a případného otevírání bočních stěn." },
      { title: "Zázemí podle provozu", text: "Návrh vstupů, vytápění a návaznosti na stávající sportovní areál." },
    ],
    uses: ["Tenis a padel", "Volejbal a beachvolejbal", "Víceúčelová sportoviště"],
    prompt: {
      title: "Jaký sport se bude v hale hrát?",
      text: "Důležitá je velikost hřiště včetně bezpečnostních odstupů, potřebná výška a to, zda chcete halu používat i v zimě.",
    },
    photos: [
      p("sportovni-haly-1.webp", "Beachvolejbal v montované sportovní hale"),
      p("sportovni-haly-2.webp", "Bruslení na ledové ploše pod montovanou halou"),
      p("sportovni-haly.webp", "Vodní slalom v zastřešeném kanálu"),
    ],
    related: ["sportovni-hala-brno"],
  },
  {
    slug: "jezdecke-haly",
    name: "Jezdecké haly",
    short: "Kryté jízdárny a tréninkové areály.",
    group: "zemedelstvi-jezdectvi",
    title: ["Jezděte podle sebe.", "Ne podle počasí."],
    lead: "Krytá jízdárna vytváří prostor pro pravidelný trénink. Návrh přizpůsobíme rozměrům jízdní plochy, přístupu do areálu a požadavkům na světlo a větrání.",
    features: [
      { title: "Přehledná plocha", text: "Volný prostor s konstrukcí navrženou pro konkrétní jízdárnu." },
      { title: "Přirozené světlo", text: "Světlopropustné opláštění může omezit potřebu denního svícení." },
      { title: "Příjemné větrání", text: "Možnost otevřených nebo částečně otevíratelných bočních stěn." },
    ],
    uses: ["Kryté jízdárny", "Tréninkové areály", "Zastřešení jízdních ploch"],
    prompt: {
      title: "Jak se má jízdárna propojit s vaším areálem?",
      text: "Vedle rozměrů je užitečné znát pohyb koní, umístění vstupů a představu o podkladu a údržbě jízdní plochy.",
    },
    photos: [
      p("jezdecke-haly-1.webp", "Parkurový skok v kryté jízdárně"),
      p("jezdecke-haly.webp", "Jezdecká hala s obloukovými okny v čelní stěně"),
      p("jezdecke-haly-2.webp", "Dlouhá jezdecká hala vedle venkovní jízdárny", 1200, 675),
    ],
    related: [],
  },
  {
    slug: "letecke-hangary",
    name: "Letecké hangáry",
    short: "Letadla, ultralighty a zázemí.",
    group: "dalsi",
    title: ["Dobré zázemí", "pro vaše letadlo."],
    lead: "U hangáru rozhoduje každý průjezd a každý metr. Konstrukci a vrata navrhneme podle rozpětí křídel, výšky letadla a způsobu manipulace na ploše.",
    features: [
      { title: "Velkorysý vjezd", text: "Typ vrat a jejich světlé rozměry podle konkrétní letecké techniky." },
      { title: "Promyšlená dispozice", text: "Prostor pro parkování, pohyb techniky i přístup obsluhy." },
      { title: "Vybavení na míru", text: "Personální vstupy, osvětlení, větrání a další prvky podle provozu." },
    ],
    uses: ["Soukromá letadla a ultralighty", "Aerokluby", "Servisní a skladovací zázemí"],
    prompt: {
      title: "Jakou techniku potřebujete umístit?",
      text: "Napište typ a rozměry letadla, počet strojů a zamýšlené využití. Důležité jsou také rozměry dostupné plochy a příjezd.",
    },
    photos: [
      p("letecke-hangary-2.webp", "Malé letadlo zaparkované v montovaném hangáru"),
      p("letecke-hangary.webp", "Hangár se zeleným opláštěním spodní části"),
      p("letecke-hangary-1.webp", "Hangár opláštěný trapézovým plechem"),
    ],
    related: [],
  },
  {
    slug: "vyrobni-haly",
    name: "Výrobní haly",
    short: "Dílny, montáž a výroba.",
    group: "skladovani-vyroba",
    title: ["Prostor, který", "pracuje s vámi."],
    lead: "Výrobní hala má navazovat na váš provoz. Při návrhu vycházíme z rozmístění technologií, pohybu materiálu a požadavků na pracovní prostředí.",
    features: [
      { title: "Provoz na prvním místě", text: "Rozměry, vjezdy a vstupy s ohledem na výrobní tok." },
      { title: "Opláštění podle potřeb", text: "Možnosti zateplení, prosvětlení a větrání podle charakteru výroby." },
      { title: "Prostor pro vybavení", text: "Koordinace stavební části s osvětlením, vytápěním a dalšími profesemi." },
    ],
    uses: ["Montáž a kompletace", "Výrobní provozy", "Dílny a technické zázemí"],
    prompt: {
      title: "Jak bude vypadat běžný den ve vaší výrobě?",
      text: "Uveďte typ výroby, hlavní technologie a požadavky na prostředí. Předběžná dispozice pomůže najít vhodné řešení.",
    },
    photos: [
      p("vyrobni-haly.webp", "Zateplená výrobní hala z tmavých sendvičových panelů"),
      p("vyrobni-haly-1.webp", "Výrobní hala se sekčními vraty"),
      p("vyrobni-haly-2.webp", "Dlouhá výrobní hala se vstupním portálem"),
    ],
    related: ["skladova-hala-vamberk", "skladova-hala-veselicko", "hala-zakamenne"],
  },
  {
    slug: "zemedelske-haly",
    name: "Zemědělské haly",
    short: "Technika, sklizeň a zásoby.",
    group: "zemedelstvi-jezdectvi",
    title: ["Poctivé zázemí", "pro každou sezónu."],
    lead: "Pro techniku, sklizeň i každodenní práci. Zemědělské haly připravujeme s důrazem na praktické vjezdy, větrání a návaznost na hospodářský areál.",
    features: [
      { title: "Průjezd pro techniku", text: "Rozměry vrat a výška haly podle používaných strojů." },
      { title: "Větrání podle využití", text: "Opláštění a otevřené části přizpůsobené ukládanému materiálu." },
      { title: "Praktická konstrukce", text: "Návrh konstrukce, kotvení a podkladu pro konkrétní místo." },
    ],
    uses: ["Garážování zemědělské techniky", "Skladování plodin a materiálu", "Zastřešené hospodářské prostory"],
    prompt: {
      title: "Co má hala chránit a jakou techniku používáte?",
      text: "Popište zamýšlené využití a uveďte rozměry největších strojů. U skladování plodin záleží také na způsobu větrání a manipulace.",
    },
    photos: [
      p("zemedelske-haly-2.webp", "Zemědělská hala se žlutým opláštěním a otevřenou stájí"),
      p("zemedelske-haly-1.webp", "Krmení skotu v otevřené zemědělské hale", 1600, 901),
      p("zemedelske-haly.webp", "Dlouhá zemědělská hala s otevřenými bočními stěnami"),
    ],
    related: [],
  },
  {
    slug: "party-stany",
    name: "Párty stany",
    short: "Společenské akce i dlouhodobé využití.",
    group: "dalsi",
    title: ["Zázemí pro chvíle,", "na kterých záleží."],
    lead: "Profesionální zastřešení pro společenské akce i dlouhodobé využití. Velikost a vybavení sladíme s počtem hostů, programem a charakterem místa.",
    features: [
      { title: "Přizpůsobitelný prostor", text: "Modulové rozměry a varianty bočních stěn." },
      { title: "Atmosféra i praktičnost", text: "Možnosti transparentních částí, podlahy a osvětlení." },
      { title: "Vybavení podle sezóny", text: "Řešení vstupů, větrání a případného vytápění." },
    ],
    uses: ["Hotely a gastronomické provozy", "Obecní a firemní akce", "Společenské a kulturní události"],
    prompt: {
      title: "Pro jaké akce a jak často budete stan používat?",
      text: "Napište předpokládaný počet hostů, způsob uspořádání a zda řešíte pořízení nebo pronájem. Konkrétní možnosti ověří obchodní oddělení.",
    },
    photos: [
      p("party-stany.webp", "Prosklený párty stan nasvícený při večerní akci"),
      p("party-stany-1.webp", "Bílý párty stan s obloukovými okny na trávníku"),
      p("party-stany-2.webp", "Párty stan u jezírka s fontánou", 1400, 788),
    ],
    related: [],
  },
  {
    slug: "membranova-zastreseni",
    name: "Membránová zastřešení",
    short: "Terasy, amfiteátry a veřejná prostranství.",
    group: "dalsi",
    title: ["Lehkost, která", "dává místu tvar."],
    lead: "Zastřešení technickou tkaninou propojuje funkci a architekturu. Tvar, konstrukce i způsob kotvení vznikají podle prostoru, který má zastřešení doplnit.",
    features: [
      { title: "Tvar podle místa", text: "Individuální řešení návaznosti na okolní objekty." },
      { title: "Světlo pod střechou", text: "Výběr materiálu podle požadovaného prosvětlení a využití." },
      { title: "Celek i detaily", text: "Společný návrh nosné konstrukce, napnutí a odvodu vody." },
    ],
    uses: ["Terasy a veřejná prostranství", "Amfiteátry a kulturní areály", "Odpočinkové a sportovní plochy"],
    prompt: {
      title: "Jak má zastřešení v místě fungovat?",
      text: "Pomohou fotografie místa, rozměry plochy a představa o využití. Na jejich základě probereme vhodnou konstrukční variantu.",
    },
    photos: [
      p("membranova-zastreseni-1.webp", "Kluziště pod velkým membránovým zastřešením se středovým stožárem", 1600, 1067),
      p("membranova-zastreseni-2.webp", "Membránové zastřešení na stožárech nad venkovním prostranstvím", 1600, 1064),
      p("membranova-zastreseni.webp", "Membránová střecha nad lezeckou stěnou", 1600, 1068),
    ],
    related: [],
  },
];

export type RealizationCategory = "skladove" | "sportovni" | "viceucelove";

export const realizationCategories: { id: RealizationCategory; label: string }[] = [
  { id: "skladove", label: "Skladové haly" },
  { id: "sportovni", label: "Sportovní haly" },
  { id: "viceucelove", label: "Víceúčelové haly" },
];

export type Realization = {
  slug: string;
  place: string;
  title: string;
  kind: string;
  category: RealizationCategory;
  hallType: string;
  dimensions?: string;
  area?: string;
  /** Celková půdorysná plocha v m², pro souhrny a řazení. */
  areaM2: number;
  summary: string;
  notes: string[];
  country?: "SK";
  photos: Photo[];
};

const r = (file: string, alt: string) => p(file, alt, 1600, 1200);

export const realizations: Realization[] = [
  {
    slug: "skladova-hala-steti",
    areaM2: 1125,
    place: "Štětí",
    title: "Skladová hala ve Štětí",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "25 × 45 × 5 m",
    area: "1 125 m²",
    summary: "Velkorysá skladovací plocha o rozloze 1 125 m². Montovaná hala s půdorysem 25 × 45 m pro skladové využití.",
    notes: ["Plocha 1 125 m²", "Šířka 25 m", "Délka 45 m"],
    photos: [
      r("steti.webp", "Skladová hala ve Štětí podél železniční vlečky"),
      r("steti-1.webp", "Montáž ocelové konstrukce haly ve Štětí s jeřábem"),
      r("steti-2.webp", "Prázdný interiér skladové haly ve Štětí"),
    ],
  },
  {
    slug: "skladove-haly-mosnov",
    areaM2: 1920,
    place: "Mošnov",
    title: "Dvě skladové haly v Mošnově",
    kind: "Skladové haly",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "2× 16 × 60 × 7 m",
    area: "2 × 960 m²",
    summary: "Dvojice velkokapacitních skladových hal. Každá z hal nabízí půdorysnou plochu 960 m² a rozměry 16 × 60 × 7 m.",
    notes: ["Dvě samostatné haly", "Celková půdorysná plocha 1 920 m²", "Rozměry jedné haly 16 × 60 × 7 m"],
    photos: [
      r("mosnov.webp", "Dvě bílé skladové haly v Mošnově"),
      r("mosnov-1.webp", "Skladové haly v Mošnově za oplocením areálu"),
      r("mosnov-2.webp", "Montáž konstrukce haly v Mošnově z plošiny"),
    ],
  },
  {
    slug: "skladova-hala-litvinov",
    areaM2: 900,
    place: "Litvínov",
    title: "Skladová hala v Litvínově",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "20 × 45 × 5 m",
    area: "900 m²",
    summary: "Skladová hala s půdorysem 20 × 45 m. Fotografie ukazují konstrukční řešení a výslednou podobu haly v areálu.",
    notes: ["Plocha 900 m²", "Skladovací využití", "Rozměry 20 × 45 × 5 m"],
    photos: [
      r("litvinov.webp", "Bílá skladová hala v Litvínově na mokrém asfaltu"),
      r("litvinov-1.webp", "Konstrukce střechy haly v Litvínově během montáže"),
      r("litvinov-2.webp", "Boční pohled na dlouhou halu v Litvínově"),
    ],
  },
  {
    slug: "skladova-hala-opatovice",
    areaM2: 800,
    place: "Opatovice nad Labem",
    title: "Skladová hala v Opatovicích",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "20 × 40 × 5 m",
    area: "800 m²",
    summary: "Skladové zázemí o ploše 800 m² v Opatovicích nad Labem. Ukázka montované haly o rozměrech 20 × 40 × 5 m.",
    notes: ["Plocha 800 m²", "Skladovací využití", "Rozměry 20 × 40 × 5 m"],
    photos: [
      r("opatovice.webp", "Skladová hala v Opatovicích nad Labem"),
      r("opatovice-1.webp", "Stavba konstrukce haly v Opatovicích s manipulátorem"),
      r("opatovice-2.webp", "Opláštění haly v Opatovicích z pracovní plošiny"),
    ],
  },
  {
    slug: "skladova-hala-vamberk",
    areaM2: 375,
    place: "Vamberk",
    title: "Skladová hala ve Vamberku",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "15 × 25 × 4 m",
    area: "375 m²",
    summary: "Skladová hala o rozměrech 15 × 25 × 4 m. Fotografie zachycují podobu stavby a její začlenění do stávajícího areálu.",
    notes: ["Skladovací využití", "Plocha 375 m²", "Rozměry 15 × 25 × 4 m"],
    photos: [
      r("vamberk.webp", "Skladová hala ve Vamberku na travnaté ploše"),
      r("vamberk-1.webp", "Ocelová konstrukce haly ve Vamberku během montáže"),
      r("vamberk-2.webp", "Hala ve Vamberku vedle stávající budovy"),
    ],
  },
  {
    slug: "skladova-hala-veselicko",
    areaM2: 216,
    place: "Veselíčko",
    title: "Skladová hala ve Veselíčku",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "12 × 18 × 4 m",
    area: "216 m²",
    summary: "Kompaktní skladová hala o ploše 216 m². Příklad zastřešení menší skladovací plochy s přehlednou dispozicí.",
    notes: ["Skladovací využití", "Plocha 216 m²", "Výška 4 m"],
    photos: [
      r("veselicko.webp", "Šedá skladová hala ve Veselíčku se dvěma vraty"),
      r("veselicko-1.webp", "Montážníci při stavbě konstrukce ve Veselíčku"),
      r("veselicko-2.webp", "Opláštění haly ve Veselíčku z pracovní plošiny"),
    ],
  },
  {
    slug: "hala-zakamenne",
    areaM2: 288,
    place: "Zákamenné",
    title: "Víceúčelová hala v Zákamenném",
    kind: "Víceúčelová hala",
    category: "viceucelove",
    hallType: "vyrobni-haly",
    dimensions: "12 × 24 × 4 m",
    area: "288 m²",
    summary: "Montovaná hala s praktickým uspořádáním a přímým přístupem z areálu. Ukázka řešení pro víceúčelové využití.",
    notes: ["Modulová konstrukce", "Rozměry 12 × 24 × 4 m", "Realizace na Slovensku"],
    country: "SK",
    photos: [
      r("zakamenne.webp", "Víceúčelová hala v Zákamenném s prosklenou čelní stěnou"),
      r("zakamenne-1.webp", "Hala v Zákamenném v areálu firmy"),
      r("zakamenne-2.webp", "Stavba konstrukce haly v Zákamenném"),
    ],
  },
  {
    slug: "skladova-hala-lhotka-nad-becvou",
    areaM2: 450,
    place: "Lhotka nad Bečvou",
    title: "Skladová hala v Lhotce nad Bečvou",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "15 × 30 × 6 m",
    area: "450 m²",
    summary:
      "Montovaná hala 15 × 30 × 6 m spojuje stěny z trapézového plechu s úspornou PVC střechou v barevném provedení. Modulová konstrukce umožňuje halu později prodloužit bez složitých stavebních úprav.",
    notes: ["Stěny z trapézového plechu, PVC střecha", "Vrata a vysoká světlá výška", "Připraveno na prodloužení"],
    photos: [
      r("lhotka.webp", "Skladová hala s tmavým plechovým opláštěním v Lhotce nad Bečvou při západu slunce"),
      r("lhotka-1.webp", "Opláštění haly v Lhotce nad Bečvou během montáže"),
      r("lhotka-2.webp", "Ocelová konstrukce haly v Lhotce nad Bečvou"),
    ],
  },
  {
    slug: "skladova-hala-libeznice",
    areaM2: 600,
    place: "Líbeznice",
    title: "Skladová hala v Líbeznicích",
    kind: "Skladová hala",
    category: "skladove",
    hallType: "skladove-haly",
    dimensions: "20 × 30 × 4 m",
    area: "600 m²",
    summary:
      "Skladová hala 20 × 30 × 4 m s potiskem plachty, který z ní dělá i reklamní plochu. Světlopropustné opláštění snižuje náklady na svícení a průmyslová sekční vrata zrychlují manipulaci.",
    notes: ["Potisk plachty s logem", "Světlopropustné opláštění", "Průmyslová sekční vrata"],
    photos: [
      r("libeznice.webp", "Bílá skladová hala s potiskem loga v Líbeznicích a paletami před vjezdem"),
      r("libeznice-1.webp", "Boční pohled na skladovou halu v Líbeznicích"),
      r("libeznice-2.webp", "Montáž konstrukce haly v Líbeznicích s jeřábem a plošinami"),
    ],
  },
  {
    slug: "sportovni-hala-brno",
    areaM2: 950,
    place: "Brno",
    title: "Sportovní hala v Brně",
    kind: "Sportovní hala",
    category: "sportovni",
    hallType: "sportovni-haly",
    dimensions: "25 × 38 × 6 m",
    area: "950 m²",
    summary:
      "Zastřešené sportoviště pro beachvolejbal. Konstrukce bez středových sloupů nechává celou plochu volnou pro hru. V zimě se hala vytápí, v létě se dají sundat bočnice a vznikne vzdušný přístřešek.",
    notes: ["Hrací prostor bez středových sloupů", "Vytápění v zimě, otevřené bočnice v létě", "Plachty s potiskem partnerů"],
    photos: [
      p("brno.webp", "Hráči beachvolejbalu ve sportovní hale v Brně"),
      p("brno-1.webp", "Interiér haly v Brně s otevřenou střešní konstrukcí"),
      p("brno-2.webp", "Večerní pohled na nasvícenou sportovní halu v Brně"),
    ],
  },
];

export const faq = [
  {
    q: "Kolik montovaná hala stojí?",
    a: "Cena závisí na rozměrech, místě stavby, zatížení, konstrukci, opláštění a vybavení. Pro konkrétní nabídku stačí začít účelem, přibližnou velikostí a obcí, kde má hala stát.",
  },
  {
    q: "Jak dlouho trvá dodání a montáž?",
    a: "Termín se odvíjí od typu haly, rozsahu dodávky, připravenosti podkladu a potřebné dokumentace. Dobu přípravy, dodání a vlastní montáže vám rozlišíme v konkrétní nabídce.",
  },
  {
    q: "Musím znát přesné rozměry?",
    a: "Nemusíte. Napište, co má být uvnitř a jak chcete prostor používat. S volbou vhodných rozměrů a uspořádání vám pomůžeme.",
  },
  {
    q: "Co musí být připravené na pozemku?",
    a: "Záleží na podloží, způsobu kotvení a zatížení konkrétní haly. Před montáží je potřeba společně ověřit podklad, přístup techniky a připravenost místa.",
  },
  {
    q: "Zajistíte projektovou dokumentaci?",
    a: "Projektová dokumentace patří mezi nabízené služby. Potřebný rozsah a návaznost na další podklady si potvrdíme podle konkrétního záměru.",
  },
  {
    q: "Může být hala zateplená?",
    a: "Ano, podle konstrukce a využití lze zvolit odpovídající izolační řešení. Probereme požadovanou teplotu, vlhkost, větrání i plánovaný způsob vytápění.",
  },
  {
    q: "Jaká je záruka?",
    a: "U vybraných řešení nabízíme záruku až 6 let. Konkrétní délku, rozsah a podmínky pro konstrukci, opláštění a další části uvádíme v nabídce a smlouvě.",
  },
];

export const steps = [
  {
    title: "Nejdřív vaše potřeby",
    short: "Pochopíme vaše zadání.",
    text: "Vaše zadání si projdeme společně. Zajímá nás využití, pohyb lidí a techniky, místo stavby i plánovaný rozvoj. Pokud přesné rozměry zatím neznáte, pomůžeme je určit.",
    shortText: "Využití, místo, rozměry a představa o provozu. Začínáme otázkami, které ovlivní celý návrh.",
    note: "Co pomůže: obec, orientační rozměry, fotografie nebo nákres místa.",
  },
  {
    title: "Návrh a nabídka",
    short: "Připravíme konkrétní řešení.",
    text: "Probereme vhodnou konstrukci, opláštění, vstupy a potřebné vybavení. Nabídka vymezí rozsah dodávky, cenu a předpoklady termínu.",
    shortText: "Sladíme konstrukci, opláštění i vybavení. V nabídce vymezíme rozsah dodávky a cenu.",
    note: "Co budete mít: konkrétní návrh a jasně popsaný rozsah.",
  },
  {
    title: "Příprava a montáž",
    short: "Navážeme přípravou a montáží.",
    text: "Podle dohody připravíme potřebnou dokumentaci a sladíme návaznosti. Před zahájením montáže ověříme připravenost staveniště, přístup techniky a podklad.",
    shortText: "Dokumentace, připravené staveniště a samotná hala. Vše podle dohodnutého rozsahu.",
    note: "Co si potvrdíme: dokumentaci, přípravu místa a harmonogram.",
  },
  {
    title: "Předání a další péče",
    short: "Předáme prostor k používání.",
    text: "Při předání projdeme hotové řešení a podmínky používání. Záruční podmínky, doporučená údržba i případný servis se vztahují ke konkrétní dodávce.",
    shortText: "Spolu s halou dostanete potřebné informace pro její provoz a údržbu.",
    note: "Co následuje: užívání haly a kontakt pro další potřeby.",
  },
];

export const getHall = (slug: string) => halls.find((h) => h.slug === slug);
export const getRealization = (slug: string) => realizations.find((x) => x.slug === slug);
export const hallTypeOptions = halls.map((h) => ({ value: h.slug, label: h.name }));

/** Podobné realizace: nejdřív stejná kategorie, pak nejbližší plochou. */
export const similarRealizations = (item: Realization, count = 3) =>
  realizations
    .filter((r) => r !== item)
    .sort((a, b) => Number(b.category === item.category) - Number(a.category === item.category) || Math.abs(a.areaM2 - item.areaM2) - Math.abs(b.areaM2 - item.areaM2))
    .slice(0, count);
