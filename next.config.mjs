/** Static export: no server, no database. The mood boards and design systems are plain
 *  HTML in /public; the Open House Chicago page is a Next.js route (/open-house). */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
export default nextConfig;
