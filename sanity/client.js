import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
  perspective: 'published',
})

const imageBuilder = createImageUrlBuilder({
  ...client.config()
})

export const urlForImage = (source) => {
  return imageBuilder.image(source).auto('format').url()
}

