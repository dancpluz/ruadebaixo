'use server'

import { tryCatch } from "@/lib/errorHandler";
import db from "@/lib/strapi";
import { ApiResult } from "@/types/errors";
import { ArtistResponse } from "@/types/strapi";
import { sendMessageToGroup } from "./whatsapp";

export async function getArtists(): Promise<ApiResult<ArtistResponse>> {
  const result = await tryCatch(
    db?.collection('artists').find({
      filters: { verified: { $eq: true } },
      populate: ['image'],
      pagination: { limit: 100 }
    }) as Promise<ArtistResponse>,
    { action: 'getArtists' }
  );

  if (result.isErr()) {
    console.error('Erro ao buscar dados de artistas', result.error.message);
    return result;
  }

  return result;
}

export async function submitEmail(prevState: { error?: string; success?: string }, formData: FormData): Promise<{ error?: string; success?: string }> {
  const email = formData.get('email')?.toString()?.trim() || ''

  // Simple email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return { error: 'Email inválido!' }
  }

  try {
    const existingLead = await db?.collection('leads').find({ 
      filters: {
        email: { $eq: email }
      }
    }) as unknown as { data: { email: string }[] };

    if (existingLead.data.length > 0) {
      return {
        success: 'Este email já está cadastrado!'
      }
    }

    await db?.collection('leads').create({ email })
    await sendMessageToGroup(`🖥️ Novo cadastro no site do FCK IA com o email: ${email}`)
    
    return { success: 'Inscrição realizada! Você receberá nossas atualizações.' }
  } catch (error) {
    return { error: 'Erro ao inscrever-se :( Tente novamente mais tarde.' }
  }
}