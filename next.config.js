/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SANITY_TOKEN: process.env.SANITY_SECRET_TOKEN,
    PLUNK_API_KEY: process.env.PLUNK_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    KANGU_TOKEN: process.env.KANGU_TOKEN,
    ZAP_API_TOKEN: process.env.ZAP_API_TOKEN,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/db/:path*',
          destination: 'https://db.ruadebaixo.com.br/api/:path*',
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/adesivo',
        permanent: false
      },
      {
        source: '/produtos',
        destination: '/adesivo',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
