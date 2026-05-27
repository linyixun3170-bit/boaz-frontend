# 网站优化档案
> 每次改动记录 + 效果对比，避免"改丢了好效果"

## 记录规则

1. **每次只改一个页面**：改完确认效果再改下一个
2. **改前截图存证**：记录改动前的页面状态
3. **记录内容**：日期、改了啥、选择改了的文件、效果评估、是否保留
4. **回溯依据**：git commit message + 本档案编号

---

## 改记录

### V1 — 2026-05-21 产品详情页 + 定制页 + 产品列表

**改了什么：**
1. 产品列表页（/wholesale）
   - 抽出 ProductCard 组件
   - 图片 hover 切换：净版 → 定制效果图（用到 `images.mockup` 字段）
   - 新增"净版"hover指示器

2. 产品详情页（/wholesale/[slug]）
   - 尺码从"可选按钮"改为"纯展示标签"
   - 图片区新增"净版/定制"切换按钮 + 缩略图定制预览
   - Customize Now 放大为主按钮 + 图标
   - 底部加交期信息

3. 定制页（/custom）
   - 工艺选择（Screen Print / DTG / Embroidery / Heat Transfer）→ 可选态 + 单价
   - 数量选择（预设按钮 50/100/200/500/1000+ 或手动输入）
   - 阶梯折扣（200+ −8% / 500+ −15% / 1000+ −25%）
   - 实时总价计算 + 报价按钮携带参数

4. 产品数据结构
   - `images` 接口新增可选 `mockup` 字段

**涉及文件：**
- `app/wholesale/page.tsx`
- `app/wholesale/[slug]/ProductDetailClient.tsx`
- `app/custom/page.tsx`
- `lib/products-catalog.ts`

**效果评估：** ✅ 已部署上线（2026-05-21 11:20）
   - 定制页工艺选择+价格计算器 ✔️
   - 产品详情页尺码展示+Customize Now ✔️
   - 产品列表页hover净版→定制效果 ✔️
**状态：** 已上线

**注意：** `images.mockup` 字段已定义，等待 Kimi 出图后补充即可生效

---

### V2 — 2026-05-27 今日六项修复

**改了什么：**
1. **颜色选择器** → 纯色圆圈（去掉缩略图图片，避免无法显示的问题）
2. **图片转 WebP** → 230g 产品全部 .jpg→.webp，体积从 3.2MB→1.4MB
3. **flat 图恢复** → 240g 产品 flat 图从 raw/old-flat/ 恢复到正确位置
4. **图片懒加载** → 所有产品卡片/gallery缩略图加 loading="lazy"
5. **定制页尺码动态** → 根据选中的产品显示对应的尺码表（不再硬编码全部通用尺码）
6. **部署** → 从 GitHub main → Cloudflare Pages 手动部署
7. **SOP 更新 v1.2** → 新增产品交付流程说明

**涉及文件：**
- `app/wholesale/[slug]/ProductDetailClient.tsx`
- `app/wholesale/page.tsx`
- `app/custom/CustomPageInner.tsx`
- `components/Products.tsx`
- `lib/products-catalog.ts`
- `boaz-knowledge/IMAGE-SOP.md`
- 新增 19 个 .webp 文件

**效果评估：** ✅ 已部署上线 boazclothes.com
- 颜色选择纯色圆圈正常显示 ✔️
- 240g 尺码表只显示 S/M/L/XL ✔️
- 定制页尺码按产品动态展示 ✔️
- 图片加载速度优化（WebP + lazy loading）✔️
**状态：** 已上线

---

### V0 — 此前已有效果（5.19-5.20）

**已有的好效果（备注：这些不要改丢）：**
1. 定制页的布局/预览方式（用户反馈"原来的定制页面挺好"）
2. 产品卡片 MOQ + 交期标签
3. 定制页预填产品（?product= 参数）
4. 客户评价 Verified Buyer + 评星 + 订单编号
5. 联系表单文件上传
6. Two Ways to Work 区块
7. Featured Product 系统

---
