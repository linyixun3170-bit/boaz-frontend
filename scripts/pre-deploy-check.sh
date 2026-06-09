#!/bin/sh
# ⚡ 部署前检查脚本
# 每次 commit + push 前跑一遍：
#   bash scripts/pre-deploy-check.sh
# 如果输出全是 ✅，可以放心部署
# 如果有 ❌，先修再推

set -e

echo ""
echo "═══════════════════════════════════════════"
echo "  🔍  Pre-Deploy Check"
echo "═══════════════════════════════════════════"
echo ""

fail=0

# ─── 1. TypeScript 类型检查 ───
echo "── 1/4 TypeScript type check ──"
if npx tsc --noEmit 2>/dev/null; then
  echo "  ✅ TypeScript: no errors"
else
  echo "  ❌ TypeScript: errors found — fix before deploy"
  npx tsc --noEmit 2>&1 | tail -20
  fail=1
fi
echo ""

# ─── 2. ESLint ─── (handled by Next.js during build)
echo "── 2/4 ESLint check ──"
echo "  ℹ️  ESLint runs during Next.js build; checked in build step below"
echo ""

# ─── 3. 构建测试 ───
echo "── 3/4 Build test ──"
if npx next build 2>&1; then
  echo "  ✅ Build: successful"
else
  echo "  ❌ Build: failed"
  fail=1
fi
echo ""

# ─── 4. Git 状态 ───
echo "── 4/4 Git status ──"
git status --porcelain | head -10

echo ""
if [ "$fail" -eq 0 ]; then
  echo "═══════════════════════════════════════════"
  echo "  ✅  All checks passed — safe to deploy!"
  echo "═══════════════════════════════════════════"
else
  echo "═══════════════════════════════════════════"
  echo "  ❌  Some checks failed — fix before push"
  echo "═══════════════════════════════════════════"
  exit 1
fi
