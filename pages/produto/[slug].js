import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import camisa1 from '../../assets/overlay.png';
import camisa2 from '../../assets/camisa.webp';
import camisa3 from '../../assets/product1.png';
import camisa4 from '../../assets/product2.png';
import camisa5 from '../../assets/product3.png';
import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const Container = styled.div`
  padding: 100px 10vw;
`;

const ProductDiv = styled.div`
  
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

const PreviewImagesDiv = styled.div`
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
`;

const DetailsDiv = styled.div`
  
`;

const StyledAlert = styled(Image)`
  color: black;
  background-color: white;
`;

export default function ProductPage() {
  const product = {
    _id: 0,
    slug: 'test',
    images: [camisa1,camisa2,camisa3,camisa4, camisa5],
    name: 'abcdefghijklmnopqrstuv',
    price: 20,
    tags: ['internacional','vintage'],
    sold: true
  };

  const [imageIndex,setImageIndex] = useState(0)

  function selectImage(i) {
    console.log(i);
  }
  document.getElementById("previewImage").addEventListener("click",selectImage('a'),false);

  return (
    <Container>
      <ProductDiv>
        <ImagesDiv>
          <MainImage src={product.images[imageIndex]} />
          <PreviewImagesDiv>
            {product.images.map((image,i) =>
            <PreviewImage id='previewImage' alt={product.slug} key={i} src={image} onclick={selectImage} />)}
          </PreviewImagesDiv>
        </ImagesDiv>
        <DetailsDiv>
          
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
