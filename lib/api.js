import { client,urlForImage } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

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
  console.log(lookBooks)

  return lookBooks;
}
