/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { 
    ignoreDuringBuilds: true 
  },
  // Cloudflare Pages compatibility
  experimental: {
    serverComponentsExternalPackages: [],
  },
};
module.exports = nextConfig;
