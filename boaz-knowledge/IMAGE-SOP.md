# 📐 BOAZ 产品图片 SOP v1.1

> 适用所有新产品。发图过来时，我会按这个标准处理。

---

## 1. 目录结构

每个产品一个文件夹：
```
public/images/products/<产品id>/
├── model/                  # 模特图 1536×2752px
│   ├── model-front-1.webp
│   ├── model-front-2.webp
│   └── model-back-1.webp
├── flat/                   # 白底平铺 800×800px（每色一张正面）
│   ├── flat-white.webp
│   ├── flat-black.webp
│   └── ...
├── flat-back/              # 白底背面（可选，用于定制页颜色预览）
│   ├── flat-back-white.webp
│   └── ...
├── detail/                 # 细节图 800×800px
│   ├── detail-fabric.webp
│   ├── detail-collar.webp
│   ├── detail-stitch.webp
│   ├── detail-label.webp
│   └── size-chart.webp
└── raw/                    # 原始备份（不改原图）
```

## 2. 每类图标准

| 类型 | 用途 | 建议张数 | 尺寸 | 说明 |
|------|------|---------|------|------|
| **模特正面** | Gallery/主图 | 2-3张 | 1536×2752px | 上身正面展示，白底或简洁场景 |
| **模特背面** | Gallery | 1-2张 | 1536×2752px | 上身背面展示 |
| **白底正面** | 颜色选择器/SKU展示 | 每色1张 | 800×800px | 纯白底，产品正面平铺 |
| **白底背面** | 定制页颜色预览 | 每色1张（可选） | 800×800px | 产品背面平铺 |
| **细节图** | 面料/做工/领口/洗标 | 3-5张 | 800×800px | 面料纹理、缝线、领口、水洗标 |
| **尺码表** | 尺寸参考 | 1张 | 800×600px | 中英文翻译版 |

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
240g-vintage-flat-white.webp
240g-vintage-flat-back-white.webp
240g-vintage-detail-fabric.webp
240g-vintage-size-chart.webp
```

## 4. 格式标准

| 参数 | 标准 |
|------|------|
| 格式 | **WebP**（浏览器兼容） |
| 降级 | 保留 JPG 源文件备查 |
| 品质 | 82% |
| 色彩空间 | sRGB |
| 模特图尺寸 | **1536×2752**px（竖版，不补白） |
| 白底图尺寸 | 800×800px（方形） |
| 细节图尺寸 | 800×800px（方形） |
| 尺码表尺寸 | 800×600px |
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
⑤ 分类：
   模特图 → 1536×2752 JPG
   白底正面 → 800×800 WebP
   白底背面 → 800×800 WebP（可选）
   细节图 → 800×800 WebP
   尺码表 → 800×600 WebP
    ↓
⑥ 重命名 → 统一命名规范
    ↓
⑦ 更新 lib/products-catalog.ts（路径+颜色+Alt文本）
    ↓
⑧ 更新定制页 app/custom/CustomPageInner.tsx（产品+颜色列表）
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

**批量处理图片（需确认尺寸）：**
```bash
# 模特图 → 1536×2752，不补白
convert input.jpg -resize 1536x2752 model/model-front-1.jpg

# 白底图 → 800×800 方形
convert input.jpg -resize 800x800 flat/flat-white.webp

# 细节图 → 800×800 方形
convert input.jpg -resize 800x800 detail/detail-fabric.webp

# 尺码表 → 800×600
convert input.jpg -resize 800x600 detail/size-chart.webp

# 最终格式：全部转 WebP quality 82
convert model-front-1.jpg -quality 82 model-front-1.webp
```

**构建部署：**
```bash
npx next build
wrangler pages deploy out/ --project-name boaz --branch main --commit-dirty=true
```

**创建基线备份：**
```bash
bash scripts/create-baseline.sh "新加产品: XXX"
```

## 6. 图片依赖关系

```
批发页卡片         → 模特正面-1（裁剪为3:4）
产品详情主图       → 模特正面-1
Gallery            → 模特正/背 + 细节图切换
颜色选择器         → 白底正面图（每色一张）
定制页颜色预览     → 白底正面图 + 白底背面图（展示正反面）
详情区 SKU 网格     → 所有白底正面图 3×3 排列
详情区 细节展示     → 细节图组
尺码表             → 尺码翻译图
```

## 7. 缺图处理

如果某个产品缺某类图（比如没有面料特写），我会：
- 列出缺图清单
- 描述需要什么角度/内容
- 等你补充后再上线

不做"随便拿张图凑合"的事。
