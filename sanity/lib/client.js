import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';
import createImageUrlBuilder from '@sanity/image-url'
import { cache } from 'react';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

const imageBuilder = createImageUrlBuilder({
  projectId: projectId,
  dataset: dataset,
})

export const urlForImage = (source) => {
  return imageBuilder.image(source).auto('format').url()
}

//const clientFetch = cache(client.fetch.bind(client))


