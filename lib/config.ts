// ─── 全站功能开关 ──────────────────────────────
// 所有 feature toggle 统一管理
// 改这里一处即可控制全站

export const SITE_CONFIG = {
  /** 是否显示价格。false 时所有 $ 相关 UI 隐藏，显示"Contact for Pricing" */
  showPricing: false,

  /** 隐藏价格时显示的替代文本 */
  pricingPlaceholder: "Contact for Pricing",
} as const;
