"use client";

import { ugcImages } from "@/lib/images";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SchemaOrg from "@/components/SchemaOrg";

const trustSignals = [
  {
    title: "Direct Factory Ownership",
    desc: "We don't broker. We manufacture. This eliminates markups, delays, and the game of telephone that ruins quality.",
  },
  {
    title: "3-Stage QC Protocol",
    desc: "Every batch passes incoming fabric inspection, inline production checkpoints, and pre-shipment AQL sampling.",
  },
  {
    title: "Certified Materials",
    desc: "OEKO-TEX Standard 100 certified dyes. BSCI-audited labor practices. ISO 9001 quality management.",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden fees. You get a detailed cost breakdown: fabric, labor, overhead, and our margin — upfront.",
  },
];

const clients: string[] = [];

const ugcGrid = [
  ugcImages.grid1,
  ugcImages.grid2,
  ugcImages.grid3,
  ugcImages.grid4,
];

export default function WhyBoazPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main>
      <SchemaOrg type="about" />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">Why BOAZ</p>
            <h1 className="text-display-xl font-serif text-charcoal mb-8 text-balance">
              We Are Not a
              <br />
              <span className="italic">Middleman Factory</span>
            </h1>
            <p className="text-body-lg text-muted max-w-2xl leading-relaxed">
              Most wholesalers are just resellers with a website. We are the production line. When you work with BOAZ, you talk to the people who actually cut, sew, and inspect your garments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Grid */}
      <section ref={ref} className="py-24 md:py-32 section-padding bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {trustSignals.map((signal, i) => (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="p-8 md:p-12 bg-cream border border-stone/40 hover:border-charcoal/20 transition-colors duration-500"
              >
                <h3 className="text-display-md font-serif text-charcoal mb-4">{signal.title}</h3>
                <p className="text-body-md text-muted leading-relaxed">{signal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & Logistics */}
      <section className="py-24 md:py-32 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-6">Shipping & Logistics</p>
            <h2 className="text-display-md font-serif text-charcoal">
              From Ningbo Port <span className="italic">To Your Door</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sea Freight",
                desc: "Most economical for bulk orders (200+ pcs). 20-40 day transit. Full container or LCL consolidation available.",
                tag: "Bulk",
              },
              {
                title: "Air Freight",
                desc: "Balance of speed and cost. 7-15 day transit. Ideal for mid-size orders and time-sensitive projects.",
                tag: "Express",
              },
              {
                title: "Courier (DHL/FedEx/UPS)",
                desc: "Fastest option: 3-7 day door-to-door delivery. Best for samples and small orders. Trackable worldwide.",
                tag: "Fastest",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 bg-offwhite border border-stone/40"
              >
                <span className="text-[10px] uppercase tracking-wider text-gold mb-3 block">{item.tag}</span>
                <h3 className="text-body-md font-medium text-charcoal mb-3">{item.title}</h3>
                <p className="text-body-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-offwhite border border-stone/40 text-center"
          >
            <h3 className="text-display-sm font-serif text-charcoal mb-4">Sample Policy</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <div>
                <p className="text-sm font-medium text-charcoal">No Minimum</p>
                <p className="text-[13px] text-muted mt-1">Request 1-5 pieces of any product in our catalog.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">Fully Deductible</p>
                <p className="text-[13px] text-muted mt-1">Sample cost is deducted from your first bulk order.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">5-7 Day Dispatch</p>
                <p className="text-[13px] text-muted mt-1">Samples ready and shipped within 5-7 business days.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Visual */}
      <section className="py-24 md:py-32 section-padding bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">Our Process</p>
            <h2 className="text-display-lg font-serif text-charcoal">
              From Fabric to <span className="italic">Finished Goods</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Fabric Sourcing", desc: "Direct mill relationships. Every roll tested before cutting." },
              { step: "02", title: "Pattern & Cut", desc: "CAD-optimized nesting. Minimal waste. Precise tolerance." },
              { step: "03", title: "Sew & Assemble", desc: "Experienced operators. Inline QC at every station." },
              { step: "04", title: "Inspect & Pack", desc: "AQL 2.5 standard. Pre-shipment verification." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-6xl md:text-7xl font-serif text-stone/30 absolute -top-4 -left-2">
                  {item.step}
                </span>
                <div className="relative pt-12">
                  <h3 className="text-body-md font-medium text-charcoal mb-2">{item.title}</h3>
                  <p className="text-body-sm text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC / Instagram */}
      <section className="py-24 md:py-32 section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption uppercase tracking-[0.3em] text-subtle mb-4">@boaz.apparel</p>
            <h2 className="text-display-md font-serif text-cream mb-8">
              Made by Us. <span className="italic text-stone">Worn by You.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {ugcGrid.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="aspect-square relative overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </main>
  );
}
