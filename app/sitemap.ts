import { MetadataRoute } from "next";
import { fetchFromStrapi } from "./actions/strapi";
import { Produto } from "@/types/api/produto";

const URL = "https://ruadebaixo.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchFromStrapi<Produto[]>('produtos?fields[0]=slug&fields[1]=updatedAt');
  const products = data.data;

  const productRoutes = products.map((product) => {
    const { slug, updatedAt } = product.attributes

    return {
      url: `${URL}/catalogo/${slug}`,
      lastModified: updatedAt as string,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }
  });

  const routes = ["","/catalogo","/comprar","/links", "/lookbook", "/adesivo"].map((route, i) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: i <= 1 ? 1 : 0.8,
  }));

  return [...routes, ...productRoutes];
}
