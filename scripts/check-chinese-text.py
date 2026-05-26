#!/usr/bin/env python3
"""
检查产品图片中的中文文字
用法: python3 scripts/check-chinese-text.py <产品slug>
"""
import os, sys, base64, json, urllib.request

slug = sys.argv[1] if len(sys.argv) > 1 else ""
if not slug:
    print("用法: python3 check-chinese-text.py <产品slug>")
    sys.exit(1)

img_dir = f"/root/.openclaw/workspace/public/images/products/{slug}/raw"
if not os.path.isdir(img_dir):
    print(f"目录不存在: {img_dir}")
    sys.exit(1)

key = os.environ.get("OPENROUTER_KEY") or ""
if not key:
    print("⚠️  OpenRouter API Key 未设置。先设置环境变量: export OPENROUTER_KEY=sk-or-...")
    print("    或者从 CREDENTIALS.md 获取")
    sys.exit(1)
files = sorted([f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg','.png','.jpeg'))])

print(f"检查 {len(files)} 个文件中的中文文字...\n")

for fname in files:
    fpath = os.path.join(img_dir, fname)
    size = os.path.getsize(fpath)
    if size > 5 * 1024 * 1024:
        print(f"  ⏭️  {fname} ({size//1024}KB) — 太大，跳过")
        continue
    if size == 0:
        print(f"  ⚠️  {fname} (空文件)")
        continue
    
    with open(fpath, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps({
            "model": "qwen/qwen2.5-vl-72b-instruct",
            "messages": [{"role": "user", "content": [
                {"type": "text", "text": "Does this image have Chinese text? Answer YES/NO. If YES, list all Chinese text and translate to English."},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}
            ]}],
            "max_tokens": 200
        }).encode(),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json"
        }
    )
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())
        result = data['choices'][0]['message']['content']
        if result.startswith("YES"):
            print(f"  ❌ {fname}: {result[:300]}")
        else:
            print(f"  ✅ {fname}: 干净")
    except Exception as e:
        print(f"  ❓ {fname}: API 错误 - {e}")

print("\n检查完毕")
