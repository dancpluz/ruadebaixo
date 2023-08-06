import { Container, ProductDiv, DetailsDiv, TitleDiv, SizeDiv, BulletDiv, BulletPoints, Point } from '@/components/styles/ProductPage.styled.js';
import { fetchProduct, fetchMetadata } from '@/lib/api';
import Tag from '@/components/Tag';
import ProductBuy from '@/components/ProductBuy';
import ProductImages from '@/components/ProductImages';

export async function generateMetadata({ params: { slug }}) {
  const product = await fetchMetadata(slug);
  const { name, images, type } = product;

  return {
    title: `${type} ${name}`,
    openGraph: {
      images: images,
    },
  }
}

export default async function ProductPage({ params: { slug } }) {
  
  // async function sendObjectToZap() {
  //   // WIP
  //   const clienteRDB = {
  //     firstName: "Caiok",
  //     lastName: 'Poggers',
  //     id: "2023-03-02_1454",// biblioteca pra pegar data e hora
  //     email: "caioquinha123@gmail.com",
  //     phone: "5561998118398",
  //     insta: "caiok",
  //     delivery: "na mao",
  //     payment: "PIX",
  //     order: {
  //       totalPrice: '56',products: [{
  //         name: 'Fear of God',
  //         type: 'Camiseta',
  //         size: 'm',
  //         fullPrice: '40',
  //         offerPrice: '40',
  //       },{
  //         name: 'Sea World',
  //         type: 'Boné',
  //         size: 'U',
  //         fullPrice: '40',
  //         offerPrice: '30',
  //       }]
  //     }
  //   };
  // }

  const product = await fetchProduct(slug);
  const { name, images, type, quality, drop, tags, wears, price, size, details } = product;

  return (
    <Container>
      <ProductDiv>
        <ProductImages images={images} name={slug} />
        <DetailsDiv>
          <Tag tags={tags} type={'top'} />
          <Tag tags={[quality, drop]} /> 
          <TitleDiv>
            <h1>{type} {name}</h1>
            <h1>R${price}</h1>
          </TitleDiv>
          <BulletDiv>
            <BulletPoints>
              {details.map((point) =>
              // set key as the first string of the point
              <Point key={point.split(" ")[0]}>{point}</Point>
              )}
            </BulletPoints>
          </BulletDiv>
          <SizeDiv>
            <div>
              <h2>Tamanho</h2>
              <span>Na etiqueta</span>
            </div>
            <Tag tags={[size]} isSize={true} />
            <div>
              <h2>Veste</h2>
              <span>Ver medidas</span>
            </div>
            <Tag tags={[wears]} isSize={true} />
          </SizeDiv>
          <ProductBuy product={product} />
        </DetailsDiv>
      </ProductDiv>
      {/* <Info /> */}
    </Container>
  )
}