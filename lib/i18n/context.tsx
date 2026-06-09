"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { languages, type LangMeta } from "./languages";
import en from "./en";

type Lang = string;

interface LangContextType {
  lang: Lang;
  meta: LangMeta;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  meta: languages[0],
  setLang: () => {},
  t: (key) => key,
});

// Cache loaded translations
const translationCache: Record<string, Record<string, string>> = { en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Record<string, string>>(en);
  const [mounted, setMounted] = useState(false);
  const meta = languages.find((l) => l.code === lang) || languages[0];

  // Load translation file
  const loadLang = useCallback(async (code: string) => {
    if (translationCache[code]) {
      setDict(translationCache[code]);
      return;
    }
    try {
      const mod = await import(`./${code}.ts`);
      translationCache[code] = mod.default;
      setDict(mod.default);
    } catch {
      // Fallback to English
      setDict(en);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    // 默认英文，只有用户手动选择过才用 localStorage 记住的语言
    const saved = localStorage.getItem("boaz-lang") as Lang | null;
    const langToUse = saved || "en";
    
    if (langToUse !== "en") {
      loadLang(langToUse);
    }
    setLangState(langToUse);
  }, [loadLang]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("boaz-lang", newLang);
    if (newLang !== "en") {
      loadLang(newLang);
    } else {
      setDict(en);
    }
  }, [loadLang]);

  const t = useCallback(
    (key: string): string => dict[key] || en[key] || key,
    [dict]
  );

  if (!mounted) {
    return (
      <LangContext.Provider value={{ lang: "en", meta: languages[0], setLang, t }}>
        {children}
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, meta, setLang, t }}>
      <div dir={meta.dir || "ltr"} className={meta.dir === "rtl" ? "rtl" : ""}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export { languages } from "./languages";
