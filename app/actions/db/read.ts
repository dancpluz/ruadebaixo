'use server'

import db from "@/lib/strapi";
import { 
  GeneralResponse, 
  ProductStoreResponse, 
  DropResponse,
  StrapiSingleTypeResponseFrom,
  StrapiCollectionResponseFrom
} from "@/types/strapi";
import { unstable_cache } from 'next/cache';
import type { ApiSellerSeller, ApiLookbookLookbook } from "@/types/contentTypes";

/**
 * Tipo para opções de cache
 */
type CacheOptions = {
  tags?: string[];
  revalidate?: number;
};

export async function fetchGeneral(): Promise<GeneralResponse | undefined> {
  try {
    const general = db.single('general');
    const result = await general.find({ populate: ['links', 'questions'] });
    return result as GeneralResponse;
  } catch (error) {
    console.error(`Erro ao tentar puxar geral:`, error);
  }
}

const fetchStoreProducts = (filters: any, options?: CacheOptions) => unstable_cache(
  async (): Promise<ProductStoreResponse> => {
    try {
      const productStore = db.collection('product-store');
      const result = await productStore.find({ 
        populate: ['images_3d', 'images_banner', 'seller', 'variants', 'main_variant', 'info'],
        filters
      });
      return result as ProductStoreResponse;
    } catch (error) {
      console.error(`Erro ao buscar produtos da loja:`, error);
      throw error;
    }
  },
  ['fetchStoreProducts', JSON.stringify(filters)],
  { 
    tags: options?.tags || ['store-products'],
    revalidate: options?.revalidate
  }
)();

const fetchDrops = (filters: any, options?: CacheOptions) => unstable_cache(
  async (): Promise<DropResponse> => {
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
  },
  ['fetchDrops', JSON.stringify(filters)],
  { 
    tags: options?.tags || ['drops'],
    revalidate: options?.revalidate
  }
)();

const fetchSellers = (filters: any, options?: CacheOptions) => unstable_cache(
  async () => {
    try {
      const sellers = db.collection('seller');
      const result = await sellers.find({
        populate: ['logo', 'drops'],
        filters
      });
      return result as StrapiCollectionResponseFrom<ApiSellerSeller>;
    } catch (error) {
      throw error;
    }
  },
  ['fetchSellers', JSON.stringify(filters)],
  { 
    tags: options?.tags || ['sellers'],
    revalidate: options?.revalidate
  }
)();

const fetchLookbook = (id: number, options?: CacheOptions) => unstable_cache(
  async () => {
    try {
      const lookbooks = db.collection('lookbook');
      const result = await lookbooks.find({
        filters: { id: { $eq: id } },
        populate: ['cover', 'images', 'drop']
      });
      
      const singleResult = {
        data: result.data[0],
        meta: result.meta
      };
      
      return singleResult as StrapiSingleTypeResponseFrom<ApiLookbookLookbook>;
    } catch (error) {
      throw error;
    }
  },
  ['fetchLookbook', id.toString()],
  { 
    tags: options?.tags || ['lookbook'],
    revalidate: options?.revalidate
  }
)();