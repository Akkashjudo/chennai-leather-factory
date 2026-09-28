/**
 * Single source of truth for business facts (NAP), links and navigation.
 * Only confirmed information lives here — do not add prices, hours,
 * ratings, years or quantities unless the business supplies them.
 */

export const site = {
  name: "Chennai Leather Factory",
  shortName: "CLF",
  // TODO: replace with the live domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chennaileatherfactory.com",
  description:
    "Leather products, customization, wholesale and private-label manufacturing in Chennai.",
  phone: {
    display: "080726 50043",
    raw: "08072650043",
    e164: "+918072650043",
  },
  // Assumes the store phone is also the WhatsApp number.
  whatsappNumber: "918072650043",
  address: {
    line1: "Gate 1, 67, Raja Muthiah Rd",
    landmark: "Opp. Jawaharlal Nehru Stadium",
    near: "Next to Punjab National Bank",
    locality: "Periyamedu",
    area: "Jag Jevan Ram Nagar, Poongavanapuram",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600003",
    country: "IN",
    full: "Gate 1, 67, Raja Muthiah Rd, opposite Jawaharlal Nehru Stadium, next to Punjab National Bank, Periyamedu, Chennai, Tamil Nadu 600003",
  },
  geo: { lat: 13.0852751, lng: 80.2701653 },
  mapsUrl:
    "https://www.google.com/maps/place/Chennai+Leather+Factory/@13.0852751,80.2675904,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5265efef84b0ef:0x8c3d227a81338760!8m2!3d13.0852751!4d80.2701653!16s%2Fg%2F11m75_y73r",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Chennai+Leather+Factory%2C+67+Raja+Muthiah+Rd%2C+Periyamedu%2C+Chennai+600003",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Chennai%20Leather%20Factory%2C%20Raja%20Muthiah%20Rd%2C%20Periyamedu%2C%20Chennai&ll=13.0852751,80.2701653&z=17&output=embed",
  instagram: {
    handle: "@chennaileatherfactory",
    url: "https://www.instagram.com/chennaileatherfactory",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Custom Leather", href: "/custom-leather" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Private Label", href: "/private-label" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  { label: "Retail", href: "/products" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Custom Leather", href: "/custom-leather" },
  { label: "Private Label", href: "/private-label" },
] as const;
