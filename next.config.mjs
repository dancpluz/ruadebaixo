/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_TOKEN: process.env.STRAPI_TOKEN
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hub.ruadebaixo.com.br',
        port: '1004',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ruadebaixo.com.br',
        port: '',
        pathname: '/uploads/**',
      },
    ]
  },
};

export default nextConfig;
