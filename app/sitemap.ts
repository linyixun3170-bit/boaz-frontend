import type { MetadataRoute } from "next";

// Static export requires force-static for route handlers
export const dynamic = "force-static";

// ============================================================
// 🗺️ 动态站点地图
// 
// Next.js 15 原生支持。自动提交给搜索引擎。
// 后续新增页面只需在这里加一条记录。
// ============================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://boazclothes.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/wholesale`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/why-boaz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Phase 2: 博客页面（预留）
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.7,
    // },
  ];
}
