'use client';
import { useEffect, useRef, useState } from 'react';
import { NAV, OFFICIAL } from '../data';
import { useSaved } from './SavedContext';

function MyOhcDialog() {
  const { items, count, remove, clear, open, setOpen } = useSaved();
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const entries = Object.entries(items);
  const KIND = { site: 'Sites', itinerary: 'Itineraries', event: 'Events' };
  return (
    <dialog ref={ref} className="modal" aria-labelledby="myohc-title" onClose={() => setOpen(false)} onClick={(e) => e.target === ref.current && setOpen(false)}>
      <div className="modal-head">
        <h2 id="myohc-title">My OHC</h2>
        <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close My OHC">×</button>
      </div>
      {count === 0 ? (
        <div className="state" role="status">
          <span className="ico empty" aria-hidden="true" />
          <strong>Nothing saved yet</strong>
          <p>Tap “+ Save” on a site, itinerary or event and it will show up here.</p>
          <a className="btn btn-primary" href="#sites" onClick={() => setOpen(false)}>Browse the sites</a>
        </div>
      ) : (
        <>
          {Object.keys(KIND).map((k) => {
            const list = entries.filter(([, v]) => v.kind === k);
            if (!list.length) return null;
            return (
              <section key={k} aria-label={KIND[k]}>
                <h3 className="eyebrow">{KIND[k]}</h3>
                <ul className="saved-list">
                  {list.map(([id, v]) => (
                    <li key={id}><span>{v.label}</span><button type="button" className="btn btn-sm" onClick={() => remove(id)} aria-label={`Remove ${v.label}`}>Remove</button></li>
                  ))}
                </ul>
              </section>
            );
          })}
          <div className="modal-actions">
            <button type="button" className="btn" onClick={clear}>Clear all</button>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>Done</button>
          </div>
        </>
      )}
      <p className="fine">Demo only: saves live in this browser tab and reset when you reload.</p>
    </dialog>
  );
}

export default function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useSaved();
  return (
    <header className="site-header">
      <div className="strip">
        <a href="/">← Mood boards</a>
        <span className="strip-links"><a href="/deco">Art Deco board</a><a href="/design-systems/deco">Design system</a></span>
      </div>
      <div className="bar">
        <a className="brand" href="#top" aria-label="Open House Chicago, back to top">
          <span className="brand-main">Open House Chicago</span>
          <span className="brand-sub">2026 festival guide</span>
        </a>
        <div className="bar-actions">
          <a className="link-quiet" href={OFFICIAL} target="_blank" rel="noopener noreferrer">Official site<span className="sr-only"> (opens in a new tab)</span> ↗</a>
          <button type="button" className="btn btn-sm" onClick={() => setOpen(true)} aria-haspopup="dialog">
            My OHC <span className="count" aria-label={`${count} saved`}>{count}</span>
          </button>
        </div>
      </div>
      <nav className="band" aria-label="Sections">
        <button type="button" className="menu-btn" aria-expanded={menu} aria-controls="nav-list" onClick={() => setMenu((m) => !m)}>
          <span aria-hidden="true">{menu ? '×' : '☰'}</span> Menu
        </button>
        <ul id="nav-list" className={menu ? 'open' : ''}>
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} onClick={() => setMenu(false)}>{n.label}</a></li>
          ))}
          <li><a href="https://www.architecture.org/open-house-chicago/photo-competition-2026" target="_blank" rel="noopener noreferrer">Photo competition ↗</a></li>
        </ul>
      </nav>
      <MyOhcDialog />
    </header>
  );
}
