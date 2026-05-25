// ============================================================
// 🖼️ BOAZ 图片资产管理中心
// 
// 这是全站唯一的图片配置入口。
// 后续替换图片，只需要改这一个文件！
// 
// 接入 WordPress CMS 后，只需把这里的硬编码 URL 
// 改成从 API 获取即可，页面组件完全不用动。
// ============================================================

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string; // base64 模糊占位图（可选）
}

const BASE = "/images";

// -----------------------------------------------------------
// HERO 区域
// -----------------------------------------------------------
export const heroImages = {
  background: {
    src: `${BASE}/factory/process/Dyeingfabric01.jpg`,
    alt: "布匹染色车间 — Dyeing fabric production line",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// ABOUT 区域
// -----------------------------------------------------------
export const aboutImages = {
  factoryPortrait: {
    src: `${BASE}/factory/company/showroom2.jpg`,
    alt: "Boaz 公司展厅 — Showroom display",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// PRODUCTS 核心产品（首页展示 6 个）
// -----------------------------------------------------------
export const productImages = {
  heavyweightTee: {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    alt: "Classic heavyweight cotton t-shirt flat lay on neutral background",
  } satisfies ImageAsset,
  oversizedHoodie: {
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    alt: "Premium oversized hoodie front view",
  } satisfies ImageAsset,
  vintageWashedTee: {
    src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    alt: "Vintage washed t-shirt with garment dyed finish",
  } satisfies ImageAsset,
  crewneck: {
    src: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
    alt: "French terry crewneck sweatshirt",
  } satisfies ImageAsset,
  longSleeve: {
    src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    alt: "Long sleeve base layer with ribbed cuffs",
  } satisfies ImageAsset,
  cropBoxyTee: {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    alt: "Crop boxy fit t-shirt with drop shoulder",
  } satisfies ImageAsset,
  XJ78000: {
    src: "/images/products/XJ-78000/XJ-78000-04.jpg",
    alt: "XJ-78000 Heavyweight Drop Shoulder Tee",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// WHOLESALE 页面（8 个产品）
// -----------------------------------------------------------
export const wholesaleImages = {
  heavyweightTee: productImages.heavyweightTee,
  oversizedHoodie: productImages.oversizedHoodie,
  vintageWashedTee: productImages.vintageWashedTee,
  crewneck: productImages.crewneck,
  longSleeve: productImages.longSleeve,
  cropBoxyTee: productImages.cropBoxyTee,
  fleeceHoodie: {
    src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    alt: "Fleece lined hoodie in heavyweight cotton",
  } satisfies ImageAsset,
  raglanTee: {
    src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    alt: "Raglan sleeve t-shirt sport fit",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// FACTORY TOUR 工厂实拍（替换为真实工厂照片）
// -----------------------------------------------------------
export const factoryImages = {
  // 大图 — 面料/生产线
  fabricInspection: {
    src: `${BASE}/factory/process/Dyeingfabric01.jpg`,
    alt: "Boaz 染布车间 — Fabric dyeing production line",
  } satisfies ImageAsset,
  // 右上 — 裁剪车间
  cuttingStation: {
    src: `${BASE}/factory/production-line/cutting01.jpg`,
    alt: "Boaz 裁剪车间 — Precision cutting station",
  } satisfies ImageAsset,
  // 右下 — 成品质检
  qualityControl: {
    src: `${BASE}/factory/process/Qualityinspection01.jpg`,
    alt: "Boaz 品质检验 — Quality control inspection",
  } satisfies ImageAsset,
  // 底部宽图 — 仓库/打包出货
  packaging: {
    src: `${BASE}/factory/process/warehouse01.jpg`,
    alt: "Boaz 仓库出货 — Warehouse and shipping area",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// WHY-BOAZ 页面 UGC / Instagram
// -----------------------------------------------------------
export const ugcImages = {
  grid1: {
    src: `${BASE}/factory/process/Exhibitionhall01.jpg`,
    alt: "Boaz 展厅 — Exhibition hall display",
  } satisfies ImageAsset,
  grid2: {
    src: `${BASE}/factory/company/showroom4.jpg`,
    alt: "Boaz 公司展厅 — Showroom environment",
  } satisfies ImageAsset,
  grid3: {
    src: `${BASE}/factory/process/sewing01.jpg`,
    alt: "Boaz 缝纫车间 — Precision sewing operations",
  } satisfies ImageAsset,
  grid4: {
    src: `${BASE}/factory/equipment/loom03.jpg`,
    alt: "Boaz 织布设备 — High-speed weaving looms",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// VINTAGE 做旧 T恤展示（来自工厂实拍）
// -----------------------------------------------------------
export const vintageImages = {
  coffee: {
    src: `${BASE}/products/vintage/vintage-coffee.jpg`,
    alt: "做旧T恤咖啡色 — Vintage washed tee in coffee",
  } satisfies ImageAsset,
  darkGreen: {
    src: `${BASE}/products/vintage/vintage-dark-green.jpg`,
    alt: "做旧T恤墨绿色 — Vintage washed tee in dark green",
  } satisfies ImageAsset,
  skyBlue: {
    src: `${BASE}/products/vintage/vintage-sky-blue.jpg`,
    alt: "做旧T恤天蓝色 — Vintage washed tee in sky blue",
  } satisfies ImageAsset,
  apricot: {
    src: `${BASE}/products/vintage/vintage-apricot.jpg`,
    alt: "做旧T恤杏色 — Vintage washed tee in apricot",
  } satisfies ImageAsset,
  peach: {
    src: `${BASE}/products/vintage/vintage-peach.jpg`,
    alt: "做旧T恤桃红色 — Vintage washed tee in peach red",
  } satisfies ImageAsset,
  gray: {
    src: `${BASE}/products/vintage/vintage-gray.jpg`,
    alt: "做旧T恤灰色 — Vintage washed tee in gray",
  } satisfies ImageAsset,
  purple: {
    src: `${BASE}/products/vintage/vintage-purple.jpg`,
    alt: "做旧T恤紫色 — Vintage washed tee in purple",
  } satisfies ImageAsset,
  green: {
    src: `${BASE}/products/vintage/vintage-green.jpg`,
    alt: "做旧T恤绿色 — Vintage washed tee in green",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// FACTORY ADDITIONAL（补充工厂图片）
// -----------------------------------------------------------
export const additionalFactoryImages = {
  building: {
    src: `${BASE}/factory/company/factory-building.jpg`,
    alt: "Boaz 工厂园区 — Factory building exterior",
  } satisfies ImageAsset,
};

// -----------------------------------------------------------
// 🔄 后期接入 CMS 的迁移适配器（预留接口）
// -----------------------------------------------------------
// 当接入 WordPress / Strapi / Sanity 时：
// 只需要在这里加一个 async 函数，页面组件无需改动
// 
// export async function getProductImagesFromCMS() {
//   const res = await fetch('https://your-wp-site.com/wp-json/wp/v2/media');
//   const media = await res.json();
//   return media.map(m => ({ src: m.source_url, alt: m.alt_text }));
// }
// -----------------------------------------------------------
