import { Schema, Struct } from '@strapi/strapi';
import { Public } from '@strapi/strapi';

// Importações dos tipos de contentTypes.d.ts
import type { 
  ApiGeneralGeneral,
  ApiProductStoreProductStore,
  ApiDropDrop,
  ApiInviteInvite,
  ApiGameCoverGameCover,
  ApiClassificationClassification
} from './contentTypes';

/**
 * Interface genérica para respostas da API Strapi
 */
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
}

/**
 * Tipo para a resposta de entidades únicas (SingleType)
 */
export interface StrapiSingleTypeResponse<T> extends StrapiResponse<T> {}

/**
 * Tipo para a resposta de coleções (CollectionType)
 */
export interface StrapiCollectionResponse<T> extends StrapiResponse<T[]> {}

/**
 * Utilitários para geração automática de tipos
 */

/**
 * Tipo para criar entidades do Strapi a partir das definições de atributos
 */
export type StrapiEntity<Attributes> = {
  id: number;
  documentId: string;
} & StrapiAttributes<Attributes>;

/**
 * Extrai os atributos de um tipo de conteúdo do Strapi para uso em tipos de entidade
 */
export type StrapiAttributes<T> = {
  [K in keyof T as T[K] extends Schema.Attribute.Private ? never : K]: ExtractAttributeType<T[K]>;
};

/**
 * Extrai o tipo de valor para um atributo específico do Strapi
 */
export type ExtractAttributeType<Attr> = 
  Attr extends Schema.Attribute.Relation<infer Type, infer Related> 
    ? ExtractRelationType<Type, Related>
    : Attr extends Schema.Attribute.Component<infer CompType, infer Multiple>
      ? ExtractComponentType<CompType, Multiple>
      : Attr extends Schema.Attribute.Media<infer MediaType, infer Multiple>
        ? ExtractMediaType<MediaType, Multiple>
        : Attr extends Schema.Attribute.Enumeration<infer Options>
          ? Options[number]
          : Attr extends Schema.Attribute.Boolean
            ? boolean
            : Attr extends Schema.Attribute.DateTime
              ? string
              : Attr extends Schema.Attribute.Date
                ? string
                : Attr extends Schema.Attribute.Email
                  ? string
                  : Attr extends Schema.Attribute.Integer
                    ? number
                    : Attr extends Schema.Attribute.BigInteger
                      ? number
                      : Attr extends Schema.Attribute.Decimal
                        ? number
                        : Attr extends Schema.Attribute.Float
                          ? number
                          : Attr extends Schema.Attribute.UID
                            ? string
                            : Attr extends Schema.Attribute.RichText
                              ? string
                              : Attr extends Schema.Attribute.Text
                                ? string
                                : Attr extends Schema.Attribute.String
                                  ? string
                                  : Attr extends Schema.Attribute.JSON
                                    ? any
                                    : Attr extends Schema.Attribute.Blocks
                                      ? any
                                      : Attr extends Schema.Attribute.Password
                                        ? never
                                        : any;

/**
 * Extrai o tipo para relações do Strapi
 */
type ExtractRelationType<Type, Related> = 
  Type extends 'oneToOne' | 'manyToOne' 
    ? { id: number; documentId?: string } | null 
    : Array<{ id: number; documentId?: string }>;

/**
 * Extrai o tipo para componentes do Strapi
 */
type ExtractComponentType<CompType, Multiple> = 
  Multiple extends true
    ? Array<{ id: number } & ComponentDataType<string & CompType>>
    : ({ id: number } & ComponentDataType<string & CompType>) | null;

/**
 * Tenta obter o tipo de componente com base no nome
 */
type ComponentDataType<CompType extends string> = 
  CompType extends keyof Public.ComponentSchemas 
    ? StrapiAttributes<Public.ComponentSchemas[CompType]>
    : Record<string, any>;

/**
 * Extrai o tipo para mídias do Strapi
 */
type ExtractMediaType<MediaType, Multiple> = 
  Multiple extends true
    ? Array<StrapiMedia>
    : StrapiMedia | null;

/**
 * Tipo para mídia do Strapi
 */
export interface StrapiMedia {
  id: number;
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  caption?: string;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

/**
 * Utilitários para criar tipos de resposta
 */

/**
 * Cria um tipo de entidade a partir de um tipo ContentType do Strapi
 * @example
 * type GeneralEntity = StrapiEntityFrom<ApiGeneralGeneral>;
 */
export type StrapiEntityFrom<T extends Struct.Schema> = StrapiEntity<T['attributes']>;

/**
 * Cria um tipo de resposta para um SingleType do Strapi
 * @example
 * type GeneralResponse = StrapiSingleTypeResponseFrom<ApiGeneralGeneral>;
 */
export type StrapiSingleTypeResponseFrom<T extends Struct.Schema> = 
  StrapiSingleTypeResponse<StrapiEntityFrom<T>>;

/**
 * Cria um tipo de resposta para um CollectionType do Strapi
 * @example
 * type ProductsResponse = StrapiCollectionResponseFrom<ApiProductStoreProductStore>;
 */
export type StrapiCollectionResponseFrom<T extends Struct.Schema> = 
  StrapiCollectionResponse<StrapiEntityFrom<T>>;

// Exemplos de uso
export type GeneralEntity = StrapiEntityFrom<ApiGeneralGeneral>;
export type GeneralResponse = StrapiSingleTypeResponseFrom<ApiGeneralGeneral>;

export type ProductStoreEntity = StrapiEntityFrom<ApiProductStoreProductStore>;
export type ProductStoreResponse = StrapiCollectionResponseFrom<ApiProductStoreProductStore>;

export type DropEntity = StrapiEntityFrom<ApiDropDrop>;
export type DropResponse = StrapiCollectionResponseFrom<ApiDropDrop>;

export type InviteEntity = StrapiEntityFrom<ApiInviteInvite>;
export type InviteResponse = StrapiCollectionResponseFrom<ApiInviteInvite>;

export type GameCoverEntity = StrapiEntityFrom<ApiGameCoverGameCover> & {
  tags: { name: string }[];
  topics: GameTopics[];
  classification: ClassificationEntity;
};

export type ClassificationEntity = StrapiEntityFrom<ApiClassificationClassification>;

export type GameTopics = {
  title: string;
  description: string;
  image: string;
}
export type GameCoverResponse = StrapiCollectionResponseFrom<ApiGameCoverGameCover>;
