'use client';
import { EVENTS, OFFICIAL } from '../data';
import SaveButton from './SaveButton';

export default function Events() {
  return (
    <section className="section" id="events" aria-labelledby="ev-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="ev-h" className="h2">Events</h2>
          <a className="btn btn-sm" href={`${OFFICIAL}/events`} target="_blank" rel="noopener noreferrer">View all<span className="sr-only"> events (opens in a new tab)</span></a>
        </div>
        <ul className="grid events">
          {EVENTS.map((e) => (
            <li key={e.slug} className="card event-card">
              <div className="date" aria-label="Saturday, October 17">
                <span>October</span><strong>Saturday</strong><b>17</b>
              </div>
              <div className="site-body">
                <p className="time">{e.time}</p>
                <h3>{e.title}</h3>
                <div className="actions"><SaveButton id={`event:${e.slug}`} label={e.title} kind="event" /></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
