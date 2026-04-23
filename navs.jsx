// SEALIGHT v04 · Nav variant components
const { useState } = React;

const Logo = ({ dark }) => (
  <a href="https://sealight-led.com/" className="navA-logo" style={dark ? { color: '#fff' } : {}}>
    SEA<em>LIGHT</em>
  </a>
);

function NavA({ onTone }) {
  const [open, setOpen] = useState(null);
  const cols = {
    need: { title: 'Shop by Need', items: [
      ['See farther at night', 'Brightness', 'https://sealight-led.com/category/headlight-bulbs'],
      ['Rain · Fog · Snow', 'Weather', 'https://sealight-led.com/category/fog-light-bulbs'],
      ['Easy self-install', 'Plug & Play', 'https://sealight-led.com/category/headlight-bulbs'],
      ['Fits any housing', 'Universal', 'https://sealight-led.com/collection/forward-lighting'],
      ['Off-road / Pickup', 'Trail', 'https://sealight-led.com/collection/led-fog-light-bulbs-extreme-conditions'],
    ]},
    vehicle: { title: 'Shop by Vehicle', items: [
      ['Year → Make → Model', 'Fitment', 'https://sealight-led.com/automotive-bulb-finder'],
      ['Ford F-150 (2015-24)', 'Popular', 'https://sealight-led.com/automotive-bulb-finder'],
      ['Toyota Tacoma', 'Popular', 'https://sealight-led.com/automotive-bulb-finder'],
      ['Jeep Wrangler JL', 'Popular', 'https://sealight-led.com/automotive-bulb-finder'],
      ['Browse all 10k+ fits', 'All', 'https://sealight-led.com/automotive-bulb-finder'],
    ]},
    bulb: { title: 'Shop by Bulb Size', items: [
      ['H11 / H8 / H9', 'Common', 'https://sealight-led.com/category/headlight-bulbs'],
      ['9005 / HB3', 'Common', 'https://sealight-led.com/category/headlight-bulbs'],
      ['9006 / HB4', 'Common', 'https://sealight-led.com/category/headlight-bulbs'],
      ['H7 · H4 · 9012', 'Common', 'https://sealight-led.com/category/headlight-bulbs'],
      ['Part number lookup', 'Tool', 'https://sealight-led.com/automotive-bulb-finder'],
    ]},
  };
  return (
    <div className="navA nav-shell" onMouseLeave={() => setOpen(null)}>
      <div className="navA-top">
        <Logo />
        <nav className="navA-links">
          {['need', 'vehicle', 'bulb'].map(k => (
            <span key={k}
              className={`navA-link${open === k ? ' open' : ''}`}
              onMouseEnter={() => setOpen(k)}
              onClick={() => setOpen(open === k ? null : k)}>
              {cols[k].title}
              <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
            </span>
          ))}
          <a className="navA-link" href="https://sealight-led.com/page/help-center">Support</a>
          <a className="navA-link" href="https://sealight-led.com/blog">Learn</a>
        </nav>
        <div className="navA-right">
          <div className="navA-fit">
            <span>2022 · Ford · <strong>F-150</strong></span>
            <span className="go"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></span>
          </div>
        </div>
      </div>
      {open && (
        <div className="navA-mega" onMouseEnter={() => setOpen(open)}>
          <div className="container">
            <div className="navA-mega-grid">
              {['need', 'vehicle', 'bulb'].map(k => (
                <div key={k} className="navA-col">
                  <h5>{cols[k].title}</h5>
                  <ul>{cols[k].items.map(([name, meta, url]) => (
                    <li key={name}><a href={url}><span>{name}</span><span className="meta">{meta}</span></a></li>
                  ))}</ul>
                </div>
              ))}
              <div className="navA-feature">
                <div className="img-ph" style={{ height: 100 }}><span className="ph-label">PRODUCT · SCOPARC S7S</span></div>
                <h6>New · Scoparc S7S</h6>
                <p>500% brighter than OEM halogen with sharp cutoff line. Now fitting 1,200+ vehicles.</p>
                <a href="https://sealight-led.com/collection/forward-lighting" className="btn btn-primary btn-sm">Shop Scoparc S7S →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavB() {
  return (
    <div className="navB nav-shell">
      <div className="navB-top">
        <Logo />
        <ul>
          <li><a href="https://sealight-led.com/category/headlight-bulbs">Headlights</a></li>
          <li><a href="https://sealight-led.com/category/fog-light-bulbs">Fog & Driving</a></li>
          <li><a href="https://sealight-led.com/collection/interior-lights">Interior</a></li>
          <li><a href="https://sealight-led.com/collection/led-fog-light-bulbs-extreme-conditions">Off-road</a></li>
          <li><a href="https://sealight-led.com/collection/package-combo">Combo Kits</a></li>
          <li><a href="https://sealight-led.com/page/help-center">Support</a></li>
        </ul>
        <a href="https://sealight-led.com/automotive-bulb-finder" className="btn btn-outline btn-sm">Find My Bulb</a>
      </div>
      <div className="navB-bar">
        <div className="navB-bar-inner">
          <span className="navB-label">Your Vehicle</span>
          <div className="navB-pick">
            <div>
              <div className="navB-pick-label">Year</div>
              <div className="navB-pick-val">2022 <svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
            </div>
          </div>
          <div className="navB-pick">
            <div>
              <div className="navB-pick-label">Make</div>
              <div className="navB-pick-val">Ford <svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
            </div>
          </div>
          <div className="navB-pick">
            <div>
              <div className="navB-pick-label">Model</div>
              <div className="navB-pick-val">F-150 <svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div>
            </div>
          </div>
          <a href="https://sealight-led.com/automotive-bulb-finder" className="btn btn-primary btn-sm">Find My Bulb →</a>
          <span className="navB-hint">12 matches</span>
        </div>
      </div>
    </div>
  );
}

function NavC({ theme = 'dark', showDrawer }) {
  return (
    <header className={`navC ${theme === 'dark' ? 'on-dark' : 'on-light'}`}>
      <div className="navC-top">
        <Logo dark={theme === 'dark'} />
        <nav><ul>
          <li><a href="https://sealight-led.com/category/headlight-bulbs">Shop</a></li>
          <li><a href="https://sealight-led.com/collection/forward-lighting">Series</a></li>
          <li><a href="https://sealight-led.com/page/help-center">Support</a></li>
          <li><a href="https://sealight-led.com/blog">Learn</a></li>
        </ul></nav>
        <a href="https://sealight-led.com/automotive-bulb-finder" className="navC-cta">
          <span className="dot" />
          Find My Bulb
        </a>
      </div>
      {showDrawer && (
        <div className="navC-drawer">
          <div className="crumbs"><a>Home</a><span>/</span><span>Find My Bulb</span></div>
          <h4>Tell us about your vehicle.</h4>
          <p>We'll show only bulbs verified to fit — no guessing.</p>
          <div className="navB-pick"><div><div className="navB-pick-label">Year</div><div className="navB-pick-val">Select year <svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div></div></div>
          <div className="navB-pick"><div><div className="navB-pick-label">Make</div><div className="navB-pick-val">—<svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div></div></div>
          <div className="navB-pick"><div><div className="navB-pick-label">Model</div><div className="navB-pick-val">—<svg className="caret" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></div></div></div>
          <a href="https://sealight-led.com/automotive-bulb-finder" className="btn btn-primary">Show compatible bulbs →</a>
          <a href="https://sealight-led.com/automotive-bulb-finder" className="sl-mono" style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.12em' }}>Don't know? Browse by part number →</a>
        </div>
      )}
    </header>
  );
}

Object.assign(window, { NavA, NavB, NavC, Logo });
