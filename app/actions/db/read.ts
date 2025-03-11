'use server'

import db from "@/lib/strapi";
import { 
  GeneralResponse, 
  ProductStoreResponse, 
  DropResponse,
  StrapiSingleTypeResponseFrom,
  StrapiCollectionResponseFrom
} from "@/types/strapi";

// Importando tipos diretamente se precisarmos criar respostas para outros endpoints
import type { ApiSellerSeller, ApiLookbookLookbook } from "@/types/contentTypes";

/**
 * Busca dados gerais do site (configurações, informações de manutenção, etc)
 */
export async function fetchGeneral(): Promise<GeneralResponse> {
  try {
    const general = db.single('general');
    const result = await general.find({ populate: ['links', 'questions'] });
    return result as GeneralResponse;
  } catch (error) {
    //console.error(`Erro ao tentar puxar geral:`, error);
    throw error;
  }
}

/**
 * Busca produtos da loja com base em filtros opcionais
 */
export async function fetchStoreProducts(filters = {}): Promise<ProductStoreResponse> {
  try {
    const productStore = db.collection('product-store');
    const result = await productStore.find({ 
      populate: ['images_3d', 'images_banner', 'seller', 'variants', 'main_variant', 'info'],
      filters
    });
    return result as ProductStoreResponse;
  } catch (error) {
    throw error;
  }
}

/**
 * Busca drops com base em filtros opcionais
 */
export async function fetchDrops(filters = {}): Promise<DropResponse> {
  try {
    const drops = db.collection('drop');
    const result = await drops.find({
      populate: ['store_products', 'thrift_products', 'seller', 'lookbook'],
      filters
    });
    return result as DropResponse;
  } catch (error) {
    throw error;
  }
}

/**
 * Exemplo: Criando um tipo de resposta para uma entidade diretamente na função
 * para um caso onde não temos o tipo exportado em strapi.ts
 */
export async function fetchSellers(filters = {}) {
  try {
    const sellers = db.collection('seller');
    const result = await sellers.find({
      populate: ['logo', 'drops'],
      filters
    });
    // Usamos os tipos utilitários para criar um tipo de resposta para Seller
    return result as StrapiCollectionResponseFrom<ApiSellerSeller>;
  } catch (error) {
    throw error;
  }
}

/**
 * Exemplo: Busca um lookbook específico por ID
 */
export async function fetchLookbook(id: number) {
  try {
    const lookbooks = db.collection('lookbook');
    const result = await lookbooks.find({
      filters: { id: { $eq: id } },
      populate: ['cover', 'images', 'drop']
    });
    
    // Como estamos buscando por id, sabemos que teremos apenas um resultado
    // mas a API retorna uma coleção, então precisamos pegar o primeiro item
    const singleResult = {
      data: result.data[0],
      meta: result.meta
    };
    
    // Mesmo que não tenhamos exportado este tipo, podemos usá-lo diretamente
    return singleResult as StrapiSingleTypeResponseFrom<ApiLookbookLookbook>;
  } catch (error) {
    throw error;
  }
}