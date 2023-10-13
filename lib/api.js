import { client,urlForImage } from '@/sanity/client';

export const fetchLandingImages = async () => {
  // Retorna as imagens da landing page
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
  //WIP
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
  // Retorna as informações do lookbook
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
  // Retorna os produtos da landing page
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
  // Retorna as informações do produto
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
  // Retorna informações para colocar no metadata do produto
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

  if (!data) {
    return false;
  }

  const imageObjects = data.images.map((image) => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
    }
  });

  return { ...data,images: imageObjects };
};

export const fetchCatalogProducts = async () => {
  // Retorna os produtos do catálogo
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
};

export const fetchStaticParams = async () => {
  // Retorna as rotas pra gerar as páginas dos produtos previamente
  const data = await client.fetch(`
  *[_type == "product"] {
    slug
  }`,{ next: { revalidate: 60 } });

  const slugRoutes = data.map((product) => product.slug.current);

  return slugRoutes;
}


export const fetchSiteMapData = async () => {
  // Retorna as rotas e a data de modificação pra gerar o sitemap.xml
  const data = await client.fetch(`
  *[_type == "product"] {
    slug, _updatedAt
  }`,{ next: { revalidate: 60 } });

  const routes = data.map((product) => {return { slug: product.slug.current, lastModified: product._updatedAt }});

  return routes;
}

export const updateOrderedProduct = async (id) => {
  // Atualiza o produto pra marcá-lo como sendo observado
  await client
    .patch(id)
    .set({ordered: true})
    .commit()
    .then(() => {
      console.log('Atualizado com sucesso!')
    })
    .catch((err) => {
      console.error('Erro ao atualizar: ', err.message)
    })
}

export const sendOrderToServer = async (order) => {
  // Envia o objeto de pedido pro bot do whatsapp
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
  // Retorna os links para a página de links
  const data = await client.fetch(`
  *[_type == "links"]
  `,{ next: { revalidate: 300 } });

  return data[0];
}

export const fetchConfig = async () => {
  // Retorna as configurações do site
  const data = await client.fetch(`
  *[_type == "config"][0]{local_storage_version,maintenance_mode,maintenance_text}
  `,{ next: { revalidate: 300 } });

  return data;
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
