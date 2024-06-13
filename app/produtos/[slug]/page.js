import { Container, ProductDiv, DetailsDiv, TitleDiv, SizeDiv, BulletDiv, Point, BottomDiv, TopDiv, MiddleDiv, SizeWrapper } from '@/components/styles/ProductPage.styled.js';
import { fetchProduct, fetchProductMetadata, fetchStaticParams } from '@/lib/api';
import { checkMaintenanceMode } from '@/lib/config';
import Tag from '@/components/Tag';
import ProductBuy from '@/components/ProductBuy';
import ProductImages from '@/components/ProductImages';
import ProductInfo, { MeasureLink } from '@/components/ProductInfo';
//import OrderedBadge from '@/components/OrderedBadge';
import Maintenance from '@/components/Maintenance';
//import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params: { slug }}) {
  const product = await fetchProductMetadata(slug);
  // Se o produto não for achado, erro 404
  if (!product) {
    redirect('/404')
  }

  const { name, image, price, discount, type } = product;

  return {
    title: `${type} ${name}`,
    description: `Bem-vindo à sua porta de entrada para o estilo na Rua de Baixo! Explore esta ${type} única, cuidadosamente selecionada, que redefine o conceito de moda urbana. Adquira ${type} ${name} já pelo preço baixo de ${price - discount}.`,
    keywords: [`${type}`, `${name}`,`${type} ${name} barata`,`${type} ${name} em promoção`,`${type} ${name} com desconto`,`${type} ${name} usada`,`${type} ${name} nova`],
    openGraph: {
      title: `${type} ${name}`,
      description: `Adquira o(a) ${type} ${name} já pelo preço baixo de ${price - discount}!`,
      images: image,
    },
    alternates: {
      canonical: `/produtos/${slug}`,
    },
    robots: {
      index: true,
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: false,
        },
    },
  }
}

export async function generateStaticParams() {
  const slugs = await fetchStaticParams('product');

  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function ProdutoPage({ params: { slug } }) {
  if (await checkMaintenanceMode()) {
    return (<Maintenance />)
  }

  const product = await fetchProduct(slug);
  const { name, images, type, quality, drop, tag, measures, price, size, discount, details } = product;

  return (
    <Container>
      <BackButton />
      <ProductDiv>
        <TopDiv>
          <ProductImages tag={tag} type={type} images={images} name={slug} />
        </TopDiv>
        <MiddleDiv>
          {/* {ordered && <OrderedBadge />} */}
          <Tag tags={[{value: quality, type: 'qualidade'}, drop ? {value: drop, type: 'drop'} : '']} />
          <TitleDiv>
            <h1>{type} {name}</h1>
            {discount ? 
              <div>
                <h4>R${price}</h4>
                <h1>R${price - discount}</h1>
              </div>
             : <h1>R${price}</h1>
            }
          </TitleDiv>
        </MiddleDiv>
        <BottomDiv>
          <BulletDiv>
            <ul>
              {details.map((point) =>
              // set key as the first string of the point
              <Point key={point.split(" ")[0]}>{point}</Point>
              )}
            </ul>
          </BulletDiv>
          <DetailsDiv>
            <SizeDiv>
              <SizeWrapper>
                <div>
                  <h2>Tamanho</h2>
                  <span>Na etiqueta</span>
                </div>
                <Tag tags={[{ value: size,type: 'tamanho' }]} isSize />
              </SizeWrapper>
              {measures && <MeasureLink />}
            </SizeDiv>
            <ProductBuy product={product} />
          </DetailsDiv>
        </BottomDiv>
      </ProductDiv>
      <ProductInfo measures={measures} />
    </Container>
  )
}
