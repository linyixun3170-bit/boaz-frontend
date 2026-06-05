"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/i18n/context";

export default function LanguageSwitcher({ light }: { light?: boolean }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors px-2 py-1 ${
          light
            ? "text-cream/80 hover:text-cream"
            : "text-dark/70 hover:text-dark"
        }`}
        aria-label={t("lang.switch")}
      >
        {/* Globe icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden md:inline">{lang === "en" ? "EN" : "中"}</span>
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 min-w-[130px] rounded border shadow-lg z-50 ${
            light
              ? "bg-charcoal/95 backdrop-blur-lg border-stone/30"
              : "bg-cream/95 backdrop-blur-lg border-stone/30"
          }`}
        >
          <button
            onClick={() => { setLang("en"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 ${
              lang === "en"
                ? (light ? "text-cream font-medium" : "text-charcoal font-medium")
                : (light ? "text-cream/60 hover:text-cream" : "text-dark/60 hover:text-dark")
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${lang === "en" ? "bg-current" : "bg-transparent"}`} />
            English
          </button>
          <button
            onClick={() => { setLang("zh"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 ${
              lang === "zh"
                ? (light ? "text-cream font-medium" : "text-charcoal font-medium")
                : (light ? "text-cream/60 hover:text-cream" : "text-dark/60 hover:text-dark")
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${lang === "zh" ? "bg-current" : "bg-transparent"}`} />
            简体中文
          </button>
        </div>
      )}
    </div>
  );
}
