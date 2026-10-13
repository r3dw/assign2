// Content taken from openhousechicago.org (checked October 12, 2026).
// Only a sample of the 200+ sites is listed; every card links to the official page.
export const OFFICIAL = 'https://www.openhousechicago.org';

export const NAV = [
  { href: '#sites', label: 'Sites' },
  { href: '#neighborhoods', label: 'Neighborhoods' },
  { href: '#itineraries', label: 'Itineraries' },
  { href: '#events', label: 'Events' },
];

export const PLAN = [
  { title: 'Log in and save', body: 'Sign in to MyOHC before you start exploring to save sites, events and itineraries across devices.', href: `${OFFICIAL}/my-ohc`, cta: 'Open MyOHC' },
  { title: 'Browse events', body: 'Find talks, tours and special programs by neighborhood.', href: `${OFFICIAL}/events`, cta: 'See all events' },
  { title: 'Skip the line', body: 'CAC members get a Priority Pass for all 200+ sites.', href: `${OFFICIAL}/memberships`, cta: 'Become a member' },
  { title: 'Pick up the guide', body: 'After October 1, The Reader’s October issue carries the OHC Festival Guide with a site list and bingo card.', href: `${OFFICIAL}`, cta: 'Official site' },
];

export const NEIGHBORHOODS = [
  { name: 'Albany Park / Irving Park', sites: 3 },
  { name: 'Andersonville / Edgewater', sites: 6 },
  { name: 'Austin', sites: 6 },
  { name: 'Avondale', sites: 5 },
  { name: 'Beverly / Morgan Park', sites: 7 },
  { name: 'Bridgeport / Back of the Yards', sites: 8 },
  { name: 'Bronzeville / Kenwood', sites: 10 },
  { name: 'Chinatown', sites: 3 },
  { name: 'Downtown', sites: 36 },
  { name: 'Englewood', sites: 2 },
];

// day: null = no one-day restriction listed, otherwise the label the official page shows.
export const SITES = [
  { id: 'rec7fmVFtfIPDHa0N', name: 'Avalon Regal Theater', hood: 'South Shore', address: '1645 E. 79th St.', day: null },
  { id: 'recmz8znALVpeRvoL', name: 'Avondale Bowl', hood: 'Avondale', address: '3118 N. Milwaukee Ave.', day: null },
  { id: 'recLxcP6wZXHx8VNi', name: 'Central Park Theater', hood: 'Garfield Park / North Lawndale', address: '3535 W. Roosevelt Rd.', day: 'Saturday only' },
  { id: 'recdX1vSQrUtfyiDL', name: 'Chicago Loop Synagogue', hood: 'Downtown', address: '16 S. Clark St.', day: 'Sunday only' },
  { id: 'rec3PgsWm6ATTeaYf', name: 'Federal Reserve Bank of Chicago and Money Museum', hood: 'Downtown', address: '230 S. LaSalle St.', day: null },
  { id: 'recKifqiQ70hf65p9', name: 'Growing Home’s Wood Street Urban Farm', hood: 'Englewood', address: '5814 S. Wood St.', day: null },
  { id: 'rechmDWcDeTmOw2k6', name: 'Guild Row', hood: 'Avondale', address: '3130 N. Rockwell St', day: null },
  { id: 'recdbOcCEXpOitMSL', name: 'Héctor Duarte Studio', hood: 'Little Village / Pilsen', address: '1900 W. Cullerton', day: null },
  { id: 'rec8E7KtOJxHqtmeo', name: 'Ingersoll-Blackwelder House', hood: 'Beverly / Morgan Park', address: '10910 S. Prospect Ave.', day: null },
  { id: 'recJJCJyQMGXvbd5u', name: 'Kam Isaiah Israel', hood: 'Bronzeville / Kenwood', address: '5039 S. Greenwood Ave.', day: 'Sunday only' },
  { id: 'recxwcGbvZIsMj1vu', name: 'Koval Distillery', hood: 'Lincoln Square / Ravenswood', address: '4241 N. Ravenswood Ave.', day: null },
  { id: 'rec2foTOpvq4JJNVL', name: 'St. Helen Roman Catholic Church', hood: 'Ukrainian Village / West Town', address: '2315 W. Augusta Blvd.', day: null },
  { id: 'recjffSCNspZUi9tt', name: 'The Arts Club of Chicago', hood: 'Near North Side', address: '201 E. Ontario St.', day: 'Saturday only' },
  { id: 'recS2oUjy5dPsUhxn', name: 'The Chicago Board of Trade Building', hood: 'Downtown', address: '141 W. Jackson Blvd.', day: null,
    photo: '/img/deco-board-of-trade.jpg', photoAlt: 'The Chicago Board of Trade Building tower, crowned by a statue of Ceres',
    credit: 'Photo: w_lemay · CC BY-SA 2.0',
    note: 'An Art Deco landmark from 1930, crowned by a statue of Ceres, the goddess of grain.' },
  { id: 'recBMBW1bkX7BdHJA', name: 'The Cliff Dwellers Club', hood: 'Downtown', address: '200 S. Michigan Ave., Suite #2200', day: 'Saturday only' },
  { id: 'recj8zectYqODyA2s', name: 'The Forum', hood: 'Bronzeville / Kenwood', address: '324 E. 43rd St.', day: null },
];

export const ITINERARIES = [
  { slug: 'curtains-up', name: 'Curtains Up!', sites: 12 },
  { slug: 'new-sites', name: 'New Sites for 2026', sites: 20 },
  { slug: 'skyline-views', name: 'Skyline Views', sites: 6 },
  { slug: 'green-line', name: 'Along the “L” – Green Line', sites: 12 },
  { slug: 'red-line', name: 'Along the “L” – Red Line', sites: 14 },
  { slug: 'saturday-only', name: 'Saturday Only', sites: 34 },
  { slug: 'sunday-only', name: 'Sunday Only', sites: 10 },
  { slug: 'nation', name: 'Chicago and the Nation', sites: 11 },
  { slug: 'belief', name: 'Built on Belief', sites: 3 },
  { slug: 'hebru', name: 'Curated by Hebru Brantley', sites: 9 },
];

export const EVENTS = [
  { slug: 'reuse', title: 'Reuse-a-Palooza Light: The Mini Edition', time: '10 AM – 5 PM' },
  { slug: 'family-day', title: 'Family Day: Proud to Be Me', time: '10 AM – 1 PM' },
  { slug: 'ikebana', title: 'Ikebana – Japanese Flower Arranging', time: '10:00 am – 11:15 am' },
];

export const MORE = [
  { label: 'Membership', href: `${OFFICIAL}/memberships` },
  { label: 'Other city tours', href: `${OFFICIAL}/city-tours` },
  { label: 'Visit the center', href: `${OFFICIAL}/visit` },
];
