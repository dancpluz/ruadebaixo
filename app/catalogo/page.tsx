import type { Produto } from "@/types/api/produto";
import { fetchFromStrapi } from "../actions/strapi";
import ProductCard from "@/components/ProductCard";

export default async function Catalogo() {
  const data = await fetchFromStrapi<Produto[]>('produtos?populate[0]=variantes&populate[1]=loja&populate[2]=imagens_produto');
  const products = data.data;

  return (
    <main className='flex flex-col flex-1'>
      <h1 className='text-5xl p-5 clash border-b border-foreground'>Catálogo</h1>
      <div className='flex flex-col px-5 py-8 gap-5 '>
        {Array(3).fill(products[0]).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* <pre>
        {JSON.stringify(products[0],null,2)}
      </pre> */}
    </main>
  )
}
