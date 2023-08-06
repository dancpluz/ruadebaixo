import { client,urlForImage } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { cache } from 'react';

export const revalidate = 3600;

export async function fetchLookBookData() {
  const data = await client.fetch(groq`*[_type == 'lookbook']`);

  const lookBooks = data.map((collection) => {
    const imageUrls = collection.images.map((image) => urlForImage(image));
    return {
      name: collection.name,
      date: collection.date,
      images: imageUrls,
    };
  });
  return lookBooks;
};

export const fetchLandingProducts = cache(async () => {
const data = await client.fetch(groq`*[_type == 'product' && drop == 'Valendo uma Coca'][0..5]`);

  const products = data.map((product) => {
    const imageUrls = product.images.map((image) => urlForImage(image));
    return {
      ...product,
      images: imageUrls,
    };
  });

  return products;
}) 

export const fetchProduct = cache(async (slug) => {
  const data = await client.fetch(groq`*[_type == 'product' && slug.current == '${slug}']`);

  const product = data.map((object) => {
    const imageUrls = object.images.map((image) => urlForImage(image));
    return {
      ...object,
      images: imageUrls,
    };
  });

  console.log('Produto: ' + JSON.stringify(product[0]))

  return product[0];
}) 