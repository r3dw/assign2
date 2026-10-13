import { SavedProvider } from './_components/SavedContext';
import SiteHeader from './_components/SiteHeader';
import Hero from './_components/Hero';
import Plan from './_components/Plan';
import Neighborhoods from './_components/Neighborhoods';
import SitesBrowser from './_components/SitesBrowser';
import Itineraries from './_components/Itineraries';
import Events from './_components/Events';
import Newsletter from './_components/Newsletter';
import SiteFooter from './_components/SiteFooter';

export const metadata = {
  title: 'Open House Chicago 2026 · An Art Deco festival guide',
  description: 'Sites, itineraries and events for Open House Chicago, October 17–18, 2026. A student redesign in the Art Deco style.',
};

export default function Page() {
  return (
    <SavedProvider>
      <a className="skip" href="#main">Skip to the content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Plan />
        <Neighborhoods />
        <SitesBrowser />
        <Itineraries />
        <Events />
        <Newsletter />
      </main>
      <SiteFooter />
    </SavedProvider>
  );
}
