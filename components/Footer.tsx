"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-charcoal text-cream section-padding py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="font-serif text-2xl tracking-tight text-cream block mb-4">
              BOAZ
            </Link>
            <p className="text-body-sm text-subtle max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/why-boaz" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.aboutLink")}
                </Link>
              </li>
              <li>
                <Link href="/why-boaz" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.factoryLink")}
                </Link>
              </li>
              <li>
                <Link href="/why-boaz" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.qualityLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Links */}
          <div className="md:col-span-2">
            <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">{t("footer.products")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/wholesale" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.tshirtsLink")}
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.hoodiesLink")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.customLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:col-span-2">
            <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">{t("footer.support")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.contactLink")}
                </Link>
              </li>
              <li>
                <Link href="/why-boaz" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.faqLink")}
                </Link>
              </li>
              <li>
                <Link href="/why-boaz" className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300">
                  {t("footer.shippingLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">{t("footer.connect")}</h4>
            <div className="space-y-3">
              <a
                href="mailto:sale@boaz-clothes.com"
                className="flex items-center gap-2 text-body-sm text-cream/70 hover:text-cream transition-colors duration-300"
              >
                <Mail size={14} />
                sale@boaz-clothes.com
              </a>
              <a
                href="https://wa.me/8618868798631"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-cream/70 hover:text-cream transition-colors duration-300"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-warmink/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-subtle">
            © {new Date().getFullYear()} BOAZ Apparel. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-caption text-subtle hover:text-cream transition-colors duration-300">{t("footer.privacy")}</Link>
            <Link href="/terms-and-conditions" className="text-caption text-subtle hover:text-cream transition-colors duration-300">{t("footer.terms")}</Link>
            <a href="#" className="text-caption text-subtle hover:text-cream transition-colors duration-300">{t("footer.instagram")}</a>
            <a href="#" className="text-caption text-subtle hover:text-cream transition-colors duration-300">{t("footer.linkedin")}</a>
            <a href="#" className="text-caption text-subtle hover:text-cream transition-colors duration-300">{t("footer.twitter")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
