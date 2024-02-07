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
    domains: ['cdn.sanity.io', 'portal.kangu.com.br'],
  },
}

module.exports = nextConfig
