/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test?.test?.('.svg'),
  )
  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    {
    ...fileLoaderRule,
    test: /\.svg$/i,
    resourceQuery: /url/, // *.svg?url
    },
    // Convert all other *.svg imports to React components
    {
    test: /\.svg$/i,
    issuer: fileLoaderRule.issuer,
    resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
    use: [
      {
      loader: '@svgr/webpack',
      options: {
        icon: true,
      },
      },
    ],
    },
  )
  // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  env: {
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    ASAAS_API_KEY: process.env.ASAAS_API_KEY,
    ZAP_API_TOKEN: process.env.ZAP_API_TOKEN,
    ZAP_URL: process.env.ZAP_URL,
    KANGU_API_KEY: process.env.KANGU_API_KEY,
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
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'portal.kangu.com.br',
      },
    ]
  },
};

export default nextConfig;
