"use client";

import { PRICING_TIERS, unitPrice, currentTier, nextTier } from "@/lib/pricing-tiers";
import { ChevronRight } from "lucide-react";

interface Props {
  basePrice: number;   // 单件基础价（garment + decoration）
  currentQty: number;  // 当前已选数量
  onSelectQty: (qty: number) => void;
  label?: string;
}

export default function PricingTiers({ basePrice, currentQty, onSelectQty, label = "Quantity Pricing" }: Props) {
  const activeTier = currentTier(currentQty);
  const next = nextTier(currentQty);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] uppercase tracking-wider text-muted">{label}</h3>
        {activeTier.tag && (
          <span className="text-[10px] text-gold font-medium flex items-center gap-1">
            {activeTier.tag}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PRICING_TIERS.map((tier) => {
          const isActive = currentQty >= tier.qty;
          const isCurrentTier = activeTier.qty === tier.qty;
          const perUnit = unitPrice(basePrice, tier.qty);
          const saved = basePrice - perUnit;

          return (
            <button
              key={tier.qty}
              onClick={() => onSelectQty(tier.qty)}
              className={`
                relative rounded-xl border p-3 text-left transition-all duration-200
                ${isCurrentTier
                  ? 'border-gold/60 bg-gold/5 ring-1 ring-gold/30'
                  : isActive
                    ? 'border-green-300 bg-green-50/50'
                    : 'border-stone/40 bg-white hover:border-charcoal/30 hover:shadow-sm'
                }
              `}
            >
              {/* 销售标签 */}
              {tier.tag && (
                <div className={`
                  absolute -top-1.5 right-2 px-2 py-0.5 text-[8px] uppercase tracking-wider rounded-full font-medium
                  ${isCurrentTier
                    ? 'bg-gold text-charcoal'
                    : 'bg-stone/20 text-muted'
                  }
                `}>
                  {tier.tag}
                </div>
              )}

              {/* 数量 */}
              <p className="text-lg font-semibold text-charcoal">{tier.qty.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted/50 mb-2">{tier.label}</p>

              {/* 单价 */}
              <p className="text-sm font-medium text-charcoal">
                ${perUnit.toFixed(2)}
                <span className="text-[10px] font-normal text-muted">/unit</span>
              </p>

              {/* 折扣百分比 + 节省 */}
              {tier.discount > 0 && (
                <div className="mt-1 space-y-0.5">
                  <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] font-medium rounded">
                    −{(tier.discount * 100).toFixed(0)}%
                  </span>
                  {saved > 0 && (
                    <p className="text-[9px] text-green-600">
                      Save ${(saved * tier.qty).toFixed(0)}
                    </p>
                  )}
                </div>
              )}

              {/* 选中高亮指示 */}
              {isCurrentTier && (
                <div className="absolute bottom-1 right-1.5">
                  <span className="text-[9px] text-gold font-medium">✓ Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 下一档提示 */}
      {next && currentQty < next.qty && (
        <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-[11px] text-amber-800 flex items-center gap-1">
            <ChevronRight size={12} className="text-amber-500" />
            Order {next.qty.toLocaleString()}+ pcs to save {(next.discount * 100).toFixed(0)}%
            {' '}— only {next.qty - currentQty} more needed
          </p>
        </div>
      )}
    </div>
  );
}
