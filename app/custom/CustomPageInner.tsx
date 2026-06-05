"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products as catalogProducts } from "@/lib/products-catalog";
import { buildSizeTable } from "@/lib/size-chart";
import PricingTiers from "@/components/PricingTiers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const imgBase = "/images/products";

interface ProductItem {
  name: string;
  slug: string;
  image?: string;
  imageBack?: string;
}

interface ProductOption {
  id: string;
  name: string;
  priceBase: number;
  moq: number;
  category: string;
  colors: { name: string; hex: string; items?: ProductItem[]; image?: string; imageBack?: string }[];
}

const productSizeData = catalogProducts.reduce((acc: Record<string, { sizes: string[]; chart?: any[] }>, p) => {
  acc[p.id] = { sizes: p.sizes, chart: p.sizeChart };
  return acc;
}, {} as Record<string, { sizes: string[]; chart?: any[] }>);

const products: ProductOption[] = [
  {
    id: "230g-washed-tee", name: "230gsm Washed Vintage T-Shirt", priceBase: 3.50, moq: 50, category: "T-Shirts",
    colors: [
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/230g-washed-tee/sku/sku-coffee.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-coffee-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/230g-washed-tee/sku/sku-apricot.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-apricot-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/230g-washed-tee/sku/sku-gray.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-gray-back.webp` },
      { name: "Rose Red", hex: "#C0392B", image: `${imgBase}/230g-washed-tee/sku/sku-rose-red.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-rose-red-back.webp` },
      { name: "Purple", hex: "#6C3483", image: `${imgBase}/230g-washed-tee/sku/sku-purple.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-purple-back.webp` },
      { name: "Black", hex: "#000000", image: `${imgBase}/230g-washed-tee/sku/sku-black.webp`, imageBack: `${imgBase}/230g-washed-tee/sku/sku-black-back.webp` },
    ],
  },
  {
    id: "240g-vintage-crop", name: "240gsm Vintage Washed Cropped T-Shirt", priceBase: 3.80, moq: 50, category: "T-Shirts",
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
  },
  {
    id: "cl-230g-drop-shoulder", name: "230gsm Drop Shoulder T-Shirt", priceBase: 3.50, moq: 50, category: "T-Shirts",
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
  },
  {
    id: "cl-180g-euro", name: "180gsm Euro Fit T-Shirt", priceBase: 3.00, moq: 50, category: "T-Shirts",
    colors: [
      { name: "White", hex: "#FFFFFF", image: `${imgBase}/cl-180g-euro/sku/sku-white.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-white-back.webp` },
      { name: "Black", hex: "#000000", image: `${imgBase}/cl-180g-euro/sku/sku-black.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-black-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-180g-euro/sku/sku-gray.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-gray-back.webp` },
      { name: "Red", hex: "#CC0000", image: `${imgBase}/cl-180g-euro/sku/sku-red.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-red-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/cl-180g-euro/sku/sku-apricot.webp`, imageBack: `${imgBase}/cl-180g-euro/sku/sku-apricot-back.webp` },
    ],
  },
  {
    id: "cl-180g-basic", name: "180gsm Basic T-Shirt", priceBase: 3.00, moq: 50, category: "T-Shirts",
    // ⚠️ 正背面图待补充
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
  },
  {
    id: "wx-320g-tee", name: "320gsm Double-Yarn T-Shirt", priceBase: 4.50, moq: 50, category: "T-Shirts",
    // ⚠️ 颜色名+hex待确认
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
  },
  {
    id: "cl-230g-tanktop", name: "230gsm Vintage Tank Top", priceBase: 3.50, moq: 50, category: "Tank Tops",
    colors: [
      { name: "Army Green", hex: "#4B5320", image: `${imgBase}/cl-230g-tanktop/sku/sku-army-green.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-army-green-back.webp` },
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/cl-230g-tanktop/sku/sku-coffee.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-coffee-back.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/cl-230g-tanktop/sku/sku-apricot.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-apricot-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-230g-tanktop/sku/sku-gray.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-gray-back.webp` },
      { name: "Rose Red", hex: "#C0392B", image: `${imgBase}/cl-230g-tanktop/sku/sku-rose-red.webp`, imageBack: `${imgBase}/cl-230g-tanktop/sku/sku-rose-red-back.webp` },
    ],
  },
  {
    id: "xsl-260g-sorona", name: "260gsm Sorona Open Shoulder T-Shirt", priceBase: 4.50, moq: 50, category: "T-Shirts",
    colors: [
      { name: "Pure White", hex: "#FFFFFF", image: `${imgBase}/xsl-260g-sorona/sku/sku-white.webp` },
      { name: "Midnight Black", hex: "#1A1A1A", image: `${imgBase}/xsl-260g-sorona/sku/sku-black.webp` },
      { name: "Elegant Gray", hex: "#C0C0C0", image: `${imgBase}/xsl-260g-sorona/sku/sku-elegant-gray.webp` },
      { name: "Mystic Gray", hex: "#808080", image: `${imgBase}/xsl-260g-sorona/sku/sku-mystic-gray.webp` },
      { name: "Sprout Green", hex: "#8BC34A", image: `${imgBase}/xsl-260g-sorona/sku/sku-sprout-green.webp` },
      { name: "Youth Green", hex: "#4CAF50", image: `${imgBase}/xsl-260g-sorona/sku/sku-youth-green.webp` },
      { name: "Cool Cyan", hex: "#00BCD4", image: `${imgBase}/xsl-260g-sorona/sku/sku-cool-cyan.webp` },
      { name: "Vitality Red", hex: "#E53935", image: `${imgBase}/xsl-260g-sorona/sku/sku-vitality-red.webp` },
      { name: "Romantic Pink", hex: "#F48FB1", image: `${imgBase}/xsl-260g-sorona/sku/sku-romantic-pink.webp` },
      { name: "Dynamic Purple", hex: "#9C27B0", image: `${imgBase}/xsl-260g-sorona/sku/sku-dynamic-purple.webp` },
    ],
  },
  {
    id: "cl-sunscreen-vintage", name: "230gsm Cotton Sun Protection Vintage T-Shirt", priceBase: 3.50, moq: 50, category: "T-Shirts",
    colors: [
      { name: "Black", hex: "#1A1A1A", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-black.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-black.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-gray.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-gray.webp` },
      { name: "Pink", hex: "#F48FB1", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-pink.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-pink.webp` },
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-coffee.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-coffee.webp` },
      { name: "Apricot", hex: "#FDD9B5", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-apricot.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-apricot.webp` },
      { name: "Purple", hex: "#9C27B0", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-purple.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-purple.webp` },
      { name: "Haze Blue", hex: "#6699CC", image: `${imgBase}/cl-sunscreen-vintage/flat/flat-haze-blue.webp`, imageBack: `${imgBase}/cl-sunscreen-vintage/flat-back/flat-back-haze-blue.webp` },
    ],
  },
  {
    id: "cl-longsleeve-vintage", name: "230gsm Cotton Vintage Washed Long Sleeve T-Shirt", priceBase: 4.50, moq: 50, category: "Long Sleeves",
    colors: [
      { name: "Black", hex: "#1A1A1A", image: `${imgBase}/cl-longsleeve-vintage/flat/flat-black.webp`, imageBack: `${imgBase}/cl-longsleeve-vintage/flat-back/flat-back-black.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/cl-longsleeve-vintage/flat/flat-gray.webp`, imageBack: `${imgBase}/cl-longsleeve-vintage/flat-back/flat-back-gray.webp` },
      { name: "Pink", hex: "#F48FB1", image: `${imgBase}/cl-longsleeve-vintage/flat/flat-pink.webp`, imageBack: `${imgBase}/cl-longsleeve-vintage/flat-back/flat-back-pink.webp` },
      { name: "Coffee", hex: "#8B6914", image: `${imgBase}/cl-longsleeve-vintage/flat/flat-coffee.webp`, imageBack: `${imgBase}/cl-longsleeve-vintage/flat-back/flat-back-coffee.webp` },
      { name: "Army Green", hex: "#4B5320", image: `${imgBase}/cl-longsleeve-vintage/flat/flat-army-green.webp`, imageBack: `${imgBase}/cl-longsleeve-vintage/flat-back/flat-back-army-green.webp` },
    ],
  },
  {
    id: "xc-280g-gradient-set", name: "280gsm Gradient Distressed Set (T-Shirt + Shorts)", priceBase: 8.50, moq: 50, category: "T-Shirts",
    colors: [
      { name: "Coffee", hex: "#6F4E37", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Coffee.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Coffee-back.webp` },
      { name: "Gray", hex: "#808080", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Gray.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Gray-back.webp` },
      { name: "Purple", hex: "#6C3483", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Purple.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Purple-back.webp` },
      { name: "Black", hex: "#1A1A1A", image: `${imgBase}/xc-280g-gradient-set/sku/sku-Black.webp`, imageBack: `${imgBase}/xc-280g-gradient-set/sku/sku-Black-back.webp` },
    ],
  },
  {
    id: "cl-washed-vintage-set", name: "Washed Vintage Sleeveless Set (T-Shirt + Tank + Shorts)", priceBase: 12.50, moq: 50, category: "T-Shirts",
    colors: [
      {
        name: "Gray", hex: "#969696",
        items: [
          { name: "T-Shirt", slug: "tee", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tee.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tee-back.webp` },
          { name: "Tank Top", slug: "tank", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tank.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tank-back.webp` },
          { name: "Shorts", slug: "shorts", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-shorts.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-shorts-back.webp` },
        ],
        image: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tee.webp`,
        imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Gray-tee-back.webp`,
      },
      {
        name: "Green", hex: "#666633",
        items: [
          { name: "T-Shirt", slug: "tee", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tee.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tee-back.webp` },
          { name: "Tank Top", slug: "tank", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tank.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tank-back.webp` },
          { name: "Shorts", slug: "shorts", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-shorts.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-shorts-back.webp` },
        ],
        image: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tee.webp`,
        imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Green-tee-back.webp`,
      },
      {
        name: "Black", hex: "#323232",
        items: [
          { name: "T-Shirt", slug: "tee", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tee.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tee-back.webp` },
          { name: "Tank Top", slug: "tank", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tank.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tank-back.webp` },
          { name: "Shorts", slug: "shorts", image: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-shorts.webp`, imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-shorts-back.webp` },
        ],
        image: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tee.webp`,
        imageBack: `${imgBase}/cl-washed-vintage-set/sku/sku-Black-tee-back.webp`,
      },
    ],
  },
];

const decorationMethods = [
  { id: "screen", label: "Screen Print", desc: "Best for bold flat colors. Most cost-effective for 50+ pcs.", pricePerPc: 1.50, tag: "Popular", minQty: 50 },
  { id: "dtg", label: "DTG", desc: "Full-color photo-quality prints. No minimum quantity, ideal for samples.", pricePerPc: 3.00, tag: null, minQty: 1 },
  { id: "embroidery", label: "Embroidery", desc: "Premium stitched logo with texture. Best for hats, polos, and outerwear.", pricePerPc: 2.50, tag: "Premium", minQty: 50 },
  { id: "transfer", label: "Heat Transfer", desc: "Complex designs & small runs. Quick turnaround, vivid colors.", pricePerPc: 2.00, tag: null, minQty: 25 },
];

const productColors = products.reduce((acc: Record<string, ProductOption["colors"]>, p) => {
  acc[p.id] = p.colors;
  return acc;
}, {} as Record<string, ProductOption["colors"]>);

const placements = [
  { id: "center", label: "Center Chest" },
  { id: "left", label: "Left Chest" },
  { id: "back", label: "Back" },
  { id: "sleeve", label: "Sleeve" },
];

const steps = [
  { number: "01", title: "Select Product", desc: "Choose your base garment from our catalog of premium blanks." },
  { number: "02", title: "Pick Color & Method", desc: "Select your color and decoration technique that fits your design." },
  { number: "03", title: "Upload & Preview", desc: "Upload your artwork and see it positioned on the garment in real-time." },
  { number: "04", title: "Confirm & Quote", desc: "Set quantity and get an instant estimate. We'll confirm within 24 hours." },
];

export default function CustomPageInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const initialProduct = products.find(p => p.id === productParam) || products[0];

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [searchQuery, setSearchQuery] = useState("");
  const currentColors = productColors[selectedProduct.id] || [];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [showingBack, setShowingBack] = useState(false);
  const selectedColorHex = currentColors[selectedColorIdx]?.hex || "#ffffff";
  
  // Multi-item sub-variant support
  const currentColor = currentColors[selectedColorIdx];
  const hasItems = currentColor?.items && currentColor.items.length > 0;
  const currentItem = hasItems ? currentColor.items[selectedItem] : null;
  const currentImage = (() => {
    if (showingBack) {
      if (currentItem?.imageBack) return currentItem.imageBack;
      if (currentColor?.imageBack) return currentColor.imageBack;
    }
    if (currentItem?.image) return currentItem.image;
    if (currentColor?.image) return currentColor.image;
    return null;
  })();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [placement, setPlacement] = useState("center");
  const [quantity, setQuantity] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentMethod = decorationMethods.find(m => m.id === selectedMethod);

  const calculateTotal = () => {
    const garmentCost = selectedProduct.priceBase * quantity;
    const decorationCost = (currentMethod?.pricePerPc || 0) * quantity;
    return garmentCost + decorationCost;
  };

  const buildQuoteUrl = () => {
    const params = new URLSearchParams({
      subject: `Custom Order: ${selectedProduct.name} x ${quantity}pcs`,
      product: selectedProduct.id,
      color: currentColors[selectedColorIdx]?.name || "White",
      method: selectedMethod || "",
      qty: quantity.toString(),
      placement,
    });
    return `/contact?${params.toString()}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".step-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // handleImageUpload removed — replaced by handleUpload above

  const handleQuantityStep = (delta: number) => {
    const newQty = Math.max(1, quantity + delta);
    setQuantity(newQty);
  };

  const quickQtys = [50, 100, 200, 500, 1000];

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <div className="pt-28 pb-[90px] lg:pb-20">
          {/* Hero */}
          <div className="max-w-[1400px] mx-auto section-padding mb-16">
            <span className="text-caption text-warm-gray mb-4 block">Custom Manufacturing</span>
            <h1 className="text-display-lg text-dark max-w-3xl">
              From Your <span className="italic">Sketch</span> to Shelf
            </h1>
            <p className="text-body-xl text-warm-gray mt-8 max-w-2xl">
              Upload your design, choose your garment, and see it come to life.
              We handle everything from sampling to full production.
            </p>
          </div>

          {/* Size Chart — dynamically shows selected product's sizes */}
          <div className="max-w-[1400px] mx-auto section-padding mb-8">
            <details className="bg-offwhite border border-stone group">
              <summary className="p-4 text-[11px] uppercase tracking-wider text-dark cursor-pointer hover:bg-stone/10 transition-colors flex items-center justify-between list-none">
                <span>Size Chart — {selectedProduct.name}</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 pt-0 overflow-x-auto scrollbar-gallery">
                {(() => {
                  const sizeInfo = productSizeData[selectedProduct.id];
                  if (!sizeInfo) return (
                    <div className="flex items-center justify-center h-16 text-[11px] text-warm-gray">
                      <span>No size chart available for this product.</span>
                    </div>
                  );
                  if (sizeInfo.chart && sizeInfo.chart.length > 0) {
                    const tableData = sizeInfo.chart.map(e => buildSizeTable(e, sizeInfo.sizes));
                    return (
                      <div className="min-w-[300px]">
                        {/* DESKTOP: side-by-side cm/in */}
                        <div className="hidden md:block">
                          <table className="w-full text-left border-collapse text-[11px]">
                            <thead>
                              <tr className="border-b border-stone">
                                <th className="py-2 pr-4 text-muted font-medium" rowSpan={2}>Measurement</th>
                                {sizeInfo.sizes.map(s => (
                                  <th key={s} className="py-2 px-3 text-dark font-medium text-center" colSpan={2}>{s}</th>
                                ))}
                              </tr>
                              <tr className="border-b border-stone/30">
                                {sizeInfo.sizes.map(s => (
                                  <>
                                    <th key={`${s}-cm`} className="py-1 px-2 text-[9px] text-warm-gray text-center">cm</th>
                                    <th key={`${s}-in`} className="py-1 px-2 text-[9px] text-warm-gray text-center">in</th>
                                  </>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map(row => (
                                <tr key={row.label} className="border-b border-stone/50">
                                  <td className="py-2 pr-4 text-dark font-medium whitespace-nowrap">{row.label}</td>
                                  {sizeInfo.sizes.map((_, i) => (
                                    <>
                                      <td key={`${i}-cm`} className="py-2 px-3 text-center text-warm-gray">{row.cm[i]}</td>
                                      <td key={`${i}-in`} className="py-2 px-3 text-center text-stone/70">{row.inch[i]}"</td>
                                    </>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* MOBILE: stacked cm/in */}
                        <div className="md:hidden">
                          <table className="w-full text-left border-collapse text-[11px]">
                            <thead>
                              <tr className="border-b border-stone">
                                <th className="py-2 pr-4 text-muted font-medium"></th>
                                {sizeInfo.sizes.map(s => (
                                  <th key={s} className="py-2 px-2 text-dark font-medium text-center">{s}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map(row => (
                                <tr key={`${row.label}-cm`} className="border-b border-stone/20">
                                  <td className="py-1.5 pr-4 text-dark font-medium whitespace-nowrap">{row.label} (cm)</td>
                                  {sizeInfo.sizes.map((_, i) => (
                                    <td key={i} className="py-1.5 px-2 text-center text-warm-gray">{row.cm[i]}</td>
                                  ))}
                                </tr>
                              ))}
                              {tableData.map(row => (
                                <tr key={`${row.label}-in`} className="border-b border-stone/20">
                                  <td className="py-1.5 pr-4 text-dark/60 whitespace-nowrap">{row.label} (in)</td>
                                  {sizeInfo.sizes.map((_, i) => (
                                    <td key={i} className="py-1.5 px-2 text-center text-stone/70">{row.inch[i]}"</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="flex items-center justify-center h-16 text-[11px] text-warm-gray">
                      <span>Sizes: {sizeInfo.sizes.join(" · ")} — See product page for exact measurements.</span>
                    </div>
                  );
                })()}
              </div>
              <p className="text-[10px] text-warm-gray px-4 pb-3">* Measurements vary by product. See product detail for exact specs.</p>
            </details>
          </div>

          {/* Main Customizer */}
          <div className="max-w-[1400px] mx-auto section-padding mb-24">
            {/* Step Navigator — visual progress bar */}
            <div className="py-6 mb-6 border-b border-stone">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[
                  { num: 1, label: "Product" },
                  { num: 2, label: "Color" },
                  { num: 3, label: "Method" },
                  { num: 4, label: "Upload" },
                  { num: 5, label: "Quote" },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center gap-1.5 relative flex-1">
                    {/* Connector line */}
                    {i < 4 && (
                      <div className={"absolute top-3 left-[60%] w-full h-0.5 " + (i <= 2 ? "bg-dark" : "bg-stone")} />
                    )}
                    <div className={
                      "relative w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium z-10 " +
                      (i <= 2 ? "bg-dark text-cream" : "bg-light-gray text-warm-gray")
                    }>
                      {i < 2 ? "\u2713" : step.num}
                    </div>
                    <span className={
                      "text-[10px] whitespace-nowrap " +
                      (i <= 2 ? "text-dark font-medium" : "text-warm-gray")
                    }>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search + Selector — MOBILE: above grid, full width */}
            <div className="lg:hidden mb-6">
              <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                Select Product
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or style..."
                className="w-full px-4 py-3 bg-cream border border-stone text-sm text-dark focus:outline-none focus:border-dark mb-3"
              />
              <select
                value={selectedProduct.id}
                onChange={(e) => {
                  const p = products.find(pr => pr.id === e.target.value);
                  if (p) {
                    setSelectedProduct(p);
                    setSelectedColorIdx(0);
                    setShowingBack(false);
                    setQuantity(Math.max(quantity, p.moq));
                  }
                }}
                className="w-full px-4 py-3 bg-cream border border-stone text-sm text-dark focus:outline-none focus:border-dark"
              >
                {products
                  .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(p => (
                  <option key={p.id} value={p.id}>{p.name} -- From ${p.priceBase.toFixed(2)}/pc</option>
                ))}
              </select>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* ─── Design Canvas ─── */}
              <div
                ref={canvasRef}
                className="relative aspect-[3/4] bg-light-gray overflow-hidden rounded-xl border border-stone/30 select-none"
                style={{ touchAction: "none" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
              >
                {/* Product image (front or back) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={(currentItem?.name || currentColor?.name || "") + (showingBack ? " back" : " front")}
                      className="w-full h-full object-contain pointer-events-none select-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: selectedColorHex }} />
                  )}
                </div>

                {/* Placed designs on garment */}
                {designs.map(des => (
                  <div
                    key={des.id}
                    data-did={des.id}
                    className={`absolute cursor-grab active:cursor-grabbing z-20 rounded-lg transition-shadow ${
                      activeDesignId === des.id ? 'ring-2 ring-gold/50 shadow-lg z-30' : ''
                    }`}
                    style={{
                      left: `${des.x}%`, top: `${des.y}%`,
                      width: `${Math.max(8, 40 * des.scale)}%`,
                      height: `${Math.max(6, 30 * des.scale)}%`,
                      transform: "translate(-50%, -50%)",
                      touchAction: "none",
                    }}
                  >
                    <img src={des.image} alt="Design" className="w-full h-full object-contain pointer-events-none select-none opacity-85 drop-shadow-md" draggable={false} />
                  </div>
                ))}

                {/* Empty state */}
                {designs.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-warm-gray/30 pointer-events-none">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">Upload your design below</span>
                    <span className="text-[10px]">Drag to move · Scroll to scale</span>
                  </div>
                )}

                {/* Top bar: item selector + front/back toggle */}
                <div className="absolute top-2 left-2 right-2 flex justify-between z-40">
                  {/* Item selector */}
                  <div className="flex gap-1 bg-white/90 backdrop-blur-sm rounded overflow-hidden border border-stone/30 shadow-sm">
                    {hasItems && currentColor.items.map((item, idx) => (
                      <button key={item.slug} onClick={() => setSelectedItem(idx)}
                        className={"px-2 py-1 text-[9px] uppercase tracking-wider font-medium transition-all " + (selectedItem === idx ? "bg-dark text-white" : "bg-white text-dark hover:bg-stone/10")}
                      >{item.name}</button>
                    ))}
                  </div>
                  {/* Front / Back toggle */}
                  <div className="flex gap-1 bg-white/90 backdrop-blur-sm rounded overflow-hidden border border-stone/30 shadow-sm">
                    <button onClick={() => setShowingBack(false)}
                      className={"px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium transition-all " + (!showingBack ? "bg-dark text-white" : "bg-white text-dark hover:bg-stone/10")}
                    >Front</button>
                    <button onClick={() => setShowingBack(true)}
                      className={"px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium transition-all " + (showingBack ? "bg-dark text-white" : "bg-white text-dark hover:bg-stone/10")}
                      disabled={!currentColors[selectedColorIdx]?.imageBack}
                    >Back</button>
                  </div>
                </div>

                {/* Design count */}
                {designs.length > 0 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/80 backdrop-blur-sm text-[10px] text-muted rounded z-40 shadow-sm pointer-events-none select-none">
                    {designs.length} design{designs.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* ─── Upload button + Scale controls (below canvas) ─── */}
              <div className="flex flex-col gap-3">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                <div className="flex gap-2">
                  <button onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 bg-dark text-cream text-[11px] uppercase tracking-widest rounded-full hover:bg-ink transition-all flex items-center justify-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    Upload Design
                  </button>
                  {activeDesign && (
                    <button onClick={() => deleteDesign(activeDesign.id)}
                      className="px-4 py-2.5 border border-red-200 text-red-400 text-[11px] uppercase tracking-widest rounded-full hover:bg-red-50 transition-all"
                    >Remove</button>
                  )}
                </div>

                {/* Scale slider (shown when design is selected) */}
                {activeDesign && (
                  <div className="flex items-center gap-2 bg-white rounded-xl border border-stone/30 px-3 py-2 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted/60 shrink-0"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input type="range" min="0.3" max="3" step="0.05" value={activeDesign.scale}
                      onChange={e => updateDesign(activeDesign.id, { scale: Math.max(0.3, Math.min(3, parseFloat(e.target.value))) })}
                      className="flex-1 h-1 bg-stone/20 rounded-full appearance-none cursor-pointer accent-charcoal"
                    />
                    <span className="text-[10px] text-muted tabular-nums w-8 text-right">{activeDesign.scale.toFixed(1)}x</span>
                  </div>
                )}

                {/* Designs list */}
                {designs.length > 0 && (
                  <div className="bg-white rounded-xl border border-stone/30 p-3 shadow-sm">
                    <h4 className="text-[10px] uppercase tracking-wider text-muted mb-2">Your Designs ({designs.length})</h4>
                    <div className="flex gap-2 flex-wrap">
                      {designs.map((des, i) => (
                        <button key={des.id} onClick={() => setActiveDesignId(des.id)}
                          className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${activeDesignId === des.id ? 'border-gold/70 ring-1 ring-gold/30' : 'border-stone/20 hover:border-stone/40'}`}
                        >
                          <img src={des.image} alt={`Design ${i+1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Colors — MOBILE: below preview */}
              <div className="lg:hidden">
                <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {currentColors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => { setSelectedColorIdx(idx); setShowingBack(false); }}
                      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                        selectedColorIdx === idx
                          ? "border-dark scale-110"
                          : "border-transparent hover:border-dark/40"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {c.image && (
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-warm-gray mt-2">
                  Selected: {currentColors[selectedColorIdx]?.name}
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-8">
                {/* Search + Product Selector — DESKTOP only */}
                <div className="hidden lg:block">
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Search Product
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or style..."
                    className="w-full px-4 py-3 bg-cream border border-stone text-sm text-dark focus:outline-none focus:border-dark mb-3"
                  />
                  <select
                    value={selectedProduct.id}
                    onChange={(e) => {
                      const p = products.find(pr => pr.id === e.target.value);
                      if (p) {
                        setSelectedProduct(p);
                        setSelectedColorIdx(0);
                        setShowingBack(false);
                        setQuantity(Math.max(quantity, p.moq));
                      }
                    }}
                    className="w-full px-4 py-3 bg-cream border border-stone text-sm text-dark focus:outline-none focus:border-dark"
                  >
                    {products
                      .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(p => (
                      <option key={p.id} value={p.id}>{p.name} -- From ${p.priceBase.toFixed(2)}/pc</option>
                    ))}
                  </select>
                </div>

                {/* Color — DESKTOP only */}
                <div className="hidden lg:block">
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    {selectedProduct.name} — Color ({currentColors.length})
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {currentColors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => { setSelectedColorIdx(idx); setShowingBack(false); }}
                        className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                          selectedColorIdx === idx
                            ? "border-dark scale-110"
                            : "border-transparent hover:border-dark/40"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {c.image && (
                          <Image
                            src={c.image}
                            alt={c.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-warm-gray mt-2">
                    Selected: {currentColors[selectedColorIdx]?.name}
                  </p>
                </div>

                {/* Decoration Method */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Decoration Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {decorationMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        className={`relative p-4 border-2 text-left transition-all ${
                          selectedMethod === m.id
                            ? "border-dark bg-dark/5"
                            : "border-stone hover:border-dark/30"
                        }`}
                      >
                        <span className="text-[11px] uppercase tracking-wider text-dark block mb-1">{m.label}</span>
                        <span className="text-[10px] text-warm-gray block">{m.desc}</span>
                        <span className="text-[11px] text-dark font-medium mt-1 block">+${m.pricePerPc.toFixed(2)}/pc</span>
                        {m.tag && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-dark text-cream text-[8px] uppercase tracking-wider">
                            {m.tag}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Placement */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Design Placement
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {placements.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlacement(p.id)}
                        className={`py-2 text-[10px] uppercase tracking-wider border transition-all ${
                          placement === p.id
                            ? "bg-dark text-cream border-dark"
                            : "bg-cream text-warm-gray border-stone hover:border-dark/30"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload - integrated into preview area above */}
                {uploadedImage && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">
                      Design Preview
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-light-gray overflow-hidden border border-stone">
                        <img src={uploadedImage} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setImgScale(s => Math.max(0.3, s - 0.1))}
                          className="w-7 h-7 border border-stone flex items-center justify-center text-xs hover:bg-light-gray"
                          title="Zoom out"
                        >-</button>
                        <span className="text-[11px] text-warm-gray w-8 text-center">{Math.round(imgScale * 100)}%</span>
                        <button
                          onClick={() => setImgScale(s => Math.min(3, s + 0.1))}
                          className="w-7 h-7 border border-stone flex items-center justify-center text-xs hover:bg-light-gray"
                          title="Zoom in"
                        >+</button>
                      </div>
                      <button
                        onClick={() => { setUploadedImage(null); setImgScale(1); }}
                        className="text-[11px] text-warm-gray hover:text-dark underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-[10px] text-warm-gray/60 mt-2">Scroll to zoom - Click preview to re-upload</p>
                  </div>
                )}

                {/* Quantity + Pricing Tiers */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <PricingTiers
                        basePrice={selectedProduct.priceBase + (currentMethod?.pricePerPc || 0)}
                        currentQty={quantity}
                        onSelectQty={setQuantity}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-[11px] uppercase tracking-wider text-dark shrink-0">
                      Exact Qty:
                    </label>
                    <button
                      onClick={() => handleQuantityStep(-10)}
                      className="w-9 h-9 border border-stone rounded-lg flex items-center justify-center text-lg hover:bg-light-gray transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-9 text-center border border-stone rounded-lg bg-cream text-sm text-dark"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityStep(10)}
                      className="w-9 h-9 border border-stone rounded-lg flex items-center justify-center text-lg hover:bg-light-gray transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Summary (Desktop) */}
                <div className="hidden lg:block border-t border-stone pt-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-gray">${selectedProduct.priceBase.toFixed(2)}/unit x {quantity} pcs (garment)</span>
                      <span className="text-dark">${(selectedProduct.priceBase * quantity).toFixed(2)}</span>
                    </div>
                    {currentMethod && (
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray">+ ${currentMethod.pricePerPc.toFixed(2)}/unit x {quantity} pcs ({currentMethod.label})</span>
                        <span className="text-dark">${(currentMethod.pricePerPc * quantity).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-stone">
                      <span className="text-dark">Estimated Total</span>
                      <span className="text-dark text-lg">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-warm-gray">FOB. Price includes garment + decoration. Shipping calculated separately.</p>
                  </div>
                  <a href={buildQuoteUrl()} className="btn-capsule w-full block text-center">
                    Request Quote
                  </a>
                  <Link 
                    href={`/custom-design?product=${selectedProduct.id}&name=${encodeURIComponent(selectedProduct.name)}&color=${encodeURIComponent((currentItem?.name ? currentItem.name + " - " : "") + (currentColors[selectedColorIdx]?.name || ""))}&image=${encodeURIComponent(currentImage || "")}`}
                    className="w-full block text-center text-sm py-3 px-6 border border-charcoal/30 text-charcoal uppercase tracking-widest rounded-full hover:border-charcoal hover:bg-charcoal/5 transition-all duration-300 mt-2"
                  >
                    🎨 Open Design Studio
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div ref={sectionRef} className="max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-caption text-warm-gray mb-4 block">The Process</span>
              <h2 className="text-display-md text-dark">
                How <span className="italic">Custom</span> Works
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="step-card">
                  <span className="font-heading text-4xl text-stone/60">{step.number}</span>
                  <h3 className="font-heading text-xl text-dark mt-4 mb-3">{step.title}</h3>
                  <p className="text-body-lg text-warm-gray">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Price Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone p-4 lg:hidden z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-warm-gray uppercase tracking-wider">Estimated Total</p>
              <p className="text-xl font-medium text-dark">${calculateTotal().toFixed(2)}</p>
              <p className="text-[10px] text-warm-gray">
                {selectedProduct.name} - {quantity} pcs
                {currentMethod ? ` (${currentMethod.label})` : ""}
              </p>
              <p className="text-[10px] text-warm-gray">${selectedProduct.priceBase.toFixed(2)}/unit + (${(currentMethod?.pricePerPc || 0).toFixed(2)}/unit decoration)</p>
            </div>
            <a href={buildQuoteUrl()} className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest">
              Get Quote
            </a>
          </div>
        </div>

        <Footer />
      </SmoothScroll>
    </>
  );
}
