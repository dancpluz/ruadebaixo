import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
})

const imageBuilder = createImageUrlBuilder({
  ...client.config()
})

export const urlForImage = (source) => {
  return imageBuilder.image(source).auto('format').url()
}

