"use client";

import { factoryImages } from "@/lib/images";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function FactoryTour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-cream section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">
            Inside Our Factory
          </p>
          <h2 className="text-display-lg font-serif text-charcoal text-balance">
            Where Precision
            <br />
            <span className="italic">Meets Scale</span>
          </h2>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7 aspect-[4/3] image-hover relative"
          >
            <Image
              src={factoryImages.fabricInspection.src}
              alt={factoryImages.fabricInspection.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </motion.div>

          {/* Stacked Column */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="aspect-[4/3] image-hover relative"
            >
              <Image
                src={factoryImages.cuttingStation.src}
                alt={factoryImages.cuttingStation.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="aspect-[4/3] image-hover relative"
            >
              <Image
                src={factoryImages.qualityControl.src}
                alt={factoryImages.qualityControl.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </motion.div>
          </div>

          {/* Wide Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-12 aspect-[21/9] image-hover relative"
          >
            <Image
              src={factoryImages.packaging.src}
              alt={factoryImages.packaging.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
