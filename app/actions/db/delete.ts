'use server'

import db, { checkStrapiAvailability } from "@/lib/strapi";
import { ApiError } from '@/types/errors';
import { revalidatePath } from "next/cache";

/**
 * Deleta um convite pelo documentId
 * 
 * Retorna um objeto simples para facilitar a serialização (importante em server actions)
 */
export async function deleteInvite(documentId: string): Promise<{ data?: void; error?: ApiError }> {
  try {
    // 1. Verifica se o Strapi está disponível
    const availabilityResult = await checkStrapiAvailability();
    if (availabilityResult.isErr()) {
      console.log('Strapi indisponível');
      return { error: new ApiError('Erro ao deletar convite', 500) };
    }

    // 2. Deleta o convite
    try {
      // A função delete espera o documentId como string, que já é o formato correto
      await db?.collection('invites').delete(documentId);
      
      // 3. Retorna sucesso
      revalidatePath('/convidar');
      return { data: undefined };
    } catch (error) {
      console.log('Erro ao deletar convite:', error);
      
      // Verifica se o erro é um erro do Strapi
      if (error && typeof error === 'object' && 'error' in error && 
          error.error && typeof error.error === 'object') {
        
        const strapiError = error.error as any;
        
        // Se tiver detalhes do erro do Strapi, usa a mensagem específica
        if (strapiError.details?.errors) {
          const errorMessage = strapiError.details.errors
            .map((err: any) => err.message)
            .join(', ');
          return { 
            error: new ApiError(errorMessage, strapiError.status || 500, strapiError.details) 
          };
        }
        
        return { 
          error: new ApiError(strapiError.message || 'Erro ao deletar convite', strapiError.status || 500) 
        };
      }
      
      // Erro genérico
      if (error instanceof Error) {
        return { 
          error: new ApiError(error.message, 500) 
        };
      }
      
      return { 
        error: new ApiError('Erro ao deletar convite', 500) 
      };
    }
  } catch (error) {
    // Captura qualquer outro erro inesperado
    console.error('Erro inesperado:', error);
    return { 
      error: new ApiError('Erro ao deletar convite', 500) 
    };
  }
}
