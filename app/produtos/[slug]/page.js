'use client'

//import BoxIcon from '../../assets/boxclosed.svg';
//import Tag from '../../components/Tag';
//import Info from '../../components/Info';
//import { useState } from 'react';
import { Container, ProductDiv, DetailsDiv, Title, Description, Size, BulletDiv, BulletPoints, Point, BuyDiv, BuyButton, AddButton, Box } from '@/components/styles/ProductPage.styled.js';
import { fetchProduct } from '@/lib/api';
//import { useStateContext } from '@/context/StateContext';
import ProductImages from '@/components/ProductImages';



export default function ProductPage({ params: { slug }}) {
  // const product = {
  //   _id: 0,
  //   slug: 'test',
  //   images: [camisa1,camisa2,camisa3,camisa4,camisa5],
  //   name: '5 Panel Cairo Beige',
  //   desc: 'Boné 5 panel com protetor de pescoço estampado removível e gráfico bordado.',
  //   size: 'm',
  //   wears: 'g',
  //   price: 20,
  //   discount: 0,
  //   type: 'boné',
  //   quality: 'usado',
  //   tags: ['internacional','vintage'],
  //   points: ['Pequeno arranhão no lado esquerdo','Gola deformada', 'Pequena mancha no canto da camiseta', 'teste', '214124' , 'poggers'],
  //   sold: true
  // };
  console.log(slug)
  const product = fetchProduct(slug);
  const { images } = product;

  //const { onAdd } = useStateContext();

  async function sendObjectToZap() {
    // WIP
    const clienteRDB = {
      firstName: "Caiok",
      lastName: 'Poggers',
      id: "2023-03-02_1454",// biblioteca pra pegar data e hora
      email: "caioquinha123@gmail.com",
      phone: "5561998118398",
      insta: "caiok",
      delivery: "na mao",
      payment: "PIX",
      order: {
        totalPrice: '56',products: [{
          name: 'Fear of God',
          type: 'Camiseta',
          size: 'm',
          fullPrice: '40',
          offerPrice: '40',
        },{
          name: 'Sea World',
          type: 'Boné',
          size: 'U',
          fullPrice: '40',
          offerPrice: '30',
        }]
      }
    };
  }

  return (
    <ProductImages images={images}/>
  )

  return (
    <Container>
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
            <Tag tags={[product.size]} isSize={true}></Tag>
          </Size>
          <BulletDiv>
            <BulletPoints>
              {product.points.map((point) => 
                <Point key=''>{point}</Point>
              )}
            </BulletPoints>
          </BulletDiv>
          <BuyDiv>
            <BuyButton onClick={sendObjectToZap}>Poggers</BuyButton>
            <BuyButton onClick={() => onAdd(product,true)}>
              COMPRAR
            </BuyButton>
            <AddButton onClick={() => onAdd(product,false)}>
              <Box alt={'addCart'} src={BoxIcon}/>
            </AddButton>
          </BuyDiv>
        </DetailsDiv>
      </ProductDiv>
      <Info/>
    </Container>
  )
}