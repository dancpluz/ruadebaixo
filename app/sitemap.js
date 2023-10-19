import { fetchSiteMapData } from "@/lib/api";

const URL = "https://www.ruadebaixo.com.br";

export default async function sitemap() {
  const data = await fetchSiteMapData()
  const products = data.map(({ slug,lastModified }) => ({
    url: `${URL}/produtos/${slug}`,
    lastModified,
  }));

  const routes = ["","/produtos","/comprar","/links","/comprar/sucesso","/comprar/erro"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes,...products];
}
