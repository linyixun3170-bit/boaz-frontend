"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const imgBase = "/images/products";

interface ProductOption {
  id: string;
  name: string;
  priceBase: number;
  moq: number;
  category: string;
  colors: { name: string; hex: string; image?: string }[];
}

const products: ProductOption[] = [
  {
    id: "230g-washed-tee", name: "230gsm Washed Vintage T-Shirt", priceBase: 3.50, moq: 50, category: "T-Shirts",
    colors: [
      { name: "Black", hex: "#111111", image: `${imgBase}/230g-washed-tee/1-黑色.jpg` },
      { name: "Light Gray", hex: "#d3d3d3", image: `${imgBase}/230g-washed-tee/2-浅灰色.jpg` },
      { name: "Brown", hex: "#8b4513", image: `${imgBase}/230g-washed-tee/3-棕色.jpg` },
      { name: "Rose Pink", hex: "#ffc0cb", image: `${imgBase}/230g-washed-tee/4-玫红色.jpg` },
      { name: "Green", hex: "#228b22", image: `${imgBase}/230g-washed-tee/5-绿色.jpg` },
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
];

const decorationMethods = [
  { id: "screen", label: "Screen Print", desc: "Best for bulk 50+ units", pricePerPc: 1.50, tag: "Popular", minQty: 50 },
  { id: "dtg", label: "DTG", desc: "Full-color, no minimum", pricePerPc: 3.00, tag: null, minQty: 1 },
  { id: "embroidery", label: "Embroidery", desc: "Premium stitched logo", pricePerPc: 2.50, tag: "Premium", minQty: 50 },
  { id: "transfer", label: "Heat Transfer", desc: "Small runs, complex", pricePerPc: 2.00, tag: null, minQty: 25 },
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
  const selectedColorHex = currentColors[selectedColorIdx]?.hex || "#ffffff";
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [placement, setPlacement] = useState("center");
  const [quantity, setQuantity] = useState(50);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imgScale, setImgScale] = useState(1);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="pt-28 pb-20">
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

          {/* Size Chart Quick Reference */}
          <div className="max-w-[1400px] mx-auto section-padding mb-8">
            <div className="bg-offwhite p-6 border border-stone">
              <p className="text-[11px] uppercase tracking-wider text-dark mb-2">Size Chart Reference</p>
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone">
                      <th className="text-left py-1 pr-4 text-muted">Size</th>
                      <th className="text-center px-2 text-muted">S</th>
                      <th className="text-center px-2 text-muted">M</th>
                      <th className="text-center px-2 text-muted">L</th>
                      <th className="text-center px-2 text-muted">XL</th>
                      <th className="text-center px-2 text-muted">2XL</th>
                      <th className="text-center px-2 text-muted">3XL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-dark">Chest (in)</td>
                      <td className="text-center px-2 text-dark">36</td>
                      <td className="text-center px-2 text-dark">38</td>
                      <td className="text-center px-2 text-dark">40</td>
                      <td className="text-center px-2 text-dark">42</td>
                      <td className="text-center px-2 text-dark">44</td>
                      <td className="text-center px-2 text-dark">46</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-dark">Length (in)</td>
                      <td className="text-center px-2 text-dark">27</td>
                      <td className="text-center px-2 text-dark">28</td>
                      <td className="text-center px-2 text-dark">29</td>
                      <td className="text-center px-2 text-dark">30</td>
                      <td className="text-center px-2 text-dark">31</td>
                      <td className="text-center px-2 text-dark">32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-warm-gray mt-2">* Measurements vary by product. See product detail for exact specs.</p>
            </div>
          </div>

          {/* Main Customizer */}
          <div className="max-w-[1400px] mx-auto section-padding mb-24">
            {/* Mobile Step Indicator */}
            <div className="flex items-center gap-3 py-4 overflow-x-auto lg:hidden mb-6">
              {["Product", "Color", "Method", "Upload", "Quote"].map((label, i) => (
                <div key={label} className="flex items-center gap-2 shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${
                    i <= 2 ? "bg-dark text-cream" : "bg-light-gray text-warm-gray"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-[11px] text-warm-gray whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Preview Area — click to upload */}
              <div
                className="relative aspect-[3/4] bg-light-gray flex items-center justify-center overflow-hidden cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/ai,image/psd,image/pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <div
                  className="relative w-3/4 aspect-[3/4] transition-colors duration-500"
                  style={{ backgroundColor: selectedColorHex }}
                >
                  <svg
                    viewBox="0 0 300 400"
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.1))" }}
                  >
                    <path
                      d="M75 60 L110 40 L150 70 L190 40 L225 60 L240 120 L210 130 L210 380 L90 380 L90 130 L60 120 Z"
                      fill={selectedColorHex}
                      stroke="#00000010"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* This is the long SVG path for the t-shirt shape */}
                  {uploadedImage && (
                    <div
                      className="absolute inset-0"
                      onWheel={(e) => {
                        e.preventDefault();
                        setImgScale(s => Math.max(0.3, Math.min(3, s - e.deltaY * 0.001)));
                      }}
                    >
                      <img
                        src={uploadedImage}
                        alt="Your design"
                        className="opacity-90 pointer-events-none select-none"
                        style={{
                          width: `${60 * imgScale}%`,
                          height: `${40 * imgScale}%`,
                          objectFit: "contain",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          transition: "width 0.2s ease, height 0.2s ease",
                        }}
                      />
                    </div>
                  )}

                  {!uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/5 transition-colors">
                      <div className="text-center">
                        <svg className="w-10 h-10 mx-auto mb-2 text-warm-gray/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-warm-gray/50 text-xs">Click to upload your design</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product label overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[11px] uppercase tracking-wider text-dark">
                  {selectedProduct.name}
                </div>

                {uploadedImage && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] text-warm-gray uppercase tracking-wider">
                    <span>Click to re-upload</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="space-y-8">
                {/* Search + Product Selector */}
                <div>
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

                {/* Color — dynamically shows selected product's SKU colors */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    {selectedProduct.name} — Color ({currentColors.length})
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {currentColors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIdx(idx)}
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

                {/* Quantity */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => handleQuantityStep(-10)}
                      className="w-10 h-10 border border-stone flex items-center justify-center text-lg hover:bg-light-gray transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border border-stone bg-cream text-sm text-dark"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityStep(10)}
                      className="w-10 h-10 border border-stone flex items-center justify-center text-lg hover:bg-light-gray transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {quickQtys.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border transition-all whitespace-nowrap ${
                          quantity === q
                            ? "border-dark bg-dark text-cream"
                            : "border-stone text-dark/60 hover:border-dark/40"
                        }`}
                      >
                        {q}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Summary (Desktop) */}
                <div className="hidden lg:block border-t border-stone pt-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-gray">Garment</span>
                      <span className="text-dark">${(selectedProduct.priceBase * quantity).toFixed(2)}</span>
                    </div>
                    {currentMethod && (
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray">{currentMethod.label}</span>
                        <span className="text-dark">${(currentMethod.pricePerPc * quantity).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-stone">
                      <span className="text-dark">Estimated Total</span>
                      <span className="text-dark text-lg">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-warm-gray">FOB Ningbo - Excludes shipping and sample - Final quote may vary</p>
                  </div>
                  <a href={buildQuoteUrl()} className="btn-capsule w-full block text-center">
                    Request Quote -- ${calculateTotal().toFixed(0)} est.
                  </a>
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
                {currentMethod && ` - ${currentMethod.label}`}
              </p>
            </div>
            <a href={buildQuoteUrl()} className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest">
              Quote -
            </a>
          </div>
        </div>

        <Footer />
      </SmoothScroll>
    </>
  );
}
