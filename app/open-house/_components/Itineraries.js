'use client';
import { ITINERARIES, OFFICIAL } from '../data';
import DecoTile from './DecoTile';
import SaveButton from './SaveButton';

export default function Itineraries() {
  return (
    <section className="section alt" id="itineraries" aria-labelledby="itin-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="itin-h" className="h2">Itineraries</h2>
          <a className="btn btn-sm" href={`${OFFICIAL}/itineraries`} target="_blank" rel="noopener noreferrer">View all<span className="sr-only"> itineraries (opens in a new tab)</span></a>
        </div>
        <ul className="strip-scroll" tabIndex={0} aria-label="Itineraries, scroll sideways">
          {ITINERARIES.map((it, i) => (
            <li key={it.slug} className="card itin-card">
              <div className="media"><DecoTile index={i + 1} uid={`i${i}`} /><span className="badge solid media-badge">Themed</span></div>
              <div className="site-body">
                <h3>{it.name}</h3>
                <p className="addr">{it.sites} sites</p>
                <div className="actions"><SaveButton id={`itinerary:${it.slug}`} label={it.name} kind="itinerary" /></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
