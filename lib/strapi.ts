import { strapi } from '@strapi/client';
import { checkEnvVars } from './utils';
import { tryCatch, tryCatchSync } from './errorHandler';
import { ApiError } from '@/types/errors';
import { err, ok } from 'neverthrow';

// Verificação inicial de variáveis de ambiente e criação do cliente
const dbResult = tryCatchSync(() => {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  return strapi({
    baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/`,
    auth: process.env.STRAPI_TOKEN,
  });
});

// Verificação simplificada da disponibilidade
export const checkStrapiAvailability = async () => {
  if (dbResult.isErr()) {
    console.error('Erro ao conectar ao Strapi:', dbResult.error.message);
    return err(dbResult.error);
  }

  const healthCheck = await tryCatch(
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/_health`, {
      method: 'HEAD',
      cache: 'no-store'
    })
  );

  return healthCheck
    .andThen(response => response.ok 
      ? ok(true) 
      : err(new ApiError('Strapi indisponível', 503))
    );
};

// Status simplificado da conexão
export const getStrapiAvailability = () => ({
  available: dbResult.isOk(),
  message: dbResult.isErr() 
    ? dbResult.error.message 
    : 'Conexão com Strapi estabelecida'
});

export default dbResult.isOk() ? dbResult.value : null;