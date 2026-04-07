# SEALIGHT Homepage — AI 协作开发方案

> 版本：v0.2 · 协作模式：Multi-Agent · 工具栈：全免费

---

## 一、总体目标

将 SEALIGHT 首页 Wireframe v1 → 可落地前端原型 → 最终生产上线版本。

**当前阶段**：Claude Cowork 已交付 `index.html` 原型（静态 HTML + Tailwind CDN），含全部 9 个模块的结构和文案。

---

## 二、协作角色分工

| 角色 | 工具 | 职责范围 | 交付物 |
|------|------|---------|--------|
| **产品负责人** | Oscar | 审核、提供真实素材、最终拍板 | 反馈 / 素材 / 真实图片 |
| **文档 & 文件协调** | Claude Cowork（本工具） | 维护文件、生成文档、整体进度管理 | HTML 原型、改版文档、方案 |
| **文案 & 创意方向** | Claude Chat | 优化英文 copy、A/B 变体、FAQ 内容 | 文案 draft、A/B 方案 |
| **代码 & 工程部署** | Claude Code | React 组件化、GitHub 仓库、CI/CD、交互逻辑 | 完整代码库、部署链接 |
| **辅助评审** | GPT | 竞品文案参考、可及性建议、备选方案 | 评审意见、补充建议 |

---

## 三、分阶段执行计划

### Phase 0 — 原型交付（✅ 已完成 · Claude Cowork）

#### v0.1 初版（已完成）
- `index.html` 静态原型，含全部 9 个模块
- Tailwind CSS CDN（无构建步骤）
- Font Awesome 图标
- 真实文案（来自 Wireframe v1 优化版）
- 全部交互悬停效果
- 响应式布局（桌面/移动）

#### v0.2 品牌升级（✅ 已完成 · Claude Cowork）

**品牌色系统统一（基于 SEALIGHT 官网 sealight-led.com）：**

| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 / Brand Orange | `#FF6600` | 按钮、高亮、图标、section label |
| 深橙 Hover | `#E05500` | 按钮悬停态 |
| 深黑 / Ink | `#0D0D0D` | 导航背景、Hero 背景、次要按钮 |
| 暖白 / Warm | `#F5F0EB` | 浅色区背景 |
| 纯白 | `#FFFFFF` | 卡片、文字 |

> 注：sealight-led.com 在本次工作环境中网络不可达（EGRESS_BLOCKED），品牌色依据 Oscar 确认的「橙、白、黑三色」及行业品牌知识确定。

**Card 4「驾驶场景」替换：**
- **旧版**：Beam Control for Detail-Focused Drivers（精准配光 / 专业驾驶场景）
- **新版**：Works in Any Housing — Rotatable Beam Ring（卡环可旋转，适配所有总成）
  - 核心卖点：车型总成插座位置各异 → 360° 可旋转卡环 → 自由调节光型方向 → 完美截光线，零散射，无需改装
  - 标签：`360° rotatable ring` / `Fits all housings` / `No modification needed`
  - 布局：`sm:col-span-2` 宽卡，橙色渐变处理，视觉突出
  - CTA：`Shop Adjustable Beam Ring →`

**其他 v0.2 视觉升级：**
- Hero 暗底 + CSS 网格纹理 + 橙色径向光晕
- 品牌 Logo：`SEA`（黑）+ `LIGHT`（橙）
- 所有主 CTA 统一为 `.btn-orange`（橙色）
- 次要 CTA 统一为 `.btn-ink`（黑色）
- 评分星标、信任图标、section label 全部统一为品牌橙

**下一步由 Oscar 做的事：**
- [ ] 在浏览器打开 `index.html` 确认 v0.2 视觉效果
- [ ] 确认 Card 4「卡环可旋转」文案是否准确反映产品特性
- [ ] 提供真实的产品图片 / 车辆照片
- [ ] 确认各模块文案和顺序是否需要进一步调整

---

### Phase 1 — 代码工程化（Claude Code 负责）

**目标：** 从单文件 HTML → 可维护的组件化代码库，部署到 GitHub Pages

**技术栈推荐（全免费）：**
```
Vite + React + Tailwind CSS
GitHub（代码托管）
GitHub Pages（静态站点托管）
GitHub Actions（CI/CD 自动部署）
```

**Claude Code 执行步骤：**

```bash
# 1. 初始化项目
npm create vite@latest sealight-homepage -- --template react
cd sealight-homepage
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install

# 2. 组件拆分
src/
  components/
    Hero.jsx           # 首屏 + 适配查询框
    TrustBar.jsx       # 信任条
    DrivingNeed.jsx    # 场景导购 5 卡片
    CategoryGrid.jsx   # 品类网格
    SeriesSelector.jsx # 系列选择器
    WhySealight.jsx    # 品牌利益点
    Reviews.jsx        # UGC 评论
    SupportHub.jsx     # 支持中心
    BottomCTA.jsx      # 收口 CTA
  App.jsx
  main.jsx

# 3. 部署
# 在 GitHub repo → Settings → Pages → Source: GitHub Actions
# 使用 vite.config.js base: '/sealight-homepage/'
```

**GitHub Actions 自动部署配置（复制到 `.github/workflows/deploy.yml`）：**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### Phase 2 — 交互功能（Claude Code + Claude Chat）

**功能清单（按 P0/P1 排序）：**

#### P0 必做
- [ ] **适配查询框联动**：Year 选完 → Make 列表动态更新 → Model 列表动态更新
  - 数据来源：从 SEALIGHT 现有适配数据导入，或先用 mock JSON
  - Claude Code 实现：`useVehicleSelector` custom hook

- [ ] **场景卡片点击追踪**：GA4 事件 `need_card_click` + `card_label`
  - 用于后续 P1/P2 优先级的数据依据

- [ ] **Series 卡片对比模式**：选中 2 个系列 → 展开对比弹窗

#### P1 加分项
- [ ] **Mobile 首屏 CTA 固定底部条**：移动端滑动时显示「查找适配灯泡」固定条
- [ ] **UGC 筛选 Tab**：「大灯 / 雾灯 / 内饰灯」切换展示对应评论
- [ ] **系列推荐测试**：2 个问题 → 推荐对应系列（轻量 JS 逻辑）

#### P2 未来
- [ ] 适配后动态显示对应车型 UGC 评论
- [ ] 回访用户个性化首屏

---

### Phase 3 — 文案深化（Claude Chat 负责）

**Claude Chat 的 Prompt 模板：**

```
你是 SEALIGHT 的 DTC 文案专家，负责为汽车灯具品牌写高转化英文 copy。
风格参考：Velotric（场景感强）、Lasfit（信任驱动）、Carvana（清晰直接）。

任务：为首页 [模块名] 写 3 个 A/B 测试变体，每个变体包含：
- H1 主标题（不超过 8 个词）
- 副标题（1-2 句）
- CTA 按钮文字（3-5 个词）

当前版本：[粘贴当前 copy]
优化方向：[填写重点，例如：更强的情感共鸣 / 更清晰的利益点]
```

---

### Phase 4 — 评审 & 优化（GPT 辅助）

**GPT 的角色定位：**
- 评审 Claude 生成的文案，提供第二意见
- 搜集竞品（Sylvania, Lasfit, PIAA）首页结构做参考
- 无障碍可及性（a11y）检查：颜色对比度、ARIA 标签

**给 GPT 的 Prompt：**
```
请评审以下 SEALIGHT 首页 [模块名] 的英文文案，从以下角度给出改进建议：
1. 消费者心理：是否触发正确的购买动机？
2. 与竞品差异：对比 [Lasfit/Sylvania]，有何独特性？
3. 可及性：是否清晰易懂，适合非专业用户？

文案内容：[粘贴文案]
```

---

## 四、免费工具栈汇总

| 工具 | 用途 | 免费额度 |
|------|------|---------|
| **GitHub** | 代码托管 + 版本管理 | 完全免费（公开仓库） |
| **GitHub Pages** | 静态站点托管 | 完全免费 |
| **GitHub Actions** | CI/CD 自动部署 | 2000 分钟/月（免费） |
| **Vite** | 前端构建工具 | 完全免费开源 |
| **Tailwind CSS** | UI 样式框架 | 完全免费开源 |
| **Font Awesome** | 图标库 | 免费版（基础图标） |
| **Google Fonts** | 字体（Inter） | 完全免费 |
| **Unsplash** | 免费授权商业照片 | 完全免费 |
| **Pexels** | 免费授权商业照片 | 完全免费 |
| **Canva 免费版** | 简单图形素材制作 | 免费（有限制） |
| **Vercel（备选）** | 更好的 Next.js 托管 | 免费 hobby 套餐 |
| **Plausible（备选）** | 轻量分析（替代 GA） | 需要付费；GA4 免费 |

---

## 五、文件结构

```
sealight-homepage/
├── index.html              ← Claude Cowork 交付的 Phase 0 原型（你现在看到的）
├── COLLABORATION_PLAN.md   ← 本文件
│
└── src/（Phase 1 由 Claude Code 创建）
    ├── components/
    │   ├── Hero.jsx
    │   ├── TrustBar.jsx
    │   ├── DrivingNeed.jsx
    │   ├── CategoryGrid.jsx
    │   ├── SeriesSelector.jsx
    │   ├── WhySealight.jsx
    │   ├── Reviews.jsx
    │   ├── SupportHub.jsx
    │   └── BottomCTA.jsx
    ├── data/
    │   ├── vehicles.json   ← 年份/品牌/型号适配数据
    │   └── reviews.json    ← 评论数据
    ├── assets/
    │   └── images/         ← 真实产品图 / 车辆照片
    ├── App.jsx
    └── main.jsx
```

---

## 六、立即可做的下一步（Oscar 操作）

### 选项 A：直接预览原型（1 分钟）
```
直接双击打开 sealight-homepage/index.html
用浏览器查看效果，检查各模块布局和文案
```

### 选项 B：发给 Claude Code 做工程化（推荐下一步）
把 `index.html` 和本文档发给 Claude Code，并说：
> "请基于这个 HTML 原型，初始化一个 Vite + React + Tailwind 项目，
> 将 9 个模块拆分成独立组件，并配置 GitHub Actions 自动部署到 GitHub Pages。"

### 选项 C：先补充真实素材
- 提供产品主图（至少 4 张，每系列一张）
- 提供夜间驾驶实拍照片（用于 Hero 和场景卡片）
- 提供真实客户评论 + 车型信息（用于 Reviews 模块）

---

*Claude Cowork · SEALIGHT Homepage v0.2 · 2026-04*
