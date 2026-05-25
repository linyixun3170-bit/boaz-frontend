#!/bin/sh
# 每日自动备份脚本 — 23:00 执行
# 只提交有意义的内容变更，跳过系统/构建文件

cd /root/.openclaw/workspace || exit 1

# 检查是否有变更（排除 .dreams 系统文件）
CHANGES=$(git status --porcelain | grep -v "^?? memory/\.dreams" | grep -v "^ M memory/\.dreams" | wc -l)

if [ "$CHANGES" -eq 0 ]; then
  echo "NO_CHANGES"
  exit 0
fi

# 添加文件（排除系统目录）
git add -A
git reset -- memory/.dreams/ 2>/dev/null
git reset -- .openclaw/ 2>/dev/null

# 检查还有没有变更
STILL=$(git status --porcelain | wc -l)
if [ "$STILL" -eq 0 ]; then
  echo "NO_CHANGES"
  exit 0
fi

# 提交并推送
DATE=$(date "+%Y-%m-%d")
git commit -m "Auto backup $DATE"
git push origin main 2>&1

echo "PUSHED"
