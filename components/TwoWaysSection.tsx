"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n/context";

export default function TwoWaysSection() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans">{t("twoways.label")}</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-charcoal">
            {t("twoways.title")}
          </h2>
          <p className="mt-3 text-warmink text-sm max-w-xl mx-auto leading-relaxed">
            {t("twoways.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Stock Blanks */}
          <Link href="/wholesale" className="group relative rounded-2xl overflow-hidden bg-cream border border-stone/50 hover:border-gold/30 transition-all duration-500">
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="/images/factory/process/warehouse02.jpg"
                alt="Stock blanks — ready to ship"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-[10px] uppercase tracking-wider rounded-full font-sans font-medium">
                {t("twoways.stock.tag")}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl text-charcoal mb-2">{t("twoways.stock.title")}</h3>
              <p className="text-sm text-warmink leading-relaxed mb-4 font-sans">
                {t("twoways.stock.desc")}
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-ink uppercase tracking-wider font-sans">
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.moq50")}</span>
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.5to7days")}</span>
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.instock")}</span>
              </div>
            </div>
          </Link>

          {/* Custom Build */}
          <Link href="/custom" className="group relative rounded-2xl overflow-hidden bg-cream border border-stone/50 hover:border-gold/30 transition-all duration-500">
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="/images/factory/production-line/sewing01.jpg"
                alt="Custom manufacturing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-cream text-[10px] uppercase tracking-wider rounded-full font-sans font-medium">
                {t("twoways.custom.tag")}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl text-charcoal mb-2">{t("twoways.custom.title")}</h3>
              <p className="text-sm text-warmink leading-relaxed mb-4 font-sans">
                {t("twoways.custom.desc")}
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-ink uppercase tracking-wider font-sans">
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.privateLabel")}</span>
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.customWash")}</span>
                <span className="px-2 py-0.5 bg-cream border border-stone/50 rounded-full">{t("general.retailReady")}</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link href="/custom" className="inline-flex items-center gap-2 px-6 py-2.5 border border-charcoal/20 text-charcoal text-xs uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300 font-sans">
            {t("twoways.cta")}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
