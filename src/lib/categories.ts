export type CategoryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Category = {
  slug: string;
  name: string;
  /** Plural noun used in prefilled WhatsApp messages. */
  enquiryNoun: string;
  tagline: string;
  intro: string;
  types: { name: string; id?: string }[];
  image?: CategoryImage;
  metaTitle: string;
  metaDescription: string;
  customizable?: boolean;
};

export const images = {
  storefrontNight: {
    src: "/images/storefront-night.jpg",
    alt: "Chennai Leather Factory storefront lit up at night on Raja Muthiah Road, opposite Jawaharlal Nehru Stadium",
    width: 1600,
    height: 2133,
  },
  storefrontDay: {
    src: "/images/storefront-day.jpg",
    alt: "Chennai Leather Factory building by day on Raja Muthiah Road, Periyamedu, Chennai",
    width: 900,
    height: 1600,
  },
  shoesWall: {
    src: "/images/shoes-wall.jpg",
    alt: "Wall of leather formal shoes, loafers and derbies in black, tan and brown at Chennai Leather Factory",
    width: 906,
    height: 1600,
  },
  storeAisle: {
    src: "/images/store-aisle.jpg",
    alt: "Store aisle lined with leather handbags, travel bags and a long rack of leather belts",
    width: 910,
    height: 1600,
  },
  craftsman: {
    src: "/images/craftsman-cutting.jpg",
    alt: "A CLF craftsman hand-cutting burgundy leather panels on the workshop table",
    width: 908,
    height: 1600,
  },
  leatherDetail: {
    src: "/images/leather-cutting-detail.jpg",
    alt: "Close-up of burgundy leather pieces being cut to pattern in the CLF workshop",
    width: 628,
    height: 490,
  },
  bagsLaptop: {
    src: "/images/bags-laptop.jpg",
    alt: "Leather backpacks and laptop bags in black, tan and brown displayed on shelves",
    width: 910,
    height: 930,
  },
  wallets: {
    src: "/images/wallets.jpg",
    alt: "Leather wallets and folios in brown, tan and black",
    width: 910,
    height: 450,
  },
  handbags: {
    src: "/images/handbags.jpg",
    alt: "Leather handbags and round sling bags in red, beige, blue and grey",
    width: 906,
    height: 760,
  },
  belts: {
    src: "/images/belts.jpg",
    alt: "A long rack of leather belts in black, brown and tan",
    width: 906,
    height: 900,
  },
} satisfies Record<string, CategoryImage>;

export const categories: Category[] = [
  {
    slug: "jackets",
    name: "Leather Jackets",
    enquiryNoun: "leather jackets",
    tagline: "Biker, casual and custom-made jackets.",
    intro:
      "Leather jackets for riding, everyday wear and occasions — and if you have a design in mind, we can discuss making one to your reference, fit and colour.",
    types: [
      { name: "Biker jackets" },
      { name: "Casual leather jackets" },
      { name: "Custom jackets from your reference" },
    ],
    metaTitle: "Leather Jackets in Chennai | Biker, Casual & Custom",
    metaDescription:
      "Leather jackets in Chennai — biker, casual and custom leather jackets made to your reference. Visit Chennai Leather Factory opposite Jawaharlal Nehru Stadium.",
    customizable: true,
  },
  {
    slug: "shoes",
    name: "Leather Shoes",
    enquiryNoun: "leather shoes",
    tagline: "Formal shoes, loafers and Chelsea boots.",
    intro:
      "Formal shoes, loafers, derbies and Chelsea boots in black, tan and brown leather — see the full wall in store and try them on.",
    types: [
      { name: "Formal shoes" },
      { name: "Loafers" },
      { name: "Chelsea boots", id: "chelsea-boots" },
      { name: "Casual leather shoes" },
    ],
    image: images.shoesWall,
    metaTitle: "Leather Shoes in Chennai | Formal Shoes & Chelsea Boots",
    metaDescription:
      "Leather formal shoes, loafers and Chelsea boots at Chennai Leather Factory. Retail and wholesale, opposite Jawaharlal Nehru Stadium, Chennai.",
  },
  {
    slug: "bags",
    name: "Leather Bags",
    enquiryNoun: "leather bags",
    tagline: "Laptop bags, travel bags, backpacks and handbags.",
    intro:
      "Laptop bags and office briefcases, travel bags, backpacks, handbags and slings — for work, travel and everyday carry.",
    types: [
      { name: "Laptop bags" },
      { name: "Travel bags" },
      { name: "Backpacks" },
      { name: "Handbags & purses", id: "womens" },
      { name: "Sling bags" },
    ],
    image: images.bagsLaptop,
    metaTitle: "Leather Bags in Chennai | Laptop, Travel & Handbags",
    metaDescription:
      "Leather laptop bags, travel bags, backpacks and handbags at Chennai Leather Factory. Retail, wholesale and private-label enquiries welcome.",
  },
  {
    slug: "wallets",
    name: "Wallets",
    enquiryNoun: "leather wallets",
    tagline: "Wallets, card holders and folios.",
    intro:
      "Leather wallets and folios for everyday carry and gifting — a popular choice for corporate and wholesale orders.",
    types: [{ name: "Men's wallets" }, { name: "Women's purses" }, { name: "Folios & card holders" }],
    image: images.wallets,
    metaTitle: "Leather Wallets in Chennai | Wallets & Purses",
    metaDescription:
      "Leather wallets, purses and folios at Chennai Leather Factory, Chennai. Buy in store or enquire for wholesale and corporate quantities.",
  },
  {
    slug: "belts",
    name: "Belts",
    enquiryNoun: "leather belts",
    tagline: "Formal and casual leather belts.",
    intro: "A full rack of leather belts in black, brown and tan — formal and casual styles.",
    types: [{ name: "Formal belts" }, { name: "Casual belts" }],
    image: images.belts,
    metaTitle: "Leather Belts in Chennai | Formal & Casual",
    metaDescription:
      "Leather belts in black, brown and tan at Chennai Leather Factory. Retail and wholesale, opposite Jawaharlal Nehru Stadium, Chennai.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    enquiryNoun: "leather accessories",
    tagline: "Keychains and small leather goods.",
    intro:
      "Keychains and other small leather goods — ask us about what's in store, or about accessories for gifting and corporate orders.",
    types: [{ name: "Keychains" }, { name: "Small leather goods" }, { name: "Corporate gifting" }],
    metaTitle: "Leather Accessories in Chennai | Keychains & Gifting",
    metaDescription:
      "Leather keychains and small leather goods at Chennai Leather Factory. Enquire for gifting, corporate and wholesale orders.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
