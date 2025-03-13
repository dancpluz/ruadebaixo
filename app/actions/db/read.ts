'use server'

import db, { checkStrapiAvailability } from "@/lib/strapi";
import { 
  GeneralResponse, 
  ProductStoreResponse, 
  DropResponse,
  StrapiSingleTypeResponseFrom,
  StrapiCollectionResponseFrom,
  InviteResponse
} from "@/types/strapi";
import { unstable_cache } from 'next/cache';
import type { ApiSellerSeller, ApiLookbookLookbook } from "@/types/contentTypes";
import { tryCatch } from '@/lib/errorHandler';
import { ApiResult, ApiError } from '@/types/errors';
import { ok, err } from 'neverthrow';
import { DEFAULT_VALUES } from '@/lib/const';

/**
 * Busca os dados gerais com tratamento de erro à prova de falhas
 * Sempre retorna um valor, nunca um erro no modo de desenvolvimento
 */
export async function fetchGeneral(): Promise<ApiResult<GeneralResponse>> {
  try {
    // 1. Verifica se o Strapi está disponível
    const availabilityResult = await checkStrapiAvailability();
    if (availabilityResult.isErr()) {
      // Se o Strapi estiver indisponível, retorna valor padrão
      console.log('Strapi indisponível, usando valores padrão');
      return ok(DEFAULT_VALUES.general);
    }

    // 2. Tenta buscar os dados
    const result = await tryCatch(
      db?.single('general').find({ populate: ['links', 'questions'] }) as Promise<GeneralResponse>,
      { action: 'fetchGeneral' }
    );

    // 3. Se houver erro, retorna valor padrão
    if (result.isErr()) {
      console.log('Erro ao buscar dados gerais, usando valores padrão');
      return ok(DEFAULT_VALUES.general);
    }

    // 4. Retorna os dados encontrados
    return result;
  } catch (error) {
    // 5. Captura qualquer outro erro inesperado e retorna valor padrão
    console.error('Erro inesperado:', error);
    return ok(DEFAULT_VALUES.general);
  }
}

export async function fetchInvite(key: string): Promise<ApiResult<InviteResponse>> {
  try {
    // 1. Verifica se o Strapi está disponível
    const availabilityResult = await checkStrapiAvailability();
    if (availabilityResult.isErr()) {
      // Se o Strapi estiver indisponível, retorna valor padrão
      console.log('Strapi indisponível, usando valores padrão');
      return err(new ApiError('Erro ao buscar dados do convite', 500));
    }

    // 2. Tenta buscar os dados
    const result = await tryCatch(
      db?.collection('invites').find({
        filters: {
          key: {
            $eq: key
          }
        }
      }) as Promise<InviteResponse>,
      { action: 'fetchInvite' }
    );

    // 3. Se houver erro, retorna erro
    if (result.isErr()) {
      console.log('Erro ao buscar dados do convite');
      return err(new ApiError('Erro ao buscar dados do convite', 500));
    }

    // 4. Verifica se encontrou algum convite com a chave especificada
    if (result.value.data.length === 0) {
      console.log(`Nenhum convite encontrado com a chave ${key}`);
      return err(new ApiError('Convite não encontrado', 404));
    }

    // 5. Retorna os dados encontrados
    return result;
  } catch (error) {
    // 6. Captura qualquer outro erro inesperado
    console.error('Erro inesperado:', error);
    return err(new ApiError('Erro ao buscar dados do convite', 500));
  }
}