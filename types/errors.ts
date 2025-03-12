import { Result } from 'neverthrow';

// Tipos de erros do Strapi
export type StrapiErrorTypes = 'ApplicationError' | 'ValidationError' | 'NotFoundError' | 'ForbiddenError' | 'UnauthorizedError';

export interface StrapiErrorDetails {
  [key: string]: any;
}

export interface StrapiError {
  status: number;
  name: StrapiErrorTypes;
  message: string;
  details: StrapiErrorDetails;
}

export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

// Nossa classe de erro customizada
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: Record<string, any>;
  public readonly originalError?: unknown;

  constructor(
    message: string, 
    statusCode: number = 500, 
    details?: Record<string, any>,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromStrapiError(strapiError: StrapiError, originalError?: unknown): ApiError {
    return new ApiError(
      strapiError.message,
      strapiError.status,
      strapiError.details,
      originalError
    );
  }
}

// Tipos para resultados usando neverthrow
export type ApiResult<T> = Result<T, ApiError>; 