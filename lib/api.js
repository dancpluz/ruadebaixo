import { client,urlForImage } from '@/sanity/client';
import { groq } from 'next-sanity';
// { cache } from 'react';

//export const revalidate = 300;

export const fetchLandingImages = async () => {
  // melhora essa merda dps
  const data = await client.fetch(groq`
  *[_type == "landing"][0] {
      top_image {
              asset->{
                  ...,
                  metadata
              }
          },
      right_image {
              asset->{
                  ...,
                  metadata
              }
          },
      left_image {
              asset->{
                  ...,
                  metadata
              }
          }
			}`);

  return {
      top_image: 
        {url: urlForImage(data.top_image),
        width: data.top_image.asset.metadata.dimensions.width,
        height: data.top_image.asset.metadata.dimensions.height,
        blur: data.top_image.asset.metadata.lqip},
      right_image: 
        {url: urlForImage(data.right_image),
        width: data.right_image.asset.metadata.dimensions.width,
        height: data.right_image.asset.metadata.dimensions.height,
        blur: data.right_image.asset.metadata.lqip},
      left_image:
        {url: urlForImage(data.left_image),
        width: data.left_image.asset.metadata.dimensions.width,
        height: data.left_image.asset.metadata.dimensions.height,
        blur: data.left_image.asset.metadata.lqip},
    }
};

export const fetchPhotos = async () => {
  const data = await client.fetch(groq`*[_type == "photos"]{
      name,
      date,
      images[] {
              asset->{
                  ...,
                  metadata
              }
          }
      }`)

  const photos = data.map((collection) => {
    const imageObjects = collection.images.map((image) => {
      return {
        url: urlForImage(image),
        width: image.asset.metadata.dimensions.width,
        height: image.asset.metadata.dimensions.height,
        blur: image.asset.metadata.lqip,
      }
    })
    return {
      name: collection.name,
      date: collection.date,
      images: imageObjects,
      };
    });

  return photos;
};

export const fetchLookBook = async (lookbookDate) => {
  const data = await client.fetch(
    groq`*[_type == "lookbook" && date == "${lookbookDate}"][0] {
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`);

  const photos = data.images.map(image => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });

  return { date: lookbookDate,images: photos };
};

export const fetchLandingProducts = async () => {
  const data = await client.fetch(groq`
  *[_type == "product" && drop == 'Valendo uma Coca'][0...8] {
        name, slug, type, images, price, drop, quality, tags, measures, size, details, discount, sold, ordered,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`);

  const products = data.map((product) => {
    const imageObjects = product.images.map((image) => {
      return {
        url: urlForImage(image),
        width: image.asset.metadata.dimensions.width,
        height: image.asset.metadata.dimensions.height,
        blur: image.asset.metadata.lqip,
      }
    });
    return {
      ...product,
      images: imageObjects,
    };
  });

  return products;
};

export const fetchProduct = async (slug) => {
  const data = await client.fetch(groq`
  *[_type == 'product' && slug.current == '${slug}'][0] {
        name, slug, type, images, price, drop, quality, tags, measures, size, details, discount, sold, ordered,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`);

  const imageObjects = data.images.map((image) => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });
   
  return { ...data,images: imageObjects };
};

export const fetchMetadata = async (slug) => {
  const data = await client.fetch(groq`*[_type == 'product' && slug.current == '${slug}']{name, type, images}`);

  const productData = data.map((object) => {
    const imageUrls = object.images.map((image) => urlForImage(image));
    return {
      ...object,
      images: imageUrls,
    };
  });

  return productData[0];
};

export const fetchCatalogProducts = async (page) => {
  const perPage = 12;
  const data = await client.fetch(groq`
  *[_type == "product"] {
        name, slug, type, images, price, drop, quality, tags, measures, size, details, discount, sold, ordered,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`);
  
  console.log(data.length)

  const products = data.map((product) => {
    const imageObjects = product.images.map((image) => {
      return {
        url: urlForImage(image),
        width: image.asset.metadata.dimensions.width,
        height: image.asset.metadata.dimensions.height,
        blur: image.asset.metadata.lqip,
      }
    });
    return {
      ...product,
      images: imageObjects,
    };
  });

  return products;
};

export const sendOrderToServer = async (order) => {
  try {
    const response = await fetch('https://maximum-jackal-sharply.ngrok-free.app/send-object',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      console.log('Pedido enviado com sucesso.');
    } else {
      console.error('Erro ao enviar o pedido.');
    }
  } catch (error) {
    console.error('Erro enviando:',error);
  }
}

//     const clienteRDB = {
//       name: 'Poggers',
//       id: "2023-03-02_1454",// biblioteca pra pegar data e hora
//       phone: "556198118398",
//       email: "caioquinha123@gmail.com",
//       insta: "caiok",
//       delivery: {type: "Retirada", local: "Plano"},
//       payment: {type: "PIX", moment: "Ao confirmar pedido"},
//       order: {
//         subtotal: '51',
//         tax: '5',
//         total: '56',
//            products: [{
//           name: 'Fear of God',
//           type: 'Camiseta',
//           fullPrice: '40',
//           offerPrice: '40',
//         },{
//           name: 'Sea World',
//           type: 'Boné',
//           fullPrice: '40',
//           offerPrice: '30',
//         }]
//       }
//     };
//   }