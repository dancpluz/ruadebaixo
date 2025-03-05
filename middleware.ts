// middleware.ts
import { NextResponse } from 'next/server';
import { fetchFromStrapi } from './app/actions/strapi';
import { Home } from './types/api/home';

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const data = await fetchFromStrapi<Home>('home', true);
  const maintenance = data.data?.attributes?.manutencao || false;


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