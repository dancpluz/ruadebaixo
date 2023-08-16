import { Container, ProductDiv, DetailsDiv, TitleDiv, SizeDiv, BulletDiv, Point, BottomDiv, TopDiv, MiddleDiv, SizeWrapper } from '@/components/styles/ProductPage.styled.js';
import { fetchProduct, fetchMetadata } from '@/lib/api';
import Tag from '@/components/Tag';
import ProductBuy from '@/components/ProductBuy';
import ProductImages from '@/components/ProductImages';
import ProductInfo from '@/components/ProductInfo';
import OrderedBadge from '@/components/OrderedBadge';

export async function generateMetadata({ params: { slug }}) {
  const product = await fetchMetadata(slug);
  const { name, images, type } = product;

  return {
    title: `${type} ${name}`,
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


export default async function ProdutoPage({ params: { slug } }) {

  const product = await fetchProduct(slug);
  const { name, images, type, quality, drop, tags, measures, price, size, ordered, discount, sold, details } = product;

  return (
    <Container>
      <ProductDiv>
        <TopDiv>
          <ProductImages tags={tags} images={images} name={slug} />
        </TopDiv>
        <MiddleDiv>
          {ordered && <OrderedBadge />}
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
              {measures && <p>Veja medidas</p>}
            </SizeDiv>
            <ProductBuy product={product} />
          </DetailsDiv>
        </BottomDiv>
      </ProductDiv>
      <ProductInfo measures={measures} />
    </Container>
  )
}

// function useFlexDirection() {
//   const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // Adjust the value to your desired breakpoint

//   return isSmallScreen ? 'column-reverse' : 'column';
// }