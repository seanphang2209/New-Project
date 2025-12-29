/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  // Disable image optimization (not needed for static export)
  images: {
    unoptimized: true,
  },
  // No trailing slash for cleaner URLs
  trailingSlash: false,
}

module.exports = nextConfig
