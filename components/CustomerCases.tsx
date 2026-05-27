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
  // 丝印 / Screen Print
  { src: "/images/customer_cases/screen-01.webp", alt: "丝印定制T恤 — Screen printed custom t-shirt" },
  { src: "/images/customer_cases/screen-02.webp", alt: "丝印定制卫衣 — Screen printed hoodie" },
  { src: "/images/customer_cases/screen-03.webp", alt: "丝印定制T恤 — Screen print detail" },
  { src: "/images/customer_cases/screen-04.webp", alt: "丝印定制卫衣 — Screen print hoodie front" },
  // 刺绣 / Embroidery
  { src: "/images/customer_cases/embroidery-05.webp", alt: "刺绣定制Polo衫 — Embroidered polo shirt" },
  { src: "/images/customer_cases/embroidery-06.webp", alt: "刺绣定制Polo衫 — Embroidered polo back" },
  { src: "/images/customer_cases/embroidery-07.webp", alt: "刺绣定制帽子 — Embroidered cap" },
  { src: "/images/customer_cases/embroidery-08.webp", alt: "刺绣定制T恤 — Embroidered t-shirt" },
  // 数码直喷 / DTG
  { src: "/images/customer_cases/dtg-09.webp", alt: "数码直喷定制T恤 — DTG custom t-shirt" },
  { src: "/images/customer_cases/dtg-10.webp", alt: "数码直喷定制卫衣 — DTG hoodie" },
  { src: "/images/customer_cases/dtg-11.webp", alt: "数码直喷定制T恤 — DTG print detail" },
  { src: "/images/customer_cases/dtg-12.webp", alt: "数码直喷定制卫衣 — DTG hoodie detail" },
  { src: "/images/customer_cases/dtg-13.webp", alt: "数码直喷定制T恤 — DTG full color print" },
];

// 物理动量参数
const FRICTION = 0.92;   // 摩擦力（越小停得越快）
const MIN_VELOCITY = 0.5; // 低于此速度停止

export default function CustomerCases({
  images = defaultImages,
  title = "Customer Cases —",
  subtitle = "See Our Work",
}: CustomerCasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // 拖拽状态
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    momentumRAF: null as number | null,
    moved: false,
  });

  // 自动滚动
  const autoScrollRef = useRef<number | null>(null);

  // 惯性滚动
  const startMomentum = useCallback((initialVel: number) => {
    const el = trackRef.current;
    if (!el) return;

    let vel = initialVel;
    const step = () => {
      vel *= FRICTION;
      if (Math.abs(vel) < MIN_VELOCITY) return;
      el.scrollLeft -= vel;
      dragState.current.momentumRAF = requestAnimationFrame(step);
    };
    dragState.current.momentumRAF = requestAnimationFrame(step);
  }, []);

  // 鼠标/触摸按下
  const handlePointerDown = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;

    // 取消正在进行的惯性滚动
    if (dragState.current.momentumRAF) {
      cancelAnimationFrame(dragState.current.momentumRAF);
      dragState.current.momentumRAF = null;
    }

    dragState.current.isDown = true;
    dragState.current.startX = clientX;
    dragState.current.scrollLeft = el.scrollLeft;
    dragState.current.lastX = clientX;
    dragState.current.lastTime = Date.now();
    dragState.current.velocity = 0;
    dragState.current.moved = false;
    setIsDragging(true);
    setShowHint(false);
  }, []);

  // 鼠标/触摸移动
  const handlePointerMove = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!dragState.current.isDown || !el) return;
    const walked = x - dragState.current.startX;
    const now = Date.now();
    const dt = now - dragState.current.lastTime;

    // 计算速度（px/ms）
    if (dt > 0) {
      dragState.current.velocity = (x - dragState.current.lastX) / dt;
    }

    dragState.current.lastX = x;
    dragState.current.lastTime = now;

    if (Math.abs(walked) > 5) {
      dragState.current.moved = true;
    }

    el.scrollLeft = dragState.current.scrollLeft - walked;
  }, []);

  // 鼠标/触摸松开
  const handlePointerUp = useCallback(() => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    setIsDragging(false);

    const vel = dragState.current.velocity;

    // 有速度 → 启动惯性滚动
    if (Math.abs(vel) > 0.3) {
      startMomentum(vel * 16); // 归一化速度
    }

    // 没有移动（纯粹点击）→ 切换暂停
    if (!dragState.current.moved) {
      setIsPaused((p) => !p);
    }
  }, [startMomentum]);

  // 自动滚动 — 非暂停时缓慢右移
  useEffect(() => {
    if (isPaused) {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    let lastTime = Date.now();

    const tick = () => {
      const el = trackRef.current;
      if (!el) return;

      const now = Date.now();
      const dt = now - lastTime;
      lastTime = now;

      // 如果不处于拖拽状态，自动缓慢滚动（0.3px/ms ≈ 0.3/s）
      if (!dragState.current.isDown) {
        el.scrollLeft += 0.3 * (dt / 16);
      }

      autoScrollRef.current = requestAnimationFrame(tick);
    };

    autoScrollRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [isPaused]);

  // 清理
  useEffect(() => {
    return () => {
      if (dragState.current.momentumRAF) {
        cancelAnimationFrame(dragState.current.momentumRAF);
      }
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden select-none">
      <div className="section-padding mb-12 md:mb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-3">
              Customer Work
            </p>
            <h2 className="text-display-lg font-serif text-charcoal text-balance">
              {title}
              <br />
              <span className="italic text-subtle">{subtitle}</span>
            </h2>
          </div>
          {/* 状态指示 */}
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted/60">
            <span>{isPaused ? "⏸ Paused" : "▶ Auto"}</span>
            {isDragging && <span className="text-muted">· Dragging</span>}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseDown={(e) => { e.preventDefault(); handlePointerDown(e.clientX); }}
        onMouseMove={(e) => { isDragging && (e.preventDefault(), handlePointerMove(e.clientX)); }}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => isDragging && handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            pointerEvents: isDragging ? "none" : "auto",
          }}
        >
          {images.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[18vw]"
              style={{ pointerEvents: "none" }}
            >
              <div className="group relative aspect-[3/4] overflow-hidden bg-white rounded-sm shadow-sm transition-shadow duration-500 hover:shadow-md">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-expo-out"
                  style={{ transform: isDragging ? "scale(1.02)" : "scale(1)" }}
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 渐变遮罩 — 右侧 */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent pointer-events-none" />

        {/* 点击提示 */}
        {showHint && (
          <div className="text-center mt-6">
            <span className="inline-block text-[10px] text-muted/40 uppercase tracking-[0.3em] animate-pulse">
              ⟵ Drag to browse · Click to pause ⟶
            </span>
          </div>
        )}

        {/* 底部进度条 */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
          <ProgressDots {...{ images, trackRef }} />
        </div>
      </div>
    </section>
  );
}

/** 圆点进度指示器 */
function ProgressDots({
  images,
  trackRef,
}: {
  images: CaseImage[];
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      const idx = Math.round(ratio * (images.length - 1));
      setActiveIdx(Math.min(idx, images.length - 1));
    };

    el.addEventListener("scroll", update);
    update();
    return () => el.removeEventListener("scroll", update);
  }, [images.length, trackRef]);

  if (images.length <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      {images.map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: i === activeIdx ? "24px" : "8px",
            backgroundColor:
              i === activeIdx ? "var(--color-charcoal, #333)" : "var(--color-stone, #ccc)",
          }}
        />
      ))}
    </div>
  );
}
