"use client";

import { useState, useRef, useEffect } from "react";
import { useLang, languages } from "@/lib/i18n/context";

export default function LanguageSwitcher({ light }: { light?: boolean }) {
  const { lang, setLang, meta } = useLang();
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
        className={`flex items-center gap-1 px-1.5 py-1 rounded transition-colors ${
          light
            ? "text-cream/80 hover:text-cream hover:bg-cream/10"
            : "text-dark/70 hover:text-dark hover:bg-dark/5"
        }`}
        aria-label="Switch language"
      >
        <span className="text-sm leading-none">{meta.flag}</span>
        <span className="hidden lg:inline text-[11px] uppercase tracking-[0.1em] leading-none ml-0.5">
          {lang.toUpperCase()}
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 min-w-[180px] max-h-[70vh] overflow-y-auto rounded-lg border shadow-xl z-50 ${
            light
              ? "bg-charcoal/95 backdrop-blur-xl border-stone/30 text-cream"
              : "bg-cream/95 backdrop-blur-xl border-stone/30 text-dark"
          }`}
        >
          <div className="py-1">
            {languages.map((l) => {
              const isActive = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] transition-colors flex items-center gap-3 ${
                    isActive
                      ? (light ? "bg-cream/10 text-cream font-medium" : "bg-dark/5 text-dark font-medium")
                      : (light ? "text-cream/60 hover:text-cream hover:bg-cream/5" : "text-dark/60 hover:text-dark hover:bg-dark/5")
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.native}</span>
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-cream" : "bg-dark"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
