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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <Image
          src={heroImages.background.src}
          alt={heroImages.background.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center section-padding"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-caption uppercase tracking-[0.3em] text-muted mb-6"
        >
          Premium T-Shirt & Hoodie Manufacturing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="text-display-xl font-serif text-charcoal max-w-5xl text-balance mb-8"
        >
          Your Line,
          <br />
          <span className="italic">Our Craft</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="text-body-lg text-muted max-w-xl mb-12 text-balance"
        >
          From ¥6 blanks to ¥70 heavyweight hoodies. Five-day turnaround. 
          Three generations of needle-to-coast manufacturing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact" className="pill-btn-filled">
            Request a Quote
          </Link>
          <Link href="/wholesale" className="pill-btn bg-cream/80 backdrop-blur-sm">
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
        <span className="text-caption uppercase tracking-widest text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
