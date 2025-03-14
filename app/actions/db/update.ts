'use server'

import db, { checkStrapiAvailability } from "@/lib/strapi";
import { ApiError, ApiResult } from '@/types/errors';
import { InviteResponse } from "@/types/strapi";
import { err, ok } from "neverthrow";
import { revalidatePath } from "next/cache";
import { tryCatch } from "@/lib/errorHandler";

// Interface serializável para o cliente
interface SerializableResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
    details?: Record<string, any>;
  };
}

export async function confirmInvite({ 
  inviteKey, 
  documentId, 
  whatsapp, 
  insta 
}: { 
  inviteKey: string, 
  documentId: string, 
  whatsapp?: string, 
  insta?: string 
}): Promise<SerializableResult<InviteResponse>> {
  // Primeiro verificamos se o Strapi está disponível
  const availability = await checkStrapiAvailability();
  if (availability.isErr()) {
    return {
      success: false,
      error: {
        message: availability.error.message,
        statusCode: availability.error.statusCode,
        details: availability.error.details
      }
    };
  }

  // Se o db não existir, retornamos um erro
  if (!db) {
    return {
      success: false,
      error: {
        message: 'Conexão com o banco de dados não disponível',
        statusCode: 500
      }
    };
  }

  try {
    // Tentamos executar a atualização diretamente
    const response = await db.collection("invites").update(documentId, {
      key: inviteKey,
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      whatsapp: whatsapp || undefined,
      insta: insta || undefined,
    });
    
    // Convertemos a resposta para o formato esperado e serializável
    const data = {
      data: Array.isArray(response.data) 
        ? response.data.map(item => ({...item}))
        : [response.data].map(item => ({...item})),
      meta: {...response.meta}
    };
    
    // Revalidamos o caminho após sucesso
    revalidatePath(`/convite/${inviteKey}`);
    
    return {
      success: true,
      data
    };
  } catch (error) {
    // Usamos o handler de erros para tratar exceções
    const errorResult = await tryCatch<InviteResponse>(
      Promise.reject(error),
      { 
        context: 'confirmInvite', 
        inviteKey, 
        documentId 
      }
    );
    
    // Convertemos o erro para um formato serializável
    if (errorResult.isErr()) {
      return {
        success: false,
        error: {
          message: errorResult.error.message,
          statusCode: errorResult.error.statusCode,
          details: errorResult.error.details
        }
      };
    }
    
    // Esse caso não deve ocorrer (rejeitamos a promise acima), mas mantemos por segurança
    return {
      success: true,
      data: errorResult.value
    };
  }
}
