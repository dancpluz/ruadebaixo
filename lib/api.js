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

  return product[0];
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

export const sendDataToServer = async () => {
  const dataToSend = {
    // Your data object here
    key1: 'value1',
    key2: 'value2',
  };

  try {
    const response = await fetch('http://mc.ruadebaixo.com/send-object',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      console.log('Data sent successfully.');
    } else {
      console.error('Failed to send data to the server.');
    }
  } catch (error) {
    console.error('Error sending data:',error);
  }
}