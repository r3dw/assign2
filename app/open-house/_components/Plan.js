import { PLAN } from '../data';

export default function Plan() {
  return (
    <section className="section" id="plan" aria-labelledby="plan-h">
      <div className="wrap">
        <h2 id="plan-h" className="h2">Plan your OHC weekend</h2>
        <ol className="plan">
          {PLAN.map((p, i) => (
            <li key={p.title} className="card plan-card">
              <span className="plan-n" aria-hidden="true">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <a className="link" href={p.href} target="_blank" rel="noopener noreferrer">{p.cta}<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
