"use client";

import { wholesaleImages } from "@/lib/images";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Filter } from "lucide-react";
import Footer from "@/components/Footer";
import SchemaOrg from "@/components/SchemaOrg";

const categories = ["All", "T-Shirts", "Hoodies", "Crewnecks", "Long Sleeve"];

const products = [
  { name: "Classic Heavyweight Tee", category: "T-Shirts", weight: "240gsm", fabric: "Combed Cotton", price: "From $4.50", image: wholesaleImages.heavyweightTee, moq: "50" },
  { name: "Premium Oversized Hoodie", category: "Hoodies", weight: "400gsm", fabric: "French Terry", price: "From $12.00", image: wholesaleImages.oversizedHoodie, moq: "50" },
  { name: "Vintage Washed Tee", category: "T-Shirts", weight: "220gsm", fabric: "Garment Dyed", price: "From $5.20", image: wholesaleImages.vintageWashedTee, moq: "50" },
  { name: "French Terry Crewneck", category: "Crewnecks", weight: "350gsm", fabric: "Unisex Fit", price: "From $9.80", image: wholesaleImages.crewneck, moq: "50" },
  { name: "Long Sleeve Base Layer", category: "Long Sleeve", weight: "200gsm", fabric: "Ribbed Cuffs", price: "From $5.80", image: wholesaleImages.longSleeve, moq: "50" },
  { name: "Crop Boxy Tee", category: "T-Shirts", weight: "230gsm", fabric: "Drop Shoulder", price: "From $4.80", image: wholesaleImages.cropBoxyTee, moq: "50" },
  { name: "Fleece Lined Hoodie", category: "Hoodies", weight: "450gsm", fabric: "Cotton Fleece", price: "From $14.00", image: wholesaleImages.fleeceHoodie, moq: "50" },
  { name: "Raglan Sleeve Tee", category: "T-Shirts", weight: "200gsm", fabric: "Sport Fit", price: "From $4.20", image: wholesaleImages.raglanTee, moq: "50" },
];

export default function WholesalePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main>
      <SchemaOrg type="wholesale" />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">Product Catalog</p>
            <h1 className="text-display-xl font-serif text-charcoal mb-6 text-balance">
              Everything You Need<br />
              <span className="italic">To Build a Brand</span>
            </h1>
            <p className="text-body-lg text-muted max-w-xl">
              All products in stock. Customization available from 50 units. Click any product to request a quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 section-padding bg-cream sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto pb-2">
          <Filter size={16} className="text-muted flex-shrink-0" />
          {categories.map((cat) => (
            <button key={cat} className="pill-btn text-xs py-2 px-5 flex-shrink-0">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section ref={ref} className="pb-32 md:pb-40 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group"
            >
              <Link href="/contact">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-warmgray">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 text-caption uppercase tracking-wider text-charcoal">
                    {product.moq} MOQ
                  </div>
                  <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={16} className="text-charcoal" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-body-sm font-medium text-charcoal group-hover:text-ink transition-colors">{product.name}</h3>
                  <p className="text-caption text-muted uppercase tracking-wide">{product.weight} · {product.fabric}</p>
                  <p className="text-body-sm text-charcoal font-medium mt-1">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto mt-20 md:mt-32 text-center"
        >
          <h3 className="text-display-md font-serif text-charcoal mb-4">
            Need Something <span className="italic">Custom?</span>
          </h3>
          <p className="text-body-md text-muted mb-8 max-w-md mx-auto">
            We can develop any style, fabric, or fit. Send us your tech pack or reference sample.
          </p>
          <Link href="/contact" className="pill-btn-filled">
            Start a Project
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
