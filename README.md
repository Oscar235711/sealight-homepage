# SEALIGHT Homepage

Production homepage + internal design-review artifacts for sealight-led.com.

The live homepage is the **v05** design (Nav B + Fitment-first Hero + Hybrid tone). It ships as a self-contained static `index.html` that renders a React app from CDN — no build step required.

---

## What's in this repo

### Production

| File | Purpose |
|---|---|
| `index.html` | **Live homepage.** Self-contained, serves at `/`. Identical to `SEALIGHT v05.html`. |
| `SEALIGHT v05.html` | Named artifact. Same content as `index.html`. |
| `assets/` | SVG favicon + OG preview image. |

### Design-review artifacts (internal)

| File | Purpose |
|---|---|
| `SEALIGHT v04.html` | Pan-and-zoom canvas exploring **3 Nav × 3 Hero × 3 Tone** variants. |
| `SEALIGHT v04 Reader.html` | Document-style reader that walks through the design decisions. |
| `SEALIGHT-首页改版需求方案.md` | Full requirements spec (page mapping, nav structure, module matrix, launch phases). |
| `Optimization Plan.html` | Early handoff plan (design system, roadmap). |
| `v03-index.html` | Previous production homepage — kept as reference. |

### Source (for rebuilding v05)

| File | Purpose |
|---|---|
| `tokens.css` | Design tokens (3 tonal modes: midnight / daylight / hybrid). |
| `components.css` | Buttons, cards, section heads, chips. |
| `nav-variants.css`, `hero-variants.css`, `modules.css` | Variant-specific styles. |
| `navs.jsx`, `heros.jsx`, `modules.jsx` | React components. |
| `design-canvas.jsx` | Pan/zoom engine used by v04 canvas only. |

### Tests

| File | Purpose |
|---|---|
| `tests/e2e.mjs` | Headless-browser E2E suite (19 tests: rendering, real URLs, draggable slider, mobile overflow, …). |

---

## Running locally

```bash
# static server on http://127.0.0.1:8765
python -m http.server 8765
```

Then open `http://127.0.0.1:8765/`. Or double-click `index.html` to open via `file://` — everything is self-contained.

---

## Running tests

```bash
cd tests
npm install          # once — installs puppeteer-core
npm test             # runs all 19 E2E tests against index.html
```

Point at a different URL (e.g. a deployed preview):

```bash
node e2e.mjs https://sealight-homepage.vercel.app/
```

---

## Rebuilding `SEALIGHT v05.html` / `index.html`

The live page is assembled from the JSX + CSS sources by `bundle_v05.py`. When you edit any of the `.jsx` / `.css` files, re-run:

```bash
python /path/to/bundle_v05.py
```

(The bundler lives in `/tmp/probe/bundle_v05.py` during development; if you want it tracked, move it into the repo.)

---

## Deployment

### Vercel

1. Import this repo in Vercel.
2. Framework preset: **Other** (or leave blank).
3. Build command: *(none)* — this is a pure-static site.
4. Output directory: `./` (the repo root).
5. `vercel.json` already sets sane headers + `cleanUrls`.

### Tencent Cloud (static hosting via COS)

1. Create a COS bucket, enable **Static Website Hosting**.
2. Upload the repo contents (or just the production files — see `DEPLOY.md`).
3. Set `index.html` as the default document.
4. Point your domain via CNAME or use the bucket's default domain.

See `DEPLOY.md` for fuller instructions.

---

## What v05 actually is

- **Nav B** — sticky Year/Make/Model fitment bar under the top nav.
- **Hero 3** — fitment-first, fullscreen video placeholder, "Start with your vehicle. Everything else follows."
- **Hybrid tone** — light editorial sections for product, dark cinematic section for UGC/reviews.
- **Orange** (`#FF6600`) — accent across CTAs, price bars, focus rings.
- **Real series names** — Scoparc S7S / S2 / S1, Laxmas L2S, Xenower X.
- **Real URLs** — every CTA points at a live sealight-led.com page (fitment finder, category pages, support, blog).

The design decisions behind this combination are documented in `SEALIGHT-首页改版需求方案.md` §5.3 and §6.
