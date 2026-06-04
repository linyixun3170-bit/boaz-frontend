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
  priceFOB: string; // USD FOB
  colors: { name: string; hex: string; image?: string; imageBack?: string }[];
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
    // ⚠️ 颜色名+hex待你确认
    colors: [
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/230g-washed-tee/sku/sku-coffee.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-coffee-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/230g-washed-tee/sku/sku-apricot.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-apricot-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/230g-washed-tee/sku/sku-gray.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-gray-back.webp` },
      { name: "Rose Red", hex: "#C0392B", image: `${imgBase}/230g-washed-tee/sku/sku-rose-red.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-rose-red-back.webp` },
      { name: "Purple", hex: "#6C3483", image: `${imgBase}/230g-washed-tee/sku/sku-purple.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-purple-back.webp` },
      { name: "Black", hex: "#000000", image: `${imgBase}/230g-washed-tee/sku/sku-black.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-black-back.webp` },
    ],
    images: {
      // 排序: 人物图>整体图>局部图
      main: `${imgBase}/230g-washed-tee/model/image_1769589181363.webp`,
      gallery: [
        `${imgBase}/230g-washed-tee/model/image_1769589181363.webp`,
        `${imgBase}/230g-washed-tee/model/image_1769589188377.webp`,
        `${imgBase}/230g-washed-tee/model/image_1769589194627.webp`,
        `${imgBase}/230g-washed-tee/model/image_1770175509572.webp`,
        `${imgBase}/230g-washed-tee/model/image_1769589802127_副本_副本.webp`,
        `${imgBase}/230g-washed-tee/model/image_1769648788396.webp`,
        `${imgBase}/230g-washed-tee/size-chart/size-chart.webp`,
      ],
    },
    tags: ["Washed", "Vintage", "Cropped", "6 Colors"],
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
    priceFOB: "From $3.80/unit (FOB)",
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
  {
    id: "cl-230g-drop-shoulder",
    name: "230gsm Cotton Vintage Washed Drop Shoulder T-Shirt",
    slug: "cl-230g-drop-shoulder",
    tagline: "Pre-washed drop shoulder — relaxed vintage fit from day one",
    category: "T-Shirts",
    weight: "230gsm",
    fabric: "100% Cotton (vintage washed)",
    fit: "Drop Shoulder / Relaxed",
    moq: 50,
    priceFOB: "TBD",
    // ⚠️ 颜色名+hex值待你确认
    // 颜色名按正背面图文件夹命名
    colors: [
      { name: "Rose Red", hex: "#C0392B", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-pink.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-pink-back.webp` },
      { name: "Washed Gray", hex: "#A0A0A0", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-gray.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-gray-back.webp` },
      { name: "Army Green", hex: "#4B5320", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-olive-green.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-olive-green-back.webp` },
      { name: "Blue", hex: "#2C3E50", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-blue.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-blue-back.webp` },
      { name: "Washed Black", hex: "#2C2C2C", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-black.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-black-back.webp` },
      { name: "Grass Green", hex: "#7CB342", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-light-green.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-light-green-back.webp` },
      { name: "Purple", hex: "#6C3483", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-purple.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-purple-back.webp` },
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-beige.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-beige-back.webp` },
      { name: "Orange", hex: "#E67E22", image: `${imgBase}/cl-230g-drop-shoulder/sku/sku-orange.webp`, imageBack: `${imgBase}/cl-230g-drop-shoulder/sku/sku-orange-back.webp` },
    ],
    images: {
      main: `${imgBase}/cl-230g-drop-shoulder/model/275329452_0.webp`,
      gallery: [
        `${imgBase}/cl-230g-drop-shoulder/model/275329452_0.webp`,
        `${imgBase}/cl-230g-drop-shoulder/model/68287271084.webp`,
        `${imgBase}/cl-230g-drop-shoulder/model/5019055_0.webp`,
        `${imgBase}/cl-230g-drop-shoulder/model/0G3A2169.webp`,
        `${imgBase}/cl-230g-drop-shoulder/model/0G3A2173.webp`,
        `${imgBase}/cl-230g-drop-shoulder/model/0G3A2175.webp`,
        `${imgBase}/cl-230g-drop-shoulder/size-chart/size-chart.webp`,
      ],
    },
    tags: ["New", "Drop Shoulder", "Vintage Wash", "230gsm", "Unisex"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    sizeChart: [
      { label: "Length", valuesCm: { "S": "68", "M": "71", "L": "74", "XL": "77", "2XL": "80", "3XL": "83", "4XL": "86", "5XL": "89" } },
      { label: "Shoulder", valuesCm: { "S": "53", "M": "56", "L": "59", "XL": "62", "2XL": "65", "3XL": "68", "4XL": "71", "5XL": "74" } },
      { label: "Chest", valuesCm: { "S": "52", "M": "55", "L": "58", "XL": "61", "2XL": "64", "3XL": "67", "4XL": "70", "5XL": "73" } },
      { label: "Sleeve", valuesCm: { "S": "20", "M": "21.5", "L": "23", "XL": "24.5", "2XL": "26", "3XL": "27.5", "4XL": "29", "5XL": "30.5" } },
    ],
    isNew: true,
  },
  {
    id: "cl-180g-euro",
    // ⚠️ 名称待你确认
    name: "180gsm Cotton Euro Fit T-Shirt",
    slug: "cl-180g-euro",
    tagline: "Lightweight European fit — clean lines for everyday wear",
    category: "T-Shirts",
    weight: "180gsm",
    fabric: "100% Cotton",
    fit: "Euro Fit / Regular",
    moq: 50,
    priceFOB: "TBD",
    // ⚠️ 颜色名+hex待你确认
    colors: [
      { name: "White", hex: "#FFFFFF", image: `${imgBase}/cl-180g-euro/sku/sku-white.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-white-back.webp` },
      { name: "Black", hex: "#000000", image: `${imgBase}/cl-180g-euro/sku/sku-black.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-black-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-180g-euro/sku/sku-gray.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-gray-back.webp` },
      { name: "Red", hex: "#CC0000", image: `${imgBase}/cl-180g-euro/sku/sku-red.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-red-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/cl-180g-euro/sku/sku-apricot.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-apricot-back.webp` },
    ],
    images: {
      main: `${imgBase}/cl-180g-euro/model/image_1770171830502.webp`,
      gallery: [
        `${imgBase}/cl-180g-euro/model/image_1770171830502.webp`,
        `${imgBase}/cl-180g-euro/model/image_1770171844271.webp`,
        `${imgBase}/cl-180g-euro/model/image_1770171867062.webp`,
        `${imgBase}/cl-180g-euro/model/image_1770177577465.webp`,
        `${imgBase}/cl-180g-euro/model/usa-tee-4.webp`,
        `${imgBase}/cl-180g-euro/size-chart/size-chart.webp`,
      ],
    },
    tags: ["New", "Euro Fit", "Lightweight", "180gsm"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sizeChart: [
      { label: "Chest", valuesCm: { "S": "46", "M": "51", "L": "53", "XL": "61", "2XL": "66", "3XL": "71" } },
      { label: "Length", valuesCm: { "S": "71", "M": "74", "L": "76", "XL": "79", "2XL": "82", "3XL": "84" } },
      { label: "Shoulder", valuesCm: { "S": "43", "M": "45", "L": "48", "XL": "52", "2XL": "54", "3XL": "58" } },
      { label: "Sleeve", valuesCm: { "S": "22", "M": "22", "L": "23", "XL": "23", "2XL": "25", "3XL": "25" } },
    ],
    isNew: true,
  },
  {
    id: "cl-180g-basic",
    // ⚠️ 名称待你确认
    name: "180gsm Cotton Basic T-Shirt",
    slug: "cl-180g-basic",
    tagline: "Lightweight everyday essential — 10 colors available",
    category: "T-Shirts",
    weight: "180gsm",
    fabric: "100% Cotton",
    fit: "Regular Fit",
    moq: 50,
    priceFOB: "TBD",
    // ⚠️ 颜色名+hex待确认，正背面图待补
    colors: [
      { name: "White", hex: "#FFFFFF", image: `${imgBase}/cl-180g-basic/sku/sku-white.webp` },
      { name: "Black", hex: "#000000", image: `${imgBase}/cl-180g-basic/sku/sku-black.webp` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/cl-180g-basic/sku/sku-dark-gray.webp` },
      { name: "Heather Gray", hex: "#B0B0B0", image: `${imgBase}/cl-180g-basic/sku/sku-heather-gray.webp` },
      { name: "Army Green", hex: "#4B5320", image: `${imgBase}/cl-180g-basic/sku/sku-army-green.webp` },
      { name: "Red", hex: "#CC0000", image: `${imgBase}/cl-180g-basic/sku/sku-red.webp` },
      { name: "Royal Blue", hex: "#2B5B84", image: `${imgBase}/cl-180g-basic/sku/sku-royal-blue.webp` },
      { name: "Navy", hex: "#1B2A4A", image: `${imgBase}/cl-180g-basic/sku/sku-navy.webp` },
      { name: "Sand", hex: "#D4C5A9", image: `${imgBase}/cl-180g-basic/sku/sku-sand.webp` },
      { name: "Light Pink", hex: "#FFD1DC", image: `${imgBase}/cl-180g-basic/sku/sku-light-pink.webp` },
    ],
    images: {
      main: `${imgBase}/cl-180g-basic/model/white-front.webp`,
      gallery: [
        `${imgBase}/cl-180g-basic/model/white-front.webp`,
        `${imgBase}/cl-180g-basic/model/heather-gray.webp`,
        `${imgBase}/cl-180g-basic/model/royal-blue.webp`,
        `${imgBase}/cl-180g-basic/model/light-pink.webp`,
        `${imgBase}/cl-180g-basic/model/dark-gray.webp`,
        `${imgBase}/cl-180g-basic/model/detail.webp`,
        `${imgBase}/cl-180g-basic/size-chart/size-chart.webp`,
      ],
    },
    tags: ["New", "Basic", "Lightweight", "180gsm", "10 Colors"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    sizeChart: [
      { label: "Length", valuesCm: { "S": "68", "M": "71", "L": "74", "XL": "77", "2XL": "80", "3XL": "83", "4XL": "86", "5XL": "89" } },
      { label: "Shoulder", valuesCm: { "S": "53", "M": "56", "L": "59", "XL": "62", "2XL": "65", "3XL": "68", "4XL": "71", "5XL": "74" } },
      { label: "Chest", valuesCm: { "S": "52", "M": "55", "L": "58", "XL": "61", "2XL": "64", "3XL": "67", "4XL": "70", "5XL": "73" } },
      { label: "Sleeve", valuesCm: { "S": "20", "M": "21.5", "L": "23", "XL": "24.5", "2XL": "26", "3XL": "27.5", "4XL": "29", "5XL": "30.5" } },
    ],
    isNew: true,
  },
  {
    id: "cl-230g-tanktop",
    name: "230gsm Vintage Washed Tank Top",
    slug: "cl-230g-tanktop",
    tagline: "Vintage washed sleeveless — relaxed summer essential",
    category: "Tank Tops",
    weight: "230gsm",
    fabric: "100% Cotton (vintage washed)",
    fit: "Relaxed / Sleeveless",
    moq: 50,
    priceFOB: "TBD",
    colors: [
      { name: "Army Green", hex: "#4B5320", image: `${imgBase}/cl-230g-tanktop/sku/sku-army-green.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-army-green-back.webp` },
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/cl-230g-tanktop/sku/sku-coffee.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-coffee-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/cl-230g-tanktop/sku/sku-apricot.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-apricot-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-230g-tanktop/sku/sku-gray.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-gray-back.webp` },
      { name: "Rose Red", hex: "#C0392B", image: `${imgBase}/cl-230g-tanktop/sku/sku-rose-red.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-rose-red-back.webp` },
    ],
    images: {
      // 排序: 人物图>挂拍图>整体图>局部图>尺码图
      main: `${imgBase}/cl-230g-tanktop/model/image_1769389966452.webp`,
      gallery: [
        `${imgBase}/cl-230g-tanktop/model/image_1769389966452.webp`,
        `${imgBase}/cl-230g-tanktop/model/image_1769389989108.webp`,
        `${imgBase}/cl-230g-tanktop/model/image_1769389995251.webp`,
        `${imgBase}/cl-230g-tanktop/model/image_1769390003067.webp`,
        `${imgBase}/cl-230g-tanktop/model/unnamed.webp`,
        `${imgBase}/cl-230g-tanktop/model/DPP_397.webp`,
        `${imgBase}/cl-230g-tanktop/model/DPP_398.webp`,
        `${imgBase}/cl-230g-tanktop/model/DPP_399.webp`,
        `${imgBase}/cl-230g-tanktop/size-chart/size-chart.webp`,
      ],
    },
    tags: ["New", "Tank Top", "Sleeveless", "Vintage Wash", "230gsm"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: [
      { label: "Chest", valuesCm: { "S": "53", "M": "56", "L": "59", "XL": "62", "2XL": "65" } },
      { label: "Length", valuesCm: { "S": "68", "M": "71", "L": "74", "XL": "77", "2XL": "80" } },
    ],
    isNew: true,
  },
  {
    id: "wx-320g-tee",
    // ⚠️ 名称+颜色名+hex待你确认
    name: "320gsm Double-Yarn Cotton T-Shirt",
    slug: "wx-320g-tee",
    tagline: "Heavyweight double-yarn cotton — durable and structured",
    category: "T-Shirts",
    weight: "320gsm",
    fabric: "100% Cotton (double-yarn)",
    fit: "Regular Fit",
    moq: 50,
    priceFOB: "TBD",
    // ⚠️ 颜色待确认
    colors: [
      { name: "Color 1", hex: "#333333", image: `${imgBase}/wx-320g-tee/sku/sku-color-1.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-1-back.webp` },
      { name: "Color 2", hex: "#666666", image: `${imgBase}/wx-320g-tee/sku/sku-color-2.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-2-back.webp` },
      { name: "Color 3", hex: "#999999", image: `${imgBase}/wx-320g-tee/sku/sku-color-3.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-3-back.webp` },
      { name: "Color 4", hex: "#BBBBBB", image: `${imgBase}/wx-320g-tee/sku/sku-color-4.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-4-back.webp` },
      { name: "Color 5", hex: "#DDDDDD", image: `${imgBase}/wx-320g-tee/sku/sku-color-5.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-5-back.webp` },
      { name: "Color 6", hex: "#FFD700", image: `${imgBase}/wx-320g-tee/sku/sku-color-6.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-6-back.webp` },
      { name: "Color 7", hex: "#FF6347", image: `${imgBase}/wx-320g-tee/sku/sku-color-7.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-7-back.webp` },
      { name: "Color 8", hex: "#8B0000", image: `${imgBase}/wx-320g-tee/sku/sku-color-8.webp`, imageBack: `${imgBase}/wx-320g-tee/sku/sku-color-8-back.webp` },
    ],
    images: {
      main: `${imgBase}/wx-320g-tee/model/主图-1-.webp`,
      gallery: [
        `${imgBase}/wx-320g-tee/model/主图-1-.webp`,
        `${imgBase}/wx-320g-tee/model/主图-2-.webp`,
        `${imgBase}/wx-320g-tee/model/主图-3-.webp`,
        `${imgBase}/wx-320g-tee/model/02-8-.webp`,
        `${imgBase}/wx-320g-tee/model/03-4-.webp`,
        `${imgBase}/wx-320g-tee/model/07-4-.webp`,
        `${imgBase}/wx-320g-tee/model/08-4-.webp`,
        `${imgBase}/wx-320g-tee/model/09-4-.webp`,
        `${imgBase}/wx-320g-tee/model/dgiuyqdgiuy.webp`,
        `${imgBase}/wx-320g-tee/size-chart/size-chart.webp`,
      ],
    },
    tags: ["New", "Heavyweight", "Double-Yarn", "320gsm"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sizeChart: [
      { label: "Chest", valuesCm: { "XS": "55", "S": "57", "M": "59", "L": "61", "XL": "63", "XXL": "65" } },
      { label: "Length", valuesCm: { "XS": "71", "S": "73", "M": "75", "L": "77", "XL": "79", "XXL": "81" } },
      { label: "Shoulder", valuesCm: { "XS": "53", "S": "55", "M": "57", "L": "59", "XL": "61", "XXL": "63" } },
      { label: "Sleeve", valuesCm: { "XS": "23", "S": "23.5", "M": "24", "L": "24.5", "XL": "25", "XXL": "25.5" } },
    ],
    isNew: true,
  },
  {
    id: "xc-280g-gradient-set",
    name: "280gsm Gradient Distressed Drop-Shoulder Set (T-Shirt + Shorts)",
    slug: "xc-280g-gradient-set",
    tagline: "Matching oversized set — double-yarn cotton with gradient wash and distressed details",
    category: "T-Shirts",
    weight: "280gsm",
    fabric: "100% Cotton (Double Yarn, Gradient Washed)",
    fit: "Oversized / Relaxed Drop Shoulder",
    moq: 50,
    priceFOB: "From $8.50/set (FOB)",
    colors: [
      { name: "Coffee", hex: "#6F4E37", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Coffee.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Coffee-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Gray.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Gray-back.webp` },
      { name: "Purple", hex: "#6C3483", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Purple.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Purple-back.webp` },
      { name: "Black", hex: "#1A1A1A", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Black.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Black-back.webp` },
    ],
    images: {
      main: `${imgBase}/xc-280g-gradient-set/model/model-1.webp`,
      gallery: [
        `${imgBase}/xc-280g-gradient-set/model/model-1.webp`,
        `${imgBase}/xc-280g-gradient-set/model/model-2.webp`,
        `${imgBase}/xc-280g-gradient-set/model/model-3.webp`,
        `${imgBase}/xc-280g-gradient-set/model/model-4.webp`,
        `${imgBase}/xc-280g-gradient-set/model/detail-5.webp`,
        `${imgBase}/xc-280g-gradient-set/model/detail-6.webp`,
        `${imgBase}/xc-280g-gradient-set/model/detail-7.webp`,
        `${imgBase}/xc-280g-gradient-set/model/detail-8.webp`,
        `${imgBase}/xc-280g-gradient-set/sku/sku-Coffee-shorts.webp`,
        `${imgBase}/xc-280g-gradient-set/sku/sku-Gray-shorts.webp`,
        `${imgBase}/xc-280g-gradient-set/sku/sku-Purple-shorts.webp`,
        `${imgBase}/xc-280g-gradient-set/sku/sku-Black-shorts.webp`,
        `${imgBase}/xc-280g-gradient-set/size-chart/size-chart.webp`,
      ],
    },
    tags: ["Gradient", "Distressed", "Oversized", "Set", "Matching Shorts", "4 Colors"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: [
      { label: "Shoulder", valuesCm: { "S": "51", "M": "53", "L": "55", "XL": "57", "2XL": "59" } },
      { label: "Chest", valuesCm: { "S": "53", "M": "55", "L": "57", "XL": "59", "2XL": "61" } },
      { label: "Length", valuesCm: { "S": "70", "M": "72", "L": "74", "XL": "76", "2XL": "78" } },
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
