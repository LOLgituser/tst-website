#!/usr/bin/env python3
"""Generate blog-index.json from markdown files in content/blog/"""
import os, json, re
from datetime import datetime

BLOG_DIR = os.path.join(os.path.dirname(__file__), '..', 'content', 'blog')
OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'blog-index.json')

posts = []
if os.path.isdir(BLOG_DIR):
    for fname in sorted(os.listdir(BLOG_DIR), reverse=True):
        if not fname.endswith('.md'):
            continue
        fpath = os.path.join(BLOG_DIR, fname)
        with open(fpath, 'r') as f:
            raw = f.read()
        
        match = re.match(r'^---\n([\s\S]*?)\n---', raw)
        if not match:
            continue
        
        meta = {}
        for line in match.group(1).split('\n'):
            if ':' in line:
                k, v = line.split(':', 1)
                meta[k.strip()] = v.strip()
        
        posts.append({
            "slug": fname.replace('.md', ''),
            "title": meta.get("title", ""),
            "date": meta.get("date", datetime.now().strftime("%Y-%m-%d")),
            "category": meta.get("category", ""),
            "excerpt": meta.get("excerpt", ""),
            "image": meta.get("image", "")
        })

os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
with open(OUTPUT, 'w') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f"Generated {OUTPUT} with {len(posts)} posts")
