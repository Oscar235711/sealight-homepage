# SEALIGHT Homepage — 部署与协作指南 · v05

> 纯静态站点 · 自包含 `index.html` + 从 unpkg 加载 React/Babel · 无构建步骤 · 与 sealight-led.com 完全隔离

---

## 📁 文件结构

```
sealight-homepage/
├── index.html                  ← 生产首页（Vercel / 腾讯云直接服务这个文件）
├── SEALIGHT v05.html           ← 同 index.html，命名版本
├── vercel.json                 ← Vercel 部署配置
├── README.md                   ← 仓库说明
├── DEPLOY.md                   ← 本文件
│
├── scripts/
│   └── bundle_v05.py           ← 把 JSX/CSS 源码打包成 index.html
│
├── tests/
│   ├── e2e.mjs                 ← 19 项端到端测试（无头浏览器）
│   ├── package.json
│   └── package-lock.json
│
├── tokens.css / components.css / nav-variants.css /
├── hero-variants.css / modules.css       ← 设计系统 + 模块样式
├── navs.jsx / heros.jsx / modules.jsx    ← React 组件源码
│
├── assets/
│   ├── favicon.svg
│   └── og-preview.svg
│
├── SEALIGHT v04.html           ← 设计画布（3 Nav × 3 Hero × 3 Tone 探索）
├── SEALIGHT v04 Reader.html    ← 设计方案阅读版
├── Optimization Plan.html      ← 早期 handoff 规划
├── SEALIGHT-首页改版需求方案.md   ← 完整改版需求方案
└── v03-index.html              ← 上一版首页（参考用）
```

---

## 🚀 本地预览

直接双击 `index.html`（`file://` 协议可用），或跑静态服务器：

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

---

## 🧪 运行测试

```bash
cd tests
npm install       # 一次性，装 puppeteer-core
npm test          # 19 项测试全部跑一遍
```

想测线上部署：

```bash
node e2e.mjs https://sealight-homepage.vercel.app/
```

测试覆盖：渲染、所有真实 URL、Before/After 拖拽与键盘、Scoparc 系列名、橙色主色、hybrid tone、移动端 375px 不溢出、footer 关键链接。

---

## 🔁 更新 `index.html`

编辑 JSX / CSS 源码后重新打包：

```bash
python scripts/bundle_v05.py
```

会同时写 `SEALIGHT v05.html` 和 `index.html`。然后跑测试确认：

```bash
cd tests && npm test
```

---

## ☁️ Vercel 部署

### 一、首次导入

1. 仓库：`github.com/Oscar235711/sealight-homepage`（已推送 main）
2. vercel.com → Sign in with GitHub
3. **New Project → Import** → 选中 `sealight-homepage`
4. Framework Preset: **Other**（静态站点）
5. Build Command: *留空*
6. Output Directory: `.`（仓库根目录）
7. Deploy

### 二、关闭 Deployment Protection（必做）

Vercel Hobby 默认开启 Authentication，会让内部同事被要求登录 + 在部分中国大陆浏览器出 HSTS 错误。

1. Dashboard → `sealight-homepage` → **Settings**
2. 左侧 **Deployment Protection**
3. **Vercel Authentication** 改成 **Disabled**
4. 保存

### 三、分享正确的 URL

| URL | 适合 |
|---|---|
| `sealight-homepage.vercel.app` ✅ | 对外分享，永远指向最新 main |
| `sealight-homepage-xxx-oscar.vercel.app` ❌ | 一次性 preview，不要分享 |

### 四、后续更新

```bash
git add .
git commit -m "xxx"
git push origin main
```

Vercel 15~30 秒内自动重新部署，主域名指向最新版。

---

## ☁️ 腾讯云部署（COS 静态网站托管）

### 方案 A：COS 静态网站（最简单）

1. **开通对象存储 COS**：console.cloud.tencent.com/cos
2. **创建存储桶**
   - 名称：`sealight-homepage-xxx`（xxx 是你的 APPID，自动加）
   - 地域：选择国内（如 `ap-shanghai`）
   - 访问权限：**公有读私有写**
3. **开启静态网站**
   - 存储桶 → 基础配置 → **静态网站** → 开启
   - 索引文档：`index.html`
   - 错误文档：`index.html`（SPA 友好）
4. **上传文件**
   - 存储桶 → 文件列表 → 上传文件
   - 选择本仓库所有文件（不含 `node_modules/`、`.git/`、`tests/node_modules/`）
   - 或用 `coscli`：
     ```bash
     coscli sync ./ cos://sealight-homepage-<APPID>/ \
       --exclude "node_modules/*,tests/node_modules/*,.git/*"
     ```
5. **访问**：使用静态网站访问节点（endpoint）形式：
   `sealight-homepage-<APPID>.cos-website.ap-shanghai.myqcloud.com`

### 方案 B：CDN 加速 + 自定义域名

如果需要中国大陆稳定访问 + 自定义域名：

1. COS 存储桶 → **域名管理** → 绑定自定义域名
2. 开启 **CDN 加速**（需要域名完成 ICP 备案）
3. 回源：HTTPS + 静态网站节点
4. 缓存规则：
   - `index.html`、`SEALIGHT v05.html`：1 分钟（便于快速更新）
   - `assets/*`：1 年（immutable）
   - `*.css`、`*.jsx`：1 小时

### 方案 C：轻量服务器 + Nginx

如果你有腾讯云轻量应用服务器：

```bash
# 在服务器上
cd /var/www/sealight-homepage
git clone https://github.com/Oscar235711/sealight-homepage.git .
```

Nginx 配置：

```nginx
server {
  listen 80;
  server_name sealight-preview.your-domain.com;
  root /var/www/sealight-homepage;
  index index.html;

  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

更新：

```bash
cd /var/www/sealight-homepage && git pull
```

---

## ✅ v05 已完成的改进（对照 v03）

- ✅ 真实系列名（Scoparc S7S / S2 / S1、Laxmas L2S、Xenower X）替换虚构的 Nova/Pulsar/Prism/Spark/Ray
- ✅ 所有 CTA 指向真实 sealight-led.com URL（无 `#` 占位）
- ✅ Before/After 可拖拽 + 键盘操作
- ✅ 移动端 ≤ 900px 响应式，无横向溢出
- ✅ Logo "SEAL LIGHT" 渲染为 "SEALIGHT"（修正 v03 的双 L bug）
- ✅ 采用 Nav B（顶部菜单 + Year/Make/Model 粘性栏）+ Hero 3（Fitment-first）+ Hybrid tone
- ✅ 19 项 E2E 测试全部通过

## ⚠️ 上线前仍需完成

- [ ] Fitment Finder 接入真实车型数据库（目前仅显示 2022 Ford F-150 占位）
- [ ] Before/After 用真实夜驾对比照替换渐变占位
- [ ] Scenes 卡片替换为真实场景摄影
- [ ] 确认新建 `/shop-by-need`、`/collection/easy-install-led-bulbs` 等页面（参见需求方案 §12）
- [ ] 确认 Scoparc / Laxmas / Xenower 各系列是否有独立的 collection URL，目前都指向 `/collection/forward-lighting`
- [ ] Google Analytics / 埋点接入（参见需求方案 §9.3）
- [ ] og-preview.svg 替换为真实 PNG（部分社交平台不识别 SVG）

---

## 🎨 品牌色速查

```css
--accent:           #FF6600   /* 主色 · CTA / accent */
--brand-orange-2:   #FF8A3D
--brand-orange-deep:#CC4F00
--bg:               #F7F5F1   /* hybrid tone 浅色区 */
--bg-3:             #0B0C0E   /* hybrid tone 深色区（Reviews/UGC）*/
```

---

## 🛠️ 关键模块位置（编辑用）

| 模块 | 源码位置 |
|---|---|
| Nav B（顶部 + Fitment 栏） | `navs.jsx` → `NavB()` |
| Hero 3（Fitment-first） | `heros.jsx` → `Hero3Fitment()` |
| Trust Bar | `modules.jsx` → `TrustBar()` |
| Shop by Driving Need | `modules.jsx` → `ScenesModule()` |
| Before/After（可拖） | `modules.jsx` → `BeforeAfterModule()` |
| Series Rail | `modules.jsx` → `SeriesModule()` |
| Reviews / UGC | `modules.jsx` → `ReviewsModule()` |
| Support CTA | `modules.jsx` → `SupportCTA()` |
| Footer | `modules.jsx` → `SiteFooter()` |

改完任一文件 → 跑 `python scripts/bundle_v05.py` → 跑测试 → `git push` → Vercel 自动部署。
