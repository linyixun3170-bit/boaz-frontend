#!/bin/sh
# =============================================================
# 每周 workspace 健康检查 (每周一下午2点)
# 用途: 审计加载内容精简 + 代码备份检查 + 项目状态追踪
# =============================================================

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date "+%Y-%m-%d")
SEPARATOR="──────────────────────────────────────────"

echo "📋 Boaz Workspace 每周审计报告 — $DATE"
echo "$SEPARATOR"

# ── 1. Memory 文件审计 ──────────────────────────────────
echo ""
echo "📁 1. 记忆文件状态"
echo "$SEPARATOR"

for f in "$WORKSPACE"/memory/2026-*.md; do
  [ ! -f "$f" ] && continue
  name=$(basename "$f")
  days=$(( ($(date +%s) - $(stat -c %Y "$f")) / 86400 ))
  lines=$(wc -l < "$f")
  if [ "$days" -gt 14 ]; then
    echo "   ⚠️  $name — ${days}天前 ($lines行) → 可归档"
  elif [ "$days" -gt 7 ]; then
    echo "   👀 $name — ${days}天前 ($lines行) → 考虑压缩"
  else
    echo "   ✅ $name — ${days}天前 ($lines行)"
  fi
done

# MEMORY.md 总览
MEM_LINES=$(wc -l < "$WORKSPACE/MEMORY.md")
MEM_SIZE=$(stat -c%s "$WORKSPACE/MEMORY.md")
echo "   📊 MEMORY.md: ${MEM_LINES}行 / ${MEM_SIZE}bytes"

# ── 2. 项目代码与 git 状态 ──────────────────────────────
echo ""
echo "🔧 2. 项目代码状态"
echo "$SEPARATOR"

if [ -d "$WORKSPACE/.git" ]; then
  cd "$WORKSPACE"
  GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null)
  GIT_DIRTY=$(git status --porcelain | wc -l)
  echo "   分支: $GIT_BRANCH | 最新 commit: $GIT_HASH"
  if [ "$GIT_DIRTY" -gt 0 ]; then
    echo "   ⚠️  有 $GIT_DIRTY 个未提交的变更"
    git status --porcelain | head -10
  else
    echo "   ✅ 工作区干净 (无未提交变更)"
  fi
  echo "   最近5次提交:"
  git log --oneline -5 2>/dev/null | sed 's/^/     /'
fi

# ── 3. 构建产物审计 ─────────────────────────────────────
echo ""
echo "📦 3. 构建产物"
echo "$SEPARATOR"

for dir in ".next" "out" "node_modules"; do
  if [ -d "$WORKSPACE/$dir" ]; then
    size=$(du -sh "$WORKSPACE/$dir" 2>/dev/null | cut -f1)
    echo "   $dir → ${size}"
  else
    echo "   $dir → ❌ 不存在"
  fi
done

# temp 目录
for dir in temp-*; do
  if [ -d "$WORKSPACE/$dir" ]; then
    size=$(du -sh "$WORKSPACE/$dir" 2>/dev/null | cut -f1)
    age=$(( ($(date +%s) - $(stat -c %Y "$WORKSPACE/$dir")) / 86400 ))
    echo "   ⚠️  ${dir}/ → ${size} (${age}天前) → 可能可清理"
  fi
done

# 大文件检查 (>50KB)
echo ""
echo "🖼️  4. 大文件 (>50KB, 非代码)"
echo "$SEPARATOR"
find "$WORKSPACE" -maxdepth 1 -type f -size +50k \
  ! -name "*.js" ! -name "*.ts" ! -name "*.json" ! -name "*.css" \
  ! -name "package-lock.json" \
  -exec ls -lh {} \; 2>/dev/null | awk '{print "   " $NF " → " $5}' | sed 's|/root/.openclaw/workspace/||'

# ── 5. 凭证安全检查 ─────────────────────────────────────
echo ""
echo "🔐 5. 凭证安全"
echo "$SEPARATOR"
if [ -f "$WORKSPACE/CREDENTIALS.md" ]; then
  PERM=$(stat -c %a "$WORKSPACE/CREDENTIALS.md")
  if [ "$PERM" = "600" ]; then
    echo "   ✅ CREDENTIALS.md 权限正确 (600)"
  else
    echo "   ⚠️  CREDENTIALS.md 权限异常: $PERM (应为600)"
  fi
  # 检查是否被 git 跟踪
  GIT_TRACKED=$(cd "$WORKSPACE" && git ls-files CREDENTIALS.md)
  if [ -n "$GIT_TRACKED" ]; then
    echo "   ❌ CREDENTIALS.md 被 git 跟踪了!"
  else
    echo "   ✅ CREDENTIALS.md 未被 git 跟踪"
  fi
fi

# ── 6. 独立站优化进度 ──────────────────────────────────
echo ""
echo "🚀 6. 独立站优化进度 (boaz-knowledge)"
echo "$SEPARATOR"
if [ -f "$WORKSPACE/boaz-knowledge/CHANGE_LOG.md" ]; then
  echo "   最近优化记录:"
  grep -E "^## " "$WORKSPACE/boaz-knowledge/CHANGE_LOG.md" | head -10 | sed 's/^/     /'
fi
if [ -f "$WORKSPACE/boaz-knowledge/PROJECT.md" ]; then
  TODO_COUNT=$(grep -c "\[ \]" "$WORKSPACE/boaz-knowledge/PROJECT.md" 2>/dev/null)
  DONE_COUNT=$(grep -c "\[x\]" "$WORKSPACE/boaz-knowledge/PROJECT.md" 2>/dev/null)
  echo "   待办: $TODO_COUNT | 已完成: $DONE_COUNT"
fi

# 检查 Cloudflare 和 Netlify 部署状态
echo ""
echo "🌐 7. 部署状态"
echo "$SEPARATOR"
CF_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.boazclothes.com/ 2>/dev/null)
echo "   www.boazclothes.com → HTTP $CF_STATUS"
NL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://dreamy-biscochitos-7382af.netlify.app/ 2>/dev/null)
echo "   Netlify (旧) → HTTP $NL_STATUS"

# ── 8. 精简建议 ─────────────────────────────────────────
echo ""
echo "🧹 8. 本周精简建议"
echo "$SEPARATOR"

# 建议归档旧日志
OLD_LOGS=$(find "$WORKSPACE/memory" -name "2026-05-1[0-9]*.md" -type f 2>/dev/null | wc -l)
if [ "$OLD_LOGS" -gt 0 ]; then
  echo "   📌 建议将 $OLD_LOGS 个旧日志的核心内容并入 MEMORY.md 后归档"
fi

# 建议删 temp
for dir in temp-*; do
  if [ -d "$WORKSPACE/$dir" ]; then
    age=$(( ($(date +%s) - $(stat -c %Y "$WORKSPACE/$dir")) / 86400 ))
    if [ "$age" -gt 3 ]; then
      echo "   📌 ${dir}/ 已存在 ${age}天，建议清理"
    fi
  fi
done

# 建议清理大图片
BIG_IMGS=$(find "$WORKSPACE" -maxdepth 1 -name "*.png" -o -name "*.jpg" | wc -l)
if [ "$BIG_IMGS" -gt 3 ]; then
  echo "   📌 根目录有 $BIG_IMGS 个大图片文件，建议移入 archive/"
fi

echo ""
echo "$SEPARATOR"
echo "报告生成完毕 ✅ — $DATE"
