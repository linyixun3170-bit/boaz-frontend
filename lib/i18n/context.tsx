"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { languages, type LangMeta } from "./languages";
import en from "./en";
import zh from "./zh";

// 所有语言文件在构建时全量加载，切换零延迟
const ALL_DICTS: Record<string, Record<string, string>> = {
  en,
  zh,
};

// 延迟加载其他语言（fallback 到英文）
async function ensureDict(code: string): Promise<Record<string, string>> {
  if (ALL_DICTS[code]) return ALL_DICTS[code];
  try {
    const mod = await import(`./${code}.ts`);
    ALL_DICTS[code] = mod.default;
  } catch {
    ALL_DICTS[code] = en;
  }
  return ALL_DICTS[code];
}

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

function getDict(code: string): Record<string, string> {
  return ALL_DICTS[code] || ALL_DICTS.en;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Record<string, string>>(en);
  const meta = languages.find((l) => l.code === lang) || languages[0];

  // 同步切换：已加载的语言直接切换，未加载的异步拉取
  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("boaz-lang", newLang);

    const d = getDict(newLang);
    if (d) {
      setDict(d);
    } else {
      // 非中英文首次使用需要异步加载
      ensureDict(newLang).then(setDict);
    }
  }, []);

  // 初始化：读 localStorage，中英文同步，其他异步
  useEffect(() => {
    const saved = localStorage.getItem("boaz-lang") as Lang | null;
    const langToUse = saved || "en";

    const d = getDict(langToUse);
    if (d) {
      setDict(d);
    } else {
      ensureDict(langToUse).then(setDict);
    }
    setLangState(langToUse);
  }, []);

  const t = useCallback(
    (key: string): string => dict[key] || en[key] || key,
    [dict]
  );

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
