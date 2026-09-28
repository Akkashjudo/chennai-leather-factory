import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/custom-leather", "/wholesale", "/private-label", "/about", "/contact"];
  const lastModified = new Date();
  return [
    ...staticRoutes.map((p) => ({
      url: `${site.url}${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/products/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
