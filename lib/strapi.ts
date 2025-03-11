import { strapi } from '@strapi/client';
import { NEXT_PUBLIC_STRAPI_API_URL, STRAPI_TOKEN } from './env';
import { checkEnvVars } from './utils';

checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

const db = strapi({
  baseURL: `${NEXT_PUBLIC_STRAPI_API_URL}/api/`,
  auth: STRAPI_TOKEN,
});

export default db;