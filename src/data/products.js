export const WHATSAPP_PHONE = "919672513658";
export const WHATSAPP_DISPLAY = "+91 96725 13658";
export const INSTAGRAM_URL = "https://www.instagram.com/riwaazbyjiya?stkn=MTJ1d2pvamV2ZjAyMw==";
export const INSTAGRAM_HANDLE = "@riwaazbyjiya";
export const OFFICIAL_EMAIL = "sachdevajiya2005@gmail.com";
export const CAPSULE_VIDEO_SRC = "/videos/capsule-video.mp4";

export function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const PRODUCTS = [
  {
    id: "riwaaz-cycle-denim",
    name: "Cycle + Floral Basket Design — Denim Edition",
    slug: "cycle-floral-basket-denim",
    price: 1499,
    currency: "INR",
    images: [
      "/images/DSC4612.jpg",
      "/images/DSC4621_1.jpg"
    ],
    thumbnail: "/images/DSC4612.jpg",
    alt: "Denim-toned handcrafted jutti with colourful cycle and floral basket embroidery",
    description: "Traditional Indian craftsmanship with a playful, contemporary character — a rich denim-toned base brought to life with colourful handmade embroidery and a charming cycle-and-floral-basket motif. Completely handmade from 100% genuine leather, made to be worn well beyond occasion wear: with denim, dresses, kurtas, suits or everyday outfits.",
    highlights: [
      "100% Genuine Leather",
      "Completely Handmade",
      "Handmade Embroidery",
      "Cycle + Floral Basket Design",
      "Sizes 36–39"
    ],
    sizes: [36, 37, 38, 39],
    availability: { 36: true, 37: true, 38: true, 39: true },
    materials: "100% Genuine Leather (Upper, Lining and Sole)",
    craftsmanship: "Completely Handmade · Handmade Embroidery",
    careInstructions: "[CARE INSTRUCTIONS — CONFIRM]"
  },
  {
    id: "riwaaz-teapot-denim",
    name: "Teapot Floral Design — Denim Edition",
    slug: "teapot-floral-denim",
    price: 1499,
    currency: "INR",
    images: [
      "/images/DSC4621.jpg",
      "/images/DSC4609.jpg"
    ],
    thumbnail: "/images/DSC4621.jpg",
    alt: "Denim-toned handcrafted jutti with teapot and floral handmade embroidery",
    description: "A contemporary expression of traditional jutti craftsmanship: a rich denim-toned base with colourful handmade embroidery and a charming teapot-floral motif. Completely handmade from 100% genuine leather, designed to move effortlessly between everyday styling and special occasions.",
    highlights: [
      "100% Genuine Leather",
      "Completely Handmade",
      "Handmade Embroidery",
      "Teapot Floral Design",
      "Sizes 36–39"
    ],
    sizes: [36, 37, 38, 39],
    availability: { 36: true, 37: true, 38: true, 39: true },
    materials: "100% Genuine Leather (Upper, Lining and Sole)",
    craftsmanship: "Completely Handmade · Handmade Embroidery",
    careInstructions: "[CARE INSTRUCTIONS — CONFIRM]"
  },
  {
    id: "riwaaz-cycle-jute",
    name: "Cycle + Floral Basket Design — Jute Edition",
    slug: "cycle-floral-basket-jute",
    price: 1399,
    currency: "INR",
    images: [
      "/images/DSC4628.jpg",
      "/images/DSC4627_1.jpg"
    ],
    thumbnail: "/images/DSC4628.jpg",
    alt: "Natural jute-toned handcrafted jutti with cycle and floral basket embroidery",
    description: "An earthy, versatile interpretation of the cycle-and-floral-basket design: a natural jute-toned base as a subtle canvas for colourful handmade embroidery and the distinctive artwork. Completely handmade from 100% genuine leather, suited to everyday versatility as well as traditional occasions.",
    highlights: [
      "100% Genuine Leather",
      "Completely Handmade",
      "Handmade Embroidery",
      "Cycle + Floral Basket Design",
      "Sizes 36–39"
    ],
    sizes: [36, 37, 38, 39],
    availability: { 36: true, 37: true, 38: true, 39: true },
    materials: "100% Genuine Leather (Upper, Lining and Sole)",
    craftsmanship: "Completely Handmade · Handmade Embroidery",
    careInstructions: "[CARE INSTRUCTIONS — CONFIRM]"
  },
  {
    id: "riwaaz-teapot-jute",
    name: "Teapot Floral Design — Jute Edition",
    slug: "teapot-floral-jute",
    price: 1399,
    currency: "INR",
    images: [
      "/images/DSC4627.jpg",
      "/images/DSC4625.jpg"
    ],
    thumbnail: "/images/DSC4627.jpg",
    alt: "Natural jute-toned handcrafted jutti with floral teapot handmade embroidery",
    description: "A warm, earthy take on the teapot-floral design: a natural jute-toned base with colourful handmade embroidery and a charming floral teapot motif. Completely handmade from 100% genuine leather, bringing traditional character into an effortlessly versatile design.",
    highlights: [
      "100% Genuine Leather",
      "Completely Handmade",
      "Handmade Embroidery",
      "Teapot Floral Design",
      "Sizes 36–39"
    ],
    sizes: [36, 37, 38, 39],
    availability: { 36: true, 37: true, 38: true, 39: true },
    materials: "100% Genuine Leather (Upper, Lining and Sole)",
    craftsmanship: "Completely Handmade · Handmade Embroidery",
    careInstructions: "[CARE INSTRUCTIONS — CONFIRM]"
  }
];

export const BRAND_VALUES = [
  {
    title: "Heritage",
    body: "A craft carried through generations of Punjabi artisanship, made for the way we dress now."
  },
  {
    title: "Craftsmanship",
    body: "Completely handmade in 100% genuine leather, with embroidery worked entirely by hand."
  },
  {
    title: "Contemporary Design",
    body: "Motifs drawn with a light touch — a cycle, a teapot, a basket of flowers."
  },
  {
    title: "Everyday Elegance",
    body: "Not saved for occasions. Made for mornings, markets, weddings and everything after."
  }
];
