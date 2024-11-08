import type { Produto } from "@/types/api/produto";
import { fetchFromStrapi } from "../actions/strapi";
import ProductCard from "@/components/ProductCard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CATÁLOGO",
  description: "Explore nosso catálogo de produtos variados e encontre o que você precisa.",
  keywords: ["catálogo", "produtos", "compras", "loja"],
};

export default async function Catalogo() {
  const data = await fetchFromStrapi<Produto[]>('produtos?populate[0]=variantes&populate[1]=loja&populate[2]=imagens_produto');
  const products = data.data;

  return (
    <main className='flex flex-col flex-1'>
      <h1 className='text-5xl p-5 md:p-12 clash border-b border-foreground'>Catálogo</h1>
      <div className='px-5 md:px-12 py-8 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
