/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SANITY_TOKEN: process.env.SANITY_SECRET_TOKEN,
    PLUNK_API_KEY: process.env.PLUNK_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    KANGU_TOKEN: process.env.KANGU_TOKEN,
    ZAP_API_TOKEN: process.env.ZAP_API_TOKEN
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    }, {
      protocol: 'https',
      hostname: 'portal.kangu.com.br',
    }]
  },
}

module.exports = nextConfig
