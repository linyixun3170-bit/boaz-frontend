# TOOLS.md — 本地备忘录

## 看图限制
当前模型（deepseek/deepseek-v4-flash）不支持直接看图。解决方案：
1. 用 OpenRouter 视觉模型（qwen/qwen2.5-vl-72b-instruct）→ 看图描述
2. 用浏览器截图后通过 API 分析
3. 说明限制

## 部署
- **boaz-frontend** Next.js 项目 (GitHub: linyixun3170-bit/boazclothes)
- **Netlify** → boazclothes.com (site: dreamy-biscochitos-7382af)
- **部署命令**: 
  ```
  # 静态导出模式
  # 1. 设置 next.config.js: output: 'export', images: { unoptimized: true }
  # 2. npm run build
  # 3. NETFLIFY_AUTH_TOKEN="xxx" npx netlify-cli deploy --prod --auth $TOKEN --site dreamy-biscochitos-7382af --dir out
  # 4. 完后记得把 next.config.js 改回正常模式
  ```
- **GitHub推送**: SSH 比 HTTPS 稳定（git@github.com:linyixun3170-bit/boazclothes.git）

## API 凭证
- 都存于 CREDENTIALS.md（已 gitignore，权限600）
- OpenRouter: sk-c50e... — 可调用视觉模型看图

## 常用路径
- 项目根: /root/.openclaw/workspace/boaz-frontend/
- 产品图片: public/images/products/
- 工厂图片: public/images/factory/
- 知识库: /root/.openclaw/workspace/boaz-knowledge/

## SSEditor / 视觉模型 prompt
当用户发图片时，调用 OpenRouter 视觉模型描述图片内容，不要再说"模型不支持看图"。
