'use server'

import db, { checkStrapiAvailability } from "@/lib/strapi";
import { 
  GeneralResponse, 
  ProductStoreResponse, 
  DropResponse,
  StrapiSingleTypeResponseFrom,
  StrapiCollectionResponseFrom
} from "@/types/strapi";
import type { ApiSellerSeller, ApiLookbookLookbook } from "@/types/contentTypes";
import { tryCatch } from '@/lib/errorHandler';
import { ApiResult, ApiError } from '@/types/errors';
import { ok, err } from 'neverthrow';

/**
 * Busca os dados gerais com tratamento de erro à prova de falhas
 * Sempre retorna um valor, nunca um erro no modo de desenvolvimento
 */
// export async function fetchGeneral(): Promise<ApiResult<GeneralResponse>> {
//   try {
//     // 1. Verifica se o Strapi está disponível
//     const availabilityResult = await checkStrapiAvailability();
//     if (availabilityResult.isErr()) {
//       // Se o Strapi estiver indisponível, retorna valor padrão
//       console.log('Strapi indisponível, usando valores padrão');
//       return ok(DEFAULT_VALUES.general);
//     }

//     // 2. Tenta buscar os dados
//     const result = await tryCatch(
//       db?.single('general').find({ populate: ['links', 'questions'] }) as Promise<GeneralResponse>,
//       { action: 'fetchGeneral' }
//     );

//     // 3. Se houver erro, retorna valor padrão
//     if (result.isErr()) {
//       console.log('Erro ao buscar dados gerais, usando valores padrão');
//       return ok(DEFAULT_VALUES.general);
//     }

//     // 4. Retorna os dados encontrados
//     return result;
//   } catch (error) {
//     // 5. Captura qualquer outro erro inesperado e retorna valor padrão
//     console.error('Erro inesperado:', error);
//     return ok(DEFAULT_VALUES.general);
//   }
// }