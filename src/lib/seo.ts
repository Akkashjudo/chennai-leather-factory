import type { Metadata } from "next";
import { site } from "./site";

const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: "Chennai Leather Factory storefront, Chennai" };

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

const businessId = `${site.url}/#business`;

/** Only confirmed facts: no ratings, hours, prices or founding year. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": businessId,
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    image: `${site.url}/images/storefront-night.jpg`,
    description:
      "Leather jackets, shoes, bags, wallets, belts and accessories — retail, wholesale, customization and private-label leather manufacturing in Chennai.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, opposite Jawaharlal Nehru Stadium, next to Punjab National Bank, ${site.address.locality}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    sameAs: [site.instagram.url],
    areaServed: { "@type": "City", name: "Chennai" },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/clf-monogram.png`,
    telephone: site.phone.e164,
    sameAs: [site.instagram.url],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": businessId },
  };
}
