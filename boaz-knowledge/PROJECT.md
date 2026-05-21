# BOAZ 项目知识库
> 最后更新: 2026-05-20

## 📋 总览

| 项目 | 状态 | 域名 |
|------|------|------|
| boazclothes.com | ✅ 已上线 | Netlify → boazclothes.com |
| GitHub 仓库 | ✅ 已推送 | linyixun3170-bit/boazclothes |
| Netlify 部署 | ⚡ 自动(GitHub触发) | 绑定 boazclothes.com |

---

## 🗺️ 站点结构 & 路由

| 路由 | 功能 | 状态 | 说明 |
|------|------|------|------|
| `/` | 首页 | ✅ | Hero + Stats + About + TwoWays + Products + FactoryTour + Testimonials + CTA |
| `/wholesale` | 产品列表 | ✅ | 8 个产品网格，按分类筛选 |
| `/wholesale/[slug]` | 产品详情 | ✅ | SKU色块、尺码表、定制入口 |
| `/custom` | 定制页面 | ✅ | 设计上传、去背景、颜色选择、数量计费 |
| `/contact` | 联系表单 | ✅ | 文件上传、Feishu提交、蜜罐防垃圾 |
| `/why-boaz` | 关于我们 | ✅ | 品牌故事 + 信任信号 |
| `/journal` | 博客列表 | ✅ | 10+ 篇服装批发文章 |
| `/journal/[slug]` | 博客详情 | ✅ | 独立文章页 |

---

## 🖼️ 图片资产管理

### 组织架构
```
public/images/
├── factory/              # 工厂实拍 (50+张)
│   ├── company/          # 公司展厅/办公楼
│   ├── process/          # 生产流程 (染布/裁剪/缝纫/熨烫/仓库/质检)
│   ├── equipment/        # 生产设备 (织布机/缝纫机/裁剪机)
│   └── production-line/  # 生产线记录
├── products/
│   ├── 180g-tee/         # 180g 产品图（已清洁处理）
│   ├── 180g-original/    # 180g 原始版本备份
│   ├── 180g-clean/       # 180g 清洁版中间产物
│   └── vintage/          # 做旧T恤展示
└── videos/               # 工厂视频 (14个)
```

### 180g 图片处理状态
- 原始图: 有中文标签/吊牌/绿色价格签 → 已做清洁
- 处理后: 纯白背景, 去标签, 600x800 统一尺寸
- 备份: 原始版在 `180g-original/`
- **待优化**: 用 API 进一步美化 (等用户发教程)

---

## ✅ 已完成功能 (P0-P1)

### P0 — 不做会丢单
1. ✅ 产品卡片加 MOQ + 交期标签
2. ✅ 联系表单加文件上传 (PNG/JPG/PDF/AI)
3. ✅ 定制页预填产品 (?product=参数)
4. ✅ 客户评价加 Verified Buyer + 评星 + 订单编号

### P1 — 大幅提升转化率
5. ✅ 定制页加数量计算器 + 阶梯价
6. ✅ "Two Ways to Work" 双模式区块
7. ✅ Featured Product 系统 (类型已定义)
8. ✅ 工厂实拍替换占位图 (50+张)
9. ✅ 工艺视频整理 (14个MP4)
10. ✅ 做旧T恤产品图整理 (8色)

---

## 📡 API & 凭证

统一保存在 `CREDENTIALS.md`（权限 600，已加入 .gitignore）

| 服务 | 用途 |
|------|------|
| GitHub Token | git push / API |
| Netlify Token | 部署管理 |
| Hostinger Token | DNS |
| 飞书 App | 消息/文件 API |
| OpenRouter | AI 模型调用（含视觉模型） |
| Google/WordPress 账号 | 后台管理 |
| WhatsApp | 客户联系方式 |

---

## ⏳ 待办事项

- [ ] **lsz.lk666.ai 聚合平台**：用户说有密匙可调用，页面需JS渲染，等用户进一步说明
- [ ] **图片处理 API 教程**：等待用户提供具体调用方式
- [ ] **全产品图片美化**：180g 样板确认后批量处理所有产品
- [ ] **视频处理**：将工厂视频嵌入网站
- [ ] **客户案例收集**：用户发了文件夹但无法直接下载（需要drive权限）
- [ ] **SSL 证书**：之前显示签发中，需确认
- [ ] **多语言**：英文默认 + 中文预留

---

## 🧠 关键决策记录

| 日期 | 决策 | 备注 |
|------|------|------|
| 05-18 | 网站定位: 只做T恤卫衣B2B，不展示皮衣线 | Content Brief |
| 05-18 | 品牌名: Boaz (波阿斯) | 备用 JAPHLOR |
| 05-19 | 域名: boazclothes.com → Netlify | DNS Nameservers 已指向 Netlify |
| 05-20 | Tailwind v4 兼容修复 | globals.css 使用 @import "tailwindcss" |
| 05-20 | GitHub SSH 推送 | HTTPS 不稳定，改用 SSH |
| 05-20 | 凭证统一管理 | CREDENTIALS.md |
