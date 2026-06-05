export interface LangMeta {
  code: string;
  name: string;
  native: string;
  flag: string;
  dir?: "ltr" | "rtl";
}

export const languages: LangMeta[] = [
  { code: "en", name: "English", native: "English", flag: "🇺🇸" },
  { code: "zh", name: "Chinese", native: "简体中文", flag: "🇨🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
];
