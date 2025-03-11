// middleware.ts
import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_STRAPI_API_URL, STRAPI_TOKEN, DISABLE_MAINTENANCE_MODE } from './lib/env';
import { GeneralResponse } from './types/strapi';
import { checkEnvVars } from './lib/utils';

export async function middleware(request: Request) {
  let maintenance = true;

  if (DISABLE_MAINTENANCE_MODE) {
    return NextResponse.next();
  }

  try {
    checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  } catch (error) {
    console.error('Erro ao verificar variáveis de ambiente:', error);
  }

  const { pathname } = new URL(request.url);
  const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/general`, {
    headers: {
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
  });


  if (response.ok) {
    const { data } = await response.json() as GeneralResponse;
    maintenance = data.maintenance && true;
  }

  // Paths to exclude from maintenance
  const excludedPaths = [
    '/manutencao',
    '/api/webhook',
    '/_next'
  ];

  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (maintenance) {
    // Handle API routes
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Service unavailable due to maintenance' },
        { status: 503 }
      );
    }

    // Handle pages
    const url = new URL('/manutencao', request.url);
    const response = NextResponse.rewrite(url);
    response.headers.set('Retry-After', '3600'); // Optional for SEO
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};