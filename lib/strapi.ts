import { strapi } from '@strapi/client';
import { checkEnvVars } from './utils';

checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

const db = strapi({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/`,
  auth: process.env.STRAPI_TOKEN,
});

export default db;