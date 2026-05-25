"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 产品数据（与产品目录同步）
const products = [
  { id: "280g-heavy-tee", name: "280gsm Heavyweight T-Shirt", priceBase: 4.50, moq: 50, category: "T-Shirts" },
  { id: "360g-crewneck", name: "360gsm Washed Crewneck", priceBase: 10.00, moq: 50, category: "Hoodies" },
  { id: "180g-classic", name: "180gsm Classic Crewneck Tee", priceBase: 1.20, moq: 50, category: "T-Shirts" },
  { id: "260g-american", name: "260gsm American Streetwear Tee", priceBase: 3.80, moq: 50, category: "T-Shirts" },
  { id: "220g-relaxed", name: "220gsm Relaxed Fit Tee", priceBase: 2.80, moq: 50, category: "T-Shirts" },
  { id: "210g-kids", name: "210gsm Kids Drop Shoulder Tee", priceBase: 1.00, moq: 50, category: "Kids" },
  { id: "230g-washed", name: "230gsm Washed Vintage Tee", priceBase: 3.50, moq: 50, category: "T-Shirts" },
  { id: "colorblock-longsleeve", name: "Color-Block Raglan Long Sleeve", priceBase: 5.00, moq: 50, category: "Long Sleeves" },
];

const decorationMethods = [
  { id: "screen", label: "Screen Print", desc: "Best for bulk 50+ units", pricePerPc: 1.50, tag: "Popular", minQty: 50 },
  { id: "dtg", label: "DTG", desc: "Full-color, no minimum", pricePerPc: 3.00, tag: null, minQty: 1 },
  { id: "embroidery", label: "Embroidery", desc: "Premium stitched logo", pricePerPc: 2.50, tag: "Premium", minQty: 50 },
  { id: "transfer", label: "Heat Transfer", desc: "Small runs, complex", pricePerPc: 2.00, tag: null, minQty: 25 },
];

const colors = [
  { name: "White", hex: "#ffffff" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Cream", hex: "#FAF9F6" },
  { name: "Heather", hex: "#B0B0B0" },
  { name: "Navy", hex: "#1B3A5C" },
  { name: "Sage", hex: "#8FA68E" },
  { name: "Wine Red", hex: "#722F37" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Royal Blue", hex: "#4169E1" },
];

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

export default function CustomPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [placement, setPlacement] = useState("center");
  const [quantity, setQuantity] = useState(50);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentMethod = decorationMethods.find(m => m.id === selectedMethod);

  const calculateTotal = () => {
    const garmentCost = selectedProduct.priceBase * quantity;
    const decorationCost = (currentMethod?.pricePerPc || 0) * quantity;
    return garmentCost + decorationCost;
  };

  const buildQuoteUrl = () => {
    const params = new URLSearchParams({
      subject: `Custom Order: ${selectedProduct.name} × ${quantity}pcs`,
      product: selectedProduct.id,
      color: colors.find(c => c.hex === selectedColor)?.name || "White",
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
        <main className="pt-28 pb-20">
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
              {/* Preview Area */}
              <div className="relative aspect-[3/4] bg-light-gray flex items-center justify-center overflow-hidden">
                <div
                  className="relative w-3/4 aspect-[3/4] transition-colors duration-500"
                  style={{ backgroundColor: selectedColor }}
                >
                  <svg
                    viewBox="0 0 300 400"
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.1))" }}
                  >
                    <path
                      d="M75 60 L110 40 L150 70 L190 40 L225 60 L240 120 L210 130 L210 380 L90 380 L90 130 L60 120 Z"
                      fill={selectedColor}
                      stroke="#00000010"
                      strokeWidth="1"
                    />
                  </svg>

                  {uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center p-20">
                      <img
                        src={uploadedImage}
                        alt="Your design"
                        className="max-w-[60%] max-h-[40%] object-contain opacity-90"
                        style={{
                          transform:
                            placement === "left"
                              ? "translate(-40%, -30%) scale(0.5)"
                              : placement === "back"
                              ? "translate(0, 10%) scale(0.7)"
                              : placement === "sleeve"
                              ? "translate(60%, -50%) scale(0.3) rotate(15deg)"
                              : "scale(0.8)",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </div>
                  )}

                  {!uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-warm-gray/40 text-sm">Upload a design to preview</p>
                    </div>
                  )}
                </div>

                {/* Product label overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[11px] uppercase tracking-wider text-dark">
                  {selectedProduct.name}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-8">
                {/* Product Selector */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Product
                  </label>
                  <select
                    value={selectedProduct.id}
                    onChange={(e) => {
                      const p = products.find(pr => pr.id === e.target.value);
                      if (p) {
                        setSelectedProduct(p);
                        setQuantity(Math.max(quantity, p.moq));
                      }
                    }}
                    className="w-full px-4 py-3 bg-cream border border-stone text-sm text-dark focus:outline-none focus:border-dark"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} — From ${p.priceBase.toFixed(2)}/pc</option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Garment Color ({colors.length})
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === c.hex
                            ? "border-dark scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-warm-gray mt-2">
                    Current: {colors.find((c) => c.hex === selectedColor)?.name}
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
                            : "border-stone hover:border-dark/40"
                        }`}
                      >
                        {m.tag && (
                          <span className="absolute top-2 right-2 text-[9px] bg-gold text-cream px-2 py-0.5 uppercase tracking-wider">
                            {m.tag}
                          </span>
                        )}
                        <p className="text-sm font-medium text-dark">{m.label}</p>
                        <p className="text-[11px] text-warm-gray mt-1">{m.desc}</p>
                        <p className="text-[11px] font-medium text-gold mt-2">From ${m.pricePerPc.toFixed(2)}/pc</p>
                      </button>
                    ))}
                  </div>
                  {selectedMethod && currentMethod && quantity < currentMethod.minQty && (
                    <p className="text-[11px] text-red-500 mt-2">
                      ⚠ Minimum {currentMethod.minQty} pieces for {currentMethod.label}
                    </p>
                  )}
                </div>

                {/* Placement */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Placement
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {placements.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlacement(p.id)}
                        className={`px-4 py-3 text-[12px] uppercase tracking-wider border transition-all ${
                          placement === p.id
                            ? "border-dark bg-dark text-cream"
                            : "border-stone text-dark/60 hover:border-dark/40"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Upload Design
                  </label>
                  <div className="border-2 border-dashed border-stone p-6 text-center hover:border-dark transition-colors">
                    <input
                      type="file"
                      accept="image/*,.ai,.psd,.pdf"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="design-upload"
                    />
                    <label htmlFor="design-upload" className="cursor-pointer block">
                      <svg className="w-8 h-8 mx-auto mb-3 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-warm-gray">{uploadedImage ? "Replace design" : "Drop file here or click to upload"}</p>
                      <p className="text-[11px] text-warm-gray/60 mt-1">AI, PSD, PNG, PDF up to 20MB · Min 300 DPI</p>
                    </label>
                  </div>
                  {uploadedImage && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-12 h-12 bg-light-gray overflow-hidden">
                        <img src={uploadedImage} alt="" className="w-full h-full object-contain" />
                      </div>
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="text-[11px] text-warm-gray hover:text-dark underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityStep(-50)}
                      className="w-10 h-10 border border-stone flex items-center justify-center text-dark hover:bg-cream transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-2xl font-medium text-dark">{quantity}</span>
                      <span className="text-[11px] text-warm-gray ml-1">pcs</span>
                    </div>
                    <button
                      onClick={() => handleQuantityStep(50)}
                      className="w-10 h-10 border border-stone flex items-center justify-center text-dark hover:bg-cream transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto">
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
                    <p className="text-[10px] text-warm-gray">FOB Guangzhou · Excludes shipping & sample · Final quote may vary</p>
                  </div>

                  <a href={buildQuoteUrl()} className="btn-capsule w-full block text-center">
                    Request Quote — ${calculateTotal().toFixed(0)} est.
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
        </main>

        {/* Mobile Sticky Price Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone p-4 lg:hidden z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-warm-gray uppercase tracking-wider">Estimated Total</p>
              <p className="text-xl font-medium text-dark">${calculateTotal().toFixed(2)}</p>
              <p className="text-[10px] text-warm-gray">
                {selectedProduct.name} · {quantity} pcs
                {currentMethod && ` · ${currentMethod.label}`}
              </p>
            </div>
            <a
              href={buildQuoteUrl()}
              className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest"
            >
              Quote →
            </a>
          </div>
        </div>

        <Footer />
      </SmoothScroll>
    </>
  );
}

