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
→ ImageMagick: 模特图1200², 白底800², 细节图1200², WebP q82
→ 更新 products-catalog.ts（路径+alt文本）→ 构建 → 部署
```

### 缺图清单模板
缺图时以下格式告知用户：
```
| 缺什么 | 需要什么样的 |
|--------|-------------|
| 面料纹理特写 | 微距拍面料表面，白底，1200² |
| 模特背面 | 穿产品背对镜头，白底或简洁背景 |
```

### ImageMagick 命令备忘
```bash
# 模特/细节图 → 1200² 补白 + WebP
convert input.jpg -resize 1200x1200 -background white -gravity center -extent 1200x1200 -quality 82 output.webp

# 白底平铺 → 800² + WebP
convert input.jpg -resize 800x800 -quality 82 output.webp
```

### 风险控制
- 原始文件永远保留在 raw/，不删除
- 未检查中文的图片不上线
- 目录结构必须和 SOP 一致（model/flat/detail/raw）

## OpenCLI（@jackwener/opencli）
- 用途: 任何一个网站或网页都可以变成 CLI 工具，AI 驱动
- 版本: 1.8.0
- 全局安装: npm install -g @jackwener/opencli
- 命令: browser、list、plugin、adapter、doctor 等
