/** Central site config — single source of truth for brand, NAP, nav, SEO defaults. */

export const SITE = {
  name: "Eksenart Mimarlık",
  shortName: "Eksenart Mimarlık",
  // Canonical URL is also set in astro.config (site). Keep in sync.
  url: "https://mimarlik.eksenart.com",
  locale: "tr_TR",
  lang: "tr",
  // The sister brand (expo / fuar standı business).
  sister: {
    name: "Eksenart Fuar & Stand",
    url: "https://eksenart.com",
    label: "Fuar & Stand",
    blurb: "Fuar standı tasarım ve üretimi mi arıyorsunuz?",
  },
  defaultTitle:
    "Eksenart Mimarlık Ofisi | İstanbul Mimari Proje ve İç Mimarlık",
  titleTemplate: "%s | Eksenart Mimarlık",
  description:
    "Eksenart Mimarlık — İstanbul merkezli mimarlık ofisi. Mimari proje, iç mimarlık, mimari tasarım, tadilat-renovasyon ve 3D mimari görselleştirme. Fikirden projeye bütüncül mimari çözümler.",
  positioning: "Fikirden projeye, İstanbul'da bütüncül mimari.",
} as const;

export const CONTACT = {
  // NAP — keep identical everywhere (LocalBusiness + Google Business Profile).
  phone: "+90 530 120 41 82",
  phoneHref: "+905301204182",
  whatsapp: "905301204182",
  email: "info@eksenart.com",
  streetAddress: "Kısıklı Cad. No:23",
  district: "Üsküdar",
  city: "İstanbul",
  region: "İstanbul",
  postalCode: "34662",
  country: "TR",
  geo: { lat: 41.0082, lng: 28.9784 },
  hours: "Pazartesi – Cumartesi: 09:00 – 19:00",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/eksenartmimarlik",
  linkedin: "https://www.linkedin.com/company/eksenart",
} as const;

/** Primary navigation. Service hubs map to the keyword strategy. */
export const NAV: { label: string; href: string }[] = [
  { label: "Hizmetler", href: "/hizmetler/" },
  { label: "Projeler", href: "/projeler/" },
  { label: "Rehber", href: "/rehber/" },
  { label: "Stüdyo", href: "/hakkimizda/" },
  { label: "İletişim", href: "/iletisim/" },
];

/** The six service hubs (order = nav + homepage strip). */
export const SERVICE_HUBS: {
  slug: string;
  title: string;
  short: string;
}[] = [
  { slug: "mimari-proje", title: "Mimari Proje", short: "Avan, uygulama ve ruhsat projeleri." },
  { slug: "ic-mimarlik", title: "İç Mimarlık", short: "Konut, ofis ve ticari iç mekân tasarımı." },
  { slug: "anahtar-teslim-insaat", title: "Anahtar Teslim İnşaat", short: "Tasarımdan teslime müteahhitlik." },
  { slug: "tadilat-renovasyon", title: "Tadilat & Renovasyon", short: "Daire ve bina yenileme." },
  { slug: "kentsel-donusum", title: "Kentsel Dönüşüm", short: "Riskli yapı yenileme ve güçlendirme." },
  { slug: "3d-mimari-gorsellestirme", title: "3D Mimari Görselleştirme", short: "Fotogerçekçi render ve sunum." },
];
