import { client,urlForImage } from '@/sanity/client';
import { cache } from 'react';

export const revalidate = 60;

export const fetchLandingImages = async () => {
  const data = await client.fetch(`*[_type == "landing"][0]{
      ...,
      images[] {
              asset->{
                  ...,
                  metadata
              },
          },
      }`,{ next: { cache: 'no-store' } })

  const photos = data.images.map(image => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });

  return { text: data.text,images: photos }
}

export const fetchPhotos = async () => {
  const data = await client.fetch(`*[_type == "photos"]{
      ...,
      images[] {
              asset->{
                  ...,
                  metadata
              }
          }
      }`,{ next: { revalidate: 300 } })

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
    `*[_type == "lookbook" && date == "${lookbookDate}"][0] {
        ...,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`,{ next: { revalidate: 300 } });

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
  const data = await client.fetch(`
  *[_type == "product" && drop == "Galo"][0..7] | order(_createdAt asc) {
        ...,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`,{ next: { revalidate: 60 } });

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
  const data = await client.fetch(`
  *[_type == 'product' && slug.current == '${slug}'][0] {
        ...,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`,{ next: { revalidate: 60 } });

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
  const data = await client.fetch(`
  *[_type == 'product' && slug.current == '${slug}'][0] {
        ...,
				images[0..1] {
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
    }
  });

  return { ...data,images: imageObjects };
};

export const fetchCatalogProducts = cache(async () => {
  const data = await client.fetch(`
  *[_type == "product"] | order(_createdAt desc) | order(sold==true) {
        ...,
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`,{ next: { revalidate: 60 } });

  const products = data.map((product) => {
    const imageObjects = product.images.map((image) => {
      if (image.asset) {
        return {
          url: urlForImage(image),
          width: image.asset.metadata.dimensions.width,
          height: image.asset.metadata.dimensions.height,
          blur: image.asset.metadata.lqip,
        }
      }
    });
    return {
      ...product,
      images: imageObjects,
    };
  });

  return products;
});

export const fetchStaticParams = async () => {
  const data = await client.fetch(`
  *[_type == "product"] {
    slug
  }`,{ next: { revalidate: 60 } });

  const slugRoutes = data.map((product) => product.slug.current);

  return slugRoutes;
}

export const updateOrderedProduct = async (id) => {
  await client
    .patch(id) // Document ID to patch
    .set({ordered: true}) // Shallow merge
    .commit() // Perform the patch and return a promise
    .then(() => {
      console.log('Atualizado com sucesso!')
    })
    .catch((err) => {
      console.error('Erro ao atualizar: ', err.message)
    })
}

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
    throw new Error('Erro ao enviar o pedido')
  }
}

export const fetchLinks = async () => {
  const data = await client.fetch(`
  *[_type == "links"]
  `,{ next: { revalidate: 300 } });

  console.log(data);

  return data[0];
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