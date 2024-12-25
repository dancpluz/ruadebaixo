import { fetchFromStrapi } from "@/app/actions/strapi";
import { buildImgUrl, applyDiscount, formatToBRL, selectImageUrl } from "@/lib/utils";
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
  const data = await fetchFromStrapi<Produto[]>(`produtos?filters[slug][$eq]=${slug}&populate[0]=variantes&populate[1]=loja&populate[2]=imagens_produto`);

  if (data.data.length === 0) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto solicitado não foi encontrado.'
    };
  }

  const product = data.data[0];
  const { nome, descricao, tipo, variantes, categorias, imagens_produto } = product.attributes;
  const { desconto, valor } = variantes[0];

  const categoriasArray = categorias ? categorias : []
  const descriptionArray = descricao[0].children.map(desc => desc.children[0].text);
  const descriptionText = descriptionArray.join(", ");

  const price = formatToBRL(applyDiscount(valor, desconto));

  const keywords = [
    nome,
    tipo,
    ...categoriasArray,
    "Acessórios exclusivos",
    "Bijuterias únicas",
    descriptionArray,
    `Comprar ${nome}`,
    `${tipo} customizadas`,
    `Pulseiras exclusivas Rua de Baixo`,
    `${nome} em ${categoriasArray.join(", ")}`,
    `Ofertas de ${tipo}`,
    `${tipo} ajustável`,
    "Bijuteria personalizada",
    "Bijuterias de alta qualidade",
    `${tipo} com design exclusivo`,
    `${nome} - Produto Único e Customizado`,
    `Loja de bijuterias exclusivas`,
  ]

  return {
    title: nome.toUpperCase(),
    description: `${tipo} ${nome}: ${descriptionText}. Garanta por R$${price}!`,
    keywords,
    openGraph: {
      title: `${nome} - Exclusivo na Rua de Baixo`,
      description: `${tipo} ${nome}: ${descriptionText}. Produto único por apenas R$${price}.`,
      url: `https://ruadebaixo.com.br/catalogo/${slug}`,
      images: imagens_produto?.data.map(({ attributes }, i) => (
        {
          url: buildImgUrl(attributes.url),
          width: attributes.width,
          height: attributes.height,
          alt: attributes.alternativeText || `Produto ${tipo} ${nome} - ${i + 1}`
        }
      )),
    },
    twitter: {
      card: "summary_large_image",
      title: `${tipo} ${nome} - Exclusividade na Rua de Baixo`,
      description: `${nome}: ${descriptionText}. Produto único por apenas R$${price}.`,
      images: imagens_produto?.data.map(({ attributes }) => buildImgUrl(attributes.url)),
    },
  };
}

export default async function Produto({ params: { slug } }: { params: { slug: string } }) {
  const data = await fetchFromStrapi<Produto[]>(`produtos?filters[slug][$eq]=${slug}&populate[0]=variantes&populate[1]=loja&populate[2]=imagens_produto`);

  if (data.data.length === 0) {
    notFound()
  }

  const product = data.data[0];
  const { nome, descricao, tipo, variantes, imagens_produto, loja } = product.attributes;
  const { desconto, valor, quantidade } = variantes[0];

  const descriptionText = descricao[0].children.map(desc => desc.children[0].text).join(", ");
  
  const storeName = loja?.data.attributes.nome;
  const price = formatToBRL(applyDiscount(valor, desconto));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${tipo} ${nome}`,
    "description": descriptionText,
    "image": imagens_produto?.data.map(({ attributes }) => buildImgUrl(attributes.url)),
    "sku": `${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": storeName,
    },
    "offers": {
      "@type": "Offer",
      "url": `https://ruadebaixo.com.br/catalogo/${slug}`,
      "priceCurrency": "BRL",
      "price": price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": quantidade > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": storeName,
        "url": `https://ruadebaixo.com.br`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
      </main>
    </>
  )
}
