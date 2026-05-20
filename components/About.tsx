"use client";

import { aboutImages } from "@/lib/images";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-cream section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] image-hover"
          >
            <Image
              src={aboutImages.factoryPortrait.src}
              alt={aboutImages.factoryPortrait.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-6">
              Our Story
            </p>
            <h2 className="text-display-lg font-serif text-charcoal mb-4 text-balance">
              Built to Wear,
              <br />
              <span className="italic">Made to Last</span>
            </h2>
            <p className="text-body-md text-subtle mb-8">
              Three generations. One uncompromising standard.
            </p>
            <div className="space-y-6 text-body-lg text-muted max-w-lg">
              <p>
                From a sewing machine in a back room to a coast-to-coast supply chain.
              </p>
              <p>
                In an era when education was a luxury, our grandmother used a needle and thread 
                to put her brother through university. When our mother turned 15, she locked herself 
                in that same room with a single sewing machine. By 20, she was a sought-after 
                pattern maker. By 25, seven apprentices sat at her feet — each had arrived 
                with a pork knuckle as their offering of respect.
              </p>
              <p>
                We grew up in that workshop. Our school dresses were cut and sewn there.
                Today, BOAZ operates two production bases — Zhejiang and Hebei. 
                Our online sales team sits in Hangzhou.
              </p>
              <p className="text-charcoal font-medium">
                We do not rent expensive factory real estate and pass that cost to you. 
                Product + Labor + Logistics = Your Price.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              {["OEKO-TEX Certified", "BSCI Audited", "ISO 9001"].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                  <span className="text-body-sm text-muted">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
