"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "@/lib/i18n/context";

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/wholesale/", key: "nav.products" },
  { href: "/custom/", key: "nav.customize" },
  { href: "/journal/", key: "nav.blog" },
  { href: "/why-boaz/", key: "nav.about" },
  { href: "/contact/", key: "nav.contact" },
];

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-lg shadow-sm py-3 md:py-4"
            : "bg-transparent py-5 md:py-8"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto section-padding flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-heading text-2xl tracking-[0.15em] transition-opacity ${
              scrolled ? "text-dark hover:opacity-60" : "text-cream hover:text-cream/70"
            }`}
          >
            BOAZ
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] uppercase tracking-[0.2em] transition-colors link-underline ${
                  scrolled ? "text-dark/80 hover:text-dark" : "text-cream/80 hover:text-cream"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Language + CTA + Hamburger */}
          <div className="flex items-center gap-1 md:gap-2">
            <LanguageSwitcher light={!scrolled} />
            <Link
              href="/contact/"
              className={`text-[11px] md:text-[13px] uppercase tracking-[0.2em] btn-capsule transition-all ${
                scrolled
                  ? "bg-charcoal text-cream hover:bg-ink"
                  : "bg-cream text-charcoal hover:bg-white"
              }`}
            >
              {t("nav.requestQuote")}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1 p-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 rounded transition-transform duration-300 ${
                  scrolled ? "bg-dark" : "bg-cream"
                } ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-opacity duration-300 ${
                  scrolled ? "bg-dark" : "bg-cream"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-transform duration-300 ${
                  scrolled ? "bg-dark" : "bg-cream"
                } ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-all duration-700 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-3">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-heading text-xl md:text-2xl text-dark hover:text-gold transition-all duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
