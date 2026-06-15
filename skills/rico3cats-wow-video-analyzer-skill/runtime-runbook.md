# 运行和排错手册

## 环境要求

- Node.js 18 或更高版本。
- StepFun API Key。
- 网络可访问 StepFun API。

## 快速启动

```bash
npm install
npm start
```

默认访问地址：

```text
http://localhost:8765
```

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `STEPFUN_API_KEY` | 空 | StepFun API Key。设置后前端可以不填 Key |
| `PORT` | `8765` | 本地服务端口 |
| `STEPFUN_API_BASE` | `https://api.stepfun.com/v1` | StepFun API 地址 |
| `STEPFUN_CHAT_MODEL` | `step-3.7-flash` | 用于视频理解和拆解的模型 |
| `STEPFUN_ASR_MODEL` | `step-asr` | 用于音频转写的模型 |

也可以复制环境变量模板：

```bash
cp .env.example .env
```

然后在 `.env` 中填写：

```bash
STEPFUN_API_KEY=sk-your-stepfun-api-key
```

## 后端处理流程

1. 浏览器上传视频到本地 Express 服务。
2. 服务端将原视频保存到 `uploads/`。
3. FFmpeg 压缩视频到 720p，生成临时 MP4。
4. FFmpeg 从视频提取 MP3 音频。
5. StepFun ASR 生成中文逐字稿。
6. StepFun 视觉模型结合视频和逐字稿生成 JSON 分析结果。
7. 前端渲染评分、图表、逐字稿、拆解详情和内容公式。
8. 临时视频、音频和结果文件会定期清理。

## API 端点

- `GET /api/health`：检查服务、模型名和服务端 API Key 状态。
- `POST /api/upload`：上传视频并启动后台处理。
- `GET /api/result/:id`：轮询某个任务结果。
- `GET /api/results`：列出结果文件。
- `GET /api/probe`：调试 FFmpeg 元数据探测。
- `POST /api/test-asr`：用最近的音频文件测试 ASR。

## 常见问题

### 缺少 API Key

页面填写 StepFun API Key，或在服务端 `.env` 中设置 `STEPFUN_API_KEY`。

### 端口 8765 被占用

可以换端口：

```bash
PORT=8766 npm start
```

也可以结束旧进程后重启。

### 视频压缩失败

优先检查：

- 文件是否为常见视频格式。
- 原视频是否损坏。
- `ffmpeg-static` 是否安装完整。
- `npm install` 是否成功。

### ASR 失败但视频分析继续

源码允许音频提取或转写失败后继续基于画面分析。此时报告可信度会下降，因为缺少真实逐字稿。

### JSON 解析失败

模型返回内容如果不是合法 JSON，后端会报“AI 返回的内容无法解析为 JSON”。可以重试，或降低额外要求的复杂度。

## 部署提醒

本项目默认本地使用。若给团队部署，应补充：

- 登录鉴权。
- 上传大小限制。
- 任务隔离。
- 结果访问权限。
- 服务端 API Key 管理。
- 对 `uploads/` 和 `temp/` 的更严格清理策略。
