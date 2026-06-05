"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Upload, ZoomIn, ZoomOut, ArrowRight, X, Trash2, Move } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PlacedDesign {
  id: string;
  image: string;
  x: number;
  y: number;
  scale: number;
}

export default function CustomDesignPage() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name") || "Custom T-Shirt";
  const productColor = searchParams.get("color") || "";
  const productImage = searchParams.get("image") || "";
  const productId = searchParams.get("product") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [designs, setDesigns] = useState<PlacedDesign[]>([]);
  const [activeDesignId, setActiveDesignId] = useState<string | null>(null);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; designId: string } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number; designId: string } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customer, setCustomer] = useState({
    name: "", email: "", company: "", phone: "", country: "", address: "",
    inquiryType: "custom", quantity: "50", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeDesign = designs.find(d => d.id === activeDesignId) || null;

  const updateDesign = useCallback((id: string, patch: Partial<PlacedDesign>) => {
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d));
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newDesign: PlacedDesign = {
        id: Date.now().toString(36),
        image: ev.target?.result as string,
        x: 50, y: 50, scale: 1,
      };
      setDesigns(prev => [...prev, newDesign]);
      setActiveDesignId(newDesign.id);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  const deleteDesign = useCallback((id: string) => {
    setDesigns(prev => {
      const next = prev.filter(d => d.id !== id);
      if (activeDesignId === id) setActiveDesignId(next.length > 0 ? next[next.length - 1].id : null);
      return next;
    });
  }, [activeDesignId]);

  // ─── Pointer events for drag + pinch ──
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const target = (e.target as HTMLElement).closest("[data-design-id]");
    const designId = target?.getAttribute("data-design-id");
    if (!designId || !designs.find(d => d.id === designId)) {
      if (pointers.current.size === 1) setActiveDesignId(null);
      return;
    }
    setActiveDesignId(designId);
    const des = designs.find(d => d.id === designId)!;
    if (pointers.current.size === 1) {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      dragRef.current = {
        startX: e.clientX, startY: e.clientY,
        origX: des.x, origY: des.y, designId,
      };
    } else if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchRef.current = { dist, scale: des.scale, designId };
      dragRef.current = null;
    }
  }, [designs]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (pointers.current.size === 1 && dragRef.current) {
      const dxPct = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      updateDesign(dragRef.current.designId, {
        x: Math.max(5, Math.min(95, dragRef.current.origX + dxPct)),
        y: Math.max(5, Math.min(95, dragRef.current.origY + dyPct)),
      });
    } else if (pointers.current.size >= 2 && pinchRef.current) {
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ratio = dist / pinchRef.current.dist;
      updateDesign(pinchRef.current.designId, {
        scale: Math.max(0.3, Math.min(3, pinchRef.current.scale * ratio)),
      });
    }
  }, [updateDesign]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 1) { dragRef.current = null; pinchRef.current = null; }
    else if (pointers.current.size === 1 && dragRef.current) {
      const ptr = Array.from(pointers.current.values())[0];
      const des = designs.find(d => d.id === dragRef.current!.designId);
      if (des) dragRef.current = { startX: ptr.x, startY: ptr.y, origX: des.x, origY: des.y, designId: dragRef.current.designId };
      pinchRef.current = null;
    }
  }, [designs]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!activeDesign) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    updateDesign(activeDesign.id, { scale: Math.max(0.3, Math.min(3, activeDesign.scale + delta)) });
  }, [activeDesign, updateDesign]);

  const canContinue = designs.length > 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designs, customer, product: { name: productName, color: productColor, id: productId } }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Submission failed. Please try again.");
    } catch {
      alert("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-serif text-charcoal mb-4">Design Submitted!</h1>
          <p className="text-muted mb-8">We&apos;ve received your design for {productName}{productColor && ` (${productColor})`} and will reply within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full">Back Home</Link>
            <Link href="/custom" className="px-6 py-3 border border-charcoal/30 text-charcoal text-sm uppercase tracking-widest rounded-full">← Back to Custom</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* ── 顶部标题 ── */}
      <div className="pt-20 md:pt-24 shrink-0 section-padding max-w-7xl mx-auto w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0">
            <Link href="/custom" className="text-[10px] text-muted/50 hover:text-muted transition-colors tracking-[0.2em] flex items-center gap-1 mb-1">
              ← Back to Customize
            </Link>
            <h1 className="text-lg md:text-xl font-serif text-charcoal truncate">Design Studio — {productName}</h1>
            {productColor && <span className="text-[11px] text-muted mt-0.5 block">{productColor}</span>}
          </div>
          <div className="flex gap-1.5 shrink-0">{/* step indicators */}
            {[1, 2, 3].map(s => (
              <div key={s} className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${step >= s ? 'bg-charcoal text-cream' : 'bg-stone/30 text-muted'}`}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STEP 1: DESIGN ── */}
      {step === 1 && (
        <div className="flex-1 flex flex-col section-padding max-w-7xl mx-auto w-full pb-8">
          {/* 顶部工具条（选中设计时显示） */}
          {activeDesign && (
            <div className="flex items-center gap-3 bg-white rounded-xl border border-stone/40 shadow-sm px-4 py-2.5 mb-4">
              <Move size={14} className="text-muted/60 shrink-0" />
              <span className="text-[11px] text-muted mr-2">Size:</span>
              <ZoomOut size={12} className="text-muted/60 shrink-0" />
              <input
                type="range" min="0.3" max="3" step="0.05"
                value={activeDesign.scale}
                onChange={e => updateDesign(activeDesign.id, { scale: Math.max(0.3, Math.min(3, parseFloat(e.target.value))) })}
                className="flex-1 max-w-[200px] h-1 bg-stone/20 rounded-full appearance-none cursor-pointer accent-charcoal"
              />
              <ZoomIn size={12} className="text-muted/60 shrink-0" />
              <span className="text-[10px] text-muted w-8 text-right tabular-nums">{activeDesign.scale.toFixed(1)}x</span>
              <span className="text-stone/30 mx-2">|</span>
              <button
                onClick={() => deleteDesign(activeDesign.id)}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={10} /> Remove
              </button>
            </div>
          )}

          <div className="flex-1 flex lg:flex-row flex-col gap-6 min-h-0">
            {/* ─── 画布 ─── */}
            <div className="flex-1 relative min-h-[50vh] lg:min-h-0">
              <div
                ref={canvasRef}
                className="absolute inset-0 bg-white rounded-2xl border border-stone/30 overflow-hidden shadow-sm"
                style={{ touchAction: "none" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
              >
                {/* 产品底图 */}
                <div className="absolute inset-0 flex items-center justify-center bg-white select-none">
                  {productImage ? (
                    <img src={productImage} alt={productName} className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
                  ) : (
                    <div className="w-3/5 h-4/5 bg-stone/10 rounded-xl flex items-center justify-center text-muted/20 text-sm">Preview</div>
                  )}
                </div>

                {/* 已放置的设计 */}
                {designs.map(des => (
                  <div key={des.id} data-design-id={des.id}
                    className={`absolute cursor-grab active:cursor-grabbing select-none z-20 rounded-lg transition-shadow ${
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

                {/* 空状态 */}
                {designs.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted/30 pointer-events-none">
                    <Upload size={40} />
                    <span className="text-xs">Upload your design below</span>
                    <span className="text-[10px]">Drag to move · Scroll/Pinch to scale</span>
                  </div>
                )}

                {/* 产品标签 */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-[10px] uppercase tracking-wider text-charcoal rounded z-40 shadow-sm pointer-events-none select-none">
                  {productName}{productColor ? ` — ${productColor}` : ""}
                </div>

                {/* 右下角设计数量 */}
                {designs.length > 0 && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-[10px] text-muted rounded z-40 shadow-sm pointer-events-none select-none">
                    {designs.length} design{designs.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>

            {/* ─── 右侧面板（桌面） ─── */}
            <div className="lg:w-64 shrink-0 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-stone/30 p-5 shadow-sm">
                <h3 className="text-[11px] uppercase tracking-wider text-muted mb-4">Upload Artwork</h3>
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest rounded-full hover:bg-ink transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={12} /> {designs.length === 0 ? "Upload Design" : "Add More"}
                </button>
                <p className="text-[10px] text-muted/40 text-center mt-2">PNG or JPG</p>
              </div>

              {/* 已有设计列表 */}
              {designs.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone/30 p-5 shadow-sm">
                  <h3 className="text-[11px] uppercase tracking-wider text-muted mb-3">Placed Designs</h3>
                  <div className="space-y-2">
                    {designs.map((des, i) => (
                      <button key={des.id} onClick={() => setActiveDesignId(des.id)}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all text-left ${
                          activeDesignId === des.id ? 'border-gold/50 bg-gold/5' : 'border-transparent hover:bg-stone/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone/20 bg-warmgray shrink-0">
                          <img src={des.image} alt={`Design ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-charcoal font-medium">Design #{i + 1}</p>
                          <p className="text-[10px] text-muted/60">{des.scale.toFixed(1)}x &middot; ({Math.round(des.x)}%, {Math.round(des.y)}%)</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteDesign(des.id); }}
                          className="p-1 text-muted/30 hover:text-red-500 transition-colors"><X size={10} /></button>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 下一步 */}
              <button onClick={() => setStep(2)} disabled={!canContinue}
                className={`w-full py-3 text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  canContinue ? 'bg-charcoal text-cream hover:bg-ink' : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                }`}
              >
                Review <ArrowRight size={12} />
              </button>
            </div>

            {/* ─── 手机底部操作区 ─── */}
            <div className="lg:hidden flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 bg-charcoal text-cream text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2"
                >
                  <Upload size={12} /> {designs.length === 0 ? "Upload Design" : "Add More"}
                </button>
              </div>
              <button onClick={() => setStep(2)} disabled={!canContinue}
                className={`w-full py-3 text-xs uppercase tracking-widest rounded-full ${
                  canContinue ? 'bg-charcoal text-cream' : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                }`}
              >
                {canContinue ? "Review →" : "Upload a design first"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: REVIEW ── */}
      {step === 2 && (
        <div className="flex-1 section-padding max-w-4xl mx-auto w-full pb-8">
          <h2 className="text-xl font-serif text-charcoal mb-2">Review Your Design</h2>
          <p className="text-sm text-muted mb-6">{productName}{productColor ? ` — ${productColor}` : ""} &middot; {designs.length} design{designs.length > 1 ? 's' : ''}</p>
          <div className="bg-white rounded-2xl border border-stone/30 p-6 mb-6 shadow-sm">
            <div className="aspect-[4/5] max-w-md mx-auto relative bg-warmgray/20 rounded-xl overflow-hidden">
              {productImage && <img src={productImage} alt={productName} className="w-full h-full object-contain absolute inset-0" />}
              {designs.map(des => (
                <div key={des.id} className="absolute" style={{
                  left: `${des.x}%`, top: `${des.y}%`,
                  width: `${40 * des.scale}%`, height: `${30 * des.scale}%`,
                  transform: "translate(-50%, -50%)",
                }}>
                  <img src={des.image} alt="Design" className="w-full h-full object-contain opacity-85" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-stone/50 text-charcoal text-sm uppercase tracking-widest rounded-full hover:bg-stone/20 transition-all">← Edit</button>
            <button onClick={() => setStep(3)} className="px-8 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full hover:bg-ink transition-all">Continue →</button>
          </div>
        </div>
      )}

      {/* ── STEP 3: CUSTOMER INFO ── */}
      {step === 3 && (
        <div className="flex-1 section-padding max-w-4xl mx-auto w-full pb-8">
          <h2 className="text-xl font-serif text-charcoal mb-2">Your Contact Information</h2>
          <p className="text-sm text-muted mb-6">Custom inquiry for {productName}{productColor ? ` (${productColor})` : ""}</p>
          <div className="bg-white rounded-2xl border border-stone/30 p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Name *", key: "name", placeholder: "Your name", required: true },
                { label: "Email *", key: "email", placeholder: "your@email.com", required: true, type: "email" },
                { label: "Company", key: "company", placeholder: "Brand or company name" },
                { label: "Phone / WhatsApp", key: "phone", placeholder: "+1 (555) 000-0000" },
                { label: "Country / Region *", key: "country", placeholder: "e.g. United States", required: true },
                { label: "Shipping Address", key: "address", placeholder: "City, State, Postal code" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">{f.label}</label>
                  <input type={f.type || "text"} required={f.required} value={(customer as any)[f.key]} onChange={e => setCustomer(c => ({ ...c, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border border-stone/40 rounded-xl text-sm text-charcoal placeholder:text-muted/30 focus:outline-none focus:border-charcoal/50 transition-all"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">Estimated Quantity *</label>
              <input type="number" required value={customer.quantity} onChange={e => setCustomer(c => ({ ...c, quantity: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-stone/40 rounded-xl text-sm text-charcoal focus:outline-none focus:border-charcoal/50 transition-all"
                placeholder="50"
              />
            </div>
            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">Additional Notes</label>
              <textarea rows={3} value={customer.message} onChange={e => setCustomer(c => ({ ...c, message: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-stone/40 rounded-xl text-sm text-charcoal placeholder:text-muted/30 focus:outline-none focus:border-charcoal/50 transition-all resize-none"
                placeholder="Any special requests..."
              />
            </div>
            <div className="bg-warmgray/30 rounded-xl p-4 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Designs attached ({designs.length})</p>
              <div className="flex gap-2 flex-wrap">
                {designs.map(d => (
                  <div key={d.id} className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-stone/30">
                    <img src={d.image} alt="Design" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-stone/50 text-charcoal text-sm uppercase tracking-widest rounded-full hover:bg-stone/20 transition-all">← Back</button>
              <button onClick={handleSubmit} disabled={submitting || !customer.name || !customer.email || !customer.country}
                className="flex-1 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full hover:bg-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Custom Order →"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
