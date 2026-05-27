"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Ruler, Package, Clock, Shirt, Truck, FlaskConical } from "lucide-react";
import Footer from "@/components/Footer";
import { products } from "@/lib/products-catalog";
import type { Product } from "@/lib/products-catalog";
import { buildSizeTable } from "@/lib/size-chart";

function SizeTable({ product }: { product: Product }) {
  if (!product.sizeChart || product.sizeChart.length === 0) return null;
  const tableData = product.sizeChart.map(e => buildSizeTable(e, product.sizes));
  return (
    <section className="py-16 md:py-20 section-padding bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-display-md font-serif text-charcoal mb-6 md:mb-8 flex items-center gap-2">
          <Ruler size={20} />
          Size Chart
        </h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[600px] px-4 md:px-0">
            <table className="w-full text-left border-collapse text-[12px] md:text-sm">
              <thead>
                <tr className="border-b border-stone">
                  <th className="py-2 md:py-3 pr-4 text-[10px] md:text-[11px] uppercase tracking-wider text-muted font-medium" rowSpan={2}>Measurement</th>
                  {product.sizes.map(s => (
                    <th key={s} className="py-2 md:py-3 px-2 md:px-4 font-medium text-charcoal text-center" colSpan={2}>{s}</th>
                  ))}
                </tr>
                <tr className="border-b border-stone/30">
                  {product.sizes.map(s => (
                    <Fragment key={s}>
                      <th className="py-1 px-2 text-[9px] text-muted text-center">cm</th>
                      <th className="py-1 px-2 text-[9px] text-muted text-center">in</th>
                    </Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.label} className="border-b border-stone/50">
                    <td className="py-2 md:py-3 pr-4 text-charcoal font-medium whitespace-nowrap">{row.label}</td>
                    {product.sizes.map((_, i) => (
                      <Fragment key={i}>
                        <td className="py-2 md:py-3 px-1 md:px-2 text-center text-muted">{row.cm[i]}</td>
                        <td className="py-2 md:py-3 px-1 md:px-2 text-center text-stone/70">{row.inch[i]}"</td>
                      </Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[10px] md:text-[11px] text-muted mt-3 md:mt-4">* Measurements may vary ±1 cm due to manufacturing tolerances.</p>
      </div>
    </section>
  );
}

function ColorSection({
  product,
  selectedColor,
  setSelectedColor,
  setShowingColor,
  isColorView,
}: {
  product: Product;
  selectedColor: number;
  setSelectedColor: (i: number) => void;
  setShowingColor: (v: boolean) => void;
  isColorView: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-muted mb-2 md:mb-3">
        Colors ({product.colors.length} available)
      </p>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {product.colors.map((color, i) => (
          <button
            key={color.name}
            onClick={() => { setSelectedColor(i); setShowingColor(true); }}
            className={"w-8 h-8 md:w-9 md:h-9 rounded-full border-2 transition-all " + (
              selectedColor === i && isColorView
                ? "border-charcoal ring-2 ring-charcoal/20"
                : "border-stone/60 hover:border-charcoal/50"
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            data-color-name={color.name}
          >
            {selectedColor === i && isColorView && (
              <span className="flex items-center justify-center w-full h-full">
                <Check size={10} className={color.hex === "#ffffff" || color.hex === "#f5f0e8" || color.hex === "#d3d3d3" ? "text-charcoal" : "text-white"} />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-[10px] md:text-[11px] text-muted mt-1 md:mt-2">
        Selected: {product.colors[selectedColor]?.name} — <button onClick={() => setShowingColor(false)} className="underline text-charcoal">Show all photos</button>
      </p>
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showingColor, setShowingColor] = useState(false);

  const mainPic = showingColor
    ? (product.colors[selectedColor]?.image ?? product.images.main)
    : (product.images.gallery[selectedImage] ?? product.images.main);

  const isColorView = showingColor;
  const isGalleryView = !showingColor;

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const colorProps = { product, selectedColor, setSelectedColor, setShowingColor, isColorView };

  return (
    <div>
      {/* Breadcrumb */}
      <section className="pt-24 md:pt-28 pb-3 md:pb-4 section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-wider text-muted">
            <Link href="/wholesale" className="hover:text-charcoal transition-colors">Products</Link>
            <span>/</span>
            <span className="text-charcoal truncate max-w-[200px] md:max-w-none">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-12 md:pb-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Image Gallery — 7 cols desktop */}
          <div className="lg:col-span-7 space-y-3 md:space-y-4">
            {/* Main image */}
            <div className="relative p-2 md:p-3 bg-cream border border-stone shadow-sm">
              <div className="absolute inset-2 md:inset-3 border border-charcoal/5 pointer-events-none z-10" />
              <div className="relative w-full bg-warmgray" style={{aspectRatio:"4/5", maxHeight:"80vh"}}>
                <Image
                  src={mainPic}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-1.5 md:gap-2">
                  {product.isNew && (
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-gold text-cream text-[10px] uppercase tracking-wider">New</span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-charcoal text-cream text-[10px] uppercase tracking-wider">Best Seller</span>
                  )}
                </div>
              </div>
            </div>
            {/* Gallery thumbnails */}
            {product.images.gallery.length > 1 && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-2">
                {product.images.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedImage(i); setShowingColor(false); }}
                    className={"relative w-20 h-24 md:w-28 md:h-32 shrink-0 overflow-hidden border-2 transition-all " + (
                      selectedImage === i && isGalleryView ? "border-charcoal" : "border-transparent hover:border-stone"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 80px, 112px" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {/* Color preview indicator */}
            {isColorView && (
              <p className="text-[10px] md:text-[11px] text-muted text-center">
                Showing color: <strong>{product.colors[selectedColor]?.name}</strong>
                {" "}— <button onClick={() => setShowingColor(false)} className="underline">Back to gallery</button>
              </p>
            )}
          </div>

          {/* Colors — MOBILE ONLY: below image, before product info */}
          <div className="lg:col-span-12 lg:hidden">
            <ColorSection {...colorProps} />
          </div>

          {/* Product Info — 5 cols desktop */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <div>
              <p className="text-[10px] md:text-caption uppercase tracking-[0.3em] text-muted mb-1 md:mb-2">{product.category}</p>
              <h1 className="text-2xl md:text-display-md font-serif text-charcoal mb-2 md:mb-3">{product.name}</h1>
              <p className="text-sm md:text-body-md text-muted">{product.tagline}</p>
            </div>

            <div className="py-3 md:py-4 border-y border-stone">
              <p className="text-xl md:text-2xl font-medium text-charcoal">{product.priceFOB}</p>
              <p className="text-[10px] md:text-[11px] text-muted mt-1">FOB Ningbo · Minimum {product.moq} pcs per color/size</p>
            </div>

            {/* B2B Key Info */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
              <div className="p-2 md:p-2.5 bg-offwhite">
                <Shirt size={14} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[9px] md:text-[10px] leading-tight text-charcoal font-medium">{product.fabric.split("(")[0].trim()}</p>
                <p className="text-[8px] md:text-[9px] text-muted mt-0.5">Fabric</p>
              </div>
              <div className="p-2 md:p-2.5 bg-offwhite">
                <FlaskConical size={14} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[9px] md:text-[10px] leading-tight text-charcoal font-medium">Samples Avail.</p>
                <p className="text-[8px] md:text-[9px] text-muted mt-0.5">5-7 day dispatch</p>
              </div>
              <div className="p-2 md:p-2.5 bg-offwhite">
                <Truck size={14} className="mx-auto mb-1 text-charcoal" />
                <p className="text-[9px] md:text-[10px] leading-tight text-charcoal font-medium">FOB Ningbo</p>
                <p className="text-[8px] md:text-[9px] text-muted mt-0.5">Sea / Air / Courier</p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-offwhite">
                <p className="text-[8px] md:text-[9px] uppercase tracking-wider text-muted mb-0.5">Weight</p>
                <p className="text-xs md:text-sm font-medium text-charcoal">{product.weight}</p>
              </div>
              <div className="p-2 md:p-2.5 bg-offwhite">
                <p className="text-[8px] md:text-[9px] uppercase tracking-wider text-muted mb-0.5">Fit</p>
                <p className="text-xs md:text-sm font-medium text-charcoal">{product.fit}</p>
              </div>
              <div className="p-2 md:p-2.5 bg-offwhite">
                <p className="text-[8px] md:text-[9px] uppercase tracking-wider text-muted mb-0.5">MOQ</p>
                <p className="text-xs md:text-sm font-medium text-charcoal">{product.moq} pcs</p>
              </div>
            </div>

            {/* Colors — DESKTOP ONLY */}
            <div className="hidden lg:block">
              <ColorSection {...colorProps} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-2 md:px-3 py-0.5 md:py-1 bg-offwhite text-[9px] md:text-[10px] uppercase tracking-wider text-muted">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 md:pt-4 space-y-2 md:space-y-3">
              <Link href={`/custom?product=${product.id}`} className="btn-capsule w-full block text-center text-sm md:text-base">
                Customize This Style
                <ArrowUpRight size={14} className="inline ml-1" />
              </Link>
              <Link href={`/contact?subject=${encodeURIComponent("Inquiry: " + product.name)}&product=${product.id}`} className="pill-btn w-full block text-center text-sm md:text-base">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Chart — Dual Unit (cm + inch) */}
      <SizeTable product={product} />

      {/* Trust signals */}
      <section className="py-12 md:py-16 section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
          <div>
            <Package size={22} className="mx-auto mb-2 md:mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">{product.moq}+ PCS MOQ</p>
            <p className="text-[10px] md:text-[11px] text-muted mt-1">Low minimum order per color/size</p>
          </div>
          <div>
            <Clock size={22} className="mx-auto mb-2 md:mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">3-5 Day Turnaround</p>
            <p className="text-[10px] md:text-[11px] text-muted mt-1">Sample in 1-2 days, bulk in 3-5 days</p>
          </div>
          <div>
            <Check size={22} className="mx-auto mb-2 md:mb-3 text-charcoal" />
            <p className="text-sm font-medium text-charcoal">Quality Guaranteed</p>
            <p className="text-[10px] md:text-[11px] text-muted mt-1">Pre-shipment inspection included</p>
          </div>
        </div>
      </section>

      {/* More Products */}
      {otherProducts.length > 0 && (
        <section className="py-16 md:py-20 section-padding bg-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-display-md font-serif text-charcoal mb-8 md:mb-12 text-center">
              More <span className="italic">Products</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {otherProducts.map((p) => (
                <Link key={p.id} href={"/wholesale/" + p.slug} className="group">
                  <div className="relative aspect-[3/4] mb-2 md:mb-3 overflow-hidden bg-warmgray">
                    <Image src={p.images.main} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" loading="lazy" />
                    <div className="absolute top-2 md:top-3 left-2 md:left-3 px-1.5 md:px-2 py-0.5 md:py-1 bg-cream/90 text-[9px] md:text-[10px] uppercase tracking-wider">
                      {p.moq} MOQ
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-medium text-charcoal group-hover:text-ink transition-colors leading-tight">{p.name}</p>
                  <p className="text-[10px] md:text-[11px] text-muted mt-0.5">{p.priceFOB}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
