/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
