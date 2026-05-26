"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Ruler, Package, Clock, Shirt, Truck, FlaskConical } from "lucide-react";
import Footer from "@/components/Footer";
import { products } from "@/lib/products-catalog";
import type { Product } from "@/lib/products-catalog";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showingColor, setShowingColor] = useState(false);

  const mainPic = showingColor
    ? (product.colors[selectedColor]?.image ?? product.images.main)
    : (product.images.gallery[selectedImage] ?? product.images.main);

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted">
            <Link href="/wholesale" className="hover:text-charcoal transition-colors">Products</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery — 7 columns on desktop */ }
          <div className="lg:col-span-7 space-y-4">
            <div className="relative p-3 bg-cream border border-stone shadow-sm">
              <div className="absolute inset-3 border border-charcoal/5 pointer-events-none z-10" />
              <div className="relative w-full flex items-center justify-center bg-warmgray" style={{minHeight:"500px",maxHeight:"85vh"}}>
                <Image
                  src={mainPic}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-gold text-cream text-[10px] uppercase tracking-wider">New</span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-wider">Best Seller</span>
                  )}
                </div>
              </div>
            </div>
            {/* Gallery strip */}
            {product.images.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedImage(i); setShowingColor(false); }}
                    className={"relative w-24 h-28 md:w-28 md:h-32 shrink-0 overflow-hidden border-2 transition-all " + (
                      selectedImage === i && !showingColor ? "border-charcoal" : "border-transparent hover:border-stone"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="112px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info — 5 columns on desktop */ }
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-caption uppercase tracking-[0.3em] text-muted mb-2">{product.category}</p>
              <h1 className="text-display-md font-serif text-charcoal mb-3">{product.name}</h1>
              <p className="text-body-md text-muted">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-stone">
              <p className="text-2xl font-medium text-charcoal">{product.priceFOB}</p>
              <p className="text-[11px] text-muted mt-1">FOB Ningbo · Minimum {product.moq} pcs per color/size</p>
            </div>

            {/* B2B Key Info */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-offwhite">
                <Shirt size={16} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[10px] leading-tight text-charcoal font-medium">{product.fabric.split("(")[0].trim()}</p>
                <p className="text-[9px] text-muted mt-0.5">Fabric</p>
              </div>
              <div className="p-2.5 bg-offwhite">
                <FlaskConical size={16} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[10px] leading-tight text-charcoal font-medium">Samples Avail.</p>
                <p className="text-[9px] text-muted mt-0.5">5-7 day dispatch</p>
              </div>
              <div className="p-2.5 bg-offwhite">
                <Truck size={16} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[10px] leading-tight text-charcoal font-medium">FOB Ningbo</p>
                <p className="text-[9px] text-muted mt-0.5">Sea / Air / Courier</p>
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2.5 bg-offwhite">
                <p className="text-[9px] uppercase tracking-wider text-muted mb-0.5">Weight</p>
                <p className="text-sm font-medium text-charcoal">{product.weight}</p>
              </div>
              <div className="p-2.5 bg-offwhite">
                <p className="text-[9px] uppercase tracking-wider text-muted mb-0.5">Fit</p>
                <p className="text-sm font-medium text-charcoal">{product.fit}</p>
              </div>
              <div className="p-2.5 bg-offwhite">
                <p className="text-[9px] uppercase tracking-wider text-muted mb-0.5">MOQ</p>
                <p className="text-sm font-medium text-charcoal">{product.moq} pcs</p>
              </div>
            </div>

            {/* Colors */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted mb-3">
                Colors ({product.colors.length} available)
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(i); setShowingColor(true); }}
                    className={"relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all " + (
                      selectedColor === i ? "border-charcoal scale-110" : "border-stone hover:border-charcoal/40"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name + " - click to preview"}
                    data-color-name={color.name}
                  >
                    {color.image && (
                      <Image src={color.image} alt={color.name} fill className="object-cover" sizes="40px" />
                    )}
                    {selectedColor === i && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check size={14} className="text-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted mt-2">
                Selected: {product.colors[selectedColor]?.name}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-offwhite text-[10px] uppercase tracking-wider text-muted">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 space-y-3">
              <Link href={`/custom?product=${product.id}`} className="btn-capsule w-full block text-center">
                Customize This Style
                <ArrowUpRight size={14} className="inline ml-1" />
              </Link>
              <Link href={`/contact?subject=${encodeURIComponent("Inquiry: " + product.name)}&product=${product.id}`} className="pill-btn w-full block text-center">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Chart — table only (image might not exist) */}
      {product.sizeChart && product.sizeChart.length > 0 && (
        <section className="py-20 section-padding bg-offwhite">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-display-md font-serif text-charcoal mb-8">
              <Ruler size={20} className="inline mr-2" />
              Size Chart
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone">
                    <th className="py-3 pr-6 text-[11px] uppercase tracking-wider text-muted font-medium">Measurement</th>
                    {product.sizes.map((size) => (
                      <th key={size} className="py-3 px-4 text-sm font-medium text-charcoal text-center">{size}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.sizeChart.map((row) => (
                    <tr key={row.label} className="border-b border-stone/50">
                      <td className="py-3 pr-6 text-sm text-charcoal">{row.label}</td>
                      {product.sizes.map((size) => (
                        <td key={size} className="py-3 px-4 text-sm text-muted text-center">
                          {row.values[size] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted mt-4">FOB Ningbo. * Measurements may vary ±0.5" due to manufacturing tolerances.</p>
          </div>
        </section>
      )}

      {/* Trust signals */}
      <section className="py-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <Package size={24} className="mx-auto mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">{product.moq}+ PCS MOQ</p>
            <p className="text-[11px] text-muted mt-1">Low minimum order per color/size</p>
          </div>
          <div>
            <Clock size={24} className="mx-auto mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">3-5 Day Turnaround</p>
            <p className="text-[11px] text-muted mt-1">Sample in 1-2 days, bulk in 3-5 days</p>
          </div>
          <div>
            <Check size={24} className="mx-auto mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">Quality Guaranteed</p>
            <p className="text-[11px] text-muted mt-1">Pre-shipment inspection included</p>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="py-20 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-md font-serif text-charcoal mb-12 text-center">
            More <span className="italic">Products</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProducts.length > 0 ? (
              otherProducts.map((p) => (
                <Link key={p.id} href={"/wholesale/" + p.slug} className="group">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-warmgray">
                    <Image src={p.images.main} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 25vw" />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-cream/90 text-[10px] uppercase tracking-wider">
                      {p.moq} MOQ
                    </div>
                  </div>
                  <p className="text-sm font-medium text-charcoal group-hover:text-ink transition-colors">{p.name}</p>
                  <p className="text-[11px] text-muted">{p.priceFOB}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted text-sm">More products coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
