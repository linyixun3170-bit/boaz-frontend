# 📐 BOAZ 产品图片 SOP v1.0

> 适用所有新产品。发图过来时，我会按这个标准处理。

---

## 1. 目录结构

每个产品一个文件夹：
```
public/images/products/<产品id>/
├── model-front-1.webp       # 模特正面
├── model-front-2.webp       # 模特正面（角度二）
├── model-back-1.webp        # 模特背面
├── model-side-1.webp        # 模特侧面（可选）
├── flat-white.webp          # 白底平铺 — 每个颜色一张
├── flat-black.webp
├── ...
├── detail-collar.webp       # 领口细节
├── detail-fabric.webp       # 面料纹理特写
├── detail-stitch.webp       # 缝线细节
├── detail-label.webp        # 洗标/领标
├── size-chart.webp          # 尺码表
```

## 2. 每类图标准

| 类型 | 用途 | 最少张数 | 尺寸 | 说明 |
|------|------|---------|------|------|
| **模特正面** | Gallery主图 | 2 | 1200×1200 | 上身正反展示，白色背景或场景干净 |
| **模特背面** | Gallery | 1 | 1200×1200 | B端客户必问"有背面吗" |
| **白底平铺** | SKU色块选择 | 每色1张 | 800×800 | 纯白底，只保留产品轮廓 |
| **领口细节** | 质感展示 | 1 | 1200×1200 | 圆领特写，展示领口做工 |
| **面料特写** | 质感触感 | 1 | 1200×1200 | 微距拍摄，B端客户用来判断手感 |
| **缝线细节** | 做工展示 | 1 | 1200×1200 | 下摆/袖口缝线特写 |
| **洗标/领标** | 标签展示 | 1 | 1200×1200 | 成分/洗护说明 |
| **尺码表** | 尺寸参考 | 1 | 800×600 | 中英文翻译版 |

## 3. 命名规则

```
<产品slug>-<类型>-<序号>.webp
```

- `slug`: 产品唯一标识（例: `240g-vintage-cropped-tee`）
- `类型`: `model-front` / `model-back` / `flat-<颜色名>` / `detail-<部位>` / `size-chart`
- `序号`: 同类多张时用 `-1`, `-2`

例：
```
240g-vintage-model-front-1.webp
240g-vintage-model-back-1.webp
240g-vintage-flat-black.webp
240g-vintage-detail-collar.webp
```

## 4. 格式标准

| 参数 | 标准 |
|------|------|
| 格式 | **WebP**（浏览器兼容性最好） |
| 降级 | 保留 JPG 源文件备查 |
| 品质 | 82% |
| 色彩空间 | sRGB |
| 模特图尺寸 | **1200×1200px**（方形，不足补白） |
| 白底图尺寸 | 800×800px |
| Alt文本 | `BOAZ [产品名] - [颜色] - [角度/用途]` |

## 5. 处理流程

```
① 收到图片（zip/文件夹/飞书文件）
    ↓
② 存 raw/ 原始备份（不改原图，不删）
    ↓
③ 检查中文 → python3 scripts/check-chinese-text.py <slug>
    ↓
④ 翻译（OpenRouter视觉模型）
    ↓
⑤ 批量转 → bash scripts/process-product-images.sh <slug> <源目录>
    ↓
⑥ 手工整理：重命名确认、核对目录
    ↓
⑦ 更新 lib/products-catalog.ts（路径+颜色+Alt文本）
    ↓
⑧ 更新定制页 app/custom/CustomPageInner.tsx（产品列表）
    ↓
⑨ 构建测试 → npx next build
    ↓
⑩ 部署 → wrangler pages deploy out/ --project-name boaz
```

### 处理命令速查

**检查中文：**
```bash
python3 scripts/check-chinese-text.py <产品slug>
```

**批量处理图片：**
```bash
bash scripts/process-product-images.sh <产品slug> <原始图片目录>
```

**添加产品到网站：**
- 编辑 `lib/products-catalog.ts` → 新增产品对象
- 编辑 `app/custom/CustomPageInner.tsx` → 加入产品列表

**构建部署：**
```bash
npx next build && wrangler pages deploy out/ --project-name boaz --branch main --commit-dirty=true
```

**创建基线备份：**
```bash
bash scripts/create-baseline.sh "新加产品: XXX"
```

## 6. 图片依赖关系

```
批发页卡片         → 指向 模特正面-1（裁剪为3:4）
产品详情主图       → 指向 模特正面-1（1200×1200）
Gallery            → 模特正/背/侧 + 细节图切换
颜色选择器         → 白底平铺图（每色一张）
详情区 SKU 网格     → 所有白底平铺图 3×3 排列
详情区 细节展示     → 细节图组（领口/面料/缝线/洗标）
尺码表             → 尺码翻译图
```

## 7. 缺图处理

如果某个产品缺某类图（比如没有面料特写），我会：
- 列出缺图清单
- 描述需要什么角度/内容
- 等你补充后再上线

不做"随便拿张图凑合"的事。
