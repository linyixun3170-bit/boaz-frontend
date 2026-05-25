"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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
  { src: "/images/customer_cases/case-01.jpg", alt: "客户定制产品实物" },
  { src: "/images/customer_cases/case-01.jpg", alt: "客户定制产品实物" },
  { src: "/images/customer_cases/case-01.jpg", alt: "客户定制产品实物" },
];

export default function CustomerCases({ images = defaultImages, title = "Real Products,", subtitle = "Real Customers" }: CustomerCasesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [images]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="section-padding mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-end justify-between"
        >
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
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-charcoal/60 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="向左滑动"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-charcoal/60 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="向右滑动"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] snap-start"
            >
              <div className="group relative aspect-[4/5] overflow-hidden bg-white rounded-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent pointer-events-none md:hidden" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="text-center text-caption text-muted/50 mt-6 md:hidden"
      >
        ← 左右滑动 →
      </motion.p>
    </section>
  );
}
