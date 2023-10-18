import { Container, ProductDiv, DetailsDiv, TitleDiv, SizeDiv, BulletDiv, Point, BottomDiv, TopDiv, MiddleDiv, SizeWrapper } from '@/components/styles/ProductPage.styled.js';
import { fetchProduct, fetchMetadata, fetchStaticParams } from '@/lib/api';
import { checkMaintenanceMode } from '@/lib/config';
import Tag from '@/components/Tag';
import ProductBuy from '@/components/ProductBuy';
import ProductImages from '@/components/ProductImages';
import ProductInfo, { MeasureLink } from '@/components/ProductInfo';
//import OrderedBadge from '@/components/OrderedBadge';
import Maintenance from '@/components/Maintenance';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

export async function generateMetadata({ params: { slug }}) {
  const product = await fetchMetadata(slug);
  if (!product) {
    notFound();
  }
  const { name, images, type } = product;

  return {
    title: `${type} ${name}`,
    description: `Compre ${type} ${name} aqui na Rua de Baixo. Confira!`,
    openGraph: {
      title: `${type} ${name}`,
      description: `Compre ${type} ${name} aqui na Rua de Baixo. Confira!`,
      images: images.reverse(),
    },
  }
}

export async function generateStaticParams() {
  const slugs = await fetchStaticParams();

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
          <ProductImages tags={tag} images={images} name={slug} />
        </TopDiv>
        <MiddleDiv>
          {/* {ordered && <OrderedBadge />} */}
          <Tag tags={[quality, drop]} /> 
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
                <Tag tags={[size]} isSize/>
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