# 分析结构和复盘口径

## 输出总览

工具要求 StepFun 视觉模型只输出 JSON，并包含：

- `overall_score`：整体分数。
- `content_summary`：50 字以内内容摘要。
- `key_highlights`：主要亮点。
- `improvement_suggestions`：改进建议。
- `dimensions`：六维拆解。
- `transcript`：最终由 ASR 原文填入，AI 不应二次改写逐字稿。

## 六个维度

### 1. 开头钩子 `hook`

关注：

- 黄金 3 秒是否抓住注意力。
- 是否有结果前置、强反差、问题、悬念、视觉冲击或利益点。
- 开头是否和封面标题承接。

输出字段：

- `score`
- `name`
- `comment`
- `detail.analysis`
- `detail.strengths`
- `detail.weaknesses`
- `detail.golden_seconds`

### 2. 脚本结构 `structure`

关注：

- 是否有清楚的开头、展开、高潮、结尾。
- 是否像 P-A-S、前后对比、步骤清单、测试过程、案例拆解等可复用结构。
- 是否存在中段松散、重复解释或结尾只复述观点的问题。

输出字段：

- `detail.pattern`
- `detail.sections`
- `detail.suggestions`

### 3. 情绪曲线 `emotion`

关注：

- 每 5 到 8 秒是否有信息增量或情绪小高潮。
- 视频是否从好奇、惊喜、共鸣、获得感等情绪里形成起伏。
- 是否有明显低谷。

输出字段：

- `detail.curve`
- `detail.peaks`
- `detail.troughs`
- `detail.avg_level`
- `detail.emotion_types`

### 4. 互动引导 `interaction`

关注：

- 是否自然制造评论区缺口。
- 是否有具体问题、选择题、争议点、求助点或后续教程入口。
- 是否只是机械喊点赞收藏。

输出字段：

- `detail.cta_count`
- `detail.ctas`
- `detail.has_direct_question`
- `detail.has_comment_trigger`
- `detail.has_like_trigger`
- `detail.suggestions`

### 5. 数据预测 `prediction`

关注：

- 这是模型基于结构、节奏、互动引导做的推断，不是真实平台数据。
- 不要把预测值写成已经发生的播放、完播、点赞、收藏结果。

输出字段：

- `detail.predicted_completion`
- `detail.predicted_like_rate`
- `detail.predicted_comment_rate`
- `detail.predicted_save_rate`
- `detail.predicted_share_rate`
- `detail.predicted_virality`
- `detail.reasoning`

### 6. 内容公式 `formula`

关注：

- 这条视频有没有可迁移的内容模板。
- 能不能变成下一条选题、脚本结构、封面标题或系列化内容。

输出字段：

- `detail.formula`
- `detail.elements.opening`
- `detail.elements.development`
- `detail.elements.climax`
- `detail.elements.cta`
- `detail.template`
- `detail.replicable`

## 参考判断标准

源码里的默认参考口径：

- 完播率 >= 70% 是算法推流门槛。
- 互动率 >= 5%。
- 收藏/点赞比值反映内容实用性。
- 每 5 到 8 秒一个小高潮。
- 黄金 3 秒必须抓住注意力。

这些是分析参考，不是所有账号和平台的绝对标准。用于小红书复盘时，要结合品类、粉丝量、笔记形式、发布时间和真实后台数据判断。

## 解读报告时的输出模板

建议按这个结构回复：

```text
一句话判断：
这条最强的是 X，最大风险是 Y。

六维拆解：
1. 开头钩子：分数 + 具体证据 + 可改动作
2. 脚本结构：分数 + 具体证据 + 可改动作
3. 情绪曲线：分数 + 具体证据 + 可改动作
4. 互动引导：分数 + 具体证据 + 可改动作
5. 数据预测：分数 + 仅作为预测的风险说明
6. 内容公式：可复用模板

优先改动：
给 3 条最值得先做的修改，不要泛泛而谈。
```
