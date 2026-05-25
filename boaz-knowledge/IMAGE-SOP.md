# BOAZ 产品图片上传 SOP
## 适用对象：任何 AI 工具（Kimi / QClaw / Claude 等）
## 版本：v1.0 — 2026-05-25

---

## ⚠️ 核心原则（必须遵守）

1. **不删不改原图** — 只在新目录写入，永不覆盖
2. **命名即身份** — 文件名 = SKU 编码，乱命名 = 页面无法引用
3. **格式统一** — WebP > JPEG > PNG（优先 WebP）
4. **尺寸锁死** — SKU图 800×800，模特图 600×900，尺码表 400×600
5. **每做一步验证上一步** — 不要跳步

---

## 第一步：图片准备

### 命名规则
```
产品品类/SKU号/用途
示例：
wholesale/BOAZ-T001/sku.webp        ← SKU主图
wholesale/BOAZ-T001/model.webp      ← 模特上身图
wholesale/BOAZ-T001/size-chart.webp  ← 尺码表
wholesale/BOAZ-H002/sku.webp        ← 第二个产品
wholesale/BOAZ-H002/model.webp
wholesale/BOAZ-H002/size-chart.webp
```

### 格式要求
| 类型 | 尺寸 | 格式 | 最大体积 | 说明 |
|------|------|------|---------|------|
| SKU图 | 800×800 px | WebP | <200KB | 纯白背景，产品居中 |
| 模特图 | 600×900 px | WebP | <300KB | 竖版全身或半身 |
| 尺码表 | 400×600 px | WebP | <100KB | 简洁表格，无装饰 |

### 处理步骤（用工具完成）
```
原图 → 裁剪/缩放 → 去背景（如需）→ 调色 → 输出WebP
```

---

## 第二步：放到项目目录

### 目标路径
```
项目根目录/public/images/products/品类/SKU号/用途.webp
```

### 实际例子
```
public/images/products/wholesale/BOAZ-T001/sku.webp
public/images/products/wholesale/BOAZ-T001/model.webp
public/images/products/wholesale/BOAZ-T001/size-chart.webp
```

### 验证
```
ls -la public/images/products/wholesale/BOAZ-T001/
应看到 3 个文件
```

---

## 第三步：更新产品页面数据

### 产品数据文件
```
app/data/products.json  (或类似的数据文件)
```

### 找到对应产品条目，更新图片路径
```json
{
  "sku": "BOAZ-T001",
  "name": "180g Heavyweight T-Shirt",
  "price": 8.50,
  "moq": 50,
  "images": {
    "sku": "/images/products/wholesale/BOAZ-T001/sku.webp",
    "model": "/images/products/wholesale/BOAZ-T001/model.webp",
    "sizeChart": "/images/products/wholesale/BOAZ-T001/size-chart.webp"
  },
  "sizes": {
    "S": {"chest": 52, "length": 68},
    "M": {"chest": 54, "length": 70},
    "L": {"chest": 56, "length": 72},
    "XL": {"chest": 58, "length": 74},
    "XXL": {"chest": 60, "length": 76}
  }
}
```

### 验证
```
grep -c "BOAZ-T001" app/data/products.json
应返回 1 条记录
```

---

## 第四步：本地预览验证

```
npm run dev     ← 启动本地服务
```

访问 http://localhost:3000/wholesale
检查产品图片是否正确显示

---

## 第五步：提交部署

```bash
git add public/images/products/wholesale/BOAZ-T001/
git add app/data/products.json  (如果改了)
git commit -m "Add product BOAZ-T001 images"
git push origin main
```

Cloudflare Pages 自动构建，2-3 分钟后线上生效

---

## 🔒 风险控制清单

| 风险 | 预防措施 |
|------|---------|
| 图片覆盖旧文件 | 永远在新目录写，文件名加SKU前缀防冲突 |
| 尺寸不一致 | 处理前 `identify` 确认，处理后 `identify` 再确认 |
| 产品数据写错 | 改 JSON 前备份，字段对照 SKU 表格 |
| 忘记更新数据 | 图片到位后必须同步改 products.json |
| 尺寸表数据错 | 表格内容由你（Richel）提供，AI只做排版和裁切 |

---

## 📋 每批次交付清单

完成一批产品后，AI 应输出：
- [ ] 图片文件清单（路径 × 3 张）
- [ ] products.json 更新内容（只新加不改旧）
- [ ] 本地预览截图
- [ ] git commit hash

你拿到这个清单核对无误后再说"上线"。🦞
