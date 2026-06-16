"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

export default function CTASection() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-cream section-padding"
>
      <div className="max-w-4xl mx-auto text-center"
>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-caption uppercase tracking-[0.3em] text-muted mb-6"
        >
          {t("cta.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="text-display-xl font-serif text-charcoal mb-8 text-balance"
        >
          Get Your
          <br />
          <span className="italic">{t("cta.titleLine2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-body-lg text-muted max-w-xl mx-auto mb-12"
        >
          {t("cta.desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="pill-btn-filled group"
>
            {t("nav.requestQuote")}
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/8618868798631"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            {t("cta.whatsapp")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
