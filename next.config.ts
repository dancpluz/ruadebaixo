import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    ASAAS_API_KEY: process.env.ASAAS_API_KEY,
    ZAP_API_TOKEN: process.env.ZAP_API_TOKEN,
    ZAP_URL: process.env.ZAP_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
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
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
