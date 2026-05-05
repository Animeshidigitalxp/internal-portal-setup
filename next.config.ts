import type { NextConfig } from "next";
import config from './config.json'
const domain = config.domain.split('//')[1];
const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: config.environment === 'prod',
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  async headers() {
    const expiresDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toUTCString();
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Default rule for HTML pages (SSR or SSG)
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow cross-origin requests to static assets
          },
          {
            key: 'Expires',
            value: expiresDate, // Set the calculated expiration date
          },
          // Cache static assets in .next/static (JS, CSS, media files)
          {
            key: 'Cache-Control',
            value: 'public, max-age=1209600, immutable', // 1-year cache
          },
        ],
      },
      {
        source: '/:path*.ico',
        headers: [
          {
            key: 'Expires',
            value: expiresDate, // Set the calculated expiration date
          },
          { key: 'Cache-Control', value: 'public, max-age=1209600, immutable' },
        ],
      }
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        domain,
      ]
    }
  }
};

export default nextConfig;