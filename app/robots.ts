import type { MetadataRoute } from "next";

// ============================================================
// 🤖 Robots.txt
// 
// 告诉搜索引擎哪些页面可以抓取，哪些不行。
// 同时提交 sitemap 位置。
// ============================================================

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: "https://boaz.apparel/sitemap.xml",
  };
}
