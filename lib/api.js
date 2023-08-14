import { client,urlForImage } from '@/sanity/client';
import { groq } from 'next-sanity';
import { cache } from 'react';

export const revalidate = 300;

export const fetchPhotos = cache(async () => {
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
});

export const fetchLookBook = cache(async (lookbookDate) => {
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
});

export const fetchLandingProducts = cache(async () => {
  const data = await client.fetch(groq`
  *[_type == "product" && drop == 'Valendo uma Coca'][0..5] {
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
})

export const fetchProduct = cache(async (slug) => {
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
})

export const fetchMetadata = cache(async (slug) => {
  const data = await client.fetch(groq`*[_type == 'product' && slug.current == '${slug}']{name, type, images}`);

  const productData = data.map((object) => {
    const imageUrls = object.images.map((image) => urlForImage(image));
    return {
      ...object,
      images: imageUrls,
    };
  });

  return productData[0];
});

export const fetchCatalogProducts = cache(async (page) => {
  const perPage = 12;
  const data = await client.fetch(groq`
  *[_type == "product"][${page * perPage}...${(page + 1) * perPage}] {
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
})

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