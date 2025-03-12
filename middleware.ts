// middleware.ts
import { NextResponse } from 'next/server';
import { GeneralResponse } from './types/strapi';
import { checkEnvVars } from './lib/utils';
import { reportError, tryCatch, tryCatchSync } from '@/lib/errorHandler';

export async function middleware(request: Request) {
  let maintenance = true;

  if (process.env.DISABLE_MAINTENANCE_MODE === 'true') {
    return NextResponse.next();
  }

  const { pathname } = new URL(request.url);

  // Paths excluídas da manutenção
  const excludedPaths = [
    '/manutencao',
    '/api/webhook',
    '/_next',
    '/anim',
    '/images',
    '/favicon.ico'
  ];

  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verificação de variáveis de ambiente com tratamento de erro
  const envCheck = tryCatchSync(() => 
    checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL'])
  );
  if (envCheck.isErr()) {
    reportError(envCheck.error);
    return handleMaintenanceMode(request);
  }

  // Verificação de saúde do banco de dados
  const healthCheckResult = await tryCatch(
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/_health`, {
      method: 'HEAD',
      cache: 'no-store'
    })
  );

  // Se o health check falhar, já retorna modo de manutenção
  if (healthCheckResult.isErr()) {
    reportError(healthCheckResult.error);
    return handleMaintenanceMode(request);
  }

  // Verifica se a resposta do health check está ok
  if (!healthCheckResult.value.ok) {
    console.error('Falha na verificação de saúde do banco de dados:', healthCheckResult.value.status);
    return handleMaintenanceMode(request);
  }
  
  // Busca dados gerais com tratamento de erro
  const generalResponse = await tryCatch<GeneralResponse>(
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/general`, {
      headers: {
        Authorization: `bearer ${process.env.STRAPI_TOKEN}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
  );
  
  // Se a resposta geral falhar, retorna modo de manutenção
  if (generalResponse.isErr()) {
    reportError(generalResponse.error);
    return handleMaintenanceMode(request);
  }

  // Atualiza status de manutenção se a resposta for válida
  maintenance = generalResponse.value.data.maintenance;

  if (maintenance) {
    return handleMaintenanceMode(request);
  }

  return NextResponse.next();
}

/**
 * Função auxiliar para lidar com o modo de manutenção
 */
function handleMaintenanceMode(request: Request): NextResponse {
  const { pathname } = new URL(request.url);

  // Trata rotas da API
  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { error: 'Service unavailable due to maintenance' },
      { status: 503 }
    );
  }

  // Trata páginas
  const url = new URL('/manutencao', request.url);
  const response = NextResponse.rewrite(url);
  response.headers.set('Retry-After', '3600');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|anim|images).*)',
  ],
};