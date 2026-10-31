// All editable site copy and portfolio data lives here.
// Each look's images follow the pattern assets/looks/<id>-<kind>.<ext>.

export const studio = {
  name: "The Snazzy Smeargle",
  descriptor: "An independent digital fashion atelier",
  tagline: "Custom characters. Distinct identities.",
  email: "daniellujiarun@gmail.com",
  founder: "Daniel",
  story:
    "The Snazzy Smeargle began as an independent custom Minecraft skin design business. I designed original character skins, recruited and managed a small creative team, worked directly with clients, and grew the studio into a profitable operation.",
  stats: [
    { value: "80+", label: "Custom skins delivered to clients by the studio" },
    { value: "40+", label: "Skins personally designed by Daniel" },
    { value: "$2,000+", label: "Profit generated" },
  ],
  team: [
    { name: "Daniel", role: "Founder · Designer · Creative lead" },
    { name: "Era", role: "Designer" },
    { name: "Waffles", role: "Designer" },
    { name: "reyforn", role: "Designer" },
  ],
  closing: "Every character deserves an identity.",
};

// layout: "collage" | "band" | "torn"   theme: "light" | "dark"
// tone = background wash, accent = the look's signature colour (taken from the skin itself)
export const looks = [
  {
    id: "wizard",
    title: "Mushroom Wizard",
    client: "@TheKroNket",
    designer: "Daniel",
    layout: "collage",
    theme: "light",
    tone: "#E7E2D6",
    accent: "#9B2B23",
    images: { scene: "In-game screenshot of the wizard beneath a giant mushroom", backdrop: "Illustrated backdrop of woodland mushrooms and flowers" },
    tags: ["mushroom", "wizard"],
  },
  {
    id: "mecha",
    title: "Gundam",
    client: "@Ruilji",
    designer: "Daniel",
    layout: "band",
    theme: "dark",
    tone: "#121010",
    accent: "#D7A72A",
    band: "#7E1A1A",
    images: { ref: "Client reference art of a winged gold mecha", scene: "In-game screenshot of the Gold Mecha beside a red dragon", backdrop: "Backdrop of a red and white mecha" },
  },
  {
    id: "invincible",
    title: "Invincible",
    client: "@Tremono1",
    designer: "Daniel",
    layout: "torn",
    theme: "light",
    tone: "#ECE6D9",
    accent: "#1D7FB8",
    images: { ref: "Client reference: Invincible cover art", backdrop: "Backdrop of a burning city" },
    before: "The client’s previous skin, before the glow-up",
  },
  {
    id: "sunflower",
    title: "Sunflower",
    client: "@boneblush",
    designer: "Daniel",
    layout: "collage",
    theme: "light",
    tone: "#EEE8DA",
    accent: "#7D8A5C",
    images: { scene: "In-game screenshot in a lantern-lit cabin", backdrop: "Backdrop of a sunflower field at dusk" },
    tags: ["sunflower", "crown"],
  },
  {
    id: "lavender",
    title: "Kaytein",
    client: "@kaytein",
    designer: "Era",
    layout: "band",
    theme: "light",
    tone: "#EBE7EE",
    accent: "#3A3142",
    band: "#3A3142",
    images: { ref: "Client reference illustration of a lavender-haired character in a waistcoat", backdrop: "Backdrop of a city at night" },
  },
  {
    id: "detective",
    title: "The Commissioner",
    client: "@wauful",
    designer: "Waffles",
    layout: "torn",
    theme: "light",
    tone: "#E9E2D7",
    accent: "#6E5642",
    images: { ref: "Client reference comic art of a moustached commissioner in a trench coat", backdrop: "Backdrop of a wood-panelled library" },
  },
  {
    id: "shrine",
    title: "Monster Hunter",
    client: "@Caketus0",
    designer: "Era",
    layout: "collage",
    theme: "light",
    tone: "#EDE5DF",
    accent: "#A3292B",
    images: { scene: "In-game screenshot at a shrine gate", backdrop: "Backdrop of a crimson temple city" },
    tags: ["eyepatch", "crimson"],
  },
  {
    id: "horns",
    title: "Zani",
    client: "@ryuyus",
    designer: "reyforn",
    layout: "band",
    theme: "dark",
    tone: "#16130F",
    accent: "#B8423B",
    band: "#2C2420",
    images: { ref: "Client reference illustration of a white-haired horned character" },
  },
];

// The real Build-A-Skin process, as described to clients.
export const process = [
  {
    step: "Planning",
    text: "The client shares an idea and reference images.",
    quote: "Mushroom Wizard with Beard — High Detail",
    images: [
      { src: "assets/process/brief-1.webp", alt: "Reference painting of a mushroom-capped wizard in a forest" },
      { src: "assets/process/brief-2.webp", alt: "Reference illustration of a mushroom character with a staff" },
      { src: "assets/process/brief-3.webp", alt: "Reference Minecraft skin in a dark robe with gold trim" },
      { src: "assets/process/brief-4.webp", alt: "Reference fantasy character in red and gold robes" },
    ],
  },
  {
    step: "Tweaking",
    text: "We send a draft. The client gives feedback, and we refine it until they’re satisfied.",
    quote: "Add more hair! Make the clothes more yellow! Increase texture!",
  },
  {
    step: "Delivery",
    text: "The client receives the final skin, ready to wear in-game.",
  },
];
