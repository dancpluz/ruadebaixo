import * as Sentry from '@sentry/nextjs';
import { ApiError, StrapiErrorResponse } from '@/types/errors';
import { Result, ok, err } from 'neverthrow';

/**
 * Envia um erro para o Sentry
 */
export const reportError = (error: Error | ApiError, context?: Record<string, any>): void => {
  // Se estamos em desenvolvimento, também logamos no console
  if (process.env.NODE_ENV === 'development') {
    console.error('Erro capturado:', error);
    if (context) {
      console.error('Contexto:', context);
    }
  }
  
  // Reporta para o Sentry com contexto adicional, se fornecido
  Sentry.captureException(error, {
    extra: context
  });
};

/**
 * Verifica se uma resposta é um erro do Strapi
 */
export const isStrapiErrorResponse = (data: any): data is StrapiErrorResponse => {
  return (
    data &&
    data.error &&
    typeof data.error === 'object' &&
    data.error.status &&
    data.error.name &&
    data.error.message
  );
};

/**
 * Trata erros de requisições para o Strapi
 */
export const handleStrapiError = <T>(error: unknown, context?: Record<string, any>): Result<T, ApiError> => {
  let apiError: ApiError;

  // Tratamento específico para erros do Strapi
  if (error instanceof Response || (error as any)?.json) {
    return err(new ApiError(
      'Erro na comunicação com o servidor',
      (error as Response).status || 500,
      undefined,
      error
    ));
  }

  if (isStrapiErrorResponse(error)) {
    apiError = ApiError.fromStrapiError(error.error, error);
  } else if (error instanceof Error) {
    apiError = new ApiError(
      error.message || 'Ocorreu um erro inesperado',
      500,
      undefined,
      error
    );
  } else {
    apiError = new ApiError(
      'Ocorreu um erro inesperado',
      500,
      undefined,
      error
    );
  }

  // Reporta o erro para o Sentry
  reportError(apiError, context);
  
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