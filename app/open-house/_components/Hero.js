export default function Hero() {
  const rays = Array.from({ length: 23 }, (_, i) => {
    const a0 = Math.PI + (i * Math.PI) / 23, a1 = a0 + Math.PI / 46, r = 700;
    const f = (v) => Math.round(v * 100) / 100;
    return <path key={i} d={`M400 400 L${f(400 + r * Math.cos(a0))} ${f(400 + r * Math.sin(a0))} L${f(400 + r * Math.cos(a1))} ${f(400 + r * Math.sin(a1))}Z`} />;
  });
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <svg className="hero-rays" viewBox="0 0 800 400" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice"><g fill="currentColor">{rays}</g></svg>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Chicago Architecture Center presents</p>
          <h1 id="hero-title">Open House Chicago</h1>
          <p className="hero-date">October 17–18, 2026</p>
          <p className="lede">
            Explore one of the largest architecture and urban festivals in the world as Open House Chicago returns to
            celebrate 16 years of architecture, culture and community. This free public festival offers behind-the-scenes
            access to more than 200 sites, including many that are not normally open to the public.
          </p>
          <div className="cta">
            <a className="btn btn-primary btn-lg" href="#sites">Browse the sites</a>
            <a className="btn btn-lg" href="#plan">Plan your weekend</a>
          </div>
          <dl className="stats">
            <div><dt>Admission</dt><dd>Free</dd></div>
            <div><dt>Sites</dt><dd>200+</dd></div>
            <div><dt>Years</dt><dd>16</dd></div>
          </dl>
        </div>
        <figure className="hero-photo">
          <img src="/img/deco-chrysler-elevator.jpg" width="960" height="1600" alt="An inlaid-wood elevator door at the Chrysler Building in New York, with a fan-shaped Art Deco motif in gold and amber" />
          <figcaption>Chrysler Building elevator door, New York (1930) · Photo: SiefkinDR · CC BY-SA 4.0</figcaption>
        </figure>
      </div>
    </section>
  );
}
