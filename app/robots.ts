import type { MetadataRoute } from "next";

// Static export requires force-static for route handlers
export const dynamic = "force-static";

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
      disallow: "/custom-design",
    },
    sitemap: "https://boaz-clothes.com/sitemap.xml",
  };
}
