"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Filter } from "lucide-react";
import Footer from "@/components/Footer";
import SchemaOrg from "@/components/SchemaOrg";
import { products, type Product } from "@/lib/products-catalog";

const categories = ["All", "T-Shirts", "Hoodies", "Long Sleeves", "Kids"];

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
              All products in stock. Customization available from 50 units. Click any product for details and pricing.
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
            <ProductCard key={product.id} product={product} index={i} isInView={isInView} />
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

function ProductCard({ product, index, isInView }: { product: Product; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      className="group"
    >
      <Link href={`/wholesale/${product.slug}`}>
        <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-warmgray">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* MOQ badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 text-caption uppercase tracking-wider text-charcoal">
            {product.moq} MOQ
          </div>
          {/* Tags */}
          <div className="absolute top-3 right-3 flex gap-1">
            {product.isNew && (
              <span className="px-2 py-1 bg-gold/90 text-cream text-[10px] uppercase tracking-wider">New</span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-1 bg-charcoal/90 text-cream text-[10px] uppercase tracking-wider">Best</span>
            )}
          </div>
          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={16} className="text-charcoal" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-body-sm font-medium text-charcoal group-hover:text-ink transition-colors">{product.name}</h3>
          <p className="text-caption text-muted uppercase tracking-wide">{product.weight} · {product.fabric}</p>
          <p className="text-body-sm text-charcoal font-medium mt-1">{product.priceFOB}</p>
          <p className="text-[11px] text-gold">{product.colors.length} colors · {product.sizes.length} sizes</p>
        </div>
      </Link>
    </motion.div>
  );
}
