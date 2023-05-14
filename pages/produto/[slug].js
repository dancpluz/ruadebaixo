import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import camisa1 from '../../assets/overlay.png';
import camisa2 from '../../assets/camisa.webp';
import camisa3 from '../../assets/product1.png';
import camisa4 from '../../assets/product2.png';
import camisa5 from '../../assets/product3.png';
import styled from 'styled-components';
import Image from 'next/image';
import Tag from '../../components/Tag';
import { useState } from 'react';
import Alert from '@mui/material/Alert';


const Container = styled.div`
  padding: 100px 15vw;
`;

const ProductDiv = styled.div`
  display: flex;
  gap: 50px;
`;

const ImagesDiv = styled.div`
  display: flex;
`;

const MainImage = styled(Image)`
  background-color: #f6f6f6;
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

const PreviewImagesWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  height: 400px;
  flex-direction: column;
  gap: 11px;
  overflow: auto;
`;

const PreviewImage = styled(Image)`
  width: 92px;
  height: 92px;
  object-fit: contain;
  background-color: #f6f6f6;
  border: black solid ${props => props.selected ? 1 : 0}px;
  box-sizing: border-box;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const StyledAlert = styled(Alert)`
  color: black;
  background-color: white;
  border: black solid 1px;
  font-family: 'Clash Display', sans-serif;
  margin-bottom: 20px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: black solid 1px;
  h1 {
    font-weight: 600;
    font-size: 32px;
  }
  p {
    font-size: 32px;
  }
`;

const Description = styled.div`
  p {
    font-size: 18px;
  }
`;

const Size = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 20px;
  p {
    padding: 10px;
    border: black solid 1px;
    border-radius: 50%;
  }
`;

export default function ProductPage() {
  const product = {
    _id: 0,
    slug: 'test',
    images: [camisa1,camisa2,camisa3,camisa4, camisa5],
    name: '5 Panel Cairo Beige',
    desc: 'Boné 5 panel com protetor de pescoço estampado removível e gráfico bordado.',
    size: 'M',
    price: 20,
    type: 'boné',
    quality: 'usado',
    tags: ['internacional','vintage'],
    sold: true
  };

  const [imageIndex,setImageIndex] = useState(0)

  function selectImage(index) {
    setImageIndex(index);
  }

  return (
    <Container>
      <StyledAlert>
        AAAAAAAAAAAAAAAAAAA
      </StyledAlert>
      <ProductDiv>
        <ImagesDiv>
          <MainImage src={product.images[imageIndex]} alt={'MainImage'}/>
          <PreviewImagesWrapper>
            {product.images.map((image,i) =>
              <PreviewImage onClick={() => selectImage(i)} selected={imageIndex === i} alt={product.slug} key={i} src={image} />
            )}
          </PreviewImagesWrapper>
        </ImagesDiv>
        <DetailsDiv>
          <Tag tags={[product.type,product.quality].concat(product.tags)} />
          <Title>
            <h1>{product.name}</h1>
            <p>R${product.price}</p>
          </Title>
          <Description>
            <p>{product.desc}</p>
          </Description>
          <Size>
            <h2>Tamanho</h2>
            <p>{product.size}</p>
          </Size>
        </DetailsDiv>
      </ProductDiv>
    </Container>
  )
}

// export async function getStaticProps({ params: {slug} }) {
//   const query = groq`
//     *[_type=='product' && slug.current==$slug][0]
//   `;
//   const product = await client.fetch(query,{ slug });
  

//   return {
//     props: { product }, // will be passed to the page component as props
//   };
// }
