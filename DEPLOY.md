# SEALIGHT Homepage v03 — 部署与协作指南

> 测试前端 | 纯 HTML/CSS/JS | Vercel 部署 | 零风险测试

---

## 📁 文件结构

```
sealight-homepage/
├── index.html          ← 主页，10个模块全部在此
├── css/
│   ├── style.css       ← 主样式（变量、模块、组件）
│   └── responsive.css  ← 响应式断点（Mobile/Tablet/Desktop/Dark Mode）
├── js/
│   └── main.js         ← 交互逻辑（导航/适配查询/动画/系列联动）
├── assets/
│   └── icons/          ← 放置自定义SVG图标（可选）
└── DEPLOY.md           ← 本文件
```

---

## 🚀 本地预览（3步）

```bash
# 方法A：Python（无需安装）
cd sealight-homepage
python3 -m http.server 8080
# 打开 http://localhost:8080

# 方法B：Node.js
npx serve .
# 打开提示的本地URL

# 方法C：VS Code Live Server 插件
# 右键 index.html → Open with Live Server
```

---

## ☁️ Vercel 部署（公开预览URL，适合多设备测试）

### 方式一：GitHub + Vercel 自动部署（推荐）

1. **创建 GitHub 仓库**
   - 新建仓库：`sealight-homepage-test`（私有或公开均可）
   - 将 sealight-homepage 文件夹内容推送到仓库根目录

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com) → 免费注册/登录
   - "New Project" → Import 刚创建的 GitHub 仓库
   - Framework Preset 选择 **Other**（静态站点）
   - 无需任何构建配置，直接 Deploy

3. **获取预览 URL**
   - 部署完成后获得形如 `https://sealight-homepage-test.vercel.app` 的公开URL
   - 此URL可在任何设备（手机/iPad/PC）直接访问测试

4. **后续更新**
   - 每次 `git push` 到 GitHub 自动触发重新部署

### 方式二：Vercel CLI 直接部署

```bash
npm install -g vercel
cd sealight-homepage
vercel
# 按提示登录，选择 deploy as static
```

---

## 📱 多设备测试清单

部署到 Vercel 后，用以下设备逐一访问预览URL：

| 设备 | 重点检查 |
|---|---|
| iPhone（Safari）| Hero 竖向布局、场景卡片横滑、适配查询框 |
| Android（Chrome）| 字体渲染、触摸响应、底部CTA按钮大小 |
| iPad（Safari）| 2列布局切换、系列选择器卡片宽度 |
| Windows PC（Chrome）| 全宽布局、Hover效果、动画 |
| Linux（Firefox）| 字体备选、布局一致性 |
| macOS（Safari）| 颜色渲染、字体平滑度 |

---

## 🛠️ 与 Claude Code 协作方式

Claude Code 可以直接读取和编辑本项目文件。建议工作流：

```
# 1. 打开 Claude Code
claude

# 2. 告诉Claude Code要修改的内容，例如：
# "修改 index.html 中模块05的系列卡片，
#  给 King 系列添加一个 '5000+ lm' 的规格徽章"

# 3. Claude Code 会直接编辑文件，无需重新构建
# 4. 刷新浏览器即可看到效果
```

**快速定位各模块：**
- 搜索 `id="m01-hero"` 找 Hero 模块
- 搜索 `id="m05-series"` 找 Elestial 系列选择器
- 搜索 `data-series="king"` 找 King 系列卡片
- 搜索 `m10-education` 找 Education 教育板块

---

## 🎨 品牌色快速参考

```css
--orange:     #FF6600   /* 主色：所有主CTA按钮 */
--black:      #0D0D0D   /* 墨黑：Hero/Scene/Series背景 */
--warm-white: #F5F0EB   /* 暖白：Categories/Brand模块背景 */
--navy:       #1E3A5F   /* 深海军蓝：Bottom CTA背景 */
```

---

## 📋 Elestial 系列命名（模块05）

| 名称 | 定位 | 对应用户段 |
|---|---|---|
| King | 极致亮度 | U1 技术极客 |
| Prism | 精准光型 | U1/U2 安全型 |
| Beam | 均衡日常（Most Popular） | U2 安全驾驶 |
| Spark | 即插即用 | U3 便利型 |
| Eclipse | 高性价比 | U4 性价比型 |

---

## ⚠️ 注意事项

- 本项目为**纯静态测试前端**，部署在 Vercel，与 sealight-led.com 完全独立
- 适配查询（Fitment Finder）为 Mock 数据，接入真实数据库前请勿上线
- 所有图片位置均为 SVG 占位图，正式上线前需替换为真实场景摄影
- 页脚有"⚠️ 测试版本"提示，上线时删除该提示
