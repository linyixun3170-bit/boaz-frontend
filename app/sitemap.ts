import type { MetadataRoute } from "next";
import { products } from "@/lib/products-catalog";
import { blogPosts } from "@/lib/blog-posts";

export const dynamic = "force-static";

const baseUrl = "https://boaz-clothes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/wholesale`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/custom`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/why-boaz`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  // Product pages
  const productPages = products.map((p) => ({
    url: `${baseUrl}/wholesale/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  // Blog pages
  const blogPages = [
    { url: `${baseUrl}/journal`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...blogPosts.map((p) => ({
      url: `${baseUrl}/journal/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(p.date + "T00:00:00Z"),
    })),
  ];

  return [...staticPages, ...productPages, ...blogPages];
}
