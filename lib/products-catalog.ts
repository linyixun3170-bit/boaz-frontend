/**
 * 📦 产品目录管理中心
 * 
 * 后续增加/修改产品，只改这一个文件！
 * 新增产品步骤：
 *   1. 把图片放到 public/images/products/<产品名>/
 *   2. 在这个文件里添加一条产品数据
 *   3. 页面自动更新 ✅
 */

import type { SizeChartEntry } from "./size-chart";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: "T-Shirts" | "Hoodies" | "Long Sleeves" | "Kids" | "Tank Tops";
  weight: string;
  fabric: string;
  fit: string;
  moq: number;
  priceFOB: string; // USD FOB Ningbo
  colors: { name: string; hex: string; image?: string }[];
  images: { main: string; gallery: string[] };
  tags: string[];
  sizes: string[];
  sizeChart?: SizeChartEntry[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const imgBase = "/images/products";

export const products: Product[] = [
  {
    id: "230g-washed-tee",
    name: "230gsm Washed Vintage T-Shirt",
    slug: "230g-washed-vintage",
    tagline: "Pre-washed vintage look — soft from the first wear",
    category: "T-Shirts",
    weight: "230gsm",
    fabric: "100% Cotton (washed)",
    fit: "Cropped / Relaxed",
    moq: 50,
    priceFOB: "From $3.50/unit (FOB)",
    colors: [
      { name: "Black", hex: "#111111", image: `${imgBase}/230g-washed-tee/1-黑色.webp` },
      { name: "Light Gray", hex: "#d3d3d3", image: `${imgBase}/230g-washed-tee/2-浅灰色.webp` },
      { name: "Brown", hex: "#8b4513", image: `${imgBase}/230g-washed-tee/3-棕色.webp` },
      { name: "Pink", hex: "#ffc0cb", image: `${imgBase}/230g-washed-tee/4-玫红色.webp` },
      { name: "Green", hex: "#228b22", image: `${imgBase}/230g-washed-tee/5-绿色.webp` },
    ],
    images: {
      main: `${imgBase}/230g-washed-tee/washed-tee-model.webp`,
      gallery: [
        `${imgBase}/230g-washed-tee/washed-tee-model.webp`,
        `${imgBase}/230g-washed-tee/washed-tee-angle.webp`,
        `${imgBase}/230g-washed-tee/washed-tee-front.webp`,
      ],
    },
    tags: ["Washed", "Vintage", "Cropped"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "240g-vintage-crop",
    name: "240gsm Vintage Washed Cropped T-Shirt",
    slug: "240g-vintage-washed-cropped-tee",
    tagline: "Cropped silhouette, vintage wash — relaxed fit with a modern edge",
    category: "T-Shirts",
    weight: "240gsm",
    fabric: "100% Cotton (Vintage Washed)",
    fit: "Cropped / Relaxed",
    moq: 50,
    priceFOB: "From $3.80/unit (FOB Ningbo)",
    colors: [
      { name: "White", hex: "#ffffff", image: `${imgBase}/240g-vintage-crop/flat/flat-white.webp` },
      { name: "Black", hex: "#1a1a1a", image: `${imgBase}/240g-vintage-crop/flat/flat-black.webp` },
      { name: "Charcoal", hex: "#555555", image: `${imgBase}/240g-vintage-crop/flat/flat-charcoal.webp` },
      { name: "Army Green", hex: "#4b5320", image: `${imgBase}/240g-vintage-crop/flat/flat-army.webp` },
      { name: "Brick Red", hex: "#cb4154", image: `${imgBase}/240g-vintage-crop/flat/flat-brick.webp` },
      { name: "Sage", hex: "#88b04b", image: `${imgBase}/240g-vintage-crop/flat/flat-sage.webp` },
      { name: "Cream", hex: "#f5f0e8", image: `${imgBase}/240g-vintage-crop/flat/flat-cropped-1.webp` },
      { name: "Light Blue", hex: "#8db6ce", image: `${imgBase}/240g-vintage-crop/flat/flat-cropped-2.webp` },
      { name: "Pink", hex: "#ffb6c1", image: `${imgBase}/240g-vintage-crop/flat/flat-cropped-3.webp` },
    ],
    images: {
      main: `${imgBase}/240g-vintage-crop/model/model-gray-front.webp`,
      gallery: [
        `${imgBase}/240g-vintage-crop/model/model-gray-front.webp`,
        `${imgBase}/240g-vintage-crop/model/model-beige-angle.webp`,
        `${imgBase}/240g-vintage-crop/model/model-darkgray-front.webp`,
        `${imgBase}/240g-vintage-crop/model/model-olive-front.webp`,
        `${imgBase}/240g-vintage-crop/model/model-store-display.webp`,
        `${imgBase}/240g-vintage-crop/detail/size-chart.webp`,
      ],
    },
    tags: ["New", "Cropped", "Vintage Wash", "Women's", "9 Colors"],
    sizes: ["S", "M", "L", "XL"],
    sizeChart: [
      // ⚠️ cm 值为约数，你提供精确 cm 数据后我来替换
      { label: "Bust", valuesCm: { "S": "55.1", "M": "56.9", "L": "58.9", "XL": "61.0" } },
      { label: "Length", valuesCm: { "S": "50.0", "M": "52.1", "L": "54.1", "XL": "55.9" } },
      { label: "Shoulder", valuesCm: { "S": "41.9", "M": "43.2", "L": "44.5", "XL": "45.7" } },
    ],
    isNew: true,
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category);
}

// 对主页：返回一个主打产品 + 其他精选
export function getHeroProduct(): Product {
  return products.find(p => p.isBestSeller) || products[0];
}
