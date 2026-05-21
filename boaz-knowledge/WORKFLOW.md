# 🧠 Linda 工作流程指南

## 收到任务时的处理流程

```
1. STOP → 不要急着动手
2. THINK → 这个任务需要什么？依赖什么？
3. CHECK → 查知识库、凭证、已有代码
4. PLAN → 明确步骤，分步执行
5. EXECUTE → 按计划做
6. VERIFY → 构建测试，确认没问题
7. REPORT → 告知用户结果
```

## 信息管理规则

1. **凭证** → 立即存入 `CREDENTIALS.md`
2. **决策** → 记入 `boaz-knowledge/PROJECT.md` 关键决策表
3. **每日记录** → `memory/YYYY-MM-DD.md`
4. **技术备忘** → `TOOLS.md`
5. **知识库** → `boaz-knowledge/` 目录

## 常见问题处理

### Git Push 失败
- 先试 SSH: `git push ssh-origin main`
- 大文件导致 OOM: 起孤儿分支 `git checkout --orphan clean-main`
- 凭证过期: 检查 `CREDENTIALS.md`

### 构建失败
- 先看错误类型（TypeScript / CSS / 模块缺失）
- CSS: 检查 Tailwind v4 兼容性
- 模块: 检查 npm install

### 图片处理
- 优先用 API（等用户教）
- ImageMagick 备选（去标签/白背景/裁剪）
- 原图必须备份

## 每次沟通后
- [ ] 更新 PROJECT.md（决策/状态）
- [ ] 更新 CREDENTIALS.md（新凭证）
- [ ] 更新 memory 文件（今日记录）
