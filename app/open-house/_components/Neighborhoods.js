import { NEIGHBORHOODS, OFFICIAL } from '../data';
import DecoTile from './DecoTile';

export default function Neighborhoods() {
  return (
    <section className="section alt" id="neighborhoods" aria-labelledby="hood-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="hood-h" className="h2">Neighborhood areas</h2>
          <a className="btn btn-sm" href={`${OFFICIAL}/neighborhoods`} target="_blank" rel="noopener noreferrer">View all<span className="sr-only"> neighborhoods (opens in a new tab)</span></a>
        </div>
        <ul className="strip-scroll" tabIndex={0} aria-label="Neighborhood areas, scroll sideways">
          {NEIGHBORHOODS.map((n, i) => (
            <li key={n.name} className="card hood-card">
              <div className="media"><DecoTile index={i} uid={`h${i}`} /><span className="badge solid media-badge">{n.sites} sites</span></div>
              <h3>{n.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
