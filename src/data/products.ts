export type Category = "Wool" | "Silk" | "Linen" | "Cotton";

export interface Product {
  id: string;
  name: string;
  colourway: string;
  category: Category;
  pricePerMetre: number;
  origin: string;
  mill: string;
  composition: string;
  weightGsm: number;
  widthCm: number;
  stockMetres: number;
  tags: string[];
  description: string;
  bestFor: string;
  care: string;
  image: string;
  swatch: string; // css colour used for dots / accents
}

export const CATEGORIES: ("All" | Category)[] = ["All", "Wool", "Silk", "Linen", "Cotton"];

export const PRODUCTS: Product[] = [
  {
    id: "harris-tweed-peat",
    name: "Harris Tweed",
    colourway: "Peat Smoke",
    category: "Wool",
    pricePerMetre: 68,
    origin: "Isle of Lewis, Scotland",
    mill: "Kenneth Mackenzie mill",
    composition: "100% pure new wool, hand-woven",
    weightGsm: 410,
    widthCm: 147,
    stockMetres: 14.5,
    tags: ["orb certified", "hand-woven", "heather fleck"],
    description:
      "Woven by hand at the weaver's home on the Outer Hebrides, then dyed with peat-smoked heather and lichen tones. The cloth carries the Orb mark — every metre traceable to a single loom and a single pair of hands.",
    bestFor: "Structured jackets, caps, heirloom blankets",
    care: "Dry clean only · press with a damp cloth",
    image:
      "https://image.qwenlm.ai/generated-images/22a04054-267e-4382-9307-016c921cb969/_result.png",
    swatch: "#6b5340",
  },
  {
    id: "silk-charmeuse-amber",
    name: "Silk Charmeuse",
    colourway: "Molten Amber",
    category: "Silk",
    pricePerMetre: 92,
    origin: "Como, Italy",
    mill: "Setificio Bianchi, est. 1926",
    composition: "100% mulberry silk, 19 momme",
    weightGsm: 85,
    widthCm: 140,
    stockMetres: 9,
    tags: ["deadstock", "19 momme", "liquid hand"],
    description:
      "A deadstock roll rescued from a Como atelier that dressed Milanese opera in the nineties. The charmeuse falls like warm honey — high lustre on the face, a soft matte crepe beneath. Once this bolt is gone, it is gone.",
    bestFor: "Bias-cut slips, scarves, evening blouses",
    care: "Hand wash cold · shade dry · cool iron on reverse",
    image:
      "https://image.qwenlm.ai/generated-images/d6064556-17fa-4e4b-bc57-f545d31669ab/_result.png",
    swatch: "#c98a2e",
  },
  {
    id: "belgian-linen-flax",
    name: "Belgian Linen",
    colourway: "Flax Field",
    category: "Linen",
    pricePerMetre: 54,
    origin: "Kortrijk, Belgium",
    mill: "Libeco-Lamcoe weavers",
    composition: "100% European flax, dew-retted",
    weightGsm: 245,
    widthCm: 150,
    stockMetres: 22,
    tags: ["masters of linen", "dew-retted", "slubbed"],
    description:
      "Flax grown in the Lys valley, dew-retted in the field and wet-spun into a yarn with honest slubs and a dry, cool hand. It softens with every wash and wears for decades — the cloth Belgian grandmothers hoarded.",
    bestFor: "Shirting, trousers, table linen, curtains",
    care: "Machine wash 40° · line dry · iron damp",
    image:
      "https://image.qwenlm.ai/generated-images/2d5ba65a-95b0-4103-8fe5-7a3914176e58/_result.png",
    swatch: "#c2a468",
  },
  {
    id: "selvedge-denim-midnight",
    name: "Japanese Selvedge Denim",
    colourway: "Midnight Loom",
    category: "Cotton",
    pricePerMetre: 76,
    origin: "Okayama, Japan",
    mill: "Kurabo shuttle looms",
    composition: "100% Zimbabwe cotton, rope-dyed",
    weightGsm: 475,
    widthCm: 76,
    stockMetres: 11.5,
    tags: ["14.5 oz", "rope-dyed", "shuttle loom"],
    description:
      "Woven at walking pace on 1950s Toyoda shuttle looms, rope-dyed through eight indigo vats so the core stays white and the fade tells a story. The red selvedge id line runs true along both edges.",
    bestFor: "Raw denim jeans, chore coats, tote bags",
    care: "Wash rarely, cold, inside out · never tumble",
    image:
      "https://image.qwenlm.ai/generated-images/622ce673-6cbb-4b75-a605-4c0981d1bcd3/_result.png",
    swatch: "#31435f",
  },
  {
    id: "boucle-alpaca-cloud",
    name: "Alpaca Bouclé",
    colourway: "Cloud Ivory",
    category: "Wool",
    pricePerMetre: 84,
    origin: "Biella, Italy",
    mill: "Lanificio dell'Olivo",
    composition: "62% alpaca · 27% wool · 11% nylon",
    weightGsm: 390,
    widthCm: 145,
    stockMetres: 7.5,
    tags: ["looped pile", "featherweight", "baby alpaca"],
    description:
      "Baby alpaca spun into tight little loops, then brushed just once so the pile stays springy. Weightless for its loft — a metre weighs less than a hardback — with the kind of cloud texture coats get photographed for.",
    bestFor: "Unlined coats, cocoon cardigans, cushions",
    care: "Dry clean recommended · store folded",
    image:
      "https://image.qwenlm.ai/generated-images/bed68a66-3b1e-4dda-b7be-bcdeee6f9bf7/_result.png",
    swatch: "#e8ddc8",
  },
  {
    id: "ventile-expedition",
    name: "Ventile Cotton",
    colourway: "Expedition Khaki",
    category: "Cotton",
    pricePerMetre: 64,
    origin: "St. Gallen, Switzerland",
    mill: "Stotz & Co. AG",
    composition: "100% long-staple cotton, dense plain weave",
    weightGsm: 290,
    widthCm: 152,
    stockMetres: 18,
    tags: ["weatherproof", "no membrane", "antarctic proven"],
    description:
      "The cloth that crossed Antarctica: cotton spun so fine and beaten so dense that it swells shut against rain yet breathes like a summer shirt. No coatings, no membranes — just weave physics, perfected since 1943.",
    bestFor: "Field jackets, anoraks, expedition kit",
    care: "Machine wash 30° · reproof yearly with wax",
    image:
      "https://image.qwenlm.ai/generated-images/d93e2867-88cb-4a94-8caa-20e95cb861ca/_result.png",
    swatch: "#8a7a4e",
  },
];

export const MARQUEE_TERMS = [
  "Selvedge",
  "Bouclé",
  "Jacquard",
  "Charmeuse",
  "Herringbone",
  "Momme",
  "Dew-retted",
  "Rope-dyed",
  "Shuttle loom",
  "Deadstock",
  "Slub",
  "Bias-cut",
  "Warp & weft",
  "Fulling",
];

export const MILL_NOTES = [
  {
    n: "01",
    title: "Why deadstock is not seconds",
    date: "Cutting room, №14",
    body: "Deadstock is first-quality cloth that a mill over-ran or a house closed on — never a flawed bolt. We buy it by the roll, log the provenance, and sell it before it hits landfill. When a roll ends, we say so.",
  },
  {
    n: "02",
    title: "Reading a selvedge id line",
    date: "Cutting room, №11",
    body: "The coloured thread running along a selvedge edge is the mill's signature: red for Kurabo, green for old Cone. It only exists on shuttle-loom cloth, because projectile looms cut the weft at each edge.",
  },
  {
    n: "03",
    title: "Cutting on the true bias",
    date: "Cutting room, №9",
    body: "Charmeuse wants to be cut at exactly 45° to the grain — that is where the liquid drape lives. Order 20% extra metreage for bias work, and let the cloth hang a full day before you sew.",
  },
];

export const fmtPrice = (n: number): string =>
  n % 1 === 0 ? `$${n.toLocaleString("en-US")}` : `$${n.toFixed(2)}`;

export const fmtMetres = (m: number): string =>
  `${m % 1 === 0 ? m : m.toFixed(1)} m`;

export const FREE_SHIPPING_THRESHOLD = 300;
export const SHIPPING_FLAT = 18;
export const METRE_STEP = 0.5;
