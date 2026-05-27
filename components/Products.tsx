"use client";

import { productImages } from "@/lib/images";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "XJ-78000 Drop Shoulder Tee",
    desc: "280gsm / 6XL / 12 Colors",
    image: productImages.XJ78000,
    tag: "New",
    slug: "XJ-78000-heavyweight-drop-shoulder-tee",
  },
  {
    name: "Classic Heavyweight Tee",
    desc: "240gsm / 100% Combed Cotton",
    image: productImages.heavyweightTee,
    tag: "Best Seller",
  },
  {
    name: "Premium Oversized Hoodie",
    desc: "400gsm / French Terry",
    image: productImages.oversizedHoodie,
    tag: "New",
  },
  {
    name: "Vintage Washed Tee",
    desc: "220gsm / Garment Dyed",
    image: productImages.vintageWashedTee,
    tag: null,
  },
  {
    name: "French Terry Crewneck",
    desc: "350gsm / Unisex Fit",
    image: productImages.crewneck,
    tag: null,
  },
  {
    name: "Long Sleeve Base Layer",
    desc: "200gsm / Ribbed Cuffs",
    image: productImages.longSleeve,
    tag: null,
  },
  {
    name: "Crop Boxy Tee",
    desc: "230gsm / Drop Shoulder",
    image: productImages.cropBoxyTee,
    tag: "Trending",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="group"
    >
      <Link href="/wholesale" className="block">
        <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-warmgray">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-cream/90 backdrop-blur-sm text-caption uppercase tracking-wider text-charcoal">
              {product.tag}
            </span>
          )}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-expo-out">
            <ArrowUpRight size={18} className="text-charcoal" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-body-md font-medium text-charcoal group-hover:text-ink transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-body-sm text-muted">{product.desc}</p>
          <Link
            href={"/custom?product=" + product.slug}
            className="inline-flex items-center gap-1.5 mt-2 text-[11px] uppercase tracking-widest text-gold hover:text-charcoal transition-colors"
          >
            Customize This Style →
          </Link>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-offwhite section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24"
        >
          <div>
            <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">
              Core Collection
            </p>
            <h2 className="text-display-lg font-serif text-charcoal text-balance">
              Engineered for
              <br />
              <span className="italic">Your Brand</span>
            </h2>
          </div>
          <Link
            href="/wholesale"
            className="pill-btn mt-6 md:mt-0 self-start md:self-auto"
          >
            View All Products
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
