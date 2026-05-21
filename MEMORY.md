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
| **boazclothes.com** | ✅ Netlify 部署运行中 | Next.js 16，GitHub → Netlify 自动部署 |
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

## 凭证管理

所有凭证统一存在 CREDENTIALS.md（已 gitignore，权限 600），包括：
- Hostinger / 域名 / WordPress
- Netlify Token
- GitHub
- Google
- OpenRouter API Key

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

- **建站**：Next.js 16 + Tailwind v4 + Netlify
- **部署**：GitHub → Netlify CLI 自动部署
- **社媒**：小红书、TikTok、Instagram
- **开发**：AI 辅助独立开发（OpenRouter API 可用）
- **设计**：商品原图优化 → 顶级品牌感

## 待办（长期）

- [ ] WordPress 独立站（如有需要）
- [ ] 胖胖 IP 形象定稿
- [ ] 原图优化流程标准化
- [ ] 社媒内容日历建立
- [ ] 工厂通讯录录入
- [ ] lsz.lk666.ai 平台接入（需 JS 渲染）
- [ ] 视频嵌入网站
- [ ] 客户案例收集
