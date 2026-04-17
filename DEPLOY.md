# SEALIGHT Homepage v03 — 部署与协作指南

> 纯静态测试前端 · HTML/CSS/JS · Vercel 部署 · 与 sealight-led.com 完全隔离 · 零风险

---

## 📁 文件结构

```
sealight-homepage/
├── index.html              ← 主页（canonical entry, Vercel 会直接加载它）
├── vercel.json             ← 部署配置（clean URLs + 缓存策略 + 安全头）
├── css/
│   ├── style.css           ← 主样式 + v03 Refinement Layer（DJI/Apple 风格微调）
│   └── responsive.css      ← 响应式断点
├── js/
│   └── main.js             ← 交互 / Fitment / 动画 / 视差 / 磁吸按钮
├── assets/
│   ├── favicon.svg         ← 浏览器 Tab 图标
│   └── og-preview.svg      ← 社交分享卡片图（1200×630）
├── SEALIGHT_v03_内部预览说明.docx   ← 发给同事的说明文档
├── DEPLOY.md               ← 本文件
└── (其他归档：Demo_v3.html, 方案 docx/pdf 等)
```

---

## 🚀 本地预览

```bash
cd sealight-homepage
python3 -m http.server 8080
# 打开 http://localhost:8080
```

---

## ☁️ Vercel 部署（完整流程）

### 一、首次连接

1. GitHub 仓库已就绪：`github.com/Oscar235711/sealight-homepage`
2. 访问 [vercel.com](https://vercel.com) → 用 GitHub 登录
3. **New Project → Import** → 选中 `sealight-homepage`
4. Framework Preset: **Other**（静态站点），构建命令留空
5. Deploy

### 二、关键：关闭 Deployment Protection（必做）

> **问题背景**：Vercel 的 Hobby 计划对 preview 部署默认开启 Vercel Authentication，同事打开链接时会被重定向到 vercel.com 登录页；如果在中国大陆或部分浏览器环境，SSL 握手异常会显示「HSTS 错误 / 链接不是私密」。

**解决：**

1. Vercel Dashboard → 进入 `sealight-homepage` 项目
2. 左侧菜单 **Settings** → **Deployment Protection**
3. 把 **Vercel Authentication** 从 `Standard Protection` 改为 **Disabled**（生产与预览均公开）
4. 保存后，`sealight-homepage.vercel.app` 即任何人可访问，无需登录

### 三、使用主域名分享（而不是一次性预览 URL）

Vercel 每次部署会生成两种 URL：

| URL 形式 | 例子 | 能否对外分享 |
|---|---|---|
| **Production 主域名** ✅ | `sealight-homepage.vercel.app` | 是。始终指向最新 `main` 分支部署 |
| **一次性预览 URL** ❌ | `sealight-homepage-dn2wn474g-oscar…vercel.app` | 否。受保护 + 可能过期 |

**始终把 `sealight-homepage.vercel.app` 分享给同事。**

### 四、后续更新

```bash
# 本地改完，push 到 main 即自动部署
git add .
git commit -m "your change"
git push origin main
```

Vercel 会在约 15-30 秒内构建完毕，主域名自动指向新版本。

---

## 🧪 多设备测试清单

| 设备 | 重点检查 |
|---|---|
| iPhone（Safari）| Hero 竖向布局、场景卡片横滑、Fitment 三级联动、磁吸按钮在触摸下**不会**误触发 |
| Android（Chrome）| 字体渲染（Inter 300/700 权重对比）、触摸响应、底部 CTA 按钮可点击区域 ≥ 44px |
| iPad（Safari）| 2 列 → 3 列布局切换、系列选择器卡片宽度 |
| Windows PC（Chrome）| 全宽布局、Hover 效果、磁吸按钮、Hero breathe 动画 |
| macOS（Safari）| 颜色渲染、字体平滑度、backdrop-filter 模糊效果 |
| Linux（Firefox）| 字体备选、布局一致性、scroll 动画 |

---

## 🎨 品牌色速查

```css
--orange:     #FF6600   /* 主色：所有主 CTA 按钮、Trust Bar accent */
--black:      #0D0D0D   /* 墨黑：Hero/Scene/Series/UGC 背景 */
--warm-white: #F5F0EB   /* 暖白：Categories/Brand 模块背景 */
```

---

## 📋 Elestial 系列命名（模块 05）

| 名称 | 定位 | 对应用户段 | Badge |
|---|---|---|---|
| Nova   | 极致亮度旗舰 | U1 技术极客 | Peak Performance |
| Pulsar | 精准光型控制 | U1 / U2 安全型 | Safety Pro |
| Prism  | 均衡视觉升级（默认推荐）| U2 安全驾驶 | **Most Popular** |
| Spark  | 即插即用便捷 | U3 便利型 | Easiest Install |
| Ray    | 高性价比入门 | U4 性价比型 | Best Value |

---

## 🛠️ 快速定位各模块（编辑用）

- `id="m01-hero"` — Hero 首屏
- `id="m03-scenes"` — Shop by Driving Need
- `id="m05-series"` — Elestial 系列选择器
- `data-series="prism"` — Prism Most Popular 卡片
- `id="m09-education"` — 注意：Education 在 HTML 里 id 为 `m10-education`，模块 09 才是 Bottom CTA（渲染顺序：08 → 10 → 09）

---

## ⚠️ 上线前清单

- [ ] 将 `index.html` 里 `<div class="preview-banner">Preview v03</div>` 删除
- [ ] 将 `footer-note` 里的「Internal preview build — …」一行删除
- [ ] 将 og-preview.svg 替换为真实 PNG 版本（部分社交平台不识别 SVG 分享图）
- [ ] Fitment Finder 接入真实车型数据库（目前为前端 mock）
- [ ] 所有 `<a href="#">` 替换为真实商品链接或产品分类页 URL
- [ ] 场景卡片 / Before-After 的 SVG 占位图替换为真实摄影
