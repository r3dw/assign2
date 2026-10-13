import { Limelight, Josefin_Sans } from 'next/font/google';
import './globals.css';

const limelight = Limelight({ subsets: ['latin'], weight: '400', variable: '--font-limelight', display: 'swap' });
const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-josefin', display: 'swap' });

export const metadata = {
  title: 'Open House Chicago 2026 · An Art Deco festival guide',
  description:
    'A student redesign of the Open House Chicago festival guide, built in the Art Deco style. October 17–18, 2026.',
  // One shared favicon set, served from /public, used by every page on the site.
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '48x48' }],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${limelight.variable} ${josefin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
