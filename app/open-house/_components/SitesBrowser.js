'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { OFFICIAL, SITES } from '../data';
import DecoTile from './DecoTile';
import SaveButton from './SaveButton';
import { useSaved } from './SavedContext';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const HOODS = [...new Set(SITES.map((s) => s.hood))].sort();
const DAYS = [['all', 'All days'], ['Saturday', 'Saturday'], ['Sunday', 'Sunday']];

function SiteDialog({ site, onClose }) {
  const ref = useRef(null);
  const { isSaved, toggle } = useSaved();
  useEffect(() => {
    const d = ref.current;
    if (site && !d.open) d.showModal();
    if (!site && d.open) d.close();
  }, [site]);
  const on = site ? isSaved(`site:${site.id}`) : false;
  return (
    <dialog ref={ref} className="modal" aria-labelledby="site-title" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      {site && (
        <>
          <div className="modal-head">
            <h2 id="site-title">{site.name}</h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close details">×</button>
          </div>
          {site.photo && <img className="modal-photo" src={site.photo} alt={site.photoAlt} width="640" height="480" />}
          <p className="badges">
            <span className="badge">{site.hood}</span>
            {site.day && <span className="badge solid">{site.day}</span>}
          </p>
          <p className="addr">{site.address}, Chicago</p>
          {site.note && <p>{site.note}</p>}
          <p className="fine">Hours, access notes and tickets are on the official OHC page for this site.{site.credit ? ` ${site.credit}.` : ''}</p>
          <div className="modal-actions">
            <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address}, Chicago`)}`} target="_blank" rel="noopener noreferrer">Map<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            <a className="btn" href={`${OFFICIAL}/sites/${site.id}`} target="_blank" rel="noopener noreferrer">Official page<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            <button type="button" className="btn btn-primary" aria-pressed={on} onClick={() => toggle(`site:${site.id}`, site.name, 'site')}>
              {on ? '✓ Saved to My OHC' : 'Save to My OHC'}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

export default function SitesBrowser() {
  const [q, setQ] = useState('');
  const [day, setDay] = useState('all');
  const [hood, setHood] = useState('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [open, setOpen] = useState(null);
  const { isSaved } = useSaved();

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return SITES.filter((s) => {
      if (day !== 'all' && s.day && s.day !== `${day} only`) return false;
      if (hood !== 'all' && s.hood !== hood) return false;
      if (savedOnly && !isSaved(`site:${s.id}`)) return false;
      return !nq || norm(`${s.name} ${s.hood} ${s.address}`).includes(nq);
    });
  }, [q, day, hood, savedOnly, isSaved]);

  const active = q || day !== 'all' || hood !== 'all' || savedOnly;
  const reset = () => { setQ(''); setDay('all'); setHood('all'); setSavedOnly(false); };

  return (
    <section className="section" id="sites" aria-labelledby="sites-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="sites-h" className="h2">2026 sites</h2>
          <a className="btn btn-sm" href={`${OFFICIAL}/sites`} target="_blank" rel="noopener noreferrer">View all 200+<span className="sr-only"> sites (opens in a new tab)</span></a>
        </div>
        <p className="sub-lede">A sample of this year’s sites. Sites with no day label are not limited to one day.</p>

        <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="field grow">
            <label htmlFor="q">Search sites</label>
            <input id="q" className="input" type="search" placeholder="Name, neighborhood or street" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor="hood">Neighborhood</label>
            <select id="hood" className="input" value={hood} onChange={(e) => setHood(e.target.value)}>
              <option value="all">All neighborhoods</option>
              {HOODS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="field">
            <span className="label" id="day-l">Day</span>
            <div className="chips" role="group" aria-labelledby="day-l">
              {DAYS.map(([v, l]) => (
                <button key={v} type="button" className="chip" aria-pressed={day === v} onClick={() => setDay(v)}>{l}</button>
              ))}
            </div>
          </div>
          <label className="choice">
            <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />
            Saved only
          </label>
        </form>

        <p className="results" role="status" aria-live="polite">
          Showing {list.length} of {SITES.length} sites
          {active && <> · <button type="button" className="link-btn" onClick={reset}>Clear filters</button></>}
        </p>

        {list.length === 0 ? (
          <div className="state wide" role="status">
            <span className="ico empty" aria-hidden="true" />
            <strong>No sites match</strong>
            <p>{savedOnly ? 'You haven’t saved any sites that match these filters.' : 'Try a different name, day or neighborhood.'}</p>
            <button type="button" className="btn btn-primary" onClick={reset}>Clear filters</button>
          </div>
        ) : (
          <ul className="grid">
            {list.map((s) => {
              const i = SITES.indexOf(s);
              return (
                <li key={s.id} className="card site-card">
                  <div className="media">
                    {s.photo ? <img src={s.photo} alt="" width="640" height="480" loading="lazy" /> : <DecoTile index={i} uid={`s${i}`} />}
                    {s.day && <span className="badge solid media-badge">{s.day}</span>}
                  </div>
                  <div className="site-body">
                    <h3>{s.name}</h3>
                    <p className="hood"><span className="badge">{s.hood}</span></p>
                    <p className="addr">{s.address}</p>
                    <div className="actions">
                      <button type="button" className="btn btn-sm" onClick={() => setOpen(s)} aria-haspopup="dialog" aria-label={`Details for ${s.name}`}>Details</button>
                      <SaveButton id={`site:${s.id}`} label={s.name} kind="site" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <SiteDialog site={open} onClose={() => setOpen(null)} />
      </div>
    </section>
  );
}
