// ─── 阶梯价配置 ─────────────────────────────
// 所有百分比折扣基于 base price（含 decoration）
// 统一适用于全站产品

export interface Tier {
  qty: number;
  discount: number;     // 小数, 如 0.08 = 8%
  label: string;
  tag: string | null;   // 销售标签
}

export const PRICING_TIERS: Tier[] = [
  { qty: 50,   discount: 0,     label: "Entry",      tag: null },
  { qty: 200,  discount: 0.08,  label: "Popular",    tag: "Most Popular" },
  { qty: 500,  discount: 0.15,  label: "Best Value", tag: "✨ Best Value" },
  { qty: 1000, discount: 0.25,  label: "Bulk",       tag: "🏆 Best Price" },
];

/** 根据数量获取折扣率 */
export function getDiscount(qty: number): number {
  // 从高到低匹配，超过某档就用该档折扣
  for (let i = PRICING_TIERS.length - 1; i >= 0; i--) {
    if (qty >= PRICING_TIERS[i].qty) return PRICING_TIERS[i].discount;
  }
  return 0;
}

/** 计算单价（含折扣） */
export function unitPrice(basePrice: number, qty: number): number {
  return basePrice * (1 - getDiscount(qty));
}

/** 计算总价 */
export function totalPrice(basePrice: number, qty: number): number {
  return unitPrice(basePrice, qty) * qty;
}

/** 计算相对50件的节省金额 */
export function savings(basePrice: number, qty: number): number {
  const baseTotal = basePrice * 50; // 50件是基准档
  const actualTotal = totalPrice(basePrice, qty);
  // 如果数量不到200，没有节约
  if (qty < 200) return 0;
  return baseTotal - actualTotal;
}

/** 找到当前数量对应的 Tier */
export function currentTier(qty: number): Tier {
  for (let i = PRICING_TIERS.length - 1; i >= 0; i--) {
    if (qty >= PRICING_TIERS[i].qty) return PRICING_TIERS[i];
  }
  return PRICING_TIERS[0];
}

/** 下一档 Tier（用于显示"再订 N 件可省 XX"） */
export function nextTier(qty: number): Tier | null {
  for (const t of PRICING_TIERS) {
    if (t.qty > qty) return t;
  }
  return null;
}
