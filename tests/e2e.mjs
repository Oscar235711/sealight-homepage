// SEALIGHT v05 · End-to-end tests
// Usage: node tests/e2e.mjs [url]
//   Default URL: file:// path to SEALIGHT v05.html sibling of this file's parent dir
// Exit code: 0 = all pass, 1 = at least one fail.
//
// Uses puppeteer-core + local Chrome. No other deps.

import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultFile = path.resolve(__dirname, '..', 'SEALIGHT v05.html');
const url = process.argv[2] || pathToFileURL(defaultFile).href;

// Locate Chrome executable across common install paths.
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const fs = require('fs');
  for (const p of candidates) try { if (fs.existsSync(p)) return p; } catch {}
  throw new Error('Chrome not found. Set CHROME_PATH env var.');
}

// --- tiny test runner ---
const results = [];
const test = async (name, fn) => {
  const t0 = Date.now();
  try { await fn(); results.push({ name, ok: true, ms: Date.now() - t0 }); }
  catch (e) { results.push({ name, ok: false, ms: Date.now() - t0, err: e.message }); }
};
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

// --- launch ---
import fs from 'fs';
const chromePath = (() => {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  for (const p of candidates) try { if (fs.existsSync(p)) return p; } catch {}
  throw new Error('Chrome not found. Set CHROME_PATH env var.');
})();

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleErrors = [];
const pageErrors = [];
const reqFails = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => pageErrors.push(e.message));
page.on('requestfailed', r => {
  const u = r.url();
  if (!u.includes('favicon') && !u.includes('design-canvas.state')) {
    reqFails.push(`${u} · ${r.failure()?.errorText}`);
  }
});

console.log(`\n▸ testing ${url}\n`);

await test('page loads without timeout', async () => {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));  // let Babel finish
});

await test('no page errors', async () => {
  assert(pageErrors.length === 0, `page errors: ${pageErrors.join('; ')}`);
});

await test('no failed network requests (excluding favicon)', async () => {
  assert(reqFails.length === 0, `failed requests: ${reqFails.join('; ')}`);
});

await test('title set', async () => {
  const t = await page.title();
  assert(t.includes('SEALIGHT'), `title was: ${t}`);
});

await test('root rendered, hybrid tone applied', async () => {
  const tone = await page.$eval('[data-tone]', el => el.getAttribute('data-tone'));
  assert(tone === 'hybrid', `tone was ${tone}`);
});

await test('logo reads SEALIGHT (not SEALLIGHT)', async () => {
  const txt = await page.$eval('.navA-logo', el => el.innerText);
  assert(txt === 'SEALIGHT', `logo: "${txt}"`);
});

await test('all 9 top-level sections present', async () => {
  const r = await page.evaluate(() => ({
    navB:    !!document.querySelector('.navB'),
    hero3:   !!document.querySelector('.hero3'),
    trust:   !!document.querySelector('.hairline-row'),
    scenes:  document.querySelectorAll('.scene-card').length,
    ba:      !!document.querySelector('.ba-wrap'),
    series:  document.querySelectorAll('.series-card').length,
    reviews: document.querySelectorAll('.review-card').length,
    support: !!document.querySelector('.btn-primary.btn-lg'),
    footer:  !!document.querySelector('.site-footer'),
  }));
  assert(r.navB,    'navB missing');
  assert(r.hero3,   'hero3 missing');
  assert(r.trust,   'trust bar missing');
  assert(r.scenes === 4,  `scenes count: ${r.scenes}`);
  assert(r.ba,      'before/after missing');
  assert(r.series === 5,  `series count: ${r.series}`);
  assert(r.reviews === 3, `reviews count: ${r.reviews}`);
  assert(r.support, 'support CTA missing');
  assert(r.footer,  'footer missing');
});

await test('series rail uses real SEALIGHT series names', async () => {
  const names = await page.$$eval('.series-card h3', els => els.map(e => e.innerText));
  const expected = ['Scoparc S7S', 'Scoparc S2', 'Scoparc S1', 'Laxmas L2S', 'Xenower X'];
  for (const n of expected) assert(names.includes(n), `missing series ${n} (got: ${names.join(', ')})`);
});

await test('no Nova/Pulsar/Prism/Spark/Ray leftover', async () => {
  const html = await page.content();
  for (const old of ['>Nova<', '>Pulsar<', '>Prism<', '>Spark<', '>Ray<']) {
    assert(!html.includes(old), `leftover ${old}`);
  }
});

await test('all <a> href values are real URLs (no # placeholders)', async () => {
  const bad = await page.$$eval('a', els => els.filter(a => {
    const h = a.getAttribute('href');
    return !h || h === '#' || h === '';
  }).map(a => a.innerText.slice(0, 30)));
  assert(bad.length === 0, `${bad.length} broken anchors: ${bad.join('; ')}`);
});

await test('key CTAs point to real sealight-led.com URLs', async () => {
  const expected = [
    ['Find My Bulb',          'automotive-bulb-finder'],
    ['Show 12 compatible',    'automotive-bulb-finder'],
    ['Shop Scoparc S7S',      'forward-lighting'],
    ['Shop brightness',       'headlight-bulbs'],
  ];
  for (const [text, mustContain] of expected) {
    const href = await page.evaluate((t) => {
      const a = [...document.querySelectorAll('a')].find(x => x.innerText.includes(t));
      return a?.getAttribute('href');
    }, text);
    assert(href && href.includes(mustContain), `"${text}" → ${href}`);
  }
});

await test('before/after slider is draggable', async () => {
  const wrap = await page.$('.ba-wrap');
  assert(wrap, 'ba-wrap missing');

  // Scroll into view and wait for scroll to settle
  await wrap.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 300));

  const startPos = await page.$eval('.ba-divider', el => el.style.left);

  // After scroll, boundingBox gives viewport coords
  const box = await wrap.boundingBox();
  const midX = box.x + box.width / 2;
  const midY = box.y + box.height / 2;
  await page.mouse.move(midX, midY);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.8, midY, { steps: 8 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 200));

  const endPos = await page.$eval('.ba-divider', el => el.style.left);
  assert(startPos !== endPos, `divider did not move: ${startPos} → ${endPos}`);
  const pct = parseFloat(endPos);
  assert(pct > 60, `expected divider > 60%, got ${endPos}`);
});

await test('before/after slider responds to keyboard', async () => {
  const wrap = await page.$('.ba-wrap');
  await wrap.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 200));
  await wrap.focus();
  const before = await page.$eval('.ba-divider', el => parseFloat(el.style.left));
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await new Promise(r => setTimeout(r, 100));
  const after = await page.$eval('.ba-divider', el => parseFloat(el.style.left));
  assert(after < before, `arrow keys didn't decrease position: ${before} → ${after}`);
});

await test('reviews show Scoparc series tags', async () => {
  const txt = await page.evaluate(() =>
    [...document.querySelectorAll('.review-card .meta span:last-child')].map(s => s.innerText)
  );
  assert(txt.some(t => t.includes('Scoparc')), `review series tags: ${JSON.stringify(txt)}`);
});

await test('footer contains required legal/support links', async () => {
  const links = await page.$$eval('.site-footer a', as => as.map(a => ({ t: a.innerText, h: a.getAttribute('href') })));
  const mustHave = ['Contact', 'Install guides', 'Blog'];
  for (const term of mustHave) {
    assert(links.some(l => l.t.includes(term)), `footer missing "${term}"`);
  }
});

await test('no trailing href="#" anywhere in rendered DOM', async () => {
  const hashCount = await page.evaluate(() =>
    [...document.querySelectorAll('a[href="#"]')].length
  );
  assert(hashCount === 0, `found ${hashCount} href="#" links`);
});

await test('accent color is SEALIGHT orange', async () => {
  const accent = await page.evaluate(() =>
    getComputedStyle(document.querySelector('.sl-root')).getPropertyValue('--accent').trim()
  );
  assert(accent.toUpperCase() === '#FF6600', `accent was: ${accent}`);
});

await test('hybrid tone has light bg + dark bg-3', async () => {
  const r = await page.evaluate(() => {
    const s = getComputedStyle(document.querySelector('.sl-root'));
    return { bg: s.getPropertyValue('--bg').trim(), bg3: s.getPropertyValue('--bg-3').trim() };
  });
  assert(r.bg === '#F7F5F1', `--bg was: ${r.bg}`);
  assert(r.bg3 === '#0B0C0E', `--bg-3 was: ${r.bg3}`);
});

await test('mobile viewport (375px) does not overflow horizontally', async () => {
  await page.setViewport({ width: 375, height: 800 });
  await new Promise(r => setTimeout(r, 500));
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  // allow small overflow for rounding, reject major
  assert(overflow < 20, `horizontal overflow: ${overflow}px`);
  await page.setViewport({ width: 1440, height: 900 });
});

await browser.close();

// --- report ---
const passed = results.filter(r => r.ok).length;
const failed = results.filter(r => !r.ok);
for (const r of results) {
  const badge = r.ok ? '  PASS' : '  FAIL';
  console.log(`${badge}  ${r.name}  (${r.ms}ms)`);
  if (!r.ok) console.log(`        → ${r.err}`);
}
console.log(`\n${passed}/${results.length} passed${failed.length ? `, ${failed.length} failed` : ''}`);

if (consoleErrors.length) {
  console.log('\nConsole errors:');
  for (const e of consoleErrors) console.log('  ', e);
}

process.exit(failed.length === 0 ? 0 : 1);
