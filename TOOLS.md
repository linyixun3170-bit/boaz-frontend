# TOOLS.md — 本地备忘录

## 看图限制
当前模型（deepseek/deepseek-v4-flash）不支持直接看图。解决方案：
1. 用 OpenRouter 视觉模型（qwen/qwen2.5-vl-72b-instruct）→ 看图描述
2. 用浏览器截图后通过 API 分析
3. 说明限制

## 部署
- **boaz-frontend** Next.js 项目 (GitHub: linyixun3170-bit/boazclothes)
- **Cloudflare Pages** → boazclothes.com (project: boaz)
- **部署**: Git push to main → Cloudflare Pages 自动构建
- **GitHub推送**: SSH（git@github.com:linyixun3170-bit/boaz-frontend.git）

## API 凭证
- 都存于 CREDENTIALS.md（已 gitignore，权限600）
- OpenRouter: sk-c50…e40b — 可调用视觉模型看图（⚠️ 2026-05-25 检查时 401，可能已失效）
- Cloudflare: cfut_e9Vul…（Pages+DNS+SSL+Zone 全权限）

## 常用路径
- 项目根: /root/.openclaw/workspace/
- 网站代码: app/ components/ lib/ public/
- 知识库: /root/.openclaw/workspace/boaz-knowledge/
- 审计脚本: scripts/weekly-audit.sh
- 备份脚本: scripts/auto-backup.sh

## SSEditor / 视觉模型 prompt
当用户发图片时，调用 OpenRouter 视觉模型描述图片内容，不要再说"模型不支持看图"。

## 图片处理 SOP
- 文件: boaz-knowledge/IMAGE-SOP.md
- 用途: 给 Kimi/QClaw 等外部 AI 用的标准化产品图片上传流程
- 风险控制: 命名即身份、不删原图、每步验证

## OpenCLI（@jackwener/opencli）
- 用途: 任何一个网站或网页都可以变成 CLI 工具，AI 驱动
- 版本: 1.8.0
- 全局安装: npm install -g @jackwener/opencli
- 命令: browser、list、plugin、adapter、doctor 等
