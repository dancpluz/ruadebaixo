export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/comprar/',
    },
    sitemap: 'https://www.ruadebaixo.com.br/sitemap.xml',
  }
}