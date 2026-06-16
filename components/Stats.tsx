"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  return (
    <span className="tabular-nums">
      {value}
      <span className="text-subtle ml-0.5">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "50", label: t("general.moq"), suffix: "+", desc: t("stats.moq") },
    { number: "3-5", label: t("stats.days"), suffix: "", desc: t("stats.dispatch") },
    { number: "50-500", label: t("stats.daily"), suffix: "", desc: t("stats.volume") },
    { number: "100", label: t("stats.transparent"), suffix: "%", desc: t("stats.pricing") },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-cream section-padding">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="text-center lg:text-left"
          >
            <div className="text-display-lg font-serif text-charcoal mb-2">
              <AnimatedNumber value={stat.number} suffix={stat.suffix} />
            </div>
            <div className="text-body-sm uppercase tracking-widest text-muted mb-2">
              {stat.label}
            </div>
            <div className="text-body-sm text-subtle max-w-[200px] mx-auto lg:mx-0">
              {stat.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
