'use server'

import { tryCatch } from "@/lib/errorHandler";
import db from "@/lib/strapi";
import { ApiResult } from "@/types/errors";
import { ArtistResponse } from "@/types/strapi";

export async function getArtists(): Promise<ApiResult<ArtistResponse>> {
  const artists = await db?.collection('artists').find();

  const result = await tryCatch(
    db?.collection('artists').find({ populate: ['image'], pagination: { limit: 100 } }) as Promise<ArtistResponse>,
    { action: 'getArtists' }
  );

  if (result.isErr()) {
    console.error('Erro ao buscar dados de artistas', result.error.message);
  }

  return result;
}