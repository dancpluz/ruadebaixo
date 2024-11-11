import { fetchFromStrapi } from "@/app/actions/strapi";
import { buildImgUrl, selectImageUrl } from "@/lib/utils";
import Image from "next/image";
import type { Produto } from "@/types/api/produto";
import { notFound } from 'next/navigation'
import FloatProduct from "@/components/FloatProduct";

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const data = await fetchFromStrapi<Produto[]>('produtos?fields[0]=slug');
  
  return data.data.map((product) => product.attributes.slug)
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const data = await fetchFromStrapi<Produto[]>(`produtos?filters[slug][$eq]=${slug}`);

  if (data.data.length === 0) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto solicitado não foi encontrado.'
    };
  }

  const product = data.data[0];
  const { nome } = product.attributes;

  return {
    title: nome.toUpperCase(),
  };
}

export default async function Produto({ params: { slug } }: { params: { slug: string } }) {
  const data = await fetchFromStrapi<Produto[]>(`produtos?filters[slug][$eq]=${slug}&populate[0]=variantes&populate[1]=loja&populate[2]=imagens_produto`);

  if (data.data.length === 0) {
    notFound()
  }

  const product = data.data[0];
  const { imagens_produto } = product.attributes

  return (
    <main className='flex flex-col flex-1'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-y border-b pb-[90px]'>
        {imagens_produto ? imagens_produto.data.map((image) => {
          const { formats, width, height, alternativeText } = image.attributes
          const { imageUrl, sizes } = selectImageUrl(formats)

          return (
            <Image
              key={image.id}
              className="object-cover outline outline-1 outline-foreground h-full w-full"
              src={buildImgUrl(imageUrl)}
              alt={alternativeText || `Produto ${image.id}`}
              width={width}
              height={height}
              sizes={sizes}
            />
          )
        }) :
          <div className='h-full w-full'/>
        }
      </div>
      <FloatProduct product={product}/>
      {/* <pre>
        {JSON.stringify(product, null, 2)}
      </pre> */}
    </main>
  )
}
