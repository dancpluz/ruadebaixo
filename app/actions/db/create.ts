'use server'

import db, { checkStrapiAvailability } from "@/lib/strapi";
import { ApiError } from '@/types/errors';
import { revalidatePath } from "next/cache";

// Interface para o erro do Strapi com tipagem mais precisa
interface StrapiErrorResponse {
  error: {
    status: number;
    message: string;
    details?: {
      errors?: Array<{ message: string }>;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

// Verifica se o objeto é um erro do Strapi com a estrutura esperada
function isStrapiErrorResponse(obj: unknown): obj is StrapiErrorResponse {
  return Boolean(
    obj && 
    typeof obj === 'object' && 
    'error' in obj &&
    obj.error && 
    typeof obj.error === 'object' && 
    'status' in obj.error &&
    'message' in obj.error
  );
}

/**
 * Cria múltiplos convites no Strapi
 * 
 * Importante: Nas server actions, objetos complexos como os Result do neverthrow
 * perdem seus métodos (isOk, isErr) ao serem serializados para o cliente
 * Por isso, estamos retornando um objeto simples que pode ser serializado de forma confiável
 */
export async function createInvites(names: string[]): Promise<{ data?: void; error?: ApiError }> {
  try {
    // 1. Verifica se o Strapi está disponível
    const availabilityResult = await checkStrapiAvailability();
    if (availabilityResult.isErr()) {
      console.log('Strapi indisponível');
      return { error: new ApiError('Erro ao criar convites', 500) };
    }

    // 2. Cria os convites
    const createPromises = names.map(name => 
      db?.collection('invites').create({
        name,
        key: Array.from({length: Math.floor(Math.random() * 7) + 6}, () => 
          'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]
        ).join('')
      })
    );

    // 3. Executa todas as criações
    try {
      await Promise.all(createPromises);
      // 4. Retorna sucesso
      revalidatePath('/convidar');
      return { data: undefined };
    } catch (error) {
      console.log('Erro ao criar convites:', error);
      
      // Verifica se o erro é um erro do Strapi usando a função de verificação
      if (isStrapiErrorResponse(error)) {
        const strapiError = error.error;
        
        // Se tiver detalhes do erro do Strapi, usa a mensagem específica
        if (strapiError.details?.errors?.length) {
          const errorMessage = strapiError.details.errors
            .map(err => err.message)
            .join(', ');
          
          return { 
            error: new ApiError(
              errorMessage, 
              strapiError.status, 
              strapiError.details
            ) 
          };
        }
        
        // Caso não tenha detalhes específicos, usa a mensagem geral
        return { 
          error: new ApiError(
            String(strapiError.message), 
            strapiError.status
          ) 
        };
      }
      
      // Erro genérico
      if (error instanceof Error) {
        return { 
          error: new ApiError(error.message, 500) 
        };
      }
      
      return { 
        error: new ApiError('Erro ao criar convites', 500) 
      };
    }
  } catch (error) {
    // 5. Captura qualquer outro erro inesperado
    console.error('Erro inesperado:', error);
    return { 
      error: new ApiError('Erro ao criar convites', 500) 
    };
  }
}
