"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Upload, Move, ZoomIn, ZoomOut, ArrowRight, X, RotateCcw } from "lucide-react";
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
  image: string | null;
  x: number;
  y: number;
  scale: number;
  confirmed: boolean;
}

function createEmptySlot(posId: string): DesignSlot {
  return { positionId: posId, image: null, x: 50, y: 50, scale: 1, confirmed: false };
}

export default function CustomDesignPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activePos, setActivePos] = useState(0);
  const [designs, setDesigns] = useState<DesignSlot[]>(
    POSITIONS.map(p => createEmptySlot(p.id))
  );

  // ─── 手势状态 ──────────────────────────────
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Customer Info ──────────────────────────
  const [customer, setCustomer] = useState({
    name: "", email: "", company: "", phone: "", country: "", address: "",
    inquiryType: "custom", quantity: "50", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = designs[activePos];

  // ─── 更新指定位置的 design ──────────────────
  const updateDesign = useCallback((slot: Partial<DesignSlot>) => {
    setDesigns(prev => prev.map((d, i) =>
      i === activePos ? { ...d, ...slot } : d
    ));
  }, [activePos]);

  // ─── Upload image ──────────────────────────
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateDesign({ image: ev.target?.result as string, confirmed: false });
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }, [updateDesign]);

  // ─── 手势：Pointer Down ────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!current?.image) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      // 单指/鼠标 → 开始拖拽
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: current.x,
        origY: current.y,
      };
    } else if (pointers.current.size === 2) {
      // 双指 → 开始缩放
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchRef.current = { dist, scale: current.scale };
      dragRef.current = null;
    }
  }, [current?.image, current?.x, current?.y, current?.scale]);

  // ─── 手势：Pointer Move ────────────────────
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!current?.image) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const count = pointers.current.size;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (count === 1 && dragRef.current) {
      // 拖拽移动
      const dxPct = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      updateDesign({
        x: Math.max(5, Math.min(95, dragRef.current.origX + dxPct)),
        y: Math.max(5, Math.min(95, dragRef.current.origY + dyPct)),
      });
    } else if (count >= 2 && pinchRef.current) {
      // 双指缩放
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ratio = dist / pinchRef.current.dist;
      updateDesign({
        scale: Math.max(0.3, Math.min(3, pinchRef.current.scale * ratio)),
      });
    }
  }, [current?.image, updateDesign]);

  // ─── 手势：Pointer Up / Cancel ─────────────
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 1) {
      dragRef.current = null;
      pinchRef.current = null;
    } else if (pointers.current.size === 1) {
      // 从双指变回单指 → 重新设定拖拽起点
      const ptr = Array.from(pointers.current.values())[0];
      dragRef.current = { startX: ptr.x, startY: ptr.y, origX: current.x, origY: current.y };
      pinchRef.current = null;
    }
  }, [current?.x, current?.y]);

  // ─── 鼠标滚轮缩放（桌面）───────────────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!current?.image) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    updateDesign({ scale: Math.max(0.3, Math.min(3, current.scale + delta)) });
  }, [current?.image, current?.scale, updateDesign]);

  // ─── 滑块缩放 ──────────────────────────────
  const setScale = useCallback((s: number) => {
    updateDesign({ scale: Math.max(0.3, Math.min(3, s)) });
  }, [updateDesign]);

  // ─── Confirm ────────────────────────────────
  const confirmDesign = useCallback(() => {
    updateDesign({ confirmed: true });
  }, [updateDesign]);

  // ─── Remove ─────────────────────────────────
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

  // ─── Render submitted ──────────────────────
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
    <main className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* ── 顶部标题栏 ────────────────────────── */}
      <div className="pt-20 md:pt-24 shrink-0 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Design Studio</span>
            <h1 className="text-xl md:text-2xl font-serif text-charcoal mt-0.5">T-Shirt Design Studio</h1>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(s => (
              <div key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${step >= s ? 'bg-charcoal text-cream' : 'bg-stone/30 text-muted'}`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Step 1: 设计 ──────────────────────── */}
      {step === 1 && (
        <div className="flex-1 flex flex-col px-6 lg:px-8 max-w-7xl mx-auto w-full pb-4 lg:pb-6">
          <div className="flex-1 flex lg:flex-row flex-col gap-4 min-h-0">
            {/* ====== 左侧：画布区域 ====== */}
            <div className="flex-1 relative flex items-center justify-center min-h-[55vh] lg:min-h-0">
              <div
                ref={canvasRef}
                className="absolute inset-0 bg-white rounded-xl border border-stone/40 overflow-hidden shadow-sm"
                style={{ touchAction: "none" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
              >
                {/* T恤轮廓 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 200 240" className="w-3/5 h-4/5 opacity-[0.06]" fill="currentColor">
                    <path d="M100 20 L80 5 L20 5 L5 30 L25 45 L25 70 L10 80 L10 100 L30 95 L35 230 L165 230 L170 95 L190 100 L190 80 L175 70 L175 45 L195 30 L180 5 L120 5 L100 20Z" />
                  </svg>
                </div>

                {/* 已上传的图案 */}
                {current?.image ? (
                  <div
                    className="absolute cursor-grab active:cursor-grabbing select-none"
                    style={{
                      left: `${current.x}%`,
                      top: `${current.y}%`,
                      width: `${40 * current.scale}%`,
                      height: `${30 * current.scale}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img
                      src={current.image}
                      alt="Design"
                      className="w-full h-full object-contain pointer-events-none select-none opacity-85"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted/40 hover:text-muted/70 transition-colors"
                  >
                    <Upload size={36} />
                    <span className="text-xs">Tap to upload design</span>
                  </button>
                )}

                {/* ====== 浮动：位置标签条 ====== */}
                <div className="absolute top-2 left-2 right-2 flex gap-1 z-10 overflow-x-auto scrollbar-none pointer-events-auto">
                  {POSITIONS.map((pos, i) => {
                    const d = designs[i];
                    const isActive = i === activePos;
                    return (
                      <button
                        key={pos.id}
                        onClick={(e) => { e.stopPropagation(); setActivePos(i); }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] uppercase tracking-wider whitespace-nowrap rounded-full transition-all pointer-events-auto shadow-sm ${
                          isActive
                            ? 'bg-charcoal text-cream'
                            : 'bg-white/90 text-muted border border-stone/30 hover:border-charcoal/30'
                        }`}
                      >
                        {pos.icon} {pos.label}
                        {d.confirmed && <Check size={8} className="text-green-500" />}
                        {d.image && !d.confirmed && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                      </button>
                    );
                  })}
                </div>

                {/* ====== 浮动：底部控制条 ====== */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/40 to-transparent pt-8 pb-2 px-3">
                  {/* 缩放条 */}
                  {current?.image && (
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm mb-1.5">
                      <ZoomOut size={12} className="text-muted/60 shrink-0" />
                      <input
                        type="range" min="0.3" max="3" step="0.05"
                        value={current.scale}
                        onChange={e => setScale(parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-stone/30 rounded-full appearance-none cursor-pointer accent-charcoal"
                      />
                      <ZoomIn size={12} className="text-muted/60 shrink-0" />
                      <span className="text-[10px] text-muted/70 w-6 text-right tabular-nums">{current.scale.toFixed(1)}x</span>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-1.5 pointer-events-auto">
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] uppercase tracking-wider rounded-full shadow-sm hover:bg-white transition-all"
                    >
                      <Upload size={10} /> Upload
                    </button>
                    {current?.image && (
                      <button
                        onClick={removeImage}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-muted text-[10px] uppercase tracking-wider rounded-full shadow-sm hover:text-red-500 transition-all"
                      >
                        <X size={10} /> Clear
                      </button>
                    )}
                    <div className="flex-1" />
                    {current?.image && !current.confirmed && (
                      <button
                        onClick={confirmDesign}
                        className="px-3 py-1.5 bg-gold text-charcoal text-[10px] uppercase tracking-wider rounded-full shadow-sm hover:bg-amber-400 transition-all font-medium"
                      >
                        ✔ Confirm
                      </button>
                    )}
                    {current?.confirmed && (
                      <span className="flex items-center gap-1 px-2.5 py-1.5 bg-green-100 text-green-700 text-[10px] uppercase tracking-wider rounded-full">
                        <Check size={10} /> Done
                      </span>
                    )}
                  </div>
                </div>

                {/* 操作提示（桌面短暂显示） */}
                {!current?.image && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-muted/30 whitespace-nowrap">
                    Supports PNG / JPG
                  </div>
                )}
              </div>
            </div>

            {/* ====== 右侧：状态面板（仅桌面） ====== */}
            <div className="hidden lg:flex lg:w-64 shrink-0 flex-col gap-3">
              <div className="bg-white rounded-xl border border-stone/40 p-4 shadow-sm">
                <h3 className="text-[11px] uppercase tracking-wider text-muted mb-3">Design Positions</h3>
                <div className="space-y-2">
                  {POSITIONS.map((pos, i) => {
                    const d = designs[i];
                    return (
                      <button
                        key={pos.id}
                        onClick={() => setActivePos(i)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all text-left ${
                          i === activePos
                            ? 'border-charcoal/30 bg-charcoal/5'
                            : 'border-transparent hover:bg-stone/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{pos.icon}</span>
                          <span className="text-sm text-charcoal">{pos.label}</span>
                        </div>
                        {d.confirmed ? (
                          <span className="text-[10px] text-green-600"><Check size={12} /></span>
                        ) : d.image ? (
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone/30" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!allConfirmed}
                  className={`w-full mt-5 py-2.5 text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    allConfirmed
                      ? 'bg-charcoal text-cream hover:bg-ink'
                      : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                  }`}
                >
                  Review All <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* ====== 底部按钮（仅手机） ====== */}
            <div className="lg:hidden flex gap-2 pt-1">
              <button
                onClick={() => setStep(2)}
                disabled={!allConfirmed}
                className={`flex-1 py-3 text-xs uppercase tracking-widest rounded-full transition-all ${
                  allConfirmed
                    ? 'bg-charcoal text-cream'
                    : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                }`}
              >
                {allConfirmed ? "Review All Designs →" : "Confirm all positions first"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Review ── */}
      {step === 2 && (
        <div className="flex-1 px-6 lg:px-8 max-w-6xl mx-auto w-full pb-8">
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
        <div className="flex-1 px-6 lg:px-8 max-w-4xl mx-auto w-full pb-8">
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

            <div className="bg-warmgray/30 rounded-xl p-4 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Designs attached ({designs.filter(d => d.image).length}/4 positions)</p>
              <div className="flex gap-2 flex-wrap">
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

      <Footer />
    </main>
  );
}
