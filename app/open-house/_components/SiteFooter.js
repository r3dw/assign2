import { OFFICIAL } from '../data';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <p className="brand-main">Open House Chicago</p>
          <p className="fine">A student redesign for a UI/UX &amp; Visual Design course. It is not the official site and is not affiliated with the Chicago Architecture Center. Dates, sites, itineraries and events were taken from <a href={OFFICIAL} target="_blank" rel="noopener noreferrer">openhousechicago.org</a> on October 12, 2026. Check the official site for current details.</p>
        </div>
        <nav aria-label="Project">
          <ul className="foot-links">
            <li><a href="/">Mood boards hub</a></li>
            <li><a href="/deco">Art Deco mood board</a></li>
            <li><a href="/design-systems/deco">Art Deco design system</a></li>
            <li><a href="/credits">Photo credits</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
