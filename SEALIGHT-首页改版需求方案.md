# SEALIGHT 首页改版需求方案

版本：v04 handoff draft  
日期：2026-04-22  
用途：提交设计与技术部门，用于调整 sealight-led.com 首页及导航结构  
范围：官网首页、首页导航、首页模块承接页、旧页面调整建议、技术实现与上线节奏  
优先级：方案文档与后台改版需求优先；Vercel / 腾讯云 demo 部署作为后续计划

---

## 1. 项目背景

sealight-v04 是在 v03 首页基础上制作的首页改版探索稿，当前已有三个主要交付物：

- `SEALIGHT v04.html`：交互画布版，可查看 Nav / Hero / Tone 组合。
- `SEALIGHT v04 Reader.html`：方案阅读版，适合解释方向与设计决策。
- `Optimization Plan.html`：早期 handoff 方案，包含模块取舍、设计系统、落地路线图。

本文件是在上述文件基础上新增的正式需求方案，重点补齐部门落地最需要的部分：**首页每个模块是否需要新建承接页、旧页面链接是什么、旧页面是否需要调整、设计与技术分别要做什么**。

---

## 2. 改版目标

### 2.1 业务目标

1. 提升首页首屏转化：让用户更快进入 `Find My Bulb` / 车型适配 / 商品集合页。
2. 降低产品理解成本：从“用户懂灯泡型号”改为“用户按驾驶场景、车型、系列、灯位进入”。
3. 强化 SEALIGHT 品牌感：避免首页只是商品列表堆叠，建立夜驾、可靠安装、真实车辆反馈的品牌记忆。
4. 提升导航效率：把当前较长的类目、车型、系列、资源入口重新组织为更清晰的一级结构。
5. 为后续 A/B Test 和数据埋点预留结构：Fitment 完成率、模块点击率、PDP 到达率、加购率、跳出率。

### 2.2 用户目标

| 用户类型 | 核心问题 | 首页需要给出的路径 |
|---|---|---|
| DIY 车主 | 不确定自己的车能装什么灯 | `Find My Bulb` / `Shop By Vehicle` |
| 夜间驾驶用户 | 想看得更远、更清楚 | `Shop by Driving Need` -> 夜驾/亮度集合页 |
| 雨雾/越野用户 | 想解决特殊天气或路况 | `Shop by Driving Need` -> 天气/极端路况集合页 |
| 已知型号用户 | 知道 H11 / 9005 等型号 | `Shop By Bulb Size` / 搜索 |
| 已知灯位用户 | 要买 Headlight / Fog / Interior 等 | `Shop By Category` |
| 新手用户 | 不懂 LED、光型、安装、解码器 | `Learn` / `Installation Manuals` / `Help Center` |

---

## 3. 新建页面判断标准

为了避免技术和后台工作量失控，本次不建议“看到首页新模块就新建页面”。页面承接按以下标准判断：

### 3.1 优先复用旧页面

满足以下条件时，优先复用现有页面，只要求旧页做标题、首屏、筛选、文案或视觉微调：

1. 主站已有明确商品集合页，例如 Headlight Bulbs、Fog Lights、Interior Lights、Package Combo。
2. 用户点击意图是购买商品，不需要先看长篇内容解释。
3. 旧页已经具备商品列表、筛选、排序和加购能力。
4. 新首页模块只是换了入口文案，但商品范围没有改变。

### 3.2 建议新建页面

满足以下条件时，建议新建页面或新建 Landing / Hub：

1. 首页模块是长期战略入口，且旧页没有对应语义，例如 `Shop by Driving Need` 总入口。
2. 该入口有 SEO 价值，例如 `LED fog light bulbs for winter driving`、`halogen to LED guide`。
3. 用户需要先理解选择逻辑，再进入商品列表，例如系列对比、LED 新手教育、安装/排障。
4. 旧页面过于分散，无法承担首页主 CTA 的解释和转化任务。
5. 需要聚合多个现有页面，例如 Learn Hub 聚合 Blog、Installation Manuals、FAQ、Decoders。

### 3.3 不建议新建页面

满足以下条件时，不建议新建页面：

1. 模块只承担信任背书，例如 Trust Bar。
2. 模块是首页内部体验，例如 Before / After Slider。
3. 模块只是重复 CTA，可以锚点回到 Fitment 或跳现有集合页。
4. 当前后台无法维护长期内容，容易变成无人更新的空页。

---

## 4. 现有主站页面核对

以下为已核对的主站现有承接页面，可作为本次改版的旧页面基础。

| 类型 | 页面名 | 现有 URL | 备注 |
|---|---|---|---|
| 首页 | Home | https://sealight-led.com/ | 当前首页已有 `Find Your Bulb`、类目、车型、场景雾灯、评论、Blog 等模块 |
| 类目 | LED Headlight Bulbs | https://sealight-led.com/category/headlight-bulbs | 可承接 Headlights、Night Driving、Brightness |
| 类目 | Fog Light Bulbs | https://sealight-led.com/category/fog-light-bulbs | 可承接 Weather、Fog、Snow、Low Visibility |
| 类目 | Headlights Combo | https://sealight-led.com/collection/headlights-fog-lights-combo | 可承接 Combo Kits |
| 类目 | Brake / Tail Lights | https://sealight-led.com/collection/brake-tail-lights | 可承接 Exterior bulbs |
| 类目 | Backup / Reverse Lights | https://sealight-led.com/collection/backup-reverse-lights | 可承接 Reverse Lights |
| 类目 | Turn Signal Lights | https://sealight-led.com/collection/turn-signal-lights | 可承接 Turn Signal |
| 类目 | License Plate Lights | https://sealight-led.com/collection/license-plate-lights | 可承接 License Plate |
| 类目 | DRL Lights | https://sealight-led.com/collection/drl-lights | 可承接 DRL |
| 类目 | Interior Lights | https://sealight-led.com/collection/interior-lights | 可承接 Interior |
| 类目 | Decoders | https://sealight-led.com/category/canbus-decoder-resistor | 可承接 Canbus / Decoders |
| 系列 | Forward Lighting / Shop by SEALIGHT Series | https://sealight-led.com/collection/forward-lighting | 可承接 Series 总入口，但需要重构为更清晰的系列对比页 |
| 组合 | Package Combo | https://sealight-led.com/collection/package-combo | 可承接 Combo / Bundle |
| 适配 | Automotive Bulb Finder | https://sealight-led.com/automotive-bulb-finder | 可承接 `Find My Bulb` |
| 支持 | Help Center | https://sealight-led.com/page/help-center | 可承接 Support 总入口 |
| 支持 | Installation Manuals | https://sealight-led.com/page/installation-guides | 可承接 Install Guides |
| 支持 | FAQ | https://sealight-led.com/page/faq | 可承接 FAQ |
| 支持 | Contact Us | https://sealight-led.com/page/contact-us | 可承接 Contact |
| 品牌/评论 | SEALIGHT Reviews | https://sealight-led.com/page/sealight-reviews | 可承接 Reviews / UGC |
| 内容 | Blog | https://sealight-led.com/blog | 可承接 Learn，但建议整理为 Learn Hub |
| 品牌 | About SEALIGHT | https://sealight-led.com/page/about-us | 可承接品牌介绍 |
| 场景集合 | City Driving Fog Lights | https://sealight-led.com/collection/led-fog-light-bulbs-city-driving | 可承接 City / Daily Drive |
| 场景集合 | Highway Driving Fog Lights | https://sealight-led.com/collection/led-fog-light-bulbs-highway-driving | 可承接 Highway Nights |
| 场景集合 | Country Roads Fog Lights | https://sealight-led.com/collection/led-fog-light-bulbs-country-roads | 可承接 Country Roads |
| 场景集合 | Extreme Conditions Fog Lights | https://sealight-led.com/collection/led-fog-light-bulbs-extreme-conditions | 可承接 Extreme / Off-road |

---

## 5. 推荐导航结构

### 5.1 顶部一级导航

建议将当前主站导航重新组织为：

| 一级导航 | 英文显示 | 目的 | 承接方式 |
|---|---|---|---|
| 按需求购买 | Shop by Need | 面向不懂型号的用户，用驾驶场景进入 | Mega Menu + 少量新建/复用场景集合页 |
| 按车型购买 | Shop by Vehicle | 面向知道车型但不知道灯泡的用户 | 复用现有车型页与 Fitment |
| 按灯位/类目购买 | Categories | 面向知道要买什么灯位的用户 | 复用现有类目页 |
| 系列对比 | Series | 面向比较产品线和价格档位的用户 | 复用并重构 `Forward Lighting` |
| 支持 | Support | 面向安装、排障、退换、联系 | 复用 Help Center / Installation / FAQ / Contact |
| 学习 | Learn | 面向新手教育和 SEO 内容 | 建议新建 `/learn` Hub，聚合 Blog 与 Guides |

### 5.2 全局 CTA

| CTA | 英文显示 | 目标 |
|---|---|---|
| 主 CTA | Find My Bulb | 全站常驻，进入车型适配 |
| 次 CTA | Search by Bulb Size | 给已知型号用户 |
| 购物 CTA | View Compatible Bulbs | Fitment 完成后进入匹配商品列表 |

### 5.3 导航方案建议

v04 demo 中已有 Nav A / Nav B / Nav C。建议采用：

**Nav A Mega Menu + 全局 Fitment Sticky 的混合方案。**

原因：

1. Mega Menu 更适合承载现有复杂商品结构。
2. Fitment Sticky 保留转化效率，降低用户找错灯泡风险。
3. 不采用纯极简 Nav C，因为当前 SEALIGHT 商品层级复杂，信息密度过低会增加用户迷路概率。
4. 移动端不做 hover mega，改为 Drawer / Accordion。

---

## 6. 首页模块与承接页矩阵

### 6.1 M01 Hero / Fitment

| 项目 | 建议 |
|---|---|
| 模块状态 | 保留并强化 |
| 主要 CTA | `Find My Bulb` |
| 旧页面链接 | https://sealight-led.com/automotive-bulb-finder |
| 是否新建页面 | 不新建 |
| 旧页是否调整 | 是 |
| 调整建议 | 需要确认 Fitment 结果页是否能返回推荐商品、推荐系列、匹配数量；首屏文案和按钮应与首页一致 |
| 技术需求 | Year / Make / Model / Position 数据对接；完成后跳转到匹配商品列表；记录 Fitment start / complete / result click |
| 设计需求 | Hero 中保留车型选择入口；移动端将 Fitment 简化为单行 CTA 或底部抽屉 |

### 6.2 M02 Trust Bar

| 项目 | 建议 |
|---|---|
| 模块状态 | 保留 |
| 主要 CTA | 无 |
| 旧页面链接 | 无 |
| 是否新建页面 | 不新建 |
| 旧页是否调整 | 否 |
| 调整建议 | 只作为首页信任信息：Free Shipping、90 Days Easy Return、Fitment Support、Customer Support |
| 技术需求 | 静态模块，可后台配置文案 |
| 设计需求 | 从卡片式改为轻量 hairline bar，避免占用首屏空间 |

### 6.3 M03 Shop by Driving Need

| 项目 | 建议 |
|---|---|
| 模块状态 | 重做为核心模块 |
| 主要 CTA | `Shop by Driving Need` / `Shop Brightness Upgrades` / `Shop Weather-Ready Bulbs` |
| 旧页面链接 | 部分可复用；见下表 |
| 是否新建页面 | 建议新建一个总入口，部分场景复用旧集合页 |
| 旧页是否调整 | 是 |
| 调整建议 | 首页场景卡点击后必须进入真实集合页或场景 Landing，不再使用 `#` |

场景承接建议：

| 场景 | 首页文案 | 建议承接 | 新建判断 |
|---|---|---|---|
| 夜驾/亮度 | `I want to see farther on dark highways.` | 优先复用 Headlight Bulbs：https://sealight-led.com/category/headlight-bulbs | 可先不新建；如果做 SEO，后续新建 `/collection/night-driving-led-headlight-bulbs` |
| 雨雾雪 | `Rain, fog, snow` | 复用 Fog Light Bulbs：https://sealight-led.com/category/fog-light-bulbs | 不新建 |
| 城市通勤 | `City Drives` | 复用：https://sealight-led.com/collection/led-fog-light-bulbs-city-driving | 不新建 |
| 高速夜路 | `Highway Nights` | 复用：https://sealight-led.com/collection/led-fog-light-bulbs-highway-driving | 不新建 |
| 乡村道路 | `Country Roads` | 复用：https://sealight-led.com/collection/led-fog-light-bulbs-country-roads | 不新建 |
| 极端路况 | `Extreme Conditions` | 复用：https://sealight-led.com/collection/led-fog-light-bulbs-extreme-conditions | 不新建 |
| 快速安装 | `5-minute install` | 建议新建 `Easy Install LED Bulbs` 集合页，或用筛选参数落到 Headlight Bulbs | 建议新建，因现有页面语义不够 |
| 360 旋转卡口 | `360° rotating collar` | 建议新建功能型集合页，聚合相关系列/产品 | 建议新建，适合品牌差异点 |
| 内饰/辅助灯 | `Interior & auxiliary upgrade` | 复用 Interior Lights：https://sealight-led.com/collection/interior-lights | 不新建 |

建议新增页面：

1. `/shop-by-need`：需求型总入口，作为导航 Mega 和首页模块的总承接。
2. `/collection/easy-install-led-bulbs`：强调 plug-and-play / no modification。
3. `/collection/360-rotating-collar-led-bulbs`：强调可调光型和适配差异。

### 6.4 M04 Before / After Slider

| 项目 | 建议 |
|---|---|
| 模块状态 | 新增 |
| 主要 CTA | `See More Customer Reviews` |
| 旧页面链接 | https://sealight-led.com/page/sealight-reviews |
| 是否新建页面 | 暂不新建 |
| 旧页是否调整 | 是 |
| 调整建议 | Reviews 页需要增加真实车辆图、Before/After、车型/产品/灯位标签；否则首页点击后的体验断层较大 |
| 技术需求 | 首页实现可拖动 Before/After Slider；图片需支持 WebP/AVIF、移动端降级为静态对比 |
| 设计需求 | 不使用纯占位图；需要真实车辆照、安装前后光型照、夜路对比照 |

后续可选新增：

- `/reviews` 或 `/customer-gallery`：如果 UGC 素材足够多，建议从现有 `SEALIGHT Reviews` 升级为图库式页面。

### 6.5 M05 Series Rail

| 项目 | 建议 |
|---|---|
| 模块状态 | 重做 |
| 主要 CTA | `Compare All Series` / `Shop [Series]` |
| 旧页面链接 | https://sealight-led.com/collection/forward-lighting |
| 是否新建页面 | 暂不新建，但强烈建议重构旧页 |
| 旧页是否调整 | 是 |
| 调整建议 | 当前系列体系多且命名复杂，应改成“用户能理解的系列对比页”：Brightest / Recommended / Popular / New / Efficient |
| 技术需求 | 首页横向 Series Rail；每张卡进入对应系列集合页；支持商品数量、价格区间、适用灯位 |
| 设计需求 | 保留 v04 的横向 rail，但正式文案需采用主站真实系列名，不直接沿用 Nova / Pulsar / Prism / Spark / Ray，除非品牌确认会改名 |

注意：v04 demo 中的 Nova / Pulsar / Prism / Spark / Ray 是设计命名探索。主站当前真实系列包含 Scoparc S7S、Scoparc S2、Scoparc S1、Laxmas L2S、Xenower X 系列等。正式上线前必须由产品/品牌确认是否改名。

### 6.6 M06 Reviews / UGC

| 项目 | 建议 |
|---|---|
| 模块状态 | 保留并强化 |
| 主要 CTA | `See More Customer Reviews` / `Share Your Install Results` |
| 旧页面链接 | https://sealight-led.com/page/sealight-reviews |
| 是否新建页面 | 暂不新建 |
| 旧页是否调整 | 是 |
| 调整建议 | 旧 Reviews 页需要从“评论列表”升级为“真实车辆 + 产品 + 场景”的证据页 |
| 技术需求 | 评论卡支持产品链接、车型、星级、图片；可接现有评论系统或手动精选 |
| 设计需求 | 首页只展示 3-4 条精选，不做过长评论墙 |

### 6.7 M07 Support CTA

| 项目 | 建议 |
|---|---|
| 模块状态 | 合并 Brand + Bottom CTA |
| 主要 CTA | `Find My Bulb` / `Installation Guides` / `Contact Support` |
| 旧页面链接 | Help Center：https://sealight-led.com/page/help-center |
| 是否新建页面 | 不新建 |
| 旧页是否调整 | 是 |
| 调整建议 | Help Center 当前可承接支持入口，但首页点击后应优先展示 Fitment、Installation、Troubleshooting、Contact，而不是让用户先面对过多账户/订单信息 |
| 技术需求 | CTA 直接跳转到 Help Center 对应区块；如旧页无锚点，需要技术加锚点 |
| 设计需求 | 收尾模块用大标题 + 3 个明确 CTA，避免重复一屏 Bottom CTA |

相关旧页：

- Help Center：https://sealight-led.com/page/help-center
- Installation Manuals：https://sealight-led.com/page/installation-guides
- FAQ：https://sealight-led.com/page/faq
- Contact Us：https://sealight-led.com/page/contact-us

### 6.8 M08 Learn / Education

| 项目 | 建议 |
|---|---|
| 模块状态 | 降级到 Footer 上方或 Footer 内 |
| 主要 CTA | `Read LED Upgrade Guides` |
| 旧页面链接 | https://sealight-led.com/blog |
| 是否新建页面 | 建议新建 `/learn` Hub |
| 旧页是否调整 | 是 |
| 调整建议 | Blog 可继续存在，但首页 Learn 入口需要更结构化：Buying Guides、Vehicle Specific、Installation、Beam Pattern、Canbus / Decoders |
| 技术需求 | 新建 Learn Hub 或在 Blog 上增加分类聚合页；首页 Learn 卡片链接到具体文章或 Hub |
| 设计需求 | 首页只保留 3-4 张教育卡，不抢核心购物模块空间 |

建议 Learn Hub 结构：

| 分区 | 英文栏目 | 承接内容 |
|---|---|---|
| 新手入门 | LED Basics | Halogen vs LED、Lumens、Color Temperature |
| 光型与安全 | Beam Pattern 101 | 光型、眩光、切线、安装角度 |
| 车型指南 | Vehicle Guides | F-150、Ram 1500、Camry 等车型文章 |
| 安装与排障 | Install & Troubleshooting | Installation Manuals、Flickering、No Light、Canbus |
| 购买指南 | Buying Guides | Best bulbs、Fog lights、Combo kits |

### 6.9 Categories Quick Access

| 项目 | 建议 |
|---|---|
| 模块状态 | 从首页删除，移入导航 Mega |
| 主要 CTA | `Shop by Category` |
| 旧页面链接 | 使用现有类目页 |
| 是否新建页面 | 不新建 |
| 旧页是否调整 | 轻微调整 |
| 调整建议 | 类目页作为购买页保留；首页不再占一整屏展示 8 个 icon |
| 技术需求 | 导航 Mega 中列出 Headlights、Fog Lights、Combo、Brake/Tail、Reverse、Turn Signal、Interior、Decoders |
| 设计需求 | Mega Menu 中类目列要有清晰分组和重点入口 |

### 6.10 Footer

| 项目 | 建议 |
|---|---|
| 模块状态 | 保留并重排 |
| 是否新建页面 | 不新建 |
| 旧页是否调整 | 是 |
| 调整建议 | Footer 信息较多，建议按 Shop、Support、Learn、Company、Account 分组 |
| 技术需求 | 保持 Privacy Policy、Terms、Shipping、Return、Payment、Contact 等合规链接 |
| 设计需求 | 避免 Footer 变成所有链接堆叠，优先保留用户购买/售后路径 |

---

## 7. 旧页面调整优先级

### P0 必须调整

| 页面 | URL | 原因 | 调整方向 |
|---|---|---|---|
| Automotive Bulb Finder | https://sealight-led.com/automotive-bulb-finder | 首页主 CTA 承接 | 确认接口、结果页、匹配商品、推荐系列、错误兜底 |
| Forward Lighting / Series | https://sealight-led.com/collection/forward-lighting | Series Rail 承接 | 重构为可理解的系列对比页 |
| Help Center | https://sealight-led.com/page/help-center | Support 承接 | 首页 CTA 到达后优先显示安装/排障/联系 |
| SEALIGHT Reviews | https://sealight-led.com/page/sealight-reviews | UGC 承接 | 增加真实车辆图、Before/After、车型/产品标签 |

### P1 建议调整

| 页面 | URL | 调整方向 |
|---|---|---|
| Blog | https://sealight-led.com/blog | 新建或整理为 Learn Hub |
| Installation Manuals | https://sealight-led.com/page/installation-guides | 加强首页入口、增加按产品/灯位/问题筛选 |
| Headlight Bulbs | https://sealight-led.com/category/headlight-bulbs | 首屏增加“Night Driving / Brightness”语义承接 |
| Fog Light Bulbs | https://sealight-led.com/category/fog-light-bulbs | 首屏增加 Weather / Fog / Snow 场景承接 |

### P2 后续优化

| 页面 | URL | 调整方向 |
|---|---|---|
| About SEALIGHT | https://sealight-led.com/page/about-us | 强化品牌故事，可放到 Footer/Company |
| Contact Us | https://sealight-led.com/page/contact-us | 保持售后入口清晰 |
| FAQ | https://sealight-led.com/page/faq | 与 Help Center 做信息去重 |

---

## 8. 设计需求清单

### 8.1 首页视觉

1. Hero 需最终确认方向：建议采用 v04 的 `Cinematic Beam` 或 `Editorial Split`，但必须使用真实产品/车辆素材替换占位。
2. 深色与浅色分区交替，避免全站只有黑橙一种情绪。
3. Trust Bar 轻量化，不再使用重卡片。
4. Scene 模块采用 `1 flagship + 3 small cards + 1 wide card` 或等价节奏。
5. Series 模块用横向 rail，卡片必须表达“适合谁 / 核心优势 / 价格或性能层级”。
6. UGC 模块必须带真实车辆图片，不建议只放文字评价。
7. 移动端需单独设计 Nav Drawer、Fitment 入口、横向卡片滚动。

### 8.2 素材需求

| 素材 | 数量 | 用途 |
|---|---:|---|
| 夜驾 Hero 图/视频 | 1-2 组 | 首屏 |
| 产品棚拍/透明底图 | 5-8 张 | Hero、Series、Mega Menu |
| Before/After 对比图 | 5-10 组 | Slider、Reviews |
| 真实车辆安装图 | 8-12 张 | UGC、Reviews |
| 安装过程短视频/GIF | 3-5 条 | Easy Install、Support |

---

## 9. 技术需求清单

### 9.1 组件与后台

| 组件 | 要求 |
|---|---|
| Header / Mega Menu | 支持桌面 hover/click 展开；移动端 Drawer/Accordion |
| Fitment Sticky | Year / Make / Model / Position；可配置是否首屏常驻 |
| Hero | 支持图片/视频兜底；LCP 预算需控制 |
| Scene Cards | 每张卡后台可配置标题、文案、图片、CTA、链接 |
| Before/After Slider | 支持拖动、键盘可访问、移动端触控 |
| Series Rail | 支持横向滚动、系列卡链接、商品数量/价格区间 |
| Reviews / UGC | 支持图片、车型、产品、评分、评论摘要 |
| Learn Cards | 支持文章卡片、分类标签、跳转链接 |

### 9.2 接口与跳转

1. `Find My Bulb` 必须接入主站现有 Fitment 数据。
2. Fitment 结果页需要确认是否能返回匹配商品数量、灯位、推荐系列。
3. 首页所有 CTA 禁止使用 `#` 占位；上线前必须替换为真实 URL。
4. 支持类 CTA 如果跳 Help Center 子区块，需要技术增加稳定锚点。
5. 系列卡必须用主站确认后的真实系列名和真实集合页。

### 9.3 埋点

| 事件 | 说明 |
|---|---|
| `home_hero_cta_click` | Hero 主 CTA 点击 |
| `fitment_start` | 用户开始选择车型 |
| `fitment_complete` | 用户完成车型选择 |
| `fitment_result_click` | 用户点击匹配商品 |
| `scene_card_click` | 场景卡点击 |
| `series_card_click` | 系列卡点击 |
| `before_after_interact` | 用户拖动 Before/After |
| `review_card_click` | 评论/UGC 卡点击 |
| `learn_card_click` | Learn 卡点击 |
| `support_cta_click` | Support CTA 点击 |

---

## 10. 上线节奏

### Phase 1：需求确认与页面盘点

1. 确认本文件中的导航结构与模块承接矩阵。
2. 技术确认现有页面 URL、后台可配置能力、Fitment 数据接口。
3. 品牌/产品确认系列命名是否沿用主站真实系列，还是采用 v04 新命名。

### Phase 2：设计细化

1. 在 Figma 中新建 v04 Homepage 页面。
2. 细化桌面端 Header / Mega Menu / Fitment Sticky。
3. 单独产出移动端 Nav Drawer 与 Fitment 交互。
4. 替换 demo 占位图，补齐真实车辆和产品素材。

### Phase 3：技术开发

1. 在 staging 环境实现首页模块。
2. 对接 Fitment。
3. 替换所有 CTA 链接。
4. 增加埋点。
5. 完成桌面、移动端、多浏览器测试。

### Phase 4：测试与上线

1. 内部 review。
2. 先灰度或 A/B Test。
3. 观察 Fitment 完成率、Scene CTR、Series CTR、PDP 到达率、加购率、跳出率。
4. 达到阈值后全量上线。
5. 保留旧首页回滚方案。

---

## 11. 后续计划：Demo 部署

Demo 部署不作为本次方案文档的阻塞项。

### 11.1 Vercel

当前 Vercel 插件安装异常，后续可选路径：

1. 手动创建 GitHub 仓库并导入 Vercel。
2. 静态站 Framework 选择 `Other`。
3. 关闭 Deployment Protection，避免内部同事访问时被要求登录。
4. 使用稳定 Production URL 分享，不使用一次性 Preview URL。

### 11.2 腾讯云

可选路径：

1. 静态文件上传腾讯云 COS，开启静态网站托管。
2. 或部署到腾讯云服务器 Nginx 静态目录。
3. 后续如需要中国大陆访问更稳定，可再评估 CDN 与备案问题。

---

## 12. 需要团队确认的问题

1. `Find My Bulb` 当前结果页是否能返回推荐系列和匹配商品数量？
2. 主站系列命名是否沿用 Scoparc / Xenower / Laxmas，还是准备改为 Nova / Pulsar / Prism 等新命名？
3. `Shop by Need` 是否接受新建总入口 `/shop-by-need`？
4. 是否新建 `Easy Install LED Bulbs` 和 `360° Rotating Collar LED Bulbs` 两个功能型集合页？
5. Reviews 页是否能改造成图库式 UGC 页面？
6. Blog 是否能新建 `/learn` Hub，还是只能在现有 Blog 分类中解决？
7. 后台是否支持首页模块按卡片配置图片、标题、文案、CTA、链接？
8. 首页 Hero 是否使用视频？如果使用，LCP 和移动端兜底方案是什么？
9. 首页上线方式是一口气替换，还是先灰度 Hero + Nav？

---

## 13. 本次建议总结

本次首页改版不建议只做视觉换皮。真正需要落地的是：

1. 用 `Find My Bulb` 和 `Shop by Need` 降低选择门槛。
2. 用 Mega Menu 重新组织复杂商品结构。
3. 用真实车辆图、Before/After、Reviews 补足信任。
4. 用 Series 对比页解决用户不知道买哪一档的问题。
5. 用 Learn / Support 承接新手教育和安装排障。
6. 控制新建页面数量，只新建真正有长期价值的 Hub 或功能型集合页。

建议优先新建：

1. `/shop-by-need`
2. `/collection/easy-install-led-bulbs`
3. `/collection/360-rotating-collar-led-bulbs`
4. `/learn`

建议优先调整：

1. `Automotive Bulb Finder`
2. `Forward Lighting / Series`
3. `SEALIGHT Reviews`
4. `Help Center`
5. `Blog / Learn`

