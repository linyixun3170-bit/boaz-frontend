"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CaseImage {
  src: string;
  alt: string;
}

interface CustomerCasesProps {
  images?: CaseImage[];
  title?: string;
  subtitle?: string;
}

const defaultImages: CaseImage[] = [
  { src: "/images/customer_cases/screen-01.webp", alt: "丝印定制T恤 — Screen printed custom t-shirt" },
  { src: "/images/customer_cases/screen-02.webp", alt: "丝印定制卫衣 — Screen printed hoodie" },
  { src: "/images/customer_cases/screen-03.webp", alt: "丝印定制T恤 — Screen print detail" },
  { src: "/images/customer_cases/screen-04.webp", alt: "丝印定制卫衣 — Screen print hoodie front" },
  { src: "/images/customer_cases/embroidery-05.webp", alt: "刺绣定制Polo衫 — Embroidered polo shirt" },
  { src: "/images/customer_cases/embroidery-06.webp", alt: "刺绣定制Polo衫 — Embroidered polo back" },
  { src: "/images/customer_cases/embroidery-07.webp", alt: "刺绣定制帽子 — Embroidered cap" },
  { src: "/images/customer_cases/embroidery-08.webp", alt: "刺绣定制T恤 — Embroidered t-shirt" },
  { src: "/images/customer_cases/dtg-09.webp", alt: "数码直喷定制T恤 — DTG custom t-shirt" },
  { src: "/images/customer_cases/dtg-10.webp", alt: "数码直喷定制卫衣 — DTG hoodie" },
  { src: "/images/customer_cases/dtg-11.webp", alt: "数码直喷定制T恤 — DTG print detail" },
  { src: "/images/customer_cases/dtg-12.webp", alt: "数码直喷定制卫衣 — DTG hoodie detail" },
  { src: "/images/customer_cases/dtg-13.webp", alt: "数码直喷定制T恤 — DTG full color print" },
];

export default function CustomerCases({
  images = defaultImages,
  title = "Customer Cases —",
  subtitle = "See Our Work",
}: CustomerCasesProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  // drag state refs (no re-render)
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const moved = useRef(false);
  const momentumId = useRef<number | null>(null);
  const autoId = useRef<number | null>(null);

  // --- inertia scroll ---
  const startMomentum = useCallback((v: number) => {
    const el = trackRef.current;
    if (!el) return;
    let vel = v;
    const step = () => {
      vel *= 0.92;
      if (Math.abs(vel) < 0.3) return;
      el.scrollLeft += vel;
      momentumId.current = requestAnimationFrame(step);
    };
    momentumId.current = requestAnimationFrame(step);
  }, []);

  // --- pointer handlers ---
  const onDown = useCallback((clientX: number) => {
    if (momentumId.current) { cancelAnimationFrame(momentumId.current); momentumId.current = null; }
    isDown.current = true;
    startX.current = clientX;
    startScroll.current = trackRef.current?.scrollLeft ?? 0;
    lastX.current = clientX;
    velocity.current = 0;
    moved.current = false;
    setIsDragging(true);
    setShowHint(false);
  }, []);

  const onMove = useCallback((clientX: number) => {
    if (!isDown.current || !trackRef.current) return;
    const dx = clientX - lastX.current;
    const walked = clientX - startX.current;
    const now = Date.now();
    velocity.current = dx;
    lastX.current = clientX;
    if (Math.abs(walked) > 5) moved.current = true;
    trackRef.current.scrollLeft = startScroll.current - walked;
  }, []);

  const onUp = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDragging(false);
    const v = velocity.current;
    if (Math.abs(v) > 2 && moved.current) startMomentum(-v * 3);
    if (!moved.current) setIsPaused(p => !p);
  }, [startMomentum]);

  // --- auto scroll ---
  useEffect(() => {
    let last = Date.now();
    const tick = () => {
      const el = trackRef.current;
      if (!el) return;
      const dt = Date.now() - last;
      last = Date.now();
      if (!isDragging && !isPaused) el.scrollLeft += 0.25 * (dt / 16);
      autoId.current = requestAnimationFrame(tick);
    };
    autoId.current = requestAnimationFrame(tick);
    return () => { if (autoId.current) cancelAnimationFrame(autoId.current); };
  }, [isPaused, isDragging]);

  // --- scroll position → active dot ---
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const r = max > 0 ? el.scrollLeft / max : 0;
      setActiveIdx(Math.min(Math.round(r * (images.length - 1)), images.length - 1));
    };
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [images.length]);

  // --- cleanup ---
  useEffect(() => () => {
    if (momentumId.current) cancelAnimationFrame(momentumId.current);
    if (autoId.current) cancelAnimationFrame(autoId.current);
  }, []);

  if (!images.length) return null;

  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden select-none">
      <div className="section-padding mb-12 md:mb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-3">Customer Work</p>
            <h2 className="text-display-lg font-serif text-charcoal text-balance">
              {title}<br /><span className="italic text-subtle">{subtitle}</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted/60">
            <span>{isPaused ? "⏸" : "▶"}</span>
            {isDragging && <span className="text-muted">· drag</span>}
          </div>
        </div>
      </div>

      <div
        className="relative"
        onMouseDown={e => onDown(e.clientX)}
        onMouseMove={e => { if (isDragging) onMove(e.clientX); }}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={e => onDown(e.touches[0].clientX)}
        onTouchMove={e => { if (isDragging) onMove(e.touches[0].clientX); }}
        onTouchEnd={onUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-6 lg:px-8 pb-4"
          style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          {images.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[18vw]">
              <div className="group relative aspect-[3/4] overflow-hidden bg-white rounded-sm shadow-sm transition-shadow duration-500 hover:shadow-md">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700"
                  style={{ transform: isDragging ? "scale(1.02)" : "scale(1)" }}
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent pointer-events-none" />

        {showHint && (
          <div className="text-center mt-6">
            <span className="inline-block text-[10px] text-muted/40 uppercase tracking-[0.3em] animate-pulse">
              ⟵ Drag to browse · Click to pause ⟶
            </span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
          <div className="flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === activeIdx ? "24px" : "8px",
                  backgroundColor: i === activeIdx ? "var(--color-charcoal, #333)" : "var(--color-stone, #ccc)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
