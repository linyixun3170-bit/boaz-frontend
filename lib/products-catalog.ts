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
    id: "280g-heavy-tee",
    name: "280gsm Heavyweight T-Shirt",
    slug: "280g-heavyweight-t-shirt",
    tagline: "Premium weight, 23 colors — the ultimate blank canvas",
    category: "T-Shirts",
    weight: "280gsm",
    fabric: "100% Combed Cotton",
    fit: "Regular / Relaxed",
    moq: 50,
    priceFOB: "From $4.50/unit (FOB)",
    colors: [
      { name: "Coconut White", hex: "#f5f0e8", image: `${imgBase}/280g-heavy-tee/sku-12-椰果白.jpg` },
      { name: "Vintage Black", hex: "#111111", image: `${imgBase}/280g-heavy-tee/sku-11-复古黑.jpg` },
      { name: "Royal Blue", hex: "#4169e1", image: `${imgBase}/280g-heavy-tee/sku-5-宝蓝色.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/280g-heavy-tee/sku-6-深灰色.jpg` },
      { name: "Gray Black", hex: "#36454f", image: `${imgBase}/280g-heavy-tee/sku-7-灰黑色.jpg` },
      { name: "Light Coffee", hex: "#c3b091", image: `${imgBase}/280g-heavy-tee/sku-1-浅咖色.jpg` },
      { name: "Cream Beige", hex: "#f5f0e8", image: `${imgBase}/280g-heavy-tee/sku-13-米驼色.jpg` },
      { name: "Wine Red", hex: "#722f37", image: `${imgBase}/280g-heavy-tee/sku-10-酒红色.jpg` },
      { name: "Forest Green", hex: "#4b5320", image: `${imgBase}/280g-heavy-tee/sku-21-森林绿.jpg` },
      { name: "Khaki", hex: "#c3b091", image: `${imgBase}/280g-heavy-tee/sku-2-卡其色.jpg` },
    ],
    images: {
      main: `${imgBase}/280g-heavy-tee/280g-model.jpg`,
      gallery: [
        `${imgBase}/280g-heavy-tee/280g-front.jpg`,
        `${imgBase}/280g-heavy-tee/280g-angle.jpg`,
        `${imgBase}/280g-heavy-tee/280g-model.jpg`,
        `${imgBase}/280g-heavy-tee/280g-folded.jpg`,
      ],
    },
    tags: ["Best Seller", "23 Colors", "Screen Print Ready"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "36", "M": "38", "L": "40", "XL": "42", "2XL": "44", "3XL": "46" } },
      { label: "Length (in)", values: { "S": "27", "M": "28", "L": "29", "XL": "30", "2XL": "31", "3XL": "32" } },
      { label: "Shoulder (in)", values: { "S": "16.5", "M": "17", "L": "17.5", "XL": "18", "2XL": "18.5", "3XL": "19" } },
      { label: "Sleeve (in)", values: { "S": "8", "M": "8.5", "L": "9", "XL": "9.5", "2XL": "10", "3XL": "10.5" } },
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "360g-crewneck",
    name: "360gsm Washed Crewneck Sweatshirt",
    slug: "360g-washed-crewneck",
    tagline: "Heavyweight washed cotton — vintage feel, built to last",
    category: "Hoodies",
    weight: "360gsm",
    fabric: "100% Heavyweight Cotton (washed)",
    fit: "Oversized / Relaxed",
    moq: 50,
    priceFOB: "From $10.00/unit (FOB)",
    colors: [
            { name: "Black", hex: "#111111", image: `${imgBase}/360g-crewneck/sku-1-黑色.jpg` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/360g-crewneck/sku-3-灰色.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/360g-crewneck/sku-5-深灰色.jpg` },
      { name: "Coffee", hex: "#6f4e37", image: `${imgBase}/360g-crewneck/sku-4-咖啡色.jpg` },
      { name: "Army Green", hex: "#4b5320", image: `${imgBase}/360g-crewneck/sku-6-墨绿色.jpg` },
    ],
    images: {
      main: `${imgBase}/360g-crewneck/360g-front.jpg`,
      gallery: [
        `${imgBase}/360g-crewneck/360g-front.jpg`,
        `${imgBase}/360g-crewneck/360g-angle.jpg`,
        `${imgBase}/360g-crewneck/360g-model.jpg`,
        `${imgBase}/360g-crewneck/360g-back.jpg`,
      ],
    },
    tags: ["Heavyweight", "Washed Finish", "Winter"],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "M": "40", "L": "42", "XL": "44", "2XL": "46", "3XL": "48" } },
      { label: "Length (in)", values: { "M": "27", "L": "28", "XL": "29", "2XL": "30", "3XL": "31" } },
      { label: "Shoulder (in)", values: { "M": "18", "L": "18.5", "XL": "19", "2XL": "19.5", "3XL": "20" } },
      { label: "Sleeve (in)", values: { "M": "8.5", "L": "9", "XL": "9.5", "2XL": "10", "3XL": "10.5" } },
    ],
    isNew: true,
  },
  {
    id: "180g-classic-tee",
    name: "180gsm Classic Crewneck T-Shirt",
    slug: "180g-classic-crewneck",
    tagline: "Lightweight everyday essential — 10 colors in stock",
    category: "T-Shirts",
    weight: "180gsm",
    fabric: "100% Combed Ring-Spun Cotton",
    fit: "Regular",
    moq: 50,
    priceFOB: "From $1.20/unit (FOB)",
    colors: [
            { name: "White", hex: "#ffffff", image: `${imgBase}/180g-tee/sku-white.jpg` },
      { name: "Black", hex: "#111111", image: `${imgBase}/180g-tee/sku-black.jpg` },
      { name: "Navy", hex: "#1a2744", image: `${imgBase}/180g-tee/sku-navy.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/180g-tee/sku-dark-gray.jpg` },
      { name: "Royal Blue", hex: "#4169e1", image: `${imgBase}/180g-tee/sku-royal-blue.jpg` },
      { name: "Red", hex: "#cc0000", image: `${imgBase}/180g-tee/sku-red.jpg` },
      { name: "Army Green", hex: "#4b5320", image: `${imgBase}/180g-tee/sku-army-green.jpg` },
      { name: "Light Pink", hex: "#ffb6c1", image: `${imgBase}/180g-tee/sku-light-pink.jpg` },
      { name: "Heather Gray", hex: "#b0b0b0", image: `${imgBase}/180g-tee/sku-heather-gray.jpg` },
      { name: "Sand", hex: "#c3b091", image: `${imgBase}/180g-tee/sku-sand.jpg` },
    ],
    images: {
      main: `${imgBase}/180g-tee/180g-front.jpg`,
      gallery: [
        `${imgBase}/180g-tee/180g-front.jpg`,
        `${imgBase}/180g-tee/180g-angle.jpg`,
        `${imgBase}/180g-tee/180g-folded.jpg`,
        `${imgBase}/180g-tee/180g-detail.jpg`,
      ],
    },
    tags: ["Best Seller", "10 Colors", "DTG Ready"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "34", "M": "36", "L": "38", "XL": "40", "2XL": "42" } },
      { label: "Length (in)", values: { "S": "26", "M": "27", "L": "28", "XL": "29", "2XL": "30" } },
      { label: "Shoulder (in)", values: { "S": "16", "M": "16.5", "L": "17", "XL": "17.5", "2XL": "18" } },
      { label: "Sleeve (in)", values: { "S": "7.5", "M": "8", "L": "8.5", "XL": "9", "2XL": "9.5" } },
    ],
    isFeatured: true,
  },
  {
    id: "260g-american-tee",
    name: "260gsm American Streetwear T-Shirt",
    slug: "260g-american-streetwear",
    tagline: "Oversized drop shoulder — streetwear fit, premium feel",
    category: "T-Shirts",
    weight: "260gsm",
    fabric: "100% Combed Cotton",
    fit: "Oversized / Drop Shoulder",
    moq: 50,
    priceFOB: "From $3.80/unit (FOB)",
    colors: [
            { name: "White", hex: "#ffffff", image: `${imgBase}/260g-heavy-tee/sku-1-白色.jpg` },
      { name: "Black", hex: "#111111", image: `${imgBase}/260g-heavy-tee/sku-2-黑色.jpg` },
      { name: "Carbon Gray", hex: "#808080", image: `${imgBase}/260g-heavy-tee/sku-3-碳灰.jpg` },
      { name: "Navy", hex: "#1a2744", image: `${imgBase}/260g-heavy-tee/sku-4-藏青色.jpg` },
      { name: "Brick Red", hex: "#cb4154", image: `${imgBase}/260g-heavy-tee/sku-5-砖红.jpg` },
      { name: "Khaki", hex: "#c3b091", image: `${imgBase}/260g-heavy-tee/sku-6-卡其.jpg` },
      { name: "Sage Green", hex: "#88b04b", image: `${imgBase}/260g-heavy-tee/sku-7-灰绿.jpg` },
      { name: "Cream", hex: "#f5f0e8", image: `${imgBase}/260g-heavy-tee/sku-8-杏色.jpg` },
    ],
    images: {
      main: `${imgBase}/260g-heavy-tee/260g-front.jpg`,
      gallery: [
        `${imgBase}/260g-heavy-tee/260g-front.jpg`,
        `${imgBase}/260g-heavy-tee/260g-model.jpg`,
        `${imgBase}/260g-heavy-tee/260g-angle.jpg`,
      ],
    },
    tags: ["Oversized", "Drop Shoulder", "Streetwear"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "38", "M": "40", "L": "42", "XL": "44", "2XL": "46", "3XL": "48", "4XL": "50" } },
      { label: "Length (in)", values: { "S": "28", "M": "29", "L": "30", "XL": "31", "2XL": "32", "3XL": "33", "4XL": "34" } },
      { label: "Shoulder (in)", values: { "S": "17", "M": "17.5", "L": "18", "XL": "18.5", "2XL": "19", "3XL": "19.5", "4XL": "20" } },
      { label: "Sleeve (in)", values: { "S": "8.5", "M": "9", "L": "9.5", "XL": "10", "2XL": "10.5", "3XL": "11", "4XL": "11.5" } },
    ],
    isNew: true,
  },
  {
    id: "220g-heavy-tee",
    name: "220gsm Relaxed Fit T-Shirt",
    slug: "220g-relaxed-fit",
    tagline: "Mid-weight comfort — relaxed silhouette, 18 colors",
    category: "T-Shirts",
    weight: "220gsm",
    fabric: "100% Cotton",
    fit: "Relaxed / Drop Shoulder",
    moq: 50,
    priceFOB: "From $2.80/unit (FOB)",
    colors: [
            { name: "White", hex: "#ffffff", image: `${imgBase}/220g-heavy-tee/sku-1-白色.jpg` },
      { name: "Black", hex: "#111111", image: `${imgBase}/220g-heavy-tee/sku-4-黑色.jpg` },
      { name: "Light Gray", hex: "#d3d3d3", image: `${imgBase}/220g-heavy-tee/sku-8-浅灰色.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/220g-heavy-tee/sku-9-深灰色.jpg` },
      { name: "Royal Blue", hex: "#4169e1", image: `${imgBase}/220g-heavy-tee/sku-6-宝蓝色.jpg` },
    ],
    images: {
      main: `${imgBase}/220g-heavy-tee/220g-front.jpg`,
      gallery: [
        `${imgBase}/220g-heavy-tee/220g-front.jpg`,
        `${imgBase}/220g-heavy-tee/220g-model.jpg`,
        `${imgBase}/220g-heavy-tee/220g-angle.jpg`,
      ],
    },
    tags: ["Mid-Weight", "18 Colors", "Relaxed Fit"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "36", "M": "38", "L": "40", "XL": "42", "2XL": "44" } },
      { label: "Length (in)", values: { "S": "26", "M": "27", "L": "28", "XL": "29", "2XL": "30" } },
      { label: "Shoulder (in)", values: { "S": "16.5", "M": "17", "L": "17.5", "XL": "18", "2XL": "18.5" } },
      { label: "Sleeve (in)", values: { "S": "8", "M": "8.5", "L": "9", "XL": "9.5", "2XL": "10" } },
    ],
  },
  {
    id: "kids-210g-tee",
    name: "210gsm Kids Drop Shoulder T-Shirt",
    slug: "210g-kids-tee",
    tagline: "Made for little ones — soft cotton, fun colors",
    category: "Kids",
    weight: "210gsm",
    fabric: "100% Cotton",
    fit: "Regular / Drop Shoulder",
    moq: 50,
    priceFOB: "From $1.00/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Pink", hex: "#ffc0cb" },
      { name: "Blue", hex: "#4169e1" },
      { name: "Green", hex: "#228b22" },
    ],
    images: {
      main: `${imgBase}/210g-kids-tee/kids-front.jpg`,
      gallery: [
        `${imgBase}/210g-kids-tee/kids-front.jpg`,
        `${imgBase}/210g-kids-tee/kids-model.jpg`,
        `${imgBase}/210g-kids-tee/kids-angle.jpg`,
      ],
    },
    tags: ["Kids", "30 Colors", "Soft Cotton"],
    sizes: ["2T", "3T", "4T", "5-6Y", "7-8Y", "10-12Y"],
    sizeChart: [
      { label: "Chest (in)", values: { "2T": "21", "3T": "22", "4T": "23", "5-6Y": "25", "7-8Y": "27", "10-12Y": "29" } },
      { label: "Length (in)", values: { "2T": "14", "3T": "15", "4T": "16", "5-6Y": "18", "7-8Y": "20", "10-12Y": "22" } },
      { label: "Shoulder (in)", values: { "2T": "10", "3T": "10.5", "4T": "11", "5-6Y": "12", "7-8Y": "13", "10-12Y": "14" } },
      { label: "Sleeve (in)", values: { "2T": "4.5", "3T": "5", "4T": "5.5", "5-6Y": "6", "7-8Y": "6.5", "10-12Y": "7" } },
    ],
    isNew: true,
  },
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
    id: "colorblock-longsleeve",
    name: "Color-Block Raglan Long Sleeve",
    slug: "colorblock-raglan-longsleeve",
    tagline: "Bold contrast sleeves — streetwear staple",
    category: "Long Sleeves",
    weight: "220gsm",
    fabric: "100% Cotton",
    fit: "Regular / Relaxed",
    moq: 50,
    priceFOB: "From $5.00/unit (FOB)",
    colors: [
      { name: "Black/White", hex: "#111111" },
      { name: "Black/Gray", hex: "#333333" },
      { name: "Brown/Khaki", hex: "#8b4513" },
    ],
    images: {
      main: `${imgBase}/colorblock-longsleeve/cb-front.jpg`,
      gallery: [
        `${imgBase}/colorblock-longsleeve/cb-front.jpg`,
        `${imgBase}/colorblock-longsleeve/cb-model.jpg`,
        `${imgBase}/colorblock-longsleeve/cb-angle.jpg`,
      ],
    },
    tags: ["Color-Block", "Raglan", "Streetwear"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "36", "M": "38", "L": "40", "XL": "42", "2XL": "44" } },
      { label: "Length (in)", values: { "S": "27", "M": "28", "L": "29", "XL": "30", "2XL": "31" } },
      { label: "Shoulder (in)", values: { "S": "16", "M": "16.5", "L": "17", "XL": "17.5", "2XL": "18" } },
      { label: "Sleeve (in)", values: { "S": "24", "M": "24.5", "L": "25", "XL": "25.5", "2XL": "26" } },
    ],
    isNew: true,
  },
  {
    id: "XJ-78000",
    name: "180gsm Combed Cotton T-Shirt",
    slug: "180gsm-combed-cotton-tee",
    tagline: "Model XJ-78000 — 100% combed cotton, American relaxed fit, round neck, 12 colors",
    tags: ["New", "12 Colors", "180gsm", "100% Cotton", "Model XJ-78000"],
    category: "T-Shirts",
    weight: "180gsm",
    fabric: "100% Combed Cotton",
    fit: "American Relaxed / Straight Shoulder",
    moq: 50,
    priceFOB: "From $4.80/unit (FOB)",
    colors: [
      { name: "Navy", hex: "#1a2744", image: `${imgBase}/XJ-78000/sku/XJ-78000-02.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/XJ-78000/sku/XJ-78000-03.jpg` },
      { name: "Khaki", hex: "#c3b091", image: `${imgBase}/XJ-78000/sku/XJ-78000-05.jpg` },
      { name: "Black", hex: "#1a1a1a", image: `${imgBase}/XJ-78000/sku/XJ-78000-06.jpg` },
      { name: "Heather Gray", hex: "#b0b0b0", image: `${imgBase}/XJ-78000/sku/XJ-78000-09.jpg` },
      { name: "White", hex: "#f5f5f5", image: `${imgBase}/XJ-78000/sku/XJ-78000-10.jpg` },
      { name: "Brick Red", hex: "#722f37", image: `${imgBase}/XJ-78000/sku/XJ-78000-12.jpg` },
      { name: "Light Blue", hex: "#8db6ce", image: `${imgBase}/XJ-78000/sku/XJ-78000-16.jpg` },
      { name: "Cream", hex: "#f5f0e8", image: `${imgBase}/XJ-78000/sku/XJ-78000-17.jpg` },
      { name: "Royal Blue", hex: "#4169e1", image: `${imgBase}/XJ-78000/sku/XJ-78000-20.jpg` },
      { name: "Burgundy", hex: "#8b0000", image: `${imgBase}/XJ-78000/sku/XJ-78000-21.jpg` },
      { name: "Beige", hex: "#e8d5b7", image: `${imgBase}/XJ-78000/sku/XJ-78000-22.jpg` },
    ],
    images: {
      main: `${imgBase}/XJ-78000/model/XJ-78000-04.jpg`,
      gallery: [
        `${imgBase}/XJ-78000/model/XJ-78000-07.jpg`,
        `${imgBase}/XJ-78000/detail/XJ-78000-15.png`,
        `${imgBase}/XJ-78000/detail/XJ-78000-18.png`,
        `${imgBase}/XJ-78000/model/XJ-78000-23.jpg`,
      ],
    },
    tags: ["New", "12 Colors", "180gsm", "100% Cotton"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
    sizeChart: [
      { label: "Chest (in)", values: { "S": "38", "M": "40", "L": "42", "XL": "44", "2XL": "46", "3XL": "48", "4XL": "50", "5XL": "52", "6XL": "54" } },
      { label: "Length (in)", values: { "S": "27", "M": "28", "L": "29", "XL": "30", "2XL": "31", "3XL": "32", "4XL": "33", "5XL": "34", "6XL": "35" } },
      { label: "Shoulder (in)", values: { "S": "18", "M": "18.5", "L": "19", "XL": "19.5", "2XL": "20", "3XL": "20.5", "4XL": "21", "5XL": "21.5", "6XL": "22" } },
      { label: "Sleeve (in)", values: { "S": "8", "M": "8.5", "L": "9", "XL": "9.5", "2XL": "10", "3XL": "10.5", "4XL": "11", "5XL": "11.5", "6XL": "12" } },
    ],
    isNew: true,
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
      main: `${imgBase}/240g-vintage-crop/model/model-front-1.webp`,
      gallery: [
        `${imgBase}/240g-vintage-crop/model/model-front-1.webp`,
        `${imgBase}/240g-vintage-crop/model/model-back-1.webp`,
        `${imgBase}/240g-vintage-crop/detail/detail-collar.webp`,
        `${imgBase}/240g-vintage-crop/detail/detail-colors.webp`,
        `${imgBase}/240g-vintage-crop/detail/detail-neckline.webp`,
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
