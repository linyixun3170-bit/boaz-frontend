/**
 * 尺码表工具函数
 * 
 * 数据存 cm，自动换算 inch 展示双列
 */

/** 厘米 → 英寸，保留一位小数 */
export function cmToInch(cm: string | number): string {
  const num = typeof cm === "string" ? parseFloat(cm) : cm;
  return (num / 2.54).toFixed(1);
}

/** 英寸 → 厘米，保留一位小数 */
export function inchToCm(inch: string | number): string {
  const num = typeof inch === "string" ? parseFloat(inch) : inch;
  return (num * 2.54).toFixed(1);
}

/** 尺寸表条目：label + 每个尺码的 cm 值 */
export interface SizeChartEntry {
  label: string;       // e.g. "Bust", "Length", "Shoulder"
  valuesCm: Record<string, string>; // e.g. { "S": "55.1", "M": "56.9", ... }
}

/** 生成表格需要的行数据（含 cm + inch） */
export function buildSizeTable(entry: SizeChartEntry, allSizes: string[]) {
  return {
    label: entry.label,
    cm: allSizes.map(s => entry.valuesCm[s] || "-"),
    inch: allSizes.map(s => {
      const v = entry.valuesCm[s];
      return v ? cmToInch(v) : "-";
    }),
  };
}
