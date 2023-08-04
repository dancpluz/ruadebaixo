import { createClient, groq } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';
import { cache } from 'react';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

const clientFetch = cache(client.fetch.bind(client))

const data = await clientFetch(groq`*[]`)

