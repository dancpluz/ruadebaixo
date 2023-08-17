/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig
