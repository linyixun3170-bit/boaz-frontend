"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Upload, Move, ZoomIn, ZoomOut, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── 4 个印花位置 ─────────────────────────────────
const POSITIONS = [
  { id: "center", label: "Center Chest", icon: "👕" },
  { id: "left", label: "Left Chest", icon: "📍" },
  { id: "back", label: "Back", icon: "🔙" },
  { id: "sleeve", label: "Sleeve", icon: "🔄" },
];

// ─── 每个位置的设计数据 ────────────────────────────
interface DesignSlot {
  positionId: string;
  image: string | null;       // base64 data URL
  x: number;                  // offset % (0-100)
  y: number;
  scale: number;              // 0.3 - 3.0
  confirmed: boolean;
}

function createEmptySlot(posId: string): DesignSlot {
  return { positionId: posId, image: null, x: 50, y: 50, scale: 1, confirmed: false };
}

export default function CustomDesignPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=design 2=preview 3=submit
  const [activePos, setActivePos] = useState(0);
  const [designs, setDesigns] = useState<DesignSlot[]>(
    POSITIONS.map(p => createEmptySlot(p.id))
  );
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Customer Info ──────────────────────────
  const [customer, setCustomer] = useState({
    name: "", email: "", company: "", phone: "", country: "", address: "",
    inquiryType: "custom", quantity: "50", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = designs[activePos];

  // ─── Upload image for current position ──────
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDesigns(prev => prev.map((d, i) =>
        i === activePos ? { ...d, image: ev.target?.result as string, confirmed: false } : d
      ));
    };
    reader.readAsDataURL(file);
  }, [activePos]);

  // ─── Drag handlers ──────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!current?.image) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: current.x, origY: current.y };
  }, [current?.image, current?.x, current?.y]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !dragRef.current) return;
    const dx = ((e.clientX - dragRef.current.startX) / 300) * 100;
    const dy = ((e.clientY - dragRef.current.startY) / 400) * 100;
    setDesigns(prev => prev.map((d, i) =>
      i === activePos ? { ...d, x: Math.max(5, Math.min(95, dragRef.current!.origX + dx)), y: Math.max(5, Math.min(95, dragRef.current!.origY + dy)) } : d
    ));
  }, [dragging, activePos]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    dragRef.current = null;
  }, []);

  // ─── Resize ──────────────────────────────────
  const setScale = useCallback((s: number) => {
    setDesigns(prev => prev.map((d, i) =>
      i === activePos ? { ...d, scale: Math.max(0.3, Math.min(3, s)) } : d
    ));
  }, [activePos]);

  // ─── Confirm current position design ────────
  const confirmDesign = useCallback(() => {
    setDesigns(prev => prev.map((d, i) =>
      i === activePos ? { ...d, confirmed: true } : d
    ));
  }, [activePos]);

  // ─── Remove current position image ──────────
  const removeImage = useCallback(() => {
    setDesigns(prev => prev.map((d, i) =>
      i === activePos ? createEmptySlot(d.positionId) : d
    ));
  }, [activePos]);

  const allConfirmed = designs.filter(d => d.image).every(d => d.confirmed) && designs.some(d => d.image);

  // ─── Submit order ────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designs, customer }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Submission failed. Please try again.");
    } catch {
      alert("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  // Render submitted state or main app
  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-serif text-charcoal mb-4">Design Submitted!</h1>
          <p className="text-muted mb-8">
            We&apos;ve received your custom design and will reply within 24 hours.
            For urgent requests, contact us on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full">Back Home</Link>
            <a href="https://wa.me/8618868798631" target="_blank" className="px-6 py-3 border border-charcoal/30 text-charcoal text-sm uppercase tracking-widest rounded-full">WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24 md:pt-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Design Your Custom Order</span>
            <h1 className="text-2xl md:text-3xl font-serif text-charcoal mt-2">T-Shirt Design Studio</h1>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${step >= s ? 'bg-charcoal text-cream' : 'bg-stone/30 text-muted'}`}>{s}</div>
            ))}
          </div>
        </div>
        {/* Step indicator text */}
        <p className="text-sm text-muted mt-2">
          {step === 1 ? "① Upload & position your designs  |  ② Review all positions  |  ③ Fill in your details" : ""}
          {step === 2 ? "① ✅ Design done  |  ② Review & confirm  |  ③ Fill in your details" : ""}
          {step === 3 ? "① ✅ Design done  |  ② ✅ Review done  |  ③ Fill in your details" : ""}
        </p>
      </div>

      {step === 1 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* LEFT: Position tabs + preview */}
            <div className="lg:col-span-7">
              {/* Position tabs */}
              <div className="flex gap-1 mb-4 overflow-x-auto">
                {POSITIONS.map((pos, i) => {
                  const d = designs[i];
                  const isActive = i === activePos;
                  return (
                    <button key={pos.id} onClick={() => setActivePos(i)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap rounded-full transition-all ${isActive ? 'bg-charcoal text-cream' : 'bg-white border border-stone/50 text-muted hover:border-charcoal/30'}`}
                    >
                      {pos.icon} {pos.label}
                      {d.confirmed && <Check size={10} className="text-green-500 ml-1" />}
                      {d.image && !d.confirmed && <span className="w-1.5 h-1.5 rounded-full bg-gold ml-1" />}
                    </button>
                  );
                })}
              </div>

              {/* Preview canvas */}
              <div className="relative aspect-[3/4] bg-white rounded-xl border border-stone/40 overflow-hidden shadow-sm"
                style={{ touchAction: "none" }}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                {/* T-shirt silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 240" className="w-3/5 h-4/5 opacity-[0.06]" fill="currentColor">
                    <path d="M100 20 L80 5 L20 5 L5 30 L25 45 L25 70 L10 80 L10 100 L30 95 L35 230 L165 230 L170 95 L190 100 L190 80 L175 70 L175 45 L195 30 L180 5 L120 5 L100 20Z" />
                  </svg>
                </div>

                {/* Uploaded design overlay */}
                {current?.image ? (
                  <div
                    className="absolute cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${current.x}%`,
                      top: `${current.y}%`,
                      width: `${40 * current.scale}%`,
                      height: `${30 * current.scale}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onPointerDown={onPointerDown}
                  >
                    <img src={current.image} alt="Design"
                      className="w-full h-full object-contain pointer-events-none select-none opacity-85"
                      draggable={false}
                    />
                    {dragging && (
                      <div className="absolute inset-0 border-2 border-dashed border-gold rounded pointer-events-none" />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-2 text-muted/40 hover:text-muted/70 transition-colors"
                    >
                      <Upload size={32} />
                      <span className="text-xs">Click to upload design</span>
                    </button>
                  </div>
                )}

                {/* Product label */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 text-[10px] uppercase tracking-wider text-charcoal rounded">
                  Custom T-Shirt
                </div>
              </div>

              {/* Controls: upload, drag hint, remove */}
              <div className="flex items-center gap-3 mt-4">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-charcoal text-cream text-xs uppercase tracking-wider rounded-full hover:bg-ink transition-all"
                >
                  <Upload size={12} /> Upload
                </button>
                {current?.image && (
                  <>
                    <span className="text-[10px] text-muted flex items-center gap-1"><Move size={10} /> Drag to move</span>
                    <button onClick={removeImage} className="ml-auto p-2 text-muted/50 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* Resize slider */}
              {current?.image && (
                <div className="flex items-center gap-3 mt-3">
                  <ZoomOut size={14} className="text-muted/50" />
                  <input type="range" min="0.3" max="3" step="0.05" value={current.scale}
                    onChange={e => setScale(parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-stone/50 rounded-full appearance-none cursor-pointer accent-charcoal"
                  />
                  <ZoomIn size={14} className="text-muted/50" />
                  <span className="text-[10px] text-muted w-8 text-right">{current.scale.toFixed(1)}x</span>
                </div>
              )}
            </div>

            {/* RIGHT: Position status + confirm */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-stone/40 p-6 shadow-sm">
                <h3 className="text-sm font-medium text-charcoal mb-4">Design Positions</h3>
                <div className="space-y-3">
                  {POSITIONS.map((pos, i) => {
                    const d = designs[i];
                    return (
                      <div key={pos.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${i === activePos ? 'border-charcoal/30 bg-charcoal/5' : 'border-transparent'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{pos.icon}</span>
                          <span className="text-sm text-charcoal">{pos.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {d.confirmed ? (
                            <span className="flex items-center gap-1 text-[10px] text-green-600 uppercase tracking-wider">
                              <Check size={10} /> Confirmed
                            </span>
                          ) : d.image ? (
                            <span className="text-[10px] text-gold uppercase tracking-wider">Unsaved</span>
                          ) : (
                            <span className="text-[10px] text-muted/40 uppercase tracking-wider">Empty</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Confirm button */}
                {current?.image && !current.confirmed && (
                  <button onClick={confirmDesign}
                    className="w-full mt-6 py-3 bg-gold text-charcoal text-sm uppercase tracking-widest font-medium rounded-full hover:bg-amber-400 transition-all"
                  >
                    ✅ Confirm {POSITIONS[activePos].label} Design
                  </button>
                )}

                {/* Next step button */}
                <button onClick={() => setStep(2)}
                  disabled={!allConfirmed}
                  className={`w-full mt-4 py-3 text-sm uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 ${allConfirmed ? 'bg-charcoal text-cream hover:bg-ink' : 'bg-stone/30 text-muted/50 cursor-not-allowed'}`}
                >
                  Review All Designs <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Review all positions ── */}
      {step === 2 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <h2 className="text-xl font-serif text-charcoal mb-6">Review Your Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {POSITIONS.map((pos, i) => {
              const d = designs[i];
              return (
                <div key={pos.id} className="bg-white rounded-xl border border-stone/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted mb-2">{pos.icon} {pos.label}</p>
                  {d.image ? (
                    <div className="aspect-square relative bg-warmgray rounded-lg overflow-hidden">
                      <img src={d.image} alt={pos.label} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="aspect-square bg-warmgray/50 rounded-lg flex items-center justify-center text-muted/30 text-xs">No design</div>
                  )}
                  {d.confirmed && <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-green-600"><Check size={8} /> Confirmed</span>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-stone/50 text-charcoal text-sm uppercase tracking-widest rounded-full">← Edit Designs</button>
            <button onClick={() => setStep(3)} className="px-6 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full">Continue →</button>
          </div>
        </div>
      )}

      {/* ── Step 3: Customer info + Submit ── */}
      {step === 3 && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-20">
          <h2 className="text-xl font-serif text-charcoal mb-6">Your Contact Information</h2>
          <div className="bg-white rounded-xl border border-stone/40 p-6 md:p-8 shadow-sm">
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
                    className="w-full px-4 py-2.5 bg-white border border-stone/50 rounded-xl text-sm text-charcoal placeholder:text-muted/30 focus:outline-none focus:border-charcoal/50 transition-all"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">Estimated Quantity *</label>
              <input type="number" required value={customer.quantity} onChange={e => setCustomer(c => ({ ...c, quantity: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-stone/50 rounded-xl text-sm text-charcoal focus:outline-none focus:border-charcoal/50 transition-all"
                placeholder="50"
              />
            </div>
            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">Additional Notes</label>
              <textarea rows={3} value={customer.message} onChange={e => setCustomer(c => ({ ...c, message: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white border border-stone/50 rounded-xl text-sm text-charcoal placeholder:text-muted/30 focus:outline-none focus:border-charcoal/50 transition-all resize-none"
                placeholder="Any special requests..."
              />
            </div>

            {/* Design summary */}
            <div className="bg-warmgray/30 rounded-xl p-4 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Designs attached ({designs.filter(d => d.image).length}/4 positions)</p>
              <div className="flex gap-2">
                {designs.filter(d => d.image).map(d => (
                  <div key={d.positionId} className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-stone/30">
                    <img src={d.image!} alt={d.positionId} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-stone/50 text-charcoal text-sm uppercase tracking-widest rounded-full">← Back</button>
              <button onClick={handleSubmit} disabled={submitting || !customer.name || !customer.email || !customer.country}
                className="flex-1 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full hover:bg-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Custom Order →"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </main>
  );
}
