'use server'

import { checkEnvVars } from "@/lib/utils";
import { Payload } from "@/types/common/Payload";
import { NEXT_PUBLIC_STRAPI_API_URL, STRAPI_TOKEN } from "./env";
import { CartItem } from "@/types/cart";
import { Variante } from "@/types/components/produto/Variante";

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

export async function updateVariants(productId: number, variantes: Variante[]): Promise<void> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  
  try {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/produtos/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          variantes,
        },
      }),
    });

    if (!response.ok) {
      console.log(response.status, response.statusText);
      throw new Error(`Erro ao atualizar a quantidade das variantes do produto ${productId}`);
    }

    console.log(`Quantidade da variante do produto ${productId} atualizada com sucesso`);
  } catch (error) {
    console.error(`Erro ao tentar atualizar a quantidade da variante do produto ${productId}:`, error);
    throw error;
  }
}

export async function updateProductQuantities(cartItems: CartItem[]): Promise<void> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  
  for (const { id: productId, attributes, cartVariants } of cartItems) {
    const { variantes } = attributes;
    const newVariants = variantes;

    for (const { quantity, variant } of cartVariants) {
      const prevVariant = variantes.find((v) => v.id === variant.id);
      if (prevVariant) {
        newVariants[newVariants.indexOf(prevVariant)] = {
          ...prevVariant,
          quantidade: prevVariant.quantidade - quantity,
        };
      }
    }
    await updateVariants(productId, newVariants);
  }
}

// const updateProductQuantity(product: Produto, variant: Variante ) {

// }