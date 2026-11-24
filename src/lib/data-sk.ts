// Slovenské texty obsahu. Struktura, fotky, rozměry a adresy se berou z data.ts, tady jsou jen překlady.
// Klíčem je slug, ať se nic nerozjede, když se v data.ts změní pořadí.
import type { Hall, HallGroup, RealizationCategory } from "./data";

type HallText = Pick<Hall, "name" | "short" | "tagline" | "lead" | "features" | "uses" | "prompt" | "specs"> & { alts: string[] };
type RealizationText = { title: string; kind: string; summary: string; notes: string[]; use?: string; alts: string[] };

export const skHallGroups: Record<HallGroup, { label: string; text: string }> = {
  "skladovani-vyroba": { label: "Skladovanie a výroba", text: "Sklady, logistika a výrobné prevádzky." },
  "sport-jezdectvi": { label: "Šport a jazdectvo", text: "Športoviská a kryté jazdiarne." },
  zemedelstvi: { label: "Poľnohospodárstvo", text: "Technika, zber úrody a chov." },
  "hangary-dalsi": { label: "Hangáre a ďalšie", text: "Letecké hangáre a stany." },
};

export const skHalls: Record<string, HallText> = {
  "skladove-haly": {
    name: "Skladové haly",
    short: "Tovar, materiál a logistika.",
    tagline: "Sklad navrhnutý podľa tovaru, techniky a manipulácie.",
    lead: "Sklad má uľahčovať každý pracovný deň. Spoločne navrhneme rozmery, vjazdy a opláštenie podľa toho, čo skladujete a ako s materiálom manipulujete.",
    features: [
      { title: "Brány podľa manipulačnej techniky", text: "Poloha a rozmery brán vychádzajú z vašej manipulačnej techniky a prevádzky." },
      { title: "Opláštenie podľa tovaru", text: "Plachta, plech alebo zateplené opláštenie podľa požiadaviek skladovaného tovaru." },
      { title: "Možnosť rozšírenia", text: "Pri návrhu môžeme počítať s budúcim predĺžením modulovej konštrukcie." },
    ],
    uses: ["Skladovanie tovaru a materiálu", "Logistika a expedícia", "Kryté parkovanie techniky"],
    prompt: {
      title: "Čo budete skladovať a ako sa bude tovar pohybovať?",
      text: "Pripravte si približnú výšku skladovania, rozmery techniky a požiadavky na teplotu. Pomôže aj jednoduchý nákres pozemku.",
    },
    alts: [
      "Dlhá biela skladová hala s paletami pred vjazdom",
      "Skladová hala z trapézového plechu s modrými bránami",
      "Sivá skladová hala s presklenou čelnou stenou",
    ],
  },
  "sportovni-haly": {
    name: "Športové haly",
    short: "Tréning, zápasy a voľný čas.",
    tagline: "Hala postavená okolo konkrétneho ihriska a jeho výšky.",
    lead: "Na tréning, zápasy aj voľný čas. Športovú halu pripravíme okolo konkrétneho športu, potrebnej svetlej výšky a podmienok celoročnej alebo sezónnej prevádzky.",
    features: [
      { title: "Voľná hracia plocha", text: "Dispozícia bez vnútorných podpier podľa zvoleného konštrukčného systému." },
      { title: "Presvetlenie a vetranie", text: "Riešenie presvetlenia, vetrania a prípadného otvárania bočných stien." },
      { title: "Zázemie podľa prevádzky", text: "Návrh vstupov, vykurovania a nadväznosti na existujúci športový areál." },
    ],
    uses: ["Tenis a padel", "Volejbal a plážový volejbal", "Viacúčelové športoviská"],
    prompt: {
      title: "Aký šport sa bude v hale hrať?",
      text: "Dôležitá je veľkosť ihriska vrátane bezpečnostných odstupov, potrebná výška a to, či chcete halu používať aj v zime.",
    },
    alts: [
      "Plážový volejbal v montovanej športovej hale",
      "Korčuľovanie na ľadovej ploche pod montovanou halou",
      "Vodný slalom v zastrešenom kanáli",
    ],
  },
  "jezdecke-haly": {
    name: "Jazdecké haly",
    short: "Kryté jazdiarne a tréningové areály.",
    tagline: "Krytá jazdiareň na tréning za každého počasia.",
    lead: "Krytá jazdiareň vytvára priestor na pravidelný tréning. Návrh prispôsobíme rozmerom jazdeckej plochy, prístupu do areálu a požiadavkám na svetlo a vetranie.",
    features: [
      { title: "Prehľadná plocha", text: "Voľný priestor s konštrukciou navrhnutou pre konkrétnu jazdiareň." },
      { title: "Prirodzené svetlo", text: "Svetlopriepustné opláštenie môže obmedziť potrebu denného svietenia." },
      { title: "Otvárateľné bočné steny", text: "Možnosť otvorených alebo čiastočne otvárateľných bočných stien." },
    ],
    uses: ["Kryté jazdiarne", "Tréningové areály", "Zastrešenie jazdeckých plôch"],
    prompt: {
      title: "Ako sa má jazdiareň prepojiť s vaším areálom?",
      text: "Okrem rozmerov je užitočné poznať pohyb koní, umiestnenie vstupov a predstavu o podklade a údržbe jazdeckej plochy.",
    },
    alts: [
      "Parkúrový skok v krytej jazdiarni",
      "Jazdecká hala s oblúkovými oknami v čelnej stene",
      "Dlhá jazdecká hala vedľa vonkajšej jazdiarne",
    ],
  },
  "letecke-hangary": {
    name: "Letecké hangáre",
    short: "Lietadlá, ultraľahké lietadlá a zázemie.",
    tagline: "Hangár s bránami podľa rozpätia krídel a výšky lietadla.",
    lead: "Pri hangári rozhoduje každý prejazd a každý meter. Konštrukciu a brány navrhneme podľa rozpätia krídel, výšky lietadla a spôsobu manipulácie na ploche.",
    features: [
      { title: "Brány podľa leteckej techniky", text: "Typ brán a ich svetlé rozmery podľa konkrétnej leteckej techniky." },
      { title: "Parkovanie a pohyb techniky", text: "Priestor na parkovanie, pohyb techniky aj prístup obsluhy." },
      { title: "Vstupy a vybavenie", text: "Vstupy pre personál, osvetlenie, vetranie a ďalšie prvky podľa prevádzky." },
    ],
    uses: ["Súkromné a ultraľahké lietadlá", "Aerokluby", "Servisné a skladovacie zázemie"],
    prompt: {
      title: "Akú techniku potrebujete umiestniť?",
      text: "Napíšte typ a rozmery lietadla, počet strojov a plánované využitie. Dôležité sú aj rozmery dostupnej plochy a príjazd.",
    },
    alts: [
      "Malé lietadlo zaparkované v montovanom hangári",
      "Hangár so zeleným opláštením spodnej časti",
      "Hangár opláštený trapézovým plechom",
    ],
  },
  "vyrobni-haly": {
    name: "Výrobné haly",
    short: "Dielne, montáž a výroba.",
    tagline: "Hala navrhnutá podľa výrobného toku a technológií.",
    lead: "Výrobná hala má nadväzovať na vašu prevádzku. Pri návrhu vychádzame z rozmiestnenia technológií, pohybu materiálu a požiadaviek na pracovné prostredie.",
    features: [
      { title: "Vjazdy podľa výrobného toku", text: "Rozmery, vjazdy a vstupy s ohľadom na výrobný tok." },
      { title: "Opláštenie podľa potrieb", text: "Možnosti zateplenia, presvetlenia a vetrania podľa charakteru výroby." },
      { title: "Koordinácia s ďalšími profesiami", text: "Koordinácia stavebnej časti s osvetlením, vykurovaním a ďalšími profesiami." },
    ],
    uses: ["Montáž a kompletizácia", "Výrobné prevádzky", "Dielne a technické zázemie"],
    prompt: {
      title: "Ako bude vyzerať bežný deň vo vašej výrobe?",
      text: "Uveďte typ výroby, hlavné technológie a požiadavky na prostredie. Predbežná dispozícia pomôže nájsť vhodné riešenie.",
    },
    alts: [
      "Zateplená výrobná hala z tmavých sendvičových panelov",
      "Výrobná hala so sekcionálnymi bránami",
      "Dlhá výrobná hala so vstupným portálom",
    ],
  },
  "zemedelske-haly": {
    name: "Poľnohospodárske haly",
    short: "Technika, zber úrody a zásoby.",
    tagline: "Zázemie pre techniku, zber úrody a uskladnenie plodín.",
    lead: "Pre techniku, zber úrody aj každodennú prácu. Poľnohospodárske haly pripravujeme s dôrazom na praktické vjazdy, vetranie a nadväznosť na hospodársky areál.",
    features: [
      { title: "Prejazd pre techniku", text: "Rozmery brán a výška haly podľa používaných strojov." },
      { title: "Vetranie podľa využitia", text: "Opláštenie a otvorené časti prispôsobené uskladňovanému materiálu." },
      { title: "Kotvenie a podklad", text: "Návrh konštrukcie, kotvenia a podkladu pre konkrétne miesto." },
    ],
    uses: ["Garážovanie poľnohospodárskej techniky", "Skladovanie plodín a materiálu", "Zastrešené hospodárske priestory"],
    prompt: {
      title: "Čo má hala chrániť a akú techniku používate?",
      text: "Opíšte plánované využitie a uveďte rozmery najväčších strojov. Pri skladovaní plodín záleží aj na spôsobe vetrania a manipulácie.",
    },
    alts: [
      "Poľnohospodárska hala so žltým opláštením a otvorenou maštaľou",
      "Kŕmenie hovädzieho dobytka v otvorenej poľnohospodárskej hale",
      "Dlhá poľnohospodárska hala s otvorenými bočnými stenami",
    ],
  },
  "party-stany": {
    name: "Párty stany",
    short: "Spoločenské akcie aj dlhodobé využitie.",
    tagline: "Stany na svadby, firemné a spoločenské akcie.",
    lead: "Profesionálne zastrešenie pre spoločenské akcie aj dlhodobé využitie. Veľkosť a vybavenie zladíme s počtom hostí, programom a charakterom miesta.",
    features: [
      { title: "Veľkosť podľa akcie", text: "Modulové rozmery a varianty bočných stien." },
      { title: "Okná, podlaha a osvetlenie", text: "Možnosti transparentných častí, podlahy a osvetlenia." },
      { title: "Vstupy, vetranie a vykurovanie", text: "Riešenie vstupov, vetrania a prípadného vykurovania." },
    ],
    uses: ["Hotely a gastronomické prevádzky", "Obecné a firemné akcie", "Spoločenské a kultúrne podujatia"],
    prompt: {
      title: "Na aké akcie a ako často budete stan používať?",
      text: "Napíšte predpokladaný počet hostí, spôsob usporiadania a či riešite kúpu alebo prenájom. Konkrétne možnosti overí obchodné oddelenie.",
    },
    alts: [
      "Presklený párty stan nasvietený pri večernej akcii",
      "Biely párty stan s oblúkovými oknami na trávniku",
      "Párty stan pri jazierku s fontánou",
    ],
  },
  "nuzkove-stany": {
    name: "Nožnicové stany",
    short: "Rýchle zastrešenie na trhy a akcie.",
    tagline: "Stan, ktorý postavíte do minúty a odveziete osobným autom.",
    lead: "Ľahká hliníková konštrukcia s nožnicovým systémom. Stan rozložíte za chvíľu, menšie rozmery postaví aj jeden človek a plachty potlačíme vaším logom.",
    features: [
      { title: "Postavíte do 60 sekúnd", text: "Push systém konštrukciu rýchlo rozloží, zloží aj zaistí. Výšku nastavíte podľa potreby." },
      { title: "Potlač podľa vás", text: "Strechu aj bočnice potlačíme sublimačnou tlačou. Na bočnice sa dajú aj vymeniteľné bannery na suchý zips." },
      { title: "Stabilná konštrukcia", text: "Šesťhranné hliníkové profily 40 alebo 50 mm, eloxované proti korózii, s oceľovými pätkami na pevné ukotvenie." },
    ],
    uses: ["Predajné a výstavné stánky", "Firemné a športové akcie", "Trhy a festivaly"],
    prompt: {
      title: "Koľko stanov a v akom rozmere potrebujete?",
      text: "Napíšte rozmer, počet stanov a či chcete potlač. Pošlite logo alebo grafiku a pripravíme návrh.",
    },
    specs: [
      { k: "Rozmery", v: "2 × 2, 2 × 3, 2 × 4, 3 × 3, 3 × 4,5, 3 × 6, 4 × 4, 4 × 6, 4 × 8 a 5 × 5 m. Stan 4 × 6 m aj bez stredových nôh." },
      { k: "Konštrukcia", v: "Hexagon 40 (profil 40 mm, stena 1,5 mm) alebo Hexagon 50 (profil 50 mm, stena 2 mm), push systém, nastaviteľná výška." },
      { k: "Opláštenie", v: "100 % PES s úpravou proti plesni, špineniu a UV, 200 až 270 g/m² s potlačou, 300 až 450 g/m² bez potlače." },
      { k: "Farby a potlač", v: "17 základných farieb, digitálna sublimačná tlač so svetlostálosťou 6 až 7 z 8." },
      { k: "V balení", v: "Prepravný vak, kotviace klince a návod." },
      { k: "Príslušenstvo", v: "Bočnice plné, s oknami aj dverami, polobočnice, záťažové dosky a pieskové vaky, dažďové odkvapy, bannery." },
    ],
    alts: [
      "Nožnicové stany Pivovaru Chmelnice s pivnými setmi na námestí",
      "Biely nožnicový stan s potlačou Rossmann",
      "Nožnicový stan Erste Leasing na vonkajšej výstave",
      "Nožnicový stan Mendelovej univerzity s celoplošnou potlačou",
      "Modrý nožnicový stan s potlačou Stachema na tráve",
    ],
  },
};

export const skHallSpecs: { k: string; v: string }[] = [
  { k: "Rozmery", v: "Šírka až 60 m podľa potreby, dĺžka bez obmedzenia v moduloch po 5 m." },
  { k: "Konštrukcia", v: "Hliníkové zliatiny 6005 AT6, 6061 T6 a 6082 T6, alebo žiarovo zinkovaná oceľ S235JR a S355JR." },
  { k: "Opláštenie", v: "Technická plachta PES s PVC 670 až 900 g/m² (Thermo 1 300 g/m²), trapézový plech, alebo sendvičové panely PUR/PIR." },
  { k: "Plachta", v: "Nepremokavá, prepúšťa denné svetlo, odolná voči UV, teplotná stálosť −30 až +70 °C, horľavosť DIN 4102 B1." },
  { k: "Výpočet", v: "Konštrukcia podľa EN 13782, zaťaženie snehom podľa EN 1991-1-3 a vetrom podľa EN 1991-1-4 pre miesto stavby." },
  { k: "Vybavenie", v: "Brány posuvné, krídlové aj sekcionálne, dvere vrátane protipožiarnych, okná, vetranie, antikondenzačné membrány, elektroinštalácia a vykurovanie." },
];

export const skRealizationCategories: Record<RealizationCategory, string> = {
  skladove: "Skladové haly",
  sportovni: "Športové a jazdecké haly",
  zemedelske: "Poľnohospodárske haly",
  hangary: "Hangáre",
  eventove: "Párty stany",
  viceucelove: "Viacúčelové haly",
};

export const skRealizations: Record<string, RealizationText> = {
  "skladova-hala-steti": {
    title: "Skladová hala v Štětí",
    kind: "Skladová hala",
    summary: "Veľkorysá skladovacia plocha s rozlohou 1 125 m². Montovaná hala s pôdorysom 25 × 45 m na skladové využitie.",
    notes: ["Plocha 1 125 m²", "Šírka 25 m", "Dĺžka 45 m"],
    alts: ["Skladová hala v Štětí pozdĺž železničnej vlečky", "Montáž oceľovej konštrukcie haly v Štětí so žeriavom", "Prázdny interiér skladovej haly v Štětí"],
  },
  "skladove-haly-mosnov": {
    title: "Dve skladové haly v Mošnove",
    kind: "Skladové haly",
    summary: "Dvojica veľkokapacitných skladových hál. Každá z hál ponúka pôdorysnú plochu 960 m² a rozmery 16 × 60 × 7 m.",
    notes: ["Dve samostatné haly", "Celková pôdorysná plocha 1 920 m²", "Rozmery jednej haly 16 × 60 × 7 m"],
    alts: ["Dve biele skladové haly v Mošnove", "Skladové haly v Mošnove za oplotením areálu", "Montáž konštrukcie haly v Mošnove z plošiny"],
  },
  "skladova-hala-litvinov": {
    title: "Skladová hala v Litvínove",
    kind: "Skladová hala",
    summary: "Skladová hala s pôdorysom 20 × 45 m. Fotografie ukazujú konštrukčné riešenie a výslednú podobu haly v areáli.",
    notes: ["Plocha 900 m²", "Skladovacie využitie", "Rozmery 20 × 45 × 5 m"],
    alts: ["Biela skladová hala v Litvínove na mokrom asfalte", "Konštrukcia strechy haly v Litvínove počas montáže", "Bočný pohľad na dlhú halu v Litvínove"],
  },
  "skladova-hala-opatovice": {
    title: "Skladová hala v Opatoviciach",
    kind: "Skladová hala",
    summary: "Skladové zázemie s plochou 800 m² v Opatoviciach nad Labem. Ukážka montovanej haly s rozmermi 20 × 40 × 5 m.",
    notes: ["Plocha 800 m²", "Skladovacie využitie", "Rozmery 20 × 40 × 5 m"],
    alts: ["Skladová hala v Opatoviciach nad Labem", "Stavba konštrukcie haly v Opatoviciach s manipulátorom", "Opláštenie haly v Opatoviciach z pracovnej plošiny"],
  },
  "skladova-hala-vamberk": {
    title: "Skladová hala vo Vamberku",
    kind: "Skladová hala",
    summary: "Skladová hala s rozmermi 15 × 25 × 4 m. Fotografie zachytávajú podobu stavby a jej začlenenie do existujúceho areálu.",
    notes: ["Skladovacie využitie", "Plocha 375 m²", "Rozmery 15 × 25 × 4 m"],
    alts: ["Skladová hala vo Vamberku na trávnatej ploche", "Oceľová konštrukcia haly vo Vamberku počas montáže", "Hala vo Vamberku vedľa existujúcej budovy"],
  },
  "skladova-hala-veselicko": {
    title: "Skladová hala vo Veselíčku",
    kind: "Skladová hala",
    summary: "Kompaktná skladová hala s plochou 216 m². Príklad zastrešenia menšej skladovacej plochy s prehľadnou dispozíciou.",
    notes: ["Skladovacie využitie", "Plocha 216 m²", "Výška 4 m"],
    alts: ["Sivá skladová hala vo Veselíčku s dvoma bránami", "Montážnici pri stavbe konštrukcie vo Veselíčku", "Opláštenie haly vo Veselíčku z pracovnej plošiny"],
  },
  "hala-zakamenne": {
    title: "Viacúčelová hala v Zákamennom",
    kind: "Viacúčelová hala",
    summary: "Montovaná hala s praktickým usporiadaním a priamym prístupom z areálu. Ukážka riešenia na viacúčelové využitie.",
    notes: ["Modulová konštrukcia", "Rozmery 12 × 24 × 4 m", "Realizácia na Slovensku"],
    alts: ["Viacúčelová hala v Zákamennom s presklenou čelnou stenou", "Hala v Zákamennom v areáli firmy", "Stavba konštrukcie haly v Zákamennom"],
  },
  "skladova-hala-lhotka-nad-becvou": {
    title: "Skladová hala v Lhotke nad Bečvou",
    kind: "Skladová hala",
    summary:
      "Montovaná hala 15 × 30 × 6 m spája steny z trapézového plechu s úspornou PVC strechou vo farebnom prevedení. Modulová konštrukcia umožňuje halu neskôr predĺžiť bez zložitých stavebných úprav.",
    notes: ["Steny z trapézového plechu, PVC strecha", "Brány a vysoká svetlá výška", "Pripravené na predĺženie"],
    alts: [
      "Skladová hala s tmavým plechovým opláštením v Lhotke nad Bečvou pri západe slnka",
      "Opláštenie haly v Lhotke nad Bečvou počas montáže",
      "Oceľová konštrukcia haly v Lhotke nad Bečvou",
    ],
  },
  "skladova-hala-libeznice": {
    title: "Skladová hala v Líbezniciach",
    kind: "Skladová hala",
    summary:
      "Skladová hala 20 × 30 × 4 m s potlačou plachty, ktorá z nej robí aj reklamnú plochu. Svetlopriepustné opláštenie znižuje náklady na svietenie a priemyselné sekcionálne brány zrýchľujú manipuláciu.",
    notes: ["Potlač plachty s logom", "Svetlopriepustné opláštenie", "Priemyselné sekcionálne brány"],
    alts: [
      "Biela skladová hala s potlačou loga v Líbezniciach a paletami pred vjazdom",
      "Bočný pohľad na skladovú halu v Líbezniciach",
      "Montáž konštrukcie haly v Líbezniciach so žeriavom a plošinami",
    ],
  },
  "sportovni-hala-brno": {
    title: "Športová hala v Brne",
    kind: "Športová hala",
    summary:
      "Zastrešené športovisko na plážový volejbal. Konštrukcia bez stredových stĺpov necháva celú plochu voľnú na hru. V zime sa hala vykuruje, v lete sa dajú zložiť bočnice a vznikne vzdušný prístrešok.",
    notes: ["Hrací priestor bez stredových stĺpov", "Vykurovanie v zime, otvorené bočnice v lete", "Plachty s potlačou partnerov"],
    alts: ["Hráči plážového volejbalu v športovej hale v Brne", "Interiér haly v Brne s otvorenou strešnou konštrukciou", "Večerný pohľad na nasvietenú športovú halu v Brne"],
  },
  "hala-alza-praha": {
    title: "Hala s pultovou strechou pre Alzu",
    kind: "Atypická hala",
    summary: "Manipulačný sklad s pultovou strechou pre Alzu v Prahe. Hala 15 × 40 m je na jednej strane vysoká 4,5 m, na druhej 9 m.",
    notes: ["Pultová strecha, výška 4,5 až 9 m", "Manipulačný sklad", "Montáž za 4 dni"],
    use: "Manipulačný sklad",
    alts: ["Hala s pultovou strechou pre Alzu", "Hala s pultovou strechou pre Alzu, ďalší pohľad", "Hala s pultovou strechou pre Alzu, ďalší pohľad", "Hala s pultovou strechou pre Alzu, ďalší pohľad"],
  },
  "skladova-hala-dsv-pavlov": {
    title: "Skladová hala pre DSV Solutions",
    kind: "Skladová hala",
    summary: "Skladová hala 18 × 40 m pre logistickú firmu DSV Solutions v Pavlove. Plocha 720 m², montáž za dva dni.",
    notes: ["Plocha 720 m²", "Logistický sklad", "Montáž za 2 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala pre DSV Solutions", "Skladová hala pre DSV Solutions, ďalší pohľad", "Skladová hala pre DSV Solutions, ďalší pohľad", "Skladová hala pre DSV Solutions, ďalší pohľad"],
  },
  "skladova-hala-mahle-mnichovo-hradiste": {
    title: "Skladová hala pre MAHLE Behr",
    kind: "Skladová hala",
    summary: "Skladová hala 18 × 31 m pre závod MAHLE Behr v Mnichovom Hradišti. Montáž trvala dva dni.",
    notes: ["Plocha 558 m²", "Sklad pri výrobnom závode", "Montáž za 2 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala pre MAHLE Behr", "Skladová hala pre MAHLE Behr, ďalší pohľad", "Skladová hala pre MAHLE Behr, ďalší pohľad"],
  },
  "skladova-hala-heineken-hurbanovo": {
    title: "Skladová hala pre Heineken Slovensko",
    kind: "Skladová hala",
    summary: "Skladová hala pre pivovar Heineken v Hurbanove. Rozmery 14 × 20 m a bočná výška 6 m, montáž za dva dni.",
    notes: ["Bočná výška 6 m", "Areál pivovaru", "Realizácia na Slovensku"],
    use: "Skladovanie",
    alts: ["Skladová hala pre Heineken Slovensko", "Skladová hala pre Heineken Slovensko, ďalší pohľad", "Skladová hala pre Heineken Slovensko, ďalší pohľad", "Skladová hala pre Heineken Slovensko, ďalší pohľad"],
  },
  "skladova-hala-kongsberg-vrable": {
    title: "Skladová hala pre Kongsberg Automotive",
    kind: "Skladová hala",
    summary: "Skladová hala na materiál pre Kongsberg Automotive vo Vrábľoch. Bočná výška 7 m, montáž za štyri dni.",
    notes: ["Plocha 576 m²", "Bočná výška 7 m", "Realizácia na Slovensku"],
    use: "Skladovanie materiálu",
    alts: ["Skladová hala pre Kongsberg Automotive", "Skladová hala pre Kongsberg Automotive, ďalší pohľad", "Skladová hala pre Kongsberg Automotive, ďalší pohľad"],
  },
  "skladova-hala-dolny-kubin": {
    title: "Skladová hala v Dolnom Kubíne",
    kind: "Skladová hala",
    summary: "Skladová hala na výrobky pre firmu ITOSS v Dolnom Kubíne. Opláštenie v červenej farbe, montáž za dva dni.",
    notes: ["Farebné opláštenie", "Bočná výška 6 m", "Realizácia na Slovensku"],
    use: "Skladovanie výrobkov",
    alts: ["Skladová hala v Dolnom Kubíne", "Skladová hala v Dolnom Kubíne, ďalší pohľad", "Skladová hala v Dolnom Kubíne, ďalší pohľad"],
  },
  "skladova-hala-kysucke-nove-mesto": {
    title: "Skladová hala v Kysuckom Novom Meste",
    kind: "Skladová hala",
    summary: "Skladová hala 15 × 15 m pre firmu ZIZIN. Plechové opláštenie so zeleným pruhom, postavená za jediný deň.",
    notes: ["Plechové opláštenie", "Montáž za 1 deň", "Realizácia na Slovensku"],
    use: "Skladovanie",
    alts: ["Skladová hala v Kysuckom Novom Meste", "Skladová hala v Kysuckom Novom Meste, ďalší pohľad", "Skladová hala v Kysuckom Novom Meste, ďalší pohľad"],
  },
  "skladova-hala-algeco-presov": {
    title: "Skladová hala pre Algeco v Prešove",
    kind: "Skladová hala",
    summary: "Kompaktná skladová hala 10 × 15 m pre Algeco v Prešove, postavená za jeden deň.",
    notes: ["Plocha 150 m²", "Montáž za 1 deň", "Realizácia na Slovensku"],
    use: "Skladovanie",
    alts: ["Skladová hala pre Algeco v Prešove", "Skladová hala pre Algeco v Prešove, ďalší pohľad"],
  },
  "skladova-hala-oma-cerna-hora": {
    title: "Skladová hala pre OMA CZ",
    kind: "Skladová hala",
    summary: "Skladová hala na plastové obaly pre OMA CZ v Černej Hore. Montáž 12 × 26 m trvala dva dni.",
    notes: ["Plocha 312 m²", "Sklad obalov", "Montáž za 2 dni"],
    use: "Skladovanie plastových obalov",
    alts: ["Skladová hala pre OMA CZ", "Skladová hala pre OMA CZ, ďalší pohľad", "Skladová hala pre OMA CZ, ďalší pohľad", "Skladová hala pre OMA CZ, ďalší pohľad"],
  },
  "skladova-hala-gienger-ostrava": {
    title: "Skladová hala pre GIENGER v Ostrave",
    kind: "Skladová hala",
    summary: "Veľkoplošný sklad 20 × 60 m pre veľkoobchod GIENGER. Plocha 1 200 m², montáž za dva dni.",
    notes: ["Plocha 1 200 m²", "Dĺžka 60 m", "Montáž za 2 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala pre GIENGER v Ostrave", "Skladová hala pre GIENGER v Ostrave, ďalší pohľad", "Skladová hala pre GIENGER v Ostrave, ďalší pohľad"],
  },
  "skladova-hala-kelcany": {
    title: "Skladová hala v Kelčanoch",
    kind: "Skladová hala",
    summary: "Skladová hala 25 × 35 m pre firmu Luve Plast. Široký priestor bez vnútorných podpier, montáž za tri dni.",
    notes: ["Šírka 25 m", "Plocha 875 m²", "Montáž za 3 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala v Kelčanoch", "Skladová hala v Kelčanoch, ďalší pohľad", "Skladová hala v Kelčanoch, ďalší pohľad", "Skladová hala v Kelčanoch, ďalší pohľad"],
  },
  "skladova-hala-maly-rohozec": {
    title: "Skladová hala v Malom Rohozci",
    kind: "Skladová hala",
    summary: "Dlhá skladová hala 17 × 75 m pre výrobcu obalov Mypak. Plocha 1 275 m², montáž za štyri dni.",
    notes: ["Dĺžka 75 m", "Plocha 1 275 m²", "Montáž za 4 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala v Malom Rohozci", "Skladová hala v Malom Rohozci, ďalší pohľad"],
  },
  "skladove-haly-liban": {
    title: "Dve skladové haly v Libáni",
    kind: "Skladové haly",
    summary: "Dve vysoké skladové haly na plastové súčiastky: 15 × 50 m a 20 × 32 m, obe s bočnou výškou 8,5 m.",
    notes: ["Dve haly, spolu 1 390 m²", "Bočná výška 8,5 m", "Sklad súčiastok"],
    use: "Skladovanie plastových súčiastok",
    alts: ["Dve skladové haly v Libáni", "Dve skladové haly v Libáni, ďalší pohľad", "Dve skladové haly v Libáni, ďalší pohľad", "Dve skladové haly v Libáni, ďalší pohľad"],
  },
  "skladova-hala-kladno": {
    title: "Skladová hala v Kladne",
    kind: "Skladová hala",
    summary: "Skladová hala 20 × 50 m pre firmu Solvent. Plocha 1 000 m², montáž za tri dni.",
    notes: ["Plocha 1 000 m²", "Šírka 20 m", "Montáž za 3 dni"],
    use: "Skladovanie",
    alts: ["Skladová hala v Kladne", "Skladová hala v Kladne, ďalší pohľad", "Skladová hala v Kladne, ďalší pohľad"],
  },
  "hala-prefa-veseli-nad-moravou": {
    title: "Montovaná hala pre Prefa Brno",
    kind: "Skladová hala",
    summary: "Montovaná skladová hala pre Prefa Brno vo Veselí nad Moravou. Plechové opláštenie, postavená za jeden deň.",
    notes: ["Plechové opláštenie", "Plocha 192 m²", "Montáž za 1 deň"],
    use: "Skladovanie",
    alts: ["Montovaná hala pre Prefa Brno", "Montovaná hala pre Prefa Brno, ďalší pohľad", "Montovaná hala pre Prefa Brno, ďalší pohľad", "Montovaná hala pre Prefa Brno, ďalší pohľad"],
  },
  "zemedelska-hala-stary-jicin": {
    title: "Poľnohospodárska hala v Starom Jičíne",
    kind: "Poľnohospodárska hala",
    summary: "Dlhá poľnohospodárska hala 12 × 70 m na ustajnenie a chov teliat. Montáž trvala tri dni.",
    notes: ["Ustajnenie teliat", "Dĺžka 70 m", "Montáž za 3 dni"],
    use: "Ustajnenie a chov teliat",
    alts: ["Poľnohospodárska hala v Starom Jičíne", "Poľnohospodárska hala v Starom Jičíne, ďalší pohľad", "Poľnohospodárska hala v Starom Jičíne, ďalší pohľad", "Poľnohospodárska hala v Starom Jičíne, ďalší pohľad"],
  },
  "letecky-hangar-nachod": {
    title: "Letecký hangár pre Aeroklub Náchod",
    kind: "Letecký hangár",
    summary: "Hangár 25 × 15 m na lietadlá Aeroklubu Náchod na letisku vo Vysokove. Montáž za tri dni.",
    notes: ["Šírka 25 m pre lietadlá", "Letisko Vysokov", "Montáž za 3 dni"],
    use: "Sklad lietadiel",
    alts: ["Letecký hangár pre Aeroklub Náchod", "Letecký hangár pre Aeroklub Náchod, ďalší pohľad", "Letecký hangár pre Aeroklub Náchod, ďalší pohľad", "Letecký hangár pre Aeroklub Náchod, ďalší pohľad"],
  },
  "letecky-hangar-vyskov": {
    title: "Letecký hangár vo Vyškove",
    kind: "Letecký hangár",
    summary: "Hangár pre dve lietadlá firmy Swissgreen. Zelené plechové opláštenie, montáž za tri dni.",
    notes: ["Pre 2 lietadlá", "Plechové opláštenie", "Montáž za 3 dni"],
    use: "Garáž pre 2 lietadlá",
    alts: ["Letecký hangár vo Vyškove", "Letecký hangár vo Vyškove, ďalší pohľad"],
  },
  "sportovni-hala-nymburk": {
    title: "Zastrešené klzisko v Nymburku",
    kind: "Športová hala",
    summary: "Hala 22 × 42 m nad klziskom v Nymburku. Plocha 924 m² bez vnútorných podpier, montáž za tri dni.",
    notes: ["Zastrešené klzisko", "Plocha 924 m²", "Montáž za 3 dni"],
    use: "Klzisko",
    alts: ["Zastrešené klzisko v Nymburku", "Zastrešené klzisko v Nymburku, ďalší pohľad", "Zastrešené klzisko v Nymburku, ďalší pohľad", "Zastrešené klzisko v Nymburku, ďalší pohľad"],
  },
  "jezdecka-hala-pavlovice": {
    title: "Jazdecká hala v Pavloviciach u Přerova",
    kind: "Športová hala",
    summary: "Krytá jazdiareň 30 × 40 m pre kone. Plocha 1 200 m² bez vnútorných podpier, montáž za päť dní.",
    notes: ["Krytá jazdiareň", "Šírka 30 m", "Montáž za 5 dní"],
    use: "Jazdiareň pre kone",
    alts: ["Jazdecká hala v Pavloviciach u Přerova", "Jazdecká hala v Pavloviciach u Přerova, ďalší pohľad", "Jazdecká hala v Pavloviciach u Přerova, ďalší pohľad"],
  },
  "party-stan-horni-dvur": {
    title: "Párty stan pre Hotel Horní Dvůr",
    kind: "Párty stan",
    summary: "Párty stan 10 × 20 m s presklenými bočnicami na akcie hotela Horní Dvůr. Postavený za jeden deň.",
    notes: ["Presklené bočnice", "Plocha 200 m²", "Montáž za 1 deň"],
    use: "Eventové akcie",
    alts: ["Párty stan pre Hotel Horní Dvůr", "Párty stan pre Hotel Horní Dvůr, ďalší pohľad", "Párty stan pre Hotel Horní Dvůr, ďalší pohľad"],
  },
};

export const skFaq = [
  {
    q: "Koľko stojí montovaná hala?",
    a: "Cena závisí od rozmerov, miesta stavby, zaťaženia, konštrukcie, opláštenia a vybavenia. Na konkrétnu ponuku stačí začať účelom, približnou veľkosťou a obcou, kde má hala stáť.",
  },
  {
    q: "Ako dlho trvá dodanie a montáž?",
    a: "Halu na kľúč staviame v termínoch už od štyroch týždňov. Presný termín závisí od typu haly, rozsahu dodávky, pripravenosti podkladu a potrebnej dokumentácie. Samotná montáž haly trvá zvyčajne 1 až 3 dni. Čas prípravy, dodania a samotnej montáže vám rozpíšeme v konkrétnej ponuke.",
  },
  {
    q: "Musím poznať presné rozmery?",
    a: "Nemusíte. Napíšte, čo má byť vnútri a ako chcete priestor používať. S výberom vhodných rozmerov a usporiadania vám pomôžeme.",
  },
  {
    q: "Čo musí byť pripravené na pozemku?",
    a: "Záleží na podloží, spôsobe kotvenia a zaťažení konkrétnej haly. Pred montážou treba spoločne overiť podklad, prístup techniky a pripravenosť miesta.",
  },
  {
    q: "Zabezpečíte projektovú dokumentáciu?",
    a: "Projektová dokumentácia patrí medzi ponúkané služby. Potrebný rozsah a nadväznosť na ďalšie podklady si potvrdíme podľa konkrétneho zámeru.",
  },
  {
    q: "Môže byť hala zateplená?",
    a: "Áno, podľa konštrukcie a využitia sa dá zvoliť zodpovedajúce izolačné riešenie. Prejdeme požadovanú teplotu, vlhkosť, vetranie aj plánovaný spôsob vykurovania.",
  },
  {
    q: "Aká je záruka?",
    a: "Pri vybraných riešeniach ponúkame záruku až 6 rokov. Konkrétnu dĺžku, rozsah a podmienky pre konštrukciu, opláštenie a ďalšie časti uvádzame v ponuke a zmluve.",
  },
];

export const skSteps = [
  {
    title: "Najprv vaše potreby",
    short: "Pochopíme zadanie.",
    text: "Vaše zadanie si prejdeme spoločne. Zaujíma nás využitie, pohyb ľudí a techniky, miesto stavby aj plánovaný rozvoj. Ak presné rozmery zatiaľ nepoznáte, pomôžeme ich určiť.",
    shortText: "Využitie, miesto, rozmery a predstava o prevádzke. Začíname otázkami, ktoré ovplyvnia celý návrh.",
    note: "Čo pomôže: obec, orientačné rozmery, fotografie alebo nákres miesta.",
  },
  {
    title: "Návrh a ponuka",
    short: "Pripravíme riešenie.",
    text: "Prejdeme vhodnú konštrukciu, opláštenie, vstupy a potrebné vybavenie. Ponuka vymedzí rozsah dodávky, cenu a predpokladaný termín.",
    shortText: "Zladíme konštrukciu, opláštenie aj vybavenie. V ponuke vymedzíme rozsah dodávky a cenu.",
    note: "Čo budete mať: konkrétny návrh a jasne opísaný rozsah.",
  },
  {
    title: "Príprava a montáž",
    short: "Príprava a montáž.",
    text: "Podľa dohody pripravíme potrebnú dokumentáciu a zladíme nadväznosti. Pred začatím montáže overíme pripravenosť staveniska, prístup techniky a podklad.",
    shortText: "Dokumentácia, pripravené stavenisko a samotná hala. Všetko podľa dohodnutého rozsahu.",
    note: "Čo si potvrdíme: dokumentáciu, prípravu miesta a harmonogram.",
  },
  {
    title: "Odovzdanie a ďalšia starostlivosť",
    short: "Odovzdanie priestoru.",
    text: "Pri odovzdaní prejdeme hotové riešenie a podmienky používania. Záručné podmienky, odporúčaná údržba aj prípadný servis sa vzťahujú na konkrétnu dodávku.",
    shortText: "Spolu s halou dostanete potrebné informácie na jej prevádzku a údržbu.",
    note: "Čo nasleduje: používanie haly a kontakt pre ďalšie potreby.",
  },
];

export const skContactRoles: Record<string, string> = {
  "Prodej hal": "Predaj hál",
  Pronájem: "Prenájom",
  Projektant: "Projektant",
  Účetní: "Účtovníčka",
};
