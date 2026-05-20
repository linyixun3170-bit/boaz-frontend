"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "BOAZ cut our lead time in half. The fabric quality is consistent batch after batch — our customers noticed immediately.",
    author: "Sarah Chen",
    role: "Founder, MØDRN Label",
    location: "Los Angeles",
  },
  {
    quote: "We tested five factories. BOAZ was the only one where the sample matched the spec sheet exactly. No games.",
    author: "James O'Brien",
    role: "Head of Production, Kinfolk Co.",
    location: "London",
  },
  {
    quote: "From 200 units to 10,000 — they scaled without a single quality dip. That alone is worth the partnership.",
    author: "Mika Tanaka",
    role: "COO, Studio Essentials",
    location: "Tokyo",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-caption uppercase tracking-[0.3em] text-subtle mb-4">
            Client Stories
          </p>
          <h2 className="text-display-lg font-serif text-cream text-balance">
            Trusted by Brands
            <br />
            <span className="italic text-stone">That Move Fast</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group"
            >
              <div className="p-8 md:p-10 border border-warmink/30 rounded-sm hover:border-stone/50 transition-colors duration-500">
                <p className="text-body-lg text-cream/80 mb-8 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warmink flex items-center justify-center">
                    <span className="text-cream text-sm font-medium">
                      {t.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-body-sm text-cream font-medium">{t.author}</p>
                    <p className="text-caption text-subtle">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
