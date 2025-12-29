/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare-compatible settings
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['sql.js'],
  },
}

module.exports = nextConfig
