/**
 * 📦 产品目录管理中心
 * 
 * 后续增加/修改产品，只改这一个文件！
 * 新增产品步骤：
 *   1. 把图片放到 public/images/products/<产品名>/
 *   2. 在这个文件里添加一条产品数据
 *   3. 页面自动更新 ✅
 */

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
  sizeChart?: { label: string; values: Record<string, string> }[];
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
      { name: "Black", hex: "#111111", image: `${imgBase}/230g-washed-tee/1-black.jpg` },
      { name: "Light Gray", hex: "#d3d3d3", image: `${imgBase}/230g-washed-tee/2-light-gray.jpg` },
      { name: "Brown", hex: "#8b4513", image: `${imgBase}/230g-washed-tee/3-brown.jpg` },
      { name: "Pink", hex: "#ffc0cb", image: `${imgBase}/230g-washed-tee/4-rose.jpg` },
      { name: "Green", hex: "#228b22", image: `${imgBase}/230g-washed-tee/5-green.jpg` },
    ],
    images: {
      main: `${imgBase}/230g-washed-tee/washed-tee-model.jpg`,
      gallery: [
        `${imgBase}/230g-washed-tee/washed-tee-model.jpg`,
        `${imgBase}/230g-washed-tee/washed-tee-angle.jpg`,
        `${imgBase}/230g-washed-tee/washed-tee-front.jpg`,
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
      { label: "Bust (in)", values: { "S": "21.7", "M": "22.4", "L": "23.2", "XL": "24" } },
      { label: "Length (in)", values: { "S": "19.7", "M": "20.5", "L": "21.3", "XL": "22" } },
      { label: "Shoulder (in)", values: { "S": "16.5", "M": "17", "L": "17.5", "XL": "18" } },
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
