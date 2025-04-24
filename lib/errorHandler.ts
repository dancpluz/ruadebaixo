import { ApiError, StrapiErrorResponse } from '@/types/errors';
import { Result, ok, err } from 'neverthrow';

/**
 * Verifica se uma resposta é um erro do Strapi
 */
export const isStrapiErrorResponse = (data: unknown): data is StrapiErrorResponse => {
  return Boolean(
    data &&
    typeof data === 'object' &&
    'error' in data &&
    data.error &&
    typeof data.error === 'object' &&
    'status' in data.error &&
    typeof data.error.status === 'number' &&
    'name' in data.error &&
    typeof data.error.name === 'string' &&
    'message' in data.error &&
    typeof data.error.message === 'string'
  );
};

/**
 * Trata erros de requisições para o Strapi
 */
export const handleStrapiError = <T>(error: unknown, context?: Record<string, any>): Result<T, ApiError> => {
  let apiError: ApiError;

  // Se for uma resposta do Strapi
  if (isStrapiErrorResponse(error)) {
    const strapiError = error.error;
    apiError = ApiError.fromStrapiError(strapiError, error);
  }
  // Se for uma resposta HTTP
  else if (error instanceof Response || (error as any)?.json) {
    const status = (error as Response).status || 500;
    apiError = new ApiError(
      'Erro na comunicação com o servidor',
      status,
      undefined,
      error
    );
  }
  // Se for um erro padrão
  else if (error instanceof Error) {
    apiError = new ApiError(
      error.message || 'Ocorreu um erro inesperado',
      500,
      undefined,
      error
    );
  }
  // Se for qualquer outro tipo de erro
  else {
    apiError = new ApiError(
      'Ocorreu um erro inesperado',
      500,
      undefined,
      error
    );
  }
  
  return err(apiError);
};

/**
 * Wrapper para operações async que podem falhar
 * Transforma o resultado em neverthrow Result
 */
export async function tryCatch<T>(
  promise: Promise<T>,
  errorContext?: Record<string, any>
): Promise<Result<T, ApiError>> {
  try {
    const data = await promise;
    return ok(data);
  } catch (error) {
    return handleStrapiError<T>(error, errorContext);
  }
}

/**
 * Versão do tryCatch com operação síncrona
 */
export function tryCatchSync<T>(
  fn: () => T,
  errorContext?: Record<string, any>
): Result<T, ApiError> {
  try {
    const data = fn();
    return ok(data);
  } catch (error) {
    return handleStrapiError<T>(error, errorContext);
  }
} 