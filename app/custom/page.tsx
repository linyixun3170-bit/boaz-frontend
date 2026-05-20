"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { products } from "@/lib/products-catalog";

export default function CustomPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 pb-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CustomContent />
    </Suspense>
  );
}

function CustomContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams?.get("product") || "";
  const initialProduct = products.find(p => p.id === productParam) || products[0];
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [activeView, setActiveView] = useState<"front" | "back">("front");
  const [selectedColor, setSelectedColor] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [removeBg, setRemoveBg] = useState(false);
  const [bgTolerance, setBgTolerance] = useState(30);
  const [designSize, setDesignSize] = useState(40);
  const [designPos, setDesignPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showGuide, setShowGuide] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  // Remove background using edge-sampling algorithm
  // 1. Samples pixels from edges (most likely background)
  // 2. Removes similar pixels within tolerance
  // 3. Pure client-side, no external API
  const removeBackground = useCallback((imageSrc: string, tolerance: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Sample background color from edges
        const samples: number[][] = [];
        // Top row, bottom row, left column, right column
        for (let x = 0; x < canvas.width; x++) {
          samples.push([data[x*4], data[x*4+1], data[x*4+2]]); // top
          samples.push([data[(canvas.height-1)*canvas.width*4 + x*4], data[(canvas.height-1)*canvas.width*4 + x*4+1], data[(canvas.height-1)*canvas.width*4 + x*4+2]]); // bottom
        }
        for (let y = 0; y < canvas.height; y++) {
          samples.push([data[y*canvas.width*4], data[y*canvas.width*4+1], data[y*canvas.width*4+2]]); // left
          samples.push([data[y*canvas.width*4 + (canvas.width-1)*4], data[y*canvas.width*4 + (canvas.width-1)*4+1], data[y*canvas.width*4 + (canvas.width-1)*4+2]]); // right
        }
        // Average edge color
        const avg = [0, 0, 0];
        for (const s of samples) { avg[0] += s[0]; avg[1] += s[1]; avg[2] += s[2]; }
        avg[0] /= samples.length; avg[1] /= samples.length; avg[2] /= samples.length;

        // Remove background with edge feathering to reduce white borders
        for (let i = 0; i < data.length; i += 4) {
          const dr = data[i] - avg[0];
          const dg = data[i+1] - avg[1];
          const db = data[i+2] - avg[2];
          const dist = Math.sqrt(dr*dr + dg*dg + db*db);
          if (dist < tolerance * 0.7) {
            data[i+3] = 0; // fully transparent (core background)
          } else if (dist < tolerance) {
            // Feather edge: gradual transparency
            data[i+3] = Math.floor(255 * (1 - (dist - tolerance * 0.7) / (tolerance * 0.3)));
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageSrc;
    });
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const src = event.target?.result as string;
      setUploadedImage(src);
      setProcessedImage(null);
      setRemoveBg(false);
      setDesignPos({ x: 50, y: 50 });
      setDesignSize(40);
      setShowGuide(false);
    };
    reader.readAsDataURL(file);
  }, []);

  // Apply/remove background removal
  useEffect(() => {
    if (!uploadedImage) return;
    if (removeBg) {
      removeBackground(uploadedImage, bgTolerance).then(res => setProcessedImage(res));
    } else {
      setProcessedImage(null);
    }
  }, [removeBg, bgTolerance, uploadedImage, removeBackground]);

  const displayImage = processedImage || uploadedImage;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    setIsDragging(true);
    // Convert design position from % to pixels for correct offset calculation
    const designPxX = (designPos.x / 100) * rect.width;
    const designPxY = (designPos.y / 100) * rect.height;
    setDragOffset({
      x: e.clientX - designPxX,
      y: e.clientY - designPxY,
    });
  }, [designPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    // Convert mouse position from pixels back to %
    const x = ((e.clientX - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - dragOffset.y) / rect.height) * 100;
    setDesignPos({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetDesign = () => {
    setUploadedImage(null);
    setDesignSize(40);
    setDesignPos({ x: 50, y: 50 });
    setShowGuide(true);
  };

  const colorDots = selectedProduct.colors.slice(0, 10);
  // Use SKU color image when selected for true color preview, fallback to product main image
  const currentColor = selectedProduct.colors[selectedColor];
  const imageSrc = currentColor?.image || (activeView === "front"
    ? selectedProduct.images.main
    : (selectedProduct.images.gallery[2] || selectedProduct.images.main));

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream">
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-gold text-xs uppercase tracking-[0.25em]">Customizer</span>
          <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">Design Your Garment</h1>
          <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
            Upload your logo or design, place it on the garment, and preview the result before you order.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Preview Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-light-gray overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-light-gray">
                <div className="flex gap-2">
                  <button onClick={() => setActiveView("front")} className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all ${activeView === "front" ? "bg-dark text-cream" : "bg-light-gray text-dark/70 hover:bg-dark hover:text-cream"}`}>
                    Front
                  </button>
                  <button onClick={() => setActiveView("back")} className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all ${activeView === "back" ? "bg-dark text-cream" : "bg-light-gray text-dark/70 hover:bg-dark hover:text-cream"}`}>
                    Back
                  </button>
                </div>
                {uploadedImage && (
                  <button onClick={resetDesign} className="text-xs text-warm-gray hover:text-dark transition-colors">
                    Reset
                  </button>
                )}
              </div>

              {/* Canvas */}
              <div
                ref={previewRef}
                className="relative w-full aspect-[4/5] bg-cream overflow-hidden select-none"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image src={imageSrc} alt={selectedProduct.name} fill className="object-contain p-4" priority />

                {/* Uploaded design overlay */}
                {uploadedImage && (
                  <div
                    ref={designRef}
                    className="absolute cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${designPos.x}%`,
                      top: `${designPos.y}%`,
                      width: `${designSize}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <img src={displayImage || ''} alt="Your design" className="w-full h-auto pointer-events-none" draggable={false} />
                  </div>
                )}

                {/* Guide overlay */}
                {showGuide && !uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm">
                      <svg className="w-12 h-12 text-warm-gray/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-warm-gray">Upload your design to preview on garment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Product</h3>
              <select
                value={selectedProduct.id}
                onChange={(e) => {
                  const p = products.find(pr => pr.id === e.target.value);
                  if (p) setSelectedProduct(p);
                  resetDesign();
                }}
                className="w-full px-4 py-2.5 bg-cream border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:border-gold"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Color picker */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Color ({colorDots.length})</h3>
              <div className="flex flex-wrap gap-2">
                {colorDots.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === i ? "border-gold scale-110" : "border-light-gray hover:border-gold/50"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Decoration Technique */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Decoration Method</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "screen", label: "Screen Print", desc: "Best for bulk orders" },
                  { id: "dtg", label: "DTG", desc: "Full-color, no minimum" },
                  { id: "embroidery", label: "Embroidery", desc: "Premium stitched look" },
                  { id: "transfer", label: "Heat Transfer", desc: "Small runs, complex" },
                ].map(t => (
                  <button
                    key={t.id}
                    className="p-3 rounded-xl border text-left transition-all hover:border-gold/50 bg-cream"
                  >
                    <p className="text-xs font-medium text-dark">{t.label}</p>
                    <p className="text-[9px] text-warm-gray mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Upload Design</h3>
              <label className="block w-full px-4 py-8 border-2 border-dashed border-light-gray rounded-xl text-center cursor-pointer hover:border-gold/50 transition-colors">
                <svg className="w-8 h-8 text-warm-gray/40 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-warm-gray">Upload your logo or design (PNG / JPG)</p>
                <p className="text-xs text-warm-gray/50 mt-1">Drag to position • Size slider to resize</p>
                <input type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
              </label>
            </div>

            {/* Background Removal */}
            {uploadedImage && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Background</h3>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setRemoveBg(false)}
                    className={`flex-1 px-3 py-2 text-xs rounded-full transition-all ${
                      !removeBg ? 'bg-dark text-cream' : 'bg-light-gray text-dark/70 hover:bg-dark hover:text-cream'
                    }`}
                  >
                    Keep Original
                  </button>
                  <button
                    onClick={() => setRemoveBg(true)}
                    className={`flex-1 px-3 py-2 text-xs rounded-full transition-all ${
                      removeBg ? 'bg-dark text-cream' : 'bg-light-gray text-dark/70 hover:bg-dark hover:text-cream'
                    }`}
                  >
                    Remove Background
                  </button>
                </div>
                {removeBg && (
                  <div>
                    <div className="flex justify-between text-xs text-warm-gray mb-1">
                      <span>Less removal</span>
                      <span>More removal</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={bgTolerance}
                      onChange={(e) => setBgTolerance(Number(e.target.value))}
                      className="w-full accent-gold"
                    />
                    <p className="text-[10px] text-warm-gray/60 mt-1">
                      {bgTolerance < 25 ? 'Strict — only removes exact match' : 
                       bgTolerance < 50 ? 'Balanced — removes similar colors' : 
                       'Aggressive — removes wide color range'}
                    </p>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-[9px] text-warm-gray uppercase tracking-wider">Original</p>
                    <div className="mt-1 w-12 h-12 bg-light-gray rounded border border-light-gray overflow-hidden">
                      {uploadedImage && <img src={uploadedImage} alt="" className="w-full h-full object-contain" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] text-warm-gray uppercase tracking-wider">Result</p>
                    <div className="mt-1 w-12 h-12 bg-[repeating-conic-gradient(#e8e4dc_0%_25%,transparent_0%_50%)_50%/10px_10px] rounded border border-light-gray overflow-hidden">
                      {displayImage && <img src={displayImage} alt="result" className="w-full h-full object-contain" />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Size slider */}
            {uploadedImage && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-3">Size</h3>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={designSize}
                  onChange={(e) => setDesignSize(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-warm-gray/50 mt-1">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              href={`/contact?subject=Custom%20Order%3A%20${encodeURIComponent(selectedProduct.name)}`}
              className="block w-full px-6 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full text-center hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Request Quote for This Design
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
