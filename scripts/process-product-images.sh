#!/bin/bash
# 🖼️ BOAZ 产品图片处理脚本
# 用法: bash scripts/process-product-images.sh <产品slug> <源文件或目录>
#
# 例: bash scripts/process-product-images.sh 240g-vintage-crop ./raw-images
#
# 按 SOP v1.0 标准处理：
#   - 模特图 → 1200×1200 WebP → model/
#   - 白底图 → 800×800 WebP → flat/
#   - 细节图 → 1200×1200 WebP → detail/
#   - 原始文件 → raw/

set -e

SLUG="$1"
SRC="$2"

if [ -z "$SLUG" ] || [ -z "$SRC" ]; then
  echo "用法: $0 <产品slug> <源文件或目录>"
  echo "例: $0 240g-vintage-crop ./raw-images"
  exit 1
fi

PROD_DIR="/root/.openclaw/workspace/public/images/products/$SLUG"
mkdir -p "$PROD_DIR"/{model,flat,detail,raw}

# Step 1: Copy source files to raw/
echo "① 复制原始文件到 raw/..."
if [ -d "$SRC" ]; then
  cp -r "$SRC"/* "$PROD_DIR/raw/"
elif [ -f "$SRC" ]; then
  cp "$SRC" "$PROD_DIR/raw/"
else
  echo "❌ 源路径不存在: $SRC"
  exit 1
fi
echo "   ✅ 原始文件备份到 raw/"

# Step 2: Check for Chinese text in images (manual step - uses OpenRouter)
echo "② 检查中文水印（脚本只提示，需人工确认）..."
echo "   ⚠️  请用 OpenRouter 视觉模型检查 raw/ 目录下的图片是否有中文"
echo "   命令: python3 scripts/check-chinese-text.py $SLUG"
echo ""

# Step 3: Process model images (1200x1200, white padding, WebP)
echo "③ 处理模特图 → 1200×1200 WebP..."
for f in "$PROD_DIR/raw/"*model* "$PROD_DIR/raw/"*front* "$PROD_DIR/raw/"*back* "$PROD_DIR/raw/"*side* "$PROD_DIR/raw/"*angle*; do
  [ -f "$f" ] || continue
  name=$(basename "$f" | sed 's/\.[a-zA-Z]*$//')
  convert "$f" -resize 1200x1200 -background white -gravity center -extent 1200x1200 -quality 82 "$PROD_DIR/model/$name.webp" 2>/dev/null && \
    echo "  ✓ model/$name.webp"
done

# Step 4: Process flat white bg images (800x800, WebP)
echo "④ 处理白底平铺图 → 800×800 WebP..."
for f in "$PROD_DIR/raw/"*flat* "$PROD_DIR/raw/"*white* "$PROD_DIR/raw/"*color* "$PROD_DIR/raw/"*sku* "$PROD_DIR/raw"/*.jpg; do
  [ -f "$f" ] || continue
  # Skip if already processed as model
  name=$(basename "$f" | sed 's/\.[a-zA-Z]*$//')
  # Only process non-model images
  if echo "$name" | grep -qvE 'model|front|back|side|angle'; then
    convert "$f" -resize 800x800 -quality 82 "$PROD_DIR/flat/$name.webp" 2>/dev/null && \
      echo "  ✓ flat/$name.webp"
  fi
done

echo ""
echo "✅ 处理完成！文件位置: $PROD_DIR"
echo "下一步操作："
echo "  1. 检查 model/ 和 flat/ 目录输出是否正确"
echo "  2. 更新 lib/products-catalog.ts 添加产品数据"
echo "  3. 运行 npx next build 测试构建"
echo "  4. 部署到 Cloudflare Pages"