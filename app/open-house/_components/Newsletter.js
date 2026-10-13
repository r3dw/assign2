'use client';
import { useState } from 'react';
import { MORE } from '../data';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | sending | done

  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus('error'); return; }
    setStatus('sending');
    setTimeout(() => setStatus('done'), 900); // faked: nothing is sent
  }

  return (
    <>
      <section className="section" aria-labelledby="more-h">
        <div className="wrap">
          <h2 id="more-h" className="h2">More from CAC</h2>
          <ul className="more">
            {MORE.map((m) => (
              <li key={m.label}><a className="card more-card" href={m.href} target="_blank" rel="noopener noreferrer">{m.label}<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="news" aria-labelledby="news-h">
        <div className="wrap news-grid">
          <div>
            <h2 id="news-h" className="h2">Stay updated</h2>
            <p>Get CAC news and Open House Chicago updates in your inbox.</p>
          </div>
          <form onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="inline">
                <input id="email" className="input" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com"
                  value={email} onChange={(e) => { setEmail(e.target.value); if (status !== 'sending') setStatus('idle'); }}
                  aria-invalid={status === 'error'} aria-describedby="email-msg" disabled={status === 'sending'} />
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Subscribe'}</button>
              </div>
              <p id="email-msg" className={`msg ${status}`} role={status === 'error' ? 'alert' : 'status'}>
                {status === 'error' && '! Enter an email like name@example.com.'}
                {status === 'sending' && 'Sending…'}
                {status === 'done' && '✓ Thanks! (This is a demo: nothing was sent or saved.)'}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
