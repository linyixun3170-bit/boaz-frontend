"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

// ============================================================
// 🛡️ Trust Progress Bar（信任进度指示器）
//
// B2B 心理学核心：降低决策焦虑
// 通过可视化"合作步骤"，让潜在客户感到"这个过程很简单"
//
// 放在 Contact 页面顶部或 CTA 区域效果最佳
// ============================================================

const steps = [
  { label: "Request Quote", desc: "2 minutes", active: true },
  { label: "Get Free Sample", desc: "72hr dispatch", active: false },
  { label: "Approve & Produce", desc: "15-45 days", active: false },
  { label: "Receive & Sell", desc: "Door delivery", active: false },
];

export default function TrustProgress() {
  const [hoveredStep, setHoveredStep] = useState(0);

  return (
    <section className="py-16 md:py-20 bg-offwhite section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-caption uppercase tracking-[0.3em] text-muted mb-2">
            How It Works
          </p>
          <h3 className="text-display-md font-serif text-charcoal text-balance">
            From Quote to <span className="italic">Delivery</span>
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="flex items-center gap-4 flex-1"
              onMouseEnter={() => setHoveredStep(i)}
            >
              <motion.div
                animate={{
                  scale: hoveredStep === i ? 1.1 : 1,
                  backgroundColor:
                    hoveredStep >= i
                      ? "rgba(26, 26, 26, 1)"
                      : "rgba(26, 26, 26, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              >
                {hoveredStep > i ? (
                  <CheckCircle size={20} className="text-cream" />
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      hoveredStep === i ? "text-cream" : "text-charcoal"
                    }`}
                  >
                    {i + 1}
                  </span>
                )}
              </motion.div>

              <div>
                <p className="text-body-sm font-medium text-charcoal">
                  {step.label}
                </p>
                <p className="text-caption text-muted">{step.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <ArrowRight
                  size={16}
                  className="text-stone hidden md:block flex-shrink-0 ml-auto"
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/contact" className="pill-btn-filled">
            Start Step 1 — Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
