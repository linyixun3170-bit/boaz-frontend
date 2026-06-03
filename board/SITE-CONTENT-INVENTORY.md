# 🏗 BOAZ 独立站内容清单

> 全站图片 + 核心文本一览。在表格里修改后告诉我，我来更新代码。
> 路径基准: `/public/images/` → `src="/images/..."`

---

## 📍 一、导航 / 全局

| 组件 | 内容 | 文件 |
|------|------|------|
| Navbar | Home · Products · Customize · About · Contact | `components/Navbar.tsx` |
| Navbar | Request Quote 按钮 → `/contact/` | 同上 |
| Footer | Company: About/Factory/Quality → `/why-boaz` | `components/Footer.tsx` |
| Footer | Products: T-Shirts/Hoodies/Custom → `/wholesale` `/contact` | 同上 |
| Footer | Support: Contact/FAQ/Shipping | 同上 |
| Footer | Connect: hello@boaz.apparel / WhatsApp +86 188 6879 8631 | 同上 |

---

## 📍 二、首页 (/) — Hero

| 图片路径 | Alt文本 | 文件 |
|-----------|---------|------|
| `/images/factory/process/Dyeingfabric01.jpg` | 布匹染色车间 — Dyeing fabric production line | `lib/images.ts` → `heroImages.background` |

**文本**：
- 标题: "Your Line, Our Craft"
- 副标题: "Premium T-Shirt & Hoodie Manufacturing"
- Tagline: "From $0.85 blanks to $9.90 heavyweight hoodies. Five-day turnaround..."
- CTA: Request a Quote / View Products

---

## 📍 三、首页 — Stats

| 数据 | 说明 | 
|------|------|
| 50+ MOQ | Start small, scale to 30,000 |
| 3-5 Days | Stock + custom dispatch |
| 50-500 Daily | From indie brands to Amazon bulk |
| 100% Transparent | Product + Labor + Logistics = Price |

---

## 📍 四、首页 — About

| 图片路径 | Alt文本 | 文件 |
|-----------|---------|------|
| `/images/factory/company/showroom2.jpg` | Boaz 公司展厅 — Showroom display | `lib/images.ts` → `aboutImages.factoryPortrait` |

**文本**：品牌故事三段 + 认证 (OEKO-TEX / BSCI / ISO 9001)

---

## 📍 五、首页 — Two Ways to Work

| 图片路径 | Alt文本 | 文件 |
|-----------|---------|------|
| `/images/factory/process/warehouse02.jpg` | Stock blanks — ready to ship | `components/TwoWaysSection.tsx` |
| `/images/factory/production-line/sewing01.jpg` | Custom manufacturing | 同上 |

**文本**：Stock Blanks / Custom Build 两块介绍

---

## 📍 六、首页 — Products (Core Collection)

首页展示 7 个精选产品，其中 6 个用 **Unsplash 占位图**（需要替换成真实产品图）：

| # | 产品名 | 当前图片 | 类型 | 文件 |
|---|--------|---------|------|------|
| 1 | XJ-78000 Drop Shoulder Tee | `/images/products/XJ-78000/XJ-78000-04.jpg` | 真实图 ✅ | `lib/images.ts` → `productImages.XJ78000` |
| 2 | Classic Heavyweight Tee | 🔴 `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab` | 占位图 ⚠️ | `productImages.heavyweightTee` |
| 3 | Premium Oversized Hoodie | 🔴 `https://images.unsplash.com/photo-1556821840-3a63f95609a7` | 占位图 ⚠️ | `productImages.oversizedHoodie` |
| 4 | Vintage Washed Tee | 🔴 `https://images.unsplash.com/photo-1583743814966-8936f5b7be1a` | 占位图 ⚠️ | `productImages.vintageWashedTee` |
| 5 | French Terry Crewneck | 🔴 `https://images.unsplash.com/photo-1578768079052-aa76e52ff62e` | 占位图 ⚠️ | `productImages.crewneck` |
| 6 | Long Sleeve Base Layer | 🔴 `https://images.unsplash.com/photo-1618354691373-d851c5c3a990` | 占位图 ⚠️ | `productImages.longSleeve` |
| 7 | Crop Boxy Tee | 🔴 `https://images.unsplash.com/photo-1503342217505-b0a15ec3261c` | 占位图 ⚠️ | `productImages.cropBoxyTee` |

---

## 📍 七、首页 — Customer Cases

13 张客户案例图（滚动画廊）：

| 编号 | 图片路径 | 说明 |
|------|---------|------|
| 1 | `/images/customer_cases/screen-01.webp` | 丝印定制T恤 |
| 2 | `/images/customer_cases/screen-02.webp` | 丝印定制卫衣 |
| 3 | `/images/customer_cases/screen-03.webp` | 丝印定制T恤细节 |
| 4 | `/images/customer_cases/screen-04.webp` | 丝印定制卫衣正面 |
| 5 | `/images/customer_cases/embroidery-05.webp` | 刺绣定制Polo衫 |
| 6 | `/images/customer_cases/embroidery-06.webp` | 刺绣定制Polo衫背面 |
| 7 | `/images/customer_cases/embroidery-07.webp` | 刺绣定制帽子 |
| 8 | `/images/customer_cases/embroidery-08.webp` | 刺绣定制T恤 |
| 9 | `/images/customer_cases/dtg-09.webp` | 数码直喷定制T恤 |
| 10 | `/images/customer_cases/dtg-10.webp` | 数码直喷定制卫衣 |
| 11 | `/images/customer_cases/dtg-11.webp` | 数码直喷定制T恤细节 |
| 12 | `/images/customer_cases/dtg-12.webp` | 数码直喷定制卫衣细节 |
| 13 | `/images/customer_cases/dtg-13.webp` | 数码直喷全彩印花 |

---

## 📍 八、首页 — Factory Tour

| 布局 | 图片路径 | Alt文本 | 文件 |
|------|---------|---------|------|
| 大图(7col) | `/images/factory/process/Dyeingfabric01.jpg` | 染布车间 | `lib/images.ts` → `factoryImages.fabricInspection` |
| 右上(5col) | `/images/factory/production-line/cutting01.jpg` | 裁剪车间 | `factoryImages.cuttingStation` |
| 右下(5col) | `/images/factory/process/Qualityinspection01.jpg` | 品质检验 | `factoryImages.qualityControl` |
| 底部宽图 | `/images/factory/process/warehouse01.jpg` | 仓库出货 | `factoryImages.packaging` |

---

## 📍 九、产品目录（/wholesale）

全部 8 个产品，数据源：`lib/products-catalog.ts`

### 1️⃣ 230gsm Washed Vintage T-Shirt (`230g-washed-tee`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `230g-washed-vintage` |
| Category | T-Shirts |
| Weight / Fabric | 230gsm / 100% Cotton (washed) |
| Fit | Cropped / Relaxed |
| MOQ | 50 |
| Price | From $3.50/unit (FOB) |
| Sizes | S, M, L, XL |
| Tags | Washed, Vintage, Cropped, 6 Colors |

**颜色 (6色)**：Coffee / Apricot / Gray / Rose Red / Purple / Black
- 每色正面图：`/images/products/230g-washed-tee/sku/sku-{color}.webp`
- 每色背面图：`/images/products/230g-washed-tee/sku/sku-{color}-back.webp`

**模特图 (6张)**：
| 路径 | 说明 |
|------|------|
| `/images/products/230g-washed-tee/model/image_1769589181363.webp` | 主图 |
| `/images/products/230g-washed-tee/model/image_1769589188377.webp` | 模特 |
| `/images/products/230g-washed-tee/model/image_1769589194627.webp` | 模特 |
| `/images/products/230g-washed-tee/model/image_1770175509572.webp` | 模特 |
| `/images/products/230g-washed-tee/model/image_1769589802127_副本_副本.webp` | 模特 |
| `/images/products/230g-washed-tee/model/image_1769648788396.webp` | 模特 |
| `/images/products/230g-washed-tee/size-chart/size-chart.webp` | 尺码图 |

---

### 2️⃣ 240gsm Vintage Washed Cropped T-Shirt (`240g-vintage-crop`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `240g-vintage-washed-cropped-tee` |
| Category | T-Shirts |
| Price | From $3.80/unit (FOB Ningbo) |
| MOQ | 50 |
| Sizes | S, M, L, XL |
| Tags | New, Cropped, Vintage Wash, Women's, 9 Colors |

**颜色 (9色)**：White / Black / Charcoal / Army Green / Brick Red / Sage / Cream / Light Blue / Pink
- 正面图：`/images/products/240g-vintage-crop/flat/flat-{color}.webp`
- 背面无

**模特图 (5张 + 尺码图)**：
| 路径 |
|------|
| `/images/products/240g-vintage-crop/model/model-gray-front.webp` |
| `/images/products/240g-vintage-crop/model/model-beige-angle.webp` |
| `/images/products/240g-vintage-crop/model/model-darkgray-front.webp` |
| `/images/products/240g-vintage-crop/model/model-olive-front.webp` |
| `/images/products/240g-vintage-crop/model/model-store-display.webp` |
| `/images/products/240g-vintage-crop/detail/size-chart.webp` |

**细节图 (4张)**：
| 路径 |
|------|
| `/images/products/240g-vintage-crop/detail/detail-collar.webp` |
| `/images/products/240g-vintage-crop/detail/detail-colors.webp` |
| `/images/products/240g-vintage-crop/detail/detail-fabric.webp` |
| `/images/products/240g-vintage-crop/detail/detail-stitch.webp` |

---

### 3️⃣ 230gsm Drop Shoulder T-Shirt (`cl-230g-drop-shoulder`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `cl-230g-drop-shoulder` |
| Price | TBD |
| MOQ | 50 |
| Sizes | S-5XL (8个尺码) |
| Tags | New, Drop Shoulder, Vintage Wash, 230gsm, Unisex |

**颜色 (9色)**：Rose Red / Washed Gray / Army Green / Blue / Washed Black / Grass Green / Purple / Coffee / Orange
- 每色正面+背面：`/images/products/cl-230g-drop-shoulder/sku/sku-{color}.webp` + `sku-{color}-back.webp`

**模特图 (6张)**：
| 路径 |
|------|
| `/images/products/cl-230g-drop-shoulder/model/275329452_0.webp` |
| `/images/products/cl-230g-drop-shoulder/model/68287271084.webp` |
| `/images/products/cl-230g-drop-shoulder/model/5019055_0.webp` |
| `/images/products/cl-230g-drop-shoulder/model/0G3A2169.webp` |
| `/images/products/cl-230g-drop-shoulder/model/0G3A2173.webp` |
| `/images/products/cl-230g-drop-shoulder/model/0G3A2175.webp` |
| `/images/products/cl-230g-drop-shoulder/size-chart/size-chart.webp` |

---

### 4️⃣ 180gsm Euro Fit T-Shirt (`cl-180g-euro`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `cl-180g-euro` |
| Price | TBD |
| MOQ | 50 |
| Sizes | S-3XL (6个尺码) |
| Tags | New, Euro Fit, Lightweight, 180gsm |

**颜色 (5色)**：White / Black / Gray / Red / Apricot
- 每色正背面：`/images/products/cl-180g-euro/sku/sku-{color}.webp` + `sku-{color}-back.webp`

**模特图 (5张)**：
| 路径 |
|------|
| `/images/products/cl-180g-euro/model/image_1770171830502.webp` |
| `/images/products/cl-180g-euro/model/image_1770171844271.webp` |
| `/images/products/cl-180g-euro/model/image_1770171867062.webp` |
| `/images/products/cl-180g-euro/model/image_1770177577465.webp` |
| `/images/products/cl-180g-euro/model/usa-tee-4.webp` |
| `/images/products/cl-180g-euro/size-chart/size-chart.webp` |

---

### 5️⃣ 180gsm Basic T-Shirt (`cl-180g-basic`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `cl-180g-basic` |
| Price | TBD |
| MOQ | 50 |
| Sizes | S-5XL (8个尺码) |
| Tags | New, Basic, Lightweight, 180gsm, 10 Colors |

**颜色 (10色)**：White / Black / Dark Gray / Heather Gray / Army Green / Red / Royal Blue / Navy / Sand / Light Pink
- ⚠️ 只有正面图，无背面图
- 路径：`/images/products/cl-180g-basic/sku/sku-{color}.webp`

**模特图 (7张)**：
| 路径 |
|------|
| `/images/products/cl-180g-basic/model/white-front.webp` |
| `/images/products/cl-180g-basic/model/heather-gray.webp` |
| `/images/products/cl-180g-basic/model/royal-blue.webp` |
| `/images/products/cl-180g-basic/model/light-pink.webp` |
| `/images/products/cl-180g-basic/model/dark-gray.webp` |
| `/images/products/cl-180g-basic/model/detail.webp` |
| `/images/products/cl-180g-basic/size-chart/size-chart.webp` |

---

### 6️⃣ 230gsm Vintage Tank Top (`cl-230g-tanktop`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `cl-230g-tanktop` |
| Category | Tank Tops |
| Price | TBD |
| MOQ | 50 |
| Sizes | S-2XL (5个尺码) |
| Tags | New, Tank Top, Sleeveless, Vintage Wash, 230gsm |

**颜色 (5色)**：Army Green / Coffee / Apricot / Gray / Rose Red
- 每色正背面图：`/images/products/cl-230g-tanktop/sku/sku-{color}.webp` + `sku-{color}-back.webp`

**模特图 (8张)**：8 张 model 图

---

### 7️⃣ 320gsm Double-Yarn T-Shirt (`wx-320g-tee`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `wx-320g-tee` |
| Price | TBD |
| MOQ | 50 |
| Sizes | XS-XXL (6个尺码) |
| Tags | New, Heavyweight, Double-Yarn, 320gsm |

**颜色 (8色)**：⚠️ 颜色名暂为 Color 1-8（待确认）
- 每色正背面：`/images/products/wx-320g-tee/sku/sku-color-{n}.webp` + `sku-color-{n}-back.webp`

**模特图 (9张 + 尺码图)**

---

### 8️⃣ 280gsm Gradient Distressed Set (`xc-280g-gradient-set`)

**参数**：
| 项目 | 值 |
|------|-----|
| Slug | `xc-280g-gradient-set` |
| Price | From $8.50/set (FOB Ningbo) |
| MOQ | 50 |
| Sizes | S-2XL (5个尺码) |
| Tags | Gradient, Distressed, Oversized, Set, 4 Colors |

**颜色 (4色)**：Coffee / Gray / Purple / Black
- T恤正背面 + 短裤正背面共 16 张图

**模特图 (8张 + 4张短裤展示 + 尺码图)**

---

## 📍 十、Custom 定制页

复用产品目录中的颜色数据（`CustomPageInner.tsx`），包含全部 8 个产品的颜色选择器。

**装饰方法**：
| 方法 | 单价 | 备注 |
|------|------|------|
| Screen Print | +$1.50/pc | Popular, 50+ MOQ |
| DTG | +$3.00/pc | 1+ 起订 |
| Embroidery | +$2.50/pc | Premium, 50+ MOQ |
| Heat Transfer | +$2.00/pc | 25+ MOQ |

---

## 📍 十一、Why BOAZ (/why-boaz)

**UGC 网格 (4张)**：
| 图片路径 | Alt文本 |
|-----------|---------|
| `/images/factory/process/Exhibitionhall01.jpg` | Boaz 展厅 |
| `/images/factory/company/showroom4.jpg` | 公司展厅 |
| `/images/factory/process/sewing01.jpg` | 缝纫车间 |
| `/images/factory/equipment/loom03.jpg` | 织布设备 |

**核心文本**：
- Trust Signals × 4 块（直接工厂、3阶段质检、认证、透明定价）
- 物流 × 3 块（海运/空运/快递）
- Sample Policy
- 4步生产流程

---

## 📍 十二、Contact 页

| 内容 | 说明 |
|------|------|
| 联系表单 | Name/Email/Company/Phone/WeChat/Inquiry Type/Qty/Message |
| 联系信息 | Email: hello@boaz.apparel / WhatsApp: +86 188 6879 8631 (Andrew) / WeChat: Richel |
| QR码 (footer?) | `/images/wechat-richel-qr.png` + `/images/whatsapp-andrew-qr.png` |

---

## 📍 十三、其他图片素材（未用 / 历史保留）

### Vintage 展示图 (`lib/images.ts` → `vintageImages`)
| 路径 | 说明 |
|------|------|
| `/images/products/vintage/vintage-coffee.jpg` | 咖啡色 |
| `/images/products/vintage/vintage-dark-green.jpg` | 墨绿色 |
| `/images/products/vintage/vintage-sky-blue.jpg` | 天蓝色 |
| `/images/products/vintage/vintage-apricot.jpg` | 杏色 |
| `/images/products/vintage/vintage-peach.jpg` | 桃红色 |
| `/images/products/vintage/vintage-gray.jpg` | 灰色 |
| `/images/products/vintage/vintage-purple.jpg` | 紫色 |
| `/images/products/vintage/vintage-green.jpg` | 绿色 |

### 工厂补充
| 路径 | 说明 |
|------|------|
| `/images/factory/company/factory-building.jpg` | 工厂园区 |
| `/images/factory/company/showroom1-5.jpg` | 展厅 | 
| `/images/factory/equipment/` (10张) | 设备图 |
| `/images/factory/process/` (28张) | 流程工艺图 |
| `/images/factory/production-line/` (13张) | 生产线图 |

### 视频素材
| 路径 | 说明 |
|------|------|
| `/images/videos/custom-orders-queue.mp4` | 定制订单队列 |
| `/images/videos/embroidery-01~04.mp4` × 4 | 刺绣 |
| `/images/videos/screen-printing.mp4` + `screen-printing-02.mp4` | 丝印 |
| `/images/videos/digital-printing.mp4` | 数码印花 |
| 还有 cutting / ironing / packaging / warehouse 等 | |

### 历史产品（已搬新目录但旧图还在）
- `180g-tee/` / `180g-original/` / `180g-tee-processed/`
- `180g-clean/`
- `210g-kids-tee/`（儿童款）
- `220g-heavy-tee/`
- `260g-heavy-tee/`
- `280g-heavy-tee/`
- `360g-crewneck/`
- `XJ-78000/`
- `colorblock-longsleeve/`

---

## ⚠️ 待办事项

| # | 内容 | 优先级 | 文件 |
|---|------|--------|------|
| 1 | **6 张 Unsplash 占位图待替换**为真实产品图 | 🔴 高 | `lib/images.ts` → `productImages.*` |
| 2 | **wx-320g-tee** 的 8 个颜色名 + hex 值待确认 | 🔴 高 | `lib/products-catalog.ts` |
| 3 | cl-180g-basic 缺背面图 | 🟡 中 | 同上 |
| 4 | 产品名称（cl-180g-euro、cl-180g-basic 标记 ⚠️ 待确认） | 🟡 中 | 同上 |
| 5 | 多个产品 priceFOB 为 "TBD" 待补 | 🟡 中 | 同上 |
| 6 | 240g-vintage-crop 的 size chart cm 值为约数 | 🔴 高 | 同上 |

---

## 🔧 修改指南

**换图片：** 告诉我"把 XX 位置的图换成 YY 路径"，我来改代码。
**加产品：** 给我产品参数（名/重量/面料/颜色/价格/图片路径），我加到 `products-catalog.ts`。
**改文本：** 直接说"改 XX 段的文字为 YYY"，我来改对应的组件或数据文件。
