#!/bin/bash
# 创建基线备份 - 在每次修改前运行
# 用法: ./scripts/create-baseline.sh "修改描述"
set -e

DATE=$(date +%Y%m%d_%H%M%S)
DESC="${1:-unnamed-change}"
BRANCH="baseline/backup-${DATE}-${DESC}"

cd /root/.openclaw/workspace

# 确保工作区干净
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️  有未提交的更改，先提交..."
  git add -A
  git commit -m "backup: $DESC ($DATE)"
fi

# 创建备份分支
git branch -f "$BRANCH" HEAD
git tag -f "backup-$DATE" HEAD

echo "✅ 基线已保存"
echo "   分支: $BRANCH"
echo "   标签: backup-$DATE"
echo "   描述: $DESC"
