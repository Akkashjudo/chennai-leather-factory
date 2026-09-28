# Chennai Leather Factory — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, used for canonical URLs, sitemap, OG and JSON-LD. |
| `ENQUIRY_WEBHOOK_URL` | Optional. Lead-form submissions are POSTed here as JSON (Google Apps Script, Zapier, Make, CRM…). If it's unset, the form hands the enquiry off to WhatsApp with every field prefilled. |

## Where things live

- `src/lib/site.ts`: business facts (NAP, map links, Instagram). **Edit facts only here.**
- `src/lib/whatsapp.ts`: the intent-specific WhatsApp messages (product / custom / wholesale / private label).
- `src/lib/categories.ts`: product categories, copy, SEO metadata and the image registry.
- `src/lib/seo.ts`: metadata helper and JSON-LD (Store/LocalBusiness, Organization, BreadcrumbList, Service).
- `src/components/sections/*`: the page sections (Hero, CategoryGrid, ManufacturingSection, CustomLeatherSection, PrivateLabelSection, ProductShowcase, WhyCLF, StoreLocation, InstagramSection, LeadForm, CTASection, FAQ, PageHero).
- `src/components/layout/*`: Navbar, Footer, Logo, WhatsAppButton (floating on desktop, sticky Call / Directions / WhatsApp bar on mobile).

## Asset mapping

| Asset | Used for |
| --- | --- |
| `brand/clf-monogram.png` | Official CLF logo (supplied artwork, black background removed, proportions untouched). The favicon and app icons in `src/app/` are made from the original. |
| `storefront-night.jpg` | Home hero, OG image |
| `storefront-day.jpg` | "Visit the store" sections, to help people recognise the building |
| `shoes-wall.jpg` | Shoes category, About |
| `bags-laptop.jpg` (crop) | Bags category |
| `handbags.jpg` (crop) | Women's leather tile, About |
| `wallets.jpg` (crop) | Wallets category |
| `belts.jpg` (crop) | Belts category |
| `store-aisle.jpg` | Lifestyle showcase, Wholesale |
| `craftsman-cutting.jpg` | Manufacturing section |
| `leather-cutting-detail.jpg` (crop) | Custom-jacket "Made by CLF" panel, About |

No photos were supplied for **leather jackets, Chelsea boots or accessories**, so those tiles are typographic by design (no stock or AI imagery). To add photos, drop them into `public/images/` and set `image` on the category in `src/lib/categories.ts`, plus the tile in `CategoryGrid.tsx`.

## Content rules

The site deliberately leaves out prices, MOQs, opening hours, ratings, reviews, years in business, delivery times and capacity. Add them only once the business confirms them.
