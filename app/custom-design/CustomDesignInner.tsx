"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Upload, ZoomIn, ZoomOut, ArrowRight, X, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── 单设计数据 ─────────────────────────────
interface PlacedDesign {
  id: string;
  image: string;
  x: number;     // % (5-95)
  y: number;
  scale: number; // 0.3-3.0
}

export default function CustomDesignPage() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name") || "Custom T-Shirt";
  const productColor = searchParams.get("color") || "";
  const productImage = searchParams.get("image") || "";
  const productId = searchParams.get("product") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ─── 所有已放置的设计 ──────────────────────
  const [designs, setDesigns] = useState<PlacedDesign[]>([]);
  const [activeDesignId, setActiveDesignId] = useState<string | null>(null);

  // ─── 手势状态 ──────────────────────────────
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; designId: string } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number; designId: string } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── 客户信息 ──────────────────────────────
  const [customer, setCustomer] = useState({
    name: "", email: "", company: "", phone: "", country: "", address: "",
    inquiryType: "custom", quantity: "50", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ─── 查找当前操作的设计 ────────────────────
  const activeDesign = designs.find(d => d.id === activeDesignId) || null;

  // ─── 工具函数 ──────────────────────────────
  const updateDesign = useCallback((id: string, patch: Partial<PlacedDesign>) => {
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d));
  }, []);

  // ─── 上传设计图 ────────────────────────────
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

  // ─── 删除设计 ──────────────────────────────
  const deleteDesign = useCallback((id: string) => {
    setDesigns(prev => {
      const next = prev.filter(d => d.id !== id);
      if (activeDesignId === id) setActiveDesignId(next.length > 0 ? next[next.length - 1].id : null);
      return next;
    });
  }, [activeDesignId]);

  // ─── 给 Canvas 添加 touch-action: none 阻止页面缩放 ──
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => { if (e.target === el || el.contains(e.target as Node)) e.preventDefault(); };
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => el.removeEventListener("touchmove", prevent);
  }, []);

  // ─── Pointer Down ──────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // 检查是否点到了某个设计图
    const target = (e.target as HTMLElement).closest("[data-design-id]");
    const designId = target?.getAttribute("data-design-id");

    if (!designId || !designs.find(d => d.id === designId)) {
      // 点到空白区域 → 取消选中
      if (pointers.current.size === 1) setActiveDesignId(null);
      return;
    }

    setActiveDesignId(designId);
    const des = designs.find(d => d.id === designId)!;

    if (pointers.current.size === 1) {
      // 单指/鼠标 → 开始拖拽
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      dragRef.current = {
        startX: e.clientX, startY: e.clientY,
        origX: des.x, origY: des.y,
        designId,
      };
    } else if (pointers.current.size === 2) {
      // 双指 → 开始缩放
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchRef.current = { dist, scale: des.scale, designId };
      dragRef.current = null;
    }
  }, [designs]);

  // ─── Pointer Move ──────────────────────────
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const count = pointers.current.size;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (count === 1 && dragRef.current) {
      const dxPct = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      updateDesign(dragRef.current.designId, {
        x: Math.max(5, Math.min(95, dragRef.current.origX + dxPct)),
        y: Math.max(5, Math.min(95, dragRef.current.origY + dyPct)),
      });
    } else if (count >= 2 && pinchRef.current) {
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ratio = dist / pinchRef.current.dist;
      updateDesign(pinchRef.current.designId, {
        scale: Math.max(0.3, Math.min(3, pinchRef.current.scale * ratio)),
      });
    }
  }, [updateDesign]);

  // ─── Pointer Up / Cancel ──────────────────
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 1) {
      dragRef.current = null;
      pinchRef.current = null;
    } else if (pointers.current.size === 1 && dragRef.current) {
      const ptr = Array.from(pointers.current.values())[0];
      const des = designs.find(d => d.id === dragRef.current!.designId);
      if (des) {
        dragRef.current = { startX: ptr.x, startY: ptr.y, origX: des.x, origY: des.y, designId: dragRef.current.designId };
      }
      pinchRef.current = null;
    }
  }, [designs]);

  // ─── 鼠标滚轮缩放 ──────────────────────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!activeDesign) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    updateDesign(activeDesign.id, {
      scale: Math.max(0.3, Math.min(3, activeDesign.scale + delta)),
    });
  }, [activeDesign, updateDesign]);

  // ─── 滑块缩放 ──────────────────────────────
  const setScale = useCallback((s: number) => {
    if (!activeDesign) return;
    updateDesign(activeDesign.id, { scale: Math.max(0.3, Math.min(3, s)) });
  }, [activeDesign, updateDesign]);

  const canContinue = designs.length > 0;

  // ─── Submit ─────────────────────────────────
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
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-serif text-charcoal mb-4">Design Submitted!</h1>
          <p className="text-muted mb-8">
            We&apos;ve received your design for {productName}{productColor && ` (${productColor})`} and will reply within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full">Back Home</Link>
            <Link href="/custom" className="px-6 py-3 border border-charcoal/30 text-charcoal text-sm uppercase tracking-widest rounded-full">← Back to Custom</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* ── 顶部标题栏 ────────────────────────── */}
      <div className="pt-20 md:pt-24 shrink-0 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <Link href="/custom" className="text-[10px] text-muted/50 hover:text-muted transition-colors tracking-[0.2em] flex items-center gap-1 mb-1">
              ← Back
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg md:text-xl font-serif text-charcoal truncate">Design Studio — {productName}</h1>
              {productColor && (
                <span className="px-2 py-0.5 bg-charcoal/10 text-charcoal text-[10px] uppercase tracking-wider rounded-full shrink-0">
                  {productColor}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
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
        <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-4 lg:pb-6">
          <div className="flex-1 flex lg:flex-row flex-col gap-4 min-h-0">
            {/* ====== 画布区域 ====== */}
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
                {/* 产品图片 */}
                <div className="absolute inset-0 flex items-center justify-center bg-white select-none">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-contain pointer-events-none select-none"
                      draggable={false}
                    />
                  ) : (
                    <svg viewBox="0 0 200 240" className="w-3/5 h-4/5 opacity-[0.06]" fill="currentColor">
                      <path d="M100 20 L80 5 L20 5 L5 30 L25 45 L25 70 L10 80 L10 100 L30 95 L35 230 L165 230 L170 95 L190 100 L190 80 L175 70 L175 45 L195 30 L180 5 L120 5 L100 20Z" />
                    </svg>
                  )}
                </div>

                {/* 已放置的设计图 */}
                {designs.map(des => (
                  <div
                    key={des.id}
                    data-design-id={des.id}
                    className={`absolute cursor-grab active:cursor-grabbing select-none z-20 rounded-lg transition-shadow ${
                      activeDesignId === des.id ? 'ring-2 ring-gold/60 shadow-lg z-30' : 'ring-0'
                    }`}
                    style={{
                      left: `${des.x}%`,
                      top: `${des.y}%`,
                      width: `${Math.max(8, 40 * des.scale)}%`,
                      height: `${Math.max(6, 30 * des.scale)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img
                      src={des.image}
                      alt="Design"
                      className="w-full h-full object-contain pointer-events-none select-none opacity-85 drop-shadow-md"
                      draggable={false}
                    />
                  </div>
                ))}

                {/* 无设计时的上传提示 */}
                {designs.length === 0 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted/40 hover:text-muted/70 transition-colors z-10"
                  >
                    <Upload size={36} />
                    <span className="text-xs">Tap to upload your design</span>
                    <span className="text-[10px] text-muted/30">Drag to position · Pinch/Scroll to scale</span>
                  </button>
                )}

                {/* 产品标签 */}
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-charcoal rounded z-40 shadow-sm pointer-events-none select-none">
                  {productName}{productColor ? ` — ${productColor}` : ""}
                </div>

                {/* 底部控制条 */}
                <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/40 to-transparent pt-8 pb-2 px-3 pointer-events-none">
                  {/* 缩放条（选中设计时显示） */}
                  {activeDesign && (
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm mb-1.5 pointer-events-auto">
                      <ZoomOut size={12} className="text-muted/60 shrink-0" />
                      <input
                        type="range" min="0.3" max="3" step="0.05"
                        value={activeDesign.scale}
                        onChange={e => setScale(parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-stone/30 rounded-full appearance-none cursor-pointer accent-charcoal"
                      />
                      <ZoomIn size={12} className="text-muted/60 shrink-0" />
                      <span className="text-[10px] text-muted/70 w-6 text-right tabular-nums">{activeDesign.scale.toFixed(1)}x</span>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-1.5 pointer-events-auto">
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] uppercase tracking-wider rounded-full shadow-sm hover:bg-white transition-all"
                    >
                      <Upload size={10} /> {designs.length === 0 ? "Upload Design" : "Add Another"}
                    </button>
                    {activeDesign && (
                      <button
                        onClick={() => deleteDesign(activeDesign.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-red-500 text-[10px] uppercase tracking-wider rounded-full shadow-sm hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={10} /> Delete
                      </button>
                    )}
                    <div className="flex-1" />
                    {/* 已上传设计数量 */}
                    {designs.length > 0 && (
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-muted text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                        {designs.length} design{designs.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ====== 右侧面板（桌面） ====== */}
            <div className="hidden lg:flex lg:w-64 shrink-0 flex-col gap-3">
              <div className="bg-white rounded-xl border border-stone/40 p-4 shadow-sm">
                <h3 className="text-[11px] uppercase tracking-wider text-muted mb-3">Product</h3>
                <div className="flex items-start gap-3">
                  {productImage && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone/30 shrink-0 bg-warmgray">
                      <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-charcoal truncate font-medium">{productName}</p>
                    {productColor && <p className="text-[11px] text-muted">{productColor}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone/40 p-4 shadow-sm">
                <h3 className="text-[11px] uppercase tracking-wider text-muted mb-3">Your Designs</h3>
                {designs.length === 0 ? (
                  <p className="text-xs text-muted/40 text-center py-4">No designs yet. Upload your artwork above.</p>
                ) : (
                  <div className="space-y-2">
                    {designs.map((des, i) => (
                      <button
                        key={des.id}
                        onClick={() => setActiveDesignId(des.id)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                          activeDesignId === des.id
                            ? 'border-gold/50 bg-gold/5'
                            : 'border-transparent hover:bg-stone/30'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-md overflow-hidden border border-stone/20 bg-warmgray shrink-0">
                          <img src={des.image} alt={`Design ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-charcoal truncate">Design {i + 1}</p>
                          <p className="text-[10px] text-muted">{des.scale.toFixed(1)}x · {Math.round(des.x)}%,{Math.round(des.y)}%</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteDesign(des.id); }}
                          className="p-1 text-muted/40 hover:text-red-500 transition-colors">
                          <X size={10} />
                        </button>
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!canContinue}
                  className={`w-full mt-5 py-2.5 text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    canContinue
                      ? 'bg-charcoal text-cream hover:bg-ink'
                      : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                  }`}
                >
                  Review <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* ====== 底部下一步（手机） ====== */}
            <div className="lg:hidden flex gap-2 pt-1">
              <button
                onClick={() => setStep(2)}
                disabled={!canContinue}
                className={`flex-1 py-3 text-xs uppercase tracking-widest rounded-full transition-all ${
                  canContinue
                    ? 'bg-charcoal text-cream'
                    : 'bg-stone/30 text-muted/50 cursor-not-allowed'
                }`}
              >
                {canContinue ? "Review →" : "Upload a design first"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Review ── */}
      {step === 2 && (
        <div className="flex-1 px-6 lg:px-8 max-w-6xl mx-auto w-full pb-8">
          <h2 className="text-xl font-serif text-charcoal mb-2">Review Your Design</h2>
          <p className="text-sm text-muted mb-6">{productName}{productColor ? ` — ${productColor}` : ""}</p>
          <div className="bg-white rounded-xl border border-stone/40 p-6 mb-8">
            <div className="aspect-[4/5] max-w-md mx-auto relative bg-warmgray rounded-lg overflow-hidden">
              {productImage && (
                <img src={productImage} alt={productName} className="w-full h-full object-contain absolute inset-0" />
              )}
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
            <p className="text-xs text-muted text-center mt-3">{designs.length} design{designs.length > 1 ? 's' : ''} placed on {productName}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-stone/50 text-charcoal text-sm uppercase tracking-widest rounded-full">← Edit</button>
            <button onClick={() => setStep(3)} className="px-6 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest rounded-full">Continue →</button>
          </div>
        </div>
      )}

      {/* ── Step 3: Customer info ── */}
      {step === 3 && (
        <div className="flex-1 px-6 lg:px-8 max-w-4xl mx-auto w-full pb-8">
          <h2 className="text-xl font-serif text-charcoal mb-2">Your Contact Information</h2>
          <p className="text-sm text-muted mb-6">Custom inquiry for {productName}{productColor ? ` (${productColor})` : ""}</p>
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
              <p className="text-[10px] uppercase tracking-wider text-muted mb-2">
                Design{designs.length > 1 ? 's' : ''} attached ({designs.length}) — {productName}{productColor ? ` (${productColor})` : ""}
              </p>
              <div className="flex gap-2 flex-wrap">
                {designs.map(d => (
                  <div key={d.id} className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-stone/30">
                    <img src={d.image} alt={`Design`} className="w-full h-full object-cover" />
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
