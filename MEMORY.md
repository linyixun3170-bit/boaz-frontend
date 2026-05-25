# MEMORY.md — 长期记忆

_人工 curated，只放重要的。_

## 用户偏好

- 讨厌废话、过度包装、AI 腔（"说白了""值得一提的是"等）
- 重视第一性原理，反感经验主义
- 先给结论再展开，有判断就给判断
- 默认"你"，正式场合"您"
- 和女儿相关的内容适合 11 岁理解但不幼稚

## 项目状态

| 项目 | 状态 | 备注 |
|------|------|------|
| **boazclothes.com** | ✅ Cloudflare Pages 运行中 | Next.js 16，GitHub → CF Pages 自动部署，DNS已切Cloudflare |
| **胖胖 IP** | 形象设计中 | 和 11 岁女儿共创 |
| **AI 辅助工具** | 开发中 | 原图优化、素材生成、独立站 AI 功能 |
| **社媒内容** | 持续产出 | 小红书图文、TikTok 视频 |
| **知识库** | ✅ boaz-knowledge/ 已建 | 含 PROJECT.md、WORKFLOW.md |

## 关键决策

- 2026-05-18：放弃 GitHub Pages → 改用 Netlify 部署
- 2026-05-19：域名 DNS 切到 Netlify，SSL 签发中
- 2026-05-20：建立知识库 + 凭证统一管理（CREDENTIALS.md，权限 600，gitignore）
- 2026-05-20：Tailwind v4 构建修复
- 2026-05-21：建立三层记忆系统
- 2026-05-25：从 Netlify 迁移到 Cloudflare Pages 完成
- 2026-05-25：DNS 切换至 Cloudflare（chuck/emely.ns.cloudflare.com）
- 2026-05-25：Cloudflare API Token 已配置（Pages+DNS+SSL+Zone 全权限）
- 2026-05-25：workspace 精简（删IDENTITY.md/temp/旧截图/旧文件）
- 2026-05-25：设置每周一14:00自动审计（cron job）

## 凭证管理

所有凭证统一存在 CREDENTIALS.md（已 gitignore，权限 600），包括：
- Hostinger / 域名
- Netlify Token（可能弃用）
- GitHub
- Google / Search Console
- OpenRouter API Key
- Cloudflare API Token（Pages+DNS+SSL+Zone 全权限）
- Cloudflare Account ID: 9450ced919248d081e1a52db0b31b748

## 已完成的功能优化

- 产品卡片 MOQ + 交期标签
- 联系表单文件上传（PNG/JPG/PDF/AI，3个10MB）
- 定制页预填产品（?product= 参数）
- 客户评价 Verified Buyer + 评星 + 订单编号
- 定制页数量计算器 + 阶梯价（200+ −8%, 500+ −15%, 1000+ −25%）
- Two Ways to Work 首页区块
- Featured Product 系统
- 工厂图片压缩处理（50+张）
- 180g 产品图片清洁

## 重要联系人/工厂

_待补充_

## 技能与工具

- **建站**：Next.js 16 + Tailwind v4 + Cloudflare Pages
- **部署**：GitHub → Cloudflare Pages 自动构建
- **社媒**：小红书、TikTok、Instagram
- **开发**：AI 辅助独立开发（OpenRouter API 可用）
- **设计**：商品原图优化 → 顶级品牌感
- **域名**：Cloudflare DNS + SSL（Free plan）

## 待办（长期）

- [ ] 胖胖 IP 形象定稿
- [ ] 原图优化流程标准化
- [ ] 社媒内容日历建立
- [ ] 工厂通讯录录入
- [ ] lsz.lk666.ai 平台接入（需 JS 渲染）
- [ ] 视频嵌入网站
- [ ] 客户案例收集
- [ ] 等 Cloudflare zone 激活后配 apex 域名绑定 Pages
- [ ] 试用 opencli 做浏览器自动化/数据扒取
- [ ] 修复 OpenRouter API Key（已 401）或换方案
