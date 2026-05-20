"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Our MOQ starts at 50 pieces per style and color. But we routinely scale — our largest single order was 30,000 pieces. Whether you are testing the market or restocking a bestseller, we meet you where you are.",
  },
  {
    question: "How fast can you produce and ship?",
    answer:
      "Stock + custom orders: 5-day standard turnaround. Rush orders: 3 days when needed. Large-volume custom orders follow contracted timelines. One of our Amazon clients places 4 orders per week, averaging 3,000+ pieces each — and we have never missed a window.",
  },
  {
    question: "Do you offer custom labels, packaging, and branding?",
    answer:
      "Yes — neck labels, hang tags, poly bags, custom boxes, and garment finishing. We also offer three curated package tiers: an entry-level 'traffic builder' set, a balanced 'quality-value' set, and a premium 'high-margin' set. Each tier is transparently priced so you know exactly what you are paying for.",
  },
  {
    question: "What is your price range?",
    answer:
      "Our blank garment prices range from ¥6 for lightweight basic tees to ¥70 for heavyweight premium hoodies. Processing, customization, and logistics are quoted separately — so you see exactly where every dollar goes. No hidden factory real estate costs passed on to you.",
  },
  {
    question: "Can you develop a completely custom garment from a tech pack or sketch?",
    answer:
      "Absolutely. Send us a tech pack, a reference sample, or even a rough sketch. Our pattern team — trained the old way, hand-to-hand — will produce a counter-sample for your approval. From clean basics to vintage washes to full custom builds.",
  },
  {
    question: "Who are your typical clients?",
    answer:
      "Independent DTC brands, Amazon sellers (including top-tier accounts), brick-and-mortar stores, event companies needing team uniforms, training institutions, trading companies, and custom apparel brands. Our patterns are optimized for international body types — clients consistently tell us: 'The fit is exactly right for our foreign customers.'",
  },
  {
    question: "Where are you located?",
    answer:
      "Our online sales team is based in Hangzhou. Our production bases are in Zhejiang and Hebei — strategically located to minimize overhead and maximize speed. We do not charge you for expensive downtown real estate.",
  },
  {
    question: "What makes BOAZ different from other factories?",
    answer:
      "We are not a trading company. We are the production line. Three generations of hands-on manufacturing means we control every stitch, every checkpoint, every delivery window. Clients tell us four things consistently: 'This price for this quality?' 'True source factory.' 'Fast.' 'The fit works for our market.'",
  },
];

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
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
          {item.question}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <p className="text-body-md text-muted pb-6 max-w-3xl leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know before starting.",
  faqs = defaultFaqs,
}: {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}) {
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
            FAQ
          </p>
          <h2 className="text-display-lg font-serif text-charcoal mb-4 text-balance">
            {title}
          </h2>
          <p className="text-body-md text-muted">{subtitle}</p>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItemComponent key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
