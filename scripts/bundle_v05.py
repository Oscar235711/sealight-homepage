#!/usr/bin/env python3
"""
SEALIGHT v05 homepage bundler.

Reads the JSX/CSS sources from the repo root, inlines everything into a
self-contained static `index.html` (= `SEALIGHT v05.html`). No build step
required at runtime — the page loads React + Babel from unpkg.

Usage:
    python scripts/bundle_v05.py

Run this after editing any of: tokens.css, components.css, nav-variants.css,
hero-variants.css, modules.css, navs.jsx, heros.jsx, modules.jsx.
"""
import pathlib
import sys

base = pathlib.Path(__file__).resolve().parent.parent   # repo root
out  = base / 'SEALIGHT v05.html'

css_files = ['tokens.css', 'components.css', 'nav-variants.css', 'hero-variants.css', 'modules.css']
jsx_files = ['navs.jsx', 'heros.jsx', 'modules.jsx']

# Fail early if any source is missing.
for f in css_files + jsx_files:
    p = base / f
    if not p.exists():
        sys.exit(f'[bundle] missing source: {p}')

css_block = '\n'.join(
    f'/* ── {f} ── */\n{(base / f).read_text(encoding="utf-8")}'
    for f in css_files
)

jsx_blocks = {f: (base / f).read_text(encoding='utf-8') for f in jsx_files}

app_jsx = r"""
function App() {
  return (
    <div className="sl-root" data-tone="hybrid">
      <NavB />
      <Hero3Fitment />
      <TrustBar />
      <ScenesModule />
      <BeforeAfterModule />
      <SeriesModule />
      <ReviewsModule dark={true} />
      <SupportCTA />
      <SiteFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
"""

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#0D0D0D" />
<title>SEALIGHT LED Headlight Bulbs — See the Road Ahead</title>
<meta name="description" content="Premium LED headlight upgrades with verified vehicle fitment. Brightness, precision beam, or easy install — built for how you actually drive." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="SEALIGHT LED Headlight Bulbs — See the Road Ahead" />
<meta property="og:description" content="Verified fitment. Plug-and-play upgrade options. 500,000+ drivers trust SEALIGHT for safer, brighter night driving." />
<meta property="og:image" content="assets/og-preview.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="SEALIGHT" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SEALIGHT LED Headlight Bulbs — See the Road Ahead" />
<meta name="twitter:description" content="Verified fitment. Plug-and-play upgrade options. Built for how you actually drive." />
<meta name="twitter:image" content="assets/og-preview.svg" />

<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
<link rel="apple-touch-icon" href="assets/favicon.svg" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

<style>
{css_block}

/* ── v05 page chrome ── */
html, body {{ margin: 0; background: #F7F5F1; overflow-x: hidden; }}
body {{ max-width: 100vw; }}
#root {{ min-height: 100vh; }}

/* ── responsive (mobile, ≤ 900px) ── */
@media (max-width: 900px) {{
  .sl-root .container {{ padding-left: 20px !important; padding-right: 20px !important; }}
  .sl-root .section-pad,
  .sl-root .section-pad-sm {{ padding-top: 56px; padding-bottom: 56px; }}

  /* Nav B */
  .sl-root .navB-top {{ flex-wrap: wrap; gap: 12px; padding: 14px 20px !important; }}
  .sl-root .navB-top ul {{ display: none; }}
  .sl-root .navB-bar {{ padding: 12px 0; }}
  .sl-root .navB-bar-inner {{ flex-wrap: wrap; gap: 8px; padding: 0 20px !important; }}
  .sl-root .navB-pick {{ flex: 1 1 calc(50% - 4px); min-width: 0; }}
  .sl-root .navB-label {{ flex-basis: 100%; }}
  .sl-root .navB-hint {{ display: none; }}

  /* Hero 3 fitment row */
  .sl-root .hero3 h1 {{ font-size: 40px !important; }}
  .sl-root .hero3-fit-row {{ flex-wrap: wrap; gap: 8px; }}
  .sl-root .hero3-slot {{ flex: 1 1 calc(50% - 4px); min-width: 0; }}
  .sl-root .hero3-fit-row .go {{ flex: 1 1 100%; }}
  .sl-root .hero3-stats {{ gap: 18px; flex-wrap: wrap; }}
  .sl-root .hero3-altlinks {{ flex-wrap: wrap; gap: 10px; }}

  /* Scenes */
  .sl-root .scene-row {{ grid-template-columns: 1fr !important; }}
  .sl-root .scene-card.featured {{ grid-column: auto !important; grid-row: auto !important; aspect-ratio: 16/10; }}

  /* Series rail */
  .sl-root .series-rail {{ grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }}
  .sl-root .series-card h3 {{ font-size: 22px !important; }}

  /* Reviews */
  .sl-root .reviews-grid {{ grid-template-columns: 1fr !important; }}

  /* Trust bar */
  .sl-root .hairline-row {{ flex-direction: column; gap: 16px; padding: 20px 0 !important; }}

  /* Section head */
  .sl-root .sec-head {{ grid-template-columns: 1fr !important; gap: 16px; }}
  .sl-root .sec-head h2 {{ font-size: clamp(28px, 8vw, 42px) !important; }}

  /* Footer */
  .sl-root .site-footer .cols {{ grid-template-columns: 1fr 1fr !important; gap: 32px 20px; }}
  .sl-root .site-footer .brand {{ grid-column: 1 / -1; }}

  /* Before/After — smaller height */
  .sl-root .ba-wrap {{ aspect-ratio: 4/3 !important; }}

  /* Hero 1 / 2 grids collapse */
  .sl-root .hero1-grid, .sl-root .hero2-grid {{ grid-template-columns: 1fr !important; }}
}}
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<script type="text/babel" data-file="navs.jsx">
{jsx_blocks['navs.jsx']}
</script>

<script type="text/babel" data-file="heros.jsx">
{jsx_blocks['heros.jsx']}
</script>

<script type="text/babel" data-file="modules.jsx">
{jsx_blocks['modules.jsx']}
</script>

<script type="text/babel" data-file="app.jsx">
{app_jsx}
</script>

</body>
</html>"""

out.write_text(html, encoding='utf-8')
(base / 'index.html').write_text(html, encoding='utf-8')
print(f'bundled → {out} ({len(html):,} bytes)')
print(f'bundled → {base / "index.html"} ({len(html):,} bytes)')
