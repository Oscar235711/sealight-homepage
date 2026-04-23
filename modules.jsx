// SEALIGHT v04 · Shared modules (scenes, series, reviews, footer) used across all 3 full-page assemblies

function TrustBar() {
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '0' }}>
      <div className="container">
        <ul className="hairline-row">
          <li><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" strokeWidth="1.6"><rect x="3" y="6" width="16" height="12" rx="2"/><path d="M7 11l3 3 6-6" strokeLinecap="round"/></svg><div><strong>Verified Vehicle Fitment</strong><span>Confirmed for your exact year, make &amp; model.</span></div></li>
          <li><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" strokeWidth="1.6"><circle cx="11" cy="11" r="8"/><path d="M7 11h8M11 7v8" strokeLinecap="round"/></svg><div><strong>Plug-and-Play Options</strong><span>No programmer. Drop-in replacements that just work.</span></div></li>
          <li><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" strokeWidth="1.6"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M2 11h18M6 4l2 3M16 4l-2 3" strokeLinecap="round"/></svg><div><strong>Free US Shipping</strong><span>Ships from US warehouse — 2-5 business days.</span></div></li>
          <li><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--accent)" strokeWidth="1.6"><path d="M11 3l2.5 5 5.5.8-4 4 1 5.5L11 16l-5 2.3 1-5.5-4-4 5.5-.8z" strokeLinejoin="round"/></svg><div><strong>30-Day Returns + Expert Support</strong><span>Hassle-free returns and live help before &amp; after.</span></div></li>
        </ul>
      </div>
    </section>
  );
}

function ScenesModule() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="sec-head">
          <h2>Shop by how you actually drive.</h2>
          <div className="sec-kicker">
            <div className="sl-eyebrow">01 · DRIVING NEED</div>
            <p>Skip the spec sheets. Tell us the problem you're solving — dark back roads, glare, tricky install — and we'll narrow the lineup.</p>
          </div>
        </div>
        <div className="scene-row">
          <div className="scene-card featured">
            <div className="bg" />
            <div className="mask" />
            <div className="body">
              <span className="tag">★ FLAGSHIP SCENE</span>
              <div>
                <h3>I want to see farther on dark highways.</h3>
                <p>Maximum usable output for unlit two-lanes, long hauls, and rural night driving.</p>
                <a href="https://sealight-led.com/category/headlight-bulbs" className="cta-arrow" style={{ marginTop: 18, textDecoration: 'none' }}>Shop brightness upgrades
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="scene-card">
            <div className="bg" style={{ background: 'linear-gradient(180deg,#2B2E35 0%,#111318 100%)' }}/>
            <div className="mask" />
            <div className="body">
              <span className="tag">WEATHER</span>
              <div><h3>Rain, fog, snow</h3><p>Penetrating beam patterns for low-visibility weather.</p></div>
            </div>
          </div>
          <div className="scene-card">
            <div className="bg" style={{ background: 'linear-gradient(180deg,#232630 0%,#0D0F14 100%)' }}/>
            <div className="mask" />
            <div className="body">
              <span className="tag">INSTALL</span>
              <div><h3>5-minute install</h3><p>No tools, no coding. Plug-and-play drop-ins.</p></div>
            </div>
          </div>
          <div className="scene-card">
            <div className="bg" style={{ background: 'linear-gradient(180deg,#332315 0%,#120A04 100%)' }}/>
            <div className="mask" />
            <div className="body">
              <span className="tag">UNIVERSAL</span>
              <div><h3>360° rotating collar</h3><p>Fits odd housings — dial in the cutoff perfectly.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterModule() {
  const [pos, setPos] = React.useState(50);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let dragging = false;

    const setFromClient = (clientX) => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      setPos(p);
    };

    const onDown = (e) => {
      dragging = true;
      if (e.pointerId != null) {
        try { el.setPointerCapture(e.pointerId); } catch {}
      }
      setFromClient(e.clientX);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      setFromClient(e.clientX);
    };
    const onUp = () => { dragging = false; };
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { setPos(p => Math.max(0, p - 2)); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPos(p => Math.min(100, p + 2)); e.preventDefault(); }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('keydown', onKey);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section className="section-pad-sm" style={{ background: 'var(--bg-2)', padding: '56px 0' }}>
      <div className="container">
        <div
          className="ba-wrap"
          ref={wrapRef}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
          tabIndex={0}
          style={{ touchAction: 'none', cursor: 'ew-resize', userSelect: 'none' }}
        >
          <div className="ba-half before" style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }} />
          <div className="ba-half after"  style={{ clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)` }} />
          <div className="ba-divider" style={{ left: pos + '%' }} />
          <div className="ba-label left">BEFORE · FACTORY HALOGEN</div>
          <div className="ba-label right">SEALIGHT SCOPARC S7S</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Drag the divider · Keyboard ← → · <a href="https://sealight-led.com/page/sealight-reviews" style={{ borderBottom: '1px solid currentColor' }}>See more real comparisons</a>
        </div>
      </div>
    </section>
  );
}

function SeriesModule() {
  const series = [
    { code: 'S7S', name: 'Scoparc S7S', tag: 'Flagship brightness', brightness: 100, beam: 80, install: 50, price: '$139', popular: false, url: 'https://sealight-led.com/collection/forward-lighting' },
    { code: 'S2', name: 'Scoparc S2', tag: 'Safety precision', brightness: 80, beam: 100, install: 60, price: '$119', popular: false, url: 'https://sealight-led.com/collection/forward-lighting' },
    { code: 'S1', name: 'Scoparc S1', tag: 'Style performance', brightness: 85, beam: 85, install: 80, price: '$99', popular: true, url: 'https://sealight-led.com/collection/forward-lighting' },
    { code: 'L2S', name: 'Laxmas L2S', tag: 'Plug-and-play', brightness: 65, beam: 65, install: 100, price: '$79', popular: false, url: 'https://sealight-led.com/collection/forward-lighting' },
    { code: 'X', name: 'Xenower X', tag: 'Smart value', brightness: 60, beam: 60, install: 80, price: '$59', popular: false, url: 'https://sealight-led.com/collection/forward-lighting' },
  ];
  return (
    <section className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="sec-head">
          <h2>A series for every kind of driver.</h2>
          <div className="sec-kicker">
            <div className="sl-eyebrow">02 · SERIES SELECTOR</div>
            <p>Compare by what actually matters — brightness, beam quality, install ease. Not just price.</p>
          </div>
        </div>
        <div className="series-rail">
          {series.map(s => (
            <div key={s.code} className={`series-card${s.popular ? ' popular' : ''}`}>
              {s.popular && <span className="popular-flag">Most popular</span>}
              <div className="img-ph"><span className="ph-label">{s.code}</span></div>
              <div>
                <h3>{s.name}</h3>
                <div className="tagline">{s.tag}</div>
              </div>
              <ul className="specs">
                <li><span>Bright</span><span className="bar"><i style={{ width: s.brightness + '%' }}/></span></li>
                <li><span>Beam</span><span className="bar"><i style={{ width: s.beam + '%' }}/></span></li>
                <li><span>Install</span><span className="bar"><i style={{ width: s.install + '%' }}/></span></li>
              </ul>
              <div className="price">From <b>{s.price}</b></div>
              <a href={s.url} className="btn btn-outline btn-sm" style={{ marginTop: 12, display: 'block', textAlign: 'center' }}>Shop {s.name} →</a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 20, justifyContent: 'center', fontSize: 13, color: 'var(--fg-2)' }}>
          <a href="https://sealight-led.com/collection/forward-lighting" style={{ borderBottom: '1px solid currentColor' }}>View full comparison →</a>
          <span style={{ opacity: .3 }}>·</span>
          <a href="https://sealight-led.com/automotive-bulb-finder" style={{ borderBottom: '1px solid currentColor' }}>Not sure? Find by vehicle →</a>
        </div>
      </div>
    </section>
  );
}

function ReviewsModule({ dark = true }) {
  const reviews = [
    { stars: 5, quote: "Installed in under 10 minutes, no coding, no flickering. The difference at night is massive.", name: 'Mike T.', vehicle: '2020 Toyota Tacoma', series: 'Scoparc S1' },
    { stars: 5, quote: "Beam pattern is so much cleaner than stock. Zero glare on oncoming traffic.", name: 'Sarah K.', vehicle: '2019 Honda CR-V', series: 'Scoparc S2' },
    { stars: 5, quote: "Came back for fog lights after the headlights. Quality is consistent across the line.", name: 'James R.', vehicle: '2021 Ford F-150', series: 'Scoparc S7S' },
  ];
  return (
    <section className="section-pad" style={{ background: dark ? 'var(--bg-3)' : 'var(--bg)', color: dark ? '#fff' : 'var(--fg)' }}>
      <div className="container">
        <div className="sec-head">
          <h2 style={{ color: dark ? '#fff' : undefined }}>Real drivers. Real trucks. Real roads.</h2>
          <div className="sec-kicker">
            <div className="sl-eyebrow" style={{ color: dark ? 'rgba(255,255,255,.5)' : undefined }}>03 · USER PROOF</div>
            <p style={{ color: dark ? 'rgba(255,255,255,.7)' : undefined }}>38,000+ verified reviews. We show the installs, not just the stars.</p>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((r,i) => (
            <div key={i} className={`review-card ${dark ? 'dark' : ''}`} style={dark ? { background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.08)' } : {}}>
              <div className="img-ph" data-theme={dark ? 'dark' : 'light'}><span className="ph-label">[ INSTALL PHOTO · {r.vehicle} ]</span></div>
              <div className="stars">★★★★★</div>
              <blockquote>"{r.quote}"</blockquote>
              <div className="meta">
                <span>{r.name} · {r.vehicle}</span>
                <span>{r.series}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportCTA() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="sec-head sec-head-center" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>Find the right bulb, the first time.</h2>
          <div className="sec-kicker" style={{ textAlign: 'center' }}>
            <p>Start from your vehicle, or tell us how you drive. We'll handle the rest — fitment, beam, install guide, support.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://sealight-led.com/automotive-bulb-finder" className="btn btn-primary btn-lg">Find My Bulb →</a>
          <a href="https://sealight-led.com/category/headlight-bulbs" className="btn btn-outline btn-lg">Shop by driving need</a>
          <a href="https://sealight-led.com/collection/forward-lighting" className="btn btn-outline btn-lg">Compare all series</a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div className="brand">
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.04em' }}>
              SEA<em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>LIGHT</em>
            </div>
            <p>Premium LED upgrades with verified fitment. Built for how you drive — night, weather, trail, or the commute home.</p>
          </div>
          <div><h5>Shop</h5><ul><li><a href="https://sealight-led.com/category/headlight-bulbs">Headlights</a></li><li><a href="https://sealight-led.com/category/fog-light-bulbs">Fog &amp; Driving</a></li><li><a href="https://sealight-led.com/collection/interior-lights">Interior</a></li><li><a href="https://sealight-led.com/collection/package-combo">Combo kits</a></li></ul></div>
          <div><h5>Series</h5><ul><li><a href="https://sealight-led.com/collection/forward-lighting">Scoparc S7S</a></li><li><a href="https://sealight-led.com/collection/forward-lighting">Scoparc S2 · S1</a></li><li><a href="https://sealight-led.com/collection/forward-lighting">Laxmas L2S</a></li><li><a href="https://sealight-led.com/collection/forward-lighting">Xenower X</a></li></ul></div>
          <div><h5>Support</h5><ul><li><a href="https://sealight-led.com/automotive-bulb-finder">Fitment finder</a></li><li><a href="https://sealight-led.com/page/installation-guides">Install guides</a></li><li><a href="https://sealight-led.com/page/help-center">Troubleshooting</a></li><li><a href="https://sealight-led.com/page/contact-us">Contact</a></li></ul></div>
          <div><h5>Learn</h5><ul><li><a href="https://sealight-led.com/blog">Halogen vs LED</a></li><li><a href="https://sealight-led.com/blog">Beam pattern 101</a></li><li><a href="https://sealight-led.com/category/canbus-decoder-resistor">Canbus &amp; decoders</a></li><li><a href="https://sealight-led.com/blog">Blog</a></li></ul></div>
        </div>
        <div className="legal">
          <span>© 2026 SEALIGHT · All rights reserved</span>
          <span>INTERNAL PREVIEW v04 · INLINE WITH ROADMAP</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { TrustBar, ScenesModule, BeforeAfterModule, SeriesModule, ReviewsModule, SupportCTA, SiteFooter });
