
/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one-line-edit center.
 *  Project name, X handle, pinned post, supply, marketplace…
 *  retune it here, it applies everywhere.
 * ─────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  /* ── identity ─────────────────────────────────────────── */
  projectName: "Dynohoods",
  handle: "@Dynohoods",
  handleRaw: "Dynohoods",
  tagline: "DYNOHOODS",
  description:
    "Adopt the Dyno Hoods, the last surviving dinosaurs on Robinhood, and save the Earth!",

  /* ── social / pinned post ─────────────────────────────── */
  pinnedPostUrl: "https://x.com/dubbed90s/status/2094406669694378284",
  pinnedPostStatusId: "2094406669694378284",

  /* ── mint stats ───────────────────────────────────────── */
  supply: 5555,
  supplyDisplay: "5,555",
  mintStatus: "WHITELIST OPEN", // ─ swap to "MINTING NOW" / "SOLD OUT" when that happens
  chainName: "Robinhood Chain",
  chainNote: "",

  /* ── marketplace ─────────────────────────────────────── */
  marketplace: { name: "OpenSea", url: "" }, // ← add URL once the listing is live

  /* ── contract (hidden until deployed) ─────────────────── */
  contractAddress: "", // ← fill after deploy; pill appears in the TopBar

  /* ── media. Empty strings = fallbacks render instead. ──── */
  heroVideo: {
    mp4: "", // e.g. "/hero.mp4"
    webm: "", // e.g. "/hero.webm"
    poster: "", // e.g. "/hero-poster.jpg"
  },
  /* slides: drop real paths into `src` and the carousel uses image cards */
  collectionSlides: [
    { id: "moss-hide", num: "01", title: "Moss Hide", trait: "Body pattern", src: "/first-look/01.jpg" },
    { id: "molten-horns", num: "02", title: "Molten Horns", trait: "Headgear", src: "/first-look/02.jpg" },
    { id: "swamp-ambush", num: "03", title: "Swamp Ambush", trait: "Background", src: "/first-look/03.jpg" },
    { id: "feather-frill", num: "04", title: "Feather Frill", trait: "Neck frill", src: "/first-look/04.jpg" },
    { id: "bone-keeper", num: "05", title: "Bone Keeper", trait: "Accessory", src: "/first-look/05.jpg" },
    { id: "alpha-marker", num: "06", title: "Alpha Marking", trait: "Rarity marker", src: "/first-look/06.jpg" },
  ] as const,

  /* ── docs / lore (empty url = coming-soon card) ────────── */
  docs: {
    whitepaper: {
      title: "Whitepaper",
      desc: "Mint mechanics, trait odds, treasury split, the whole fossil record.",
      url: "", // ← whitepaper / PDF link
    },
    lore: {
      title: "Lore",
      desc: "How the swamp got flooded, and why the dinos never left.",
      url: "", // ← lore doc link
    },
    roadmap: {
      title: "Roadmap",
      desc: "Mint → utility → staked territory → whatever the herd demands next.",
      url: "", // ← roadmap link
    },
  },

  tokenDisclaimer: "",
  disclaimer: "",
} as const;

/**
 * ─────────────────────────────────────────────────────────────
 *  SOCIAL INTENT LINKS
 * ─────────────────────────────────────────────────────────────
 */
export const socialLinks = {
  follow: `https://x.com/intent/follow?screen_name=${siteConfig.handleRaw}`,
  like: siteConfig.pinnedPostUrl,
  reply: siteConfig.pinnedPostUrl,
  quote: `https://x.com/intent/post?text=${encodeURIComponent(
    `tagging two bandits for the crew: ${siteConfig.pinnedPostUrl}`,
  )}`,
} as const;

/**
 * ─────────────────────────────────────────────────────────────
 *  THEME PALETTE — deep jungle green / swamp black base,
 *  amber-gold accent, bone-white text, blood-orange errors,
 *  teal glow for focus. Centralized: retune here.
 * ─────────────────────────────────────────────────────────────
 */
export const themeColors = {
  background: "#040B08", // swamp black-green
  surface: "#07150F", // sunken moss
  card: "rgba(255, 255, 255, 0.02)",
  border: "rgba(244, 237, 224, 0.12)",
  borderSubtle: "#12261B", // moss line
  foreground: "#FFFFFF",
  muted: "#F3F3F3",
  subtle: "#D0D0D0",
  primary: "#E8A33D", // amber gold
  primaryFg: "#1A1203", // near-black on gold
  danger: "#FF5A33", // blood orange
  teal: "#40E0C0", // swamp glow
  emerald: "#34D399",
} as const;

/**
 * ─────────────────────────────────────────────────────────────
 *  FONTS — chunky arcade display + clean geometric sans body
 * ─────────────────────────────────────────────────────────────
 */
export const fontFamilies: Record<string, string[]> = {
  sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
  inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
  arcade: ["var(--font-arcade)", "Press Start 2P", "Courier New", "monospace"],
  mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
} as const;

/**
 * ─────────────────────────────────────────────────────────────
 *  WHITELIST TASKS — dino-voiced. Self-attested vs link-verified.
 * ─────────────────────────────────────────────────────────────
 */
export const TASKS = [
  {
    id: "follow",
    num: "01",
    name: "Follow",
    instruction: "Follow the pack so you hear the herd before the herd hears you.",
    actionLabel: "Follow the pack",
    attested: "self", // X doesn't expose follow data to third parties
  },
  {
    id: "like",
    num: "02",
    name: "Like",
    instruction: "Like the pinned post to mark your claim on the territory.",
    actionLabel: "Open pinned post",
    attested: "self",
  },
  {
    id: "reply",
    num: "03",
    name: "Reply",
    instruction:
      "Reply to the pinned post and say which dino you'd run the swamp with. Paste your reply link back here.",
    actionLabel: "Open pinned post",
    attested: "link",
  },
  {
    id: "quote",
    num: "04",
    name: "Quote",
    instruction:
      "Quote the pinned post and tag two people you'd run a crew with. Paste your quote link back here.",
    actionLabel: "Compose quote post",
    attested: "link",
  },
] as const;

export type TaskId = (typeof TASKS)[number]["id"];

export const SITE_METADATA = {
  title: `${siteConfig.projectName} — Whitelist Open`,
  description:
    `5,555 Dyno Hoods on ${siteConfig.chainName}. ` +
    "Complete the checklist, verify your wallet, claim your spot before the stampede.",
  metadataBase: new URL("https://dynohoods.example"),
  openGraph: {
    title: `${siteConfig.projectName} — Whitelist Open`,
    description: "Follow. Like. Reply. Quote. Then claim your nest.",
  },
};