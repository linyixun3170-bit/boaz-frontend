"use client";

import { ugcImages } from "@/lib/images";
import { useRef, useState } from "react";
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

const processes = [
  {
    step: "01",
    title: "Fabric Sourcing",
    desc: "Direct mill relationships. Every roll tested before cutting.",
  },
  {
    step: "02",
    title: "Pattern & Cut",
    desc: "CAD-optimized nesting. Minimal waste. Precise tolerance.",
  },
  {
    step: "03",
    title: "Sew & Assemble",
    desc: "Experienced operators. Inline QC at every station.",
  },
  {
    step: "04",
    title: "Inspect & Pack",
    desc: "AQL 2.5 standard. Pre-shipment verification.",
  },
];

const ugcGrid = [
  ugcImages.grid1,
  ugcImages.grid2,
  ugcImages.grid3,
  ugcImages.grid4,
];

export default function WhyBoazPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <main>
      <SchemaOrg type="about" />

      {/* ===== HERO — Video Background ===== */}
      <section className="relative h-[80vh] min-h-[500px] md:min-h-[600px] overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/products/cl-washed-vintage-set/sku/sku-Gray-tee.webp"
        >
          <source src="/videos/about-hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/50 to-charcoal/30" />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-7xl mx-auto w-full"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-cream/70 mb-4">About BOAZ</p>
            <h1 className="text-display-xl md:text-display-2xl font-serif text-cream mb-6 text-balance max-w-3xl">
              From Hebei<br />
              <span className="italic">To the World</span>
            </h1>
            <p className="text-body-lg text-cream/80 max-w-xl leading-relaxed">
              We are not a trading company with a website. We own the production line — every cut, every stitch, every inspection happens under our roof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="py-24 md:py-32 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">Our Story</p>
            <h2 className="text-display-lg font-serif text-charcoal mb-8 text-balance">
              We Don&apos;t Just Make T-Shirts.
              <br />
              <span className="italic">We Build Trust.</span>
            </h2>
            <div className="space-y-4 text-body-md text-muted leading-relaxed">
              <p>
                BOAZ is a garment factory with 10 years of OEM & ODM experience. Our production base is located in Hebei, China, specializing in T-shirts and sweatshirts for brands of all sizes.
              </p>
              <p>
                Small batches starting from 50 pieces — light customization using ready-stock garments. Swap your label, print your design, add custom poly bags. Delivery in 3&ndash;5 days. Perfect for brand sampling, merch drops, and restocking without tying up inventory.
              </p>
              <p>
                Larger volumes get full-process production with fabric sourcing, cutting, sewing, and QC — all under one roof. No middlemen. The price you see is product + labor + shipping. That&apos;s the BOAZ difference.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Years Experience", value: "10+" },
              { label: "Production Base", value: "Hebei, China" },
              { label: "Batch Range", value: "50–10K+" },
              { label: "Lead Time", value: "3–5 Days" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 md:p-8 bg-offwhite border border-stone/40 text-center">
                <span className="text-display-md font-serif text-charcoal block mb-1">{stat.value}</span>
                <span className="text-[11px] uppercase tracking-wider text-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FACTORY VIDEO SHOWCASE ===== */}
      <section className="py-24 md:py-32 section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-subtle mb-4">Factory Tour</p>
            <h2 className="text-display-md font-serif text-cream mb-4">
              See the <span className="italic text-stone">Process</span>
            </h2>
            <p className="text-body-md text-cream/60 max-w-xl mx-auto">
              From raw fabric rolls to finished garments — watch how your orders are made.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video max-w-4xl mx-auto overflow-hidden bg-charcoal/50 border border-stone/20"
          >
            {!videoPlaying ? (
              <div className="relative w-full h-full cursor-pointer group" onClick={() => setVideoPlaying(true)}>
                {/* Video poster frame - using first frame */}
                <video
                  className="w-full h-full object-cover"
                  src="/videos/about-hero-compressed.mp4"
                  preload="metadata"
                  muted
                  playsInline
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors duration-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-cream flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cream ml-1">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/60 text-[11px] uppercase tracking-wider">
                  Click to watch &middot; 1:33
                </p>
              </div>
            ) : (
              <video
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                playsInline
              >
                <source src="/videos/about-hero-compressed.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== Trust Grid ===== */}
      <section ref={ref} className="py-24 md:py-32 section-padding bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">Why BOAZ</p>
            <h2 className="text-display-lg font-serif text-charcoal text-balance">
              What Sets Us <span className="italic">Apart</span>
            </h2>
          </motion.div>

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

      {/* ===== Process Visual ===== */}
      <section className="py-24 md:py-32 section-padding bg-cream">
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
            {processes.map((item, i) => (
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

      {/* ===== UGC / Instagram ===== */}
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

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 section-padding bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-display-md font-serif text-charcoal mb-6">
              Ready to Work With the <span className="italic">Factory Directly?</span>
            </h2>
            <p className="text-body-md text-muted mb-8 max-w-xl mx-auto leading-relaxed">
              No middlemen. No inflated quotes. Just the people who make your garments, from first sample to final shipment.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-charcoal text-cream text-[12px] uppercase tracking-[0.2em] hover:bg-charcoal/90 transition-colors duration-300"
            >
              Get a Quote
            </a>
          </motion.div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </main>
  );
}
