"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

// ============================================================
// ❓ FAQ 组件（GEO 优化核心）
//
// AI 搜索引擎（ChatGPT、Perplexity）最依赖 FAQ 结构来
// 提取答案。这个组件同时输出 FAQPage Schema。
//
// 使用场景：首页、Why-BOAZ 页面、Contact 页面底部
// ============================================================

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "faq.q1",
    answer: "faq.a1",
  },
  {
    question: "faq.q2",
    answer: "faq.a2",
  },
  {
    question: "faq.q3",
    answer: "faq.a3",
  },
  {
    question: "faq.q4",
    answer: "faq.a4",
  },
  {
    question: "faq.q5",
    answer: "faq.a5",
  },
  {
    question: "faq.q6",
    answer: "faq.a6",
  },
  {
    question: "faq.q7",
    answer: "faq.a7",
  },
  {
    question: "faq.q8",
    answer: "faq.a8",
  },
  {
    question: "faq.q9",
    answer: "faq.a9",
  },
  {
    question: "faq.q10",
    answer: "faq.a10",
  },
];

function FAQItemComponent({ item, index, t }: { item: FAQItem; index: number; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-stone/40"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-body-md font-medium text-charcoal group-hover:text-ink transition-colors pr-8">
          {t(item.question)}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-muted flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-body-md text-muted pb-6 max-w-3xl leading-relaxed">
              {t(item.answer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({
  title,
  subtitle,
  faqs = defaultFaqs,
}: {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}) {
  const { t } = useLang();
  const resolvedTitle = title ?? t("faq.title");
  const resolvedSubtitle = subtitle ?? t("faq.subtitle");

  return (
    <section className="py-24 md:py-32 bg-cream section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">
            {t("faq.sectionLabel")}
          </p>
          <h2 className="text-display-lg font-serif text-charcoal mb-4 text-balance">
            {resolvedTitle}
          </h2>
          <p className="text-body-md text-muted">{resolvedSubtitle}</p>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItemComponent key={i} item={faq} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
