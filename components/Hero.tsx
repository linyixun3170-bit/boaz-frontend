"use client";

import { heroImages } from "@/lib/images";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Background Image with Parallax */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={`${heroImages.background.src}?v=3`}
          alt={heroImages.background.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Multi-layer gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/20" />
      </motion.div>

      {/* Content — left aligned for visual hierarchy */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-start justify-center px-6 lg:px-12 xl:px-20 max-w-7xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="text-caption uppercase tracking-[0.3em] text-cream/60 mb-5"
        >
          Premium Apparel Manufacturing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="text-display-xl font-serif text-cream max-w-4xl mb-6 leading-[1.08]"
        >
          Your Brand,
          <br />
          <span className="italic">Factory Direct</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-xl mb-10"
        >
          <p className="text-body-lg text-cream/80 mb-2">
            OEM/ODM Custom • Small Orders Welcome • Global Shipping
          </p>
          <p className="text-sm text-cream/40">
            From $1.99 blanks to $9.90 heavyweight hoodies. 
            5-day turnaround. FOB Ningbo/Shanghai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact" className="inline-block px-8 py-3.5 bg-cream text-charcoal text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white transition-all duration-300">
            Request a Quote
          </Link>
          <Link href="/wholesale" className="inline-block px-8 py-3.5 border border-cream/30 text-cream text-sm uppercase tracking-widest rounded-full hover:bg-cream/10 transition-all duration-300">
            View Products
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-cream/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
