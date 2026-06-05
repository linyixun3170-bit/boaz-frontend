"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import en from "./en";
import zh from "./zh";

export type Lang = "en" | "zh";

const translations: Record<Lang, Record<string, string>> = { en, zh };

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("boaz-lang") as Lang | null;
    if (saved && (saved === "en" || saved === "zh")) {
      setLangState(saved);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang?.startsWith("zh")) {
        setLangState("zh");
      }
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("boaz-lang", newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key] || translations["en"][key] || key;
    },
    [lang]
  );

  // Prevent hydration mismatch — render nothing until mounted
  if (!mounted) {
    // Still render children but with default English T that returns keys
    const fallbackT = (key: string) => translations["en"][key] || key;
    return (
      <LangContext.Provider value={{ lang: "en", setLang, t: fallbackT }}>
        {children}
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
