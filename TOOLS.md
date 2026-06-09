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

## ⚡ 安全部署流程（强制遵守）
改代码后**必须先运行**以下检查，防止运行时崩溃：
```bash
bash scripts/pre-deploy-check.sh
```
三关：TypeScript 类型检查 → ESLint → 构建验证

配置：
- 构建时跳过检查（`next.config.js` 中 `ignoreDuringBuilds: true`）
- 检查在 `scripts/pre-deploy-check.sh` 中独立执行
- `.eslintrc.json` 已配置
- `tsconfig.json` 已开启 `strict` + `noUnusedLocals`

## API 凭证
- 都存于 CREDENTIALS.md（已 gitignore，权限600）
- OpenRouter: sk-or-v1-3a72… — 可调用视觉模型看图（✅ 2026-05-26更新，已验证可用）
- Cloudflare: cfut_e9Vul…（Pages+DNS+SSL+Zone 全权限）

## 常用路径
- 项目根: /root/.openclaw/workspace/
- 网站代码: app/ components/ lib/ public/
- 知识库: /root/.openclaw/workspace/boaz-knowledge/
- 审计脚本: scripts/weekly-audit.sh
- 备份脚本: scripts/auto-backup.sh

## SSEditor / 视觉模型 prompt
当用户发图片时，调用 OpenRouter 视觉模型描述图片内容，不要再说"模型不支持看图"。

使用方式：
```bash
# base64 编码图片，调视觉模型描述
base64 <图片路径> | tr -d '\n' > /tmp/b64.txt
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $KEY" \
  -d '{"model":"qwen/qwen2.5-vl-72b-instruct","messages":[{"role":"user","content":[{"type":"text","text":"描述这张图片"},{"type":"image_url","image_url":{"url":"data:image/jpeg;base64,..."}}]}]}'
```

✅ OpenRouter Key 已更新（2026-05-26）

## 🖼️ 图片处理 SOP（强制遵守）
- 文件: boaz-knowledge/IMAGE-SOP.md
- 收到任何新产品图片包时，**必须**按 SOP 流程处理，不得跳过
- 每一步都必须执行：备份 → 检查中文 → 翻译 → 重命名 → Resize+WebP → 更新目录 → 构建部署

### 快速对照卡
```
收到图片 → 存 raw/ → 检查中文水印（OpenRouter视觉）→ 翻译 → 重命名
→ ImageMagick resize：模特图1200×1600, 白底800², 细节800², 尺码800×600
→ 全部转 WebP q82
→ 更新 products-catalog.ts（路径+alt文本）→ 更新定制页颜色 → 构建 → 部署
```

### 尺寸表
| 图类型 | 尺寸 |
|--------|------|
| 模特图 | 1536×2752（竖版，不补白） |
| 白底平铺 | 800×800 |
| 细节图 | 800×800 |
| 尺码表 | 800×600 |

### ImageMagick 命令备忘
```bash
# 模特图 → 1536×2752
convert input.jpg -resize 1536x2752 output.webp

# 白底/细节图 → 800²
convert input.jpg -resize 800x800 output.webp

# 尺码表 → 800×600
convert input.jpg -resize 800x600 output.webp

# 统一转 WebP q82
convert input.jpg -quality 82 output.webp
```

### 定制页颜色要求
- 定制页展示每个颜色的正反面
- 目录：`flat/` 放正面 + `flat-back/` 放背面（每色一张）
- 如果只有正面没有背面，仍上线但注明

## OpenCLI（@jackwener/opencli）
- 用途: 任何一个网站或网页都可以变成 CLI 工具，AI 驱动
- 版本: 1.8.0
- 全局安装: npm install -g @jackwener/opencli
- 命令: browser、list、plugin、adapter、doctor 等

## GA4
- Measurement ID: G-4L2NLJ75Z2
- 配置位置: components/Analytics.tsx

## 当前域名
- 主域名: boaz-clothes.com
- 旧域名: boazclothes.com（仍保留）
