'use server'

import { checkEnvVars } from "@/lib/utils";
import { Payload } from "@/types/common/Payload";
import { NEXT_PUBLIC_STRAPI_API_URL, STRAPI_TOKEN } from "./env";

export async function fetchFromStrapi<T>(path: string, noCache: boolean = false): Promise<Payload<T>> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  try {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/${path}`, {
      headers: {
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: noCache ? 0 : 60 }
    });

    if (!response.ok) {
      throw new Error(`Erro em puxar ${path}`);
    }

    console.log(`[Puxado ${path} com sucesso]`);
    
    return response.json();
  } catch (error) {
    console.error(`Erro ao tentar puxar ${path}:`, error);
    throw error;
  }
}

// const updateProductQuantity(product: Produto, variant: Variante ) {

// }