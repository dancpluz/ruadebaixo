import { fetchSiteMapData } from "@/lib/api";

const URL = "https://www.ruadebaixo.com.br";

export default async function sitemap() {
  const productData = await fetchSiteMapData('product')
  const products = productData.map(({ slug,lastModified }) => ({
    url: `${URL}/produtos/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const lookbookData = await fetchSiteMapData('lookbook')
  const lookbook = lookbookData.map(({ slug,lastModified }) => ({
    url: `${URL}/lookbook/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const routes = ["","/produtos","/comprar","/links","/comprar/sucesso","/comprar/erro"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 1,
  }));

  return [...routes, ...products, ...lookbook];
}
