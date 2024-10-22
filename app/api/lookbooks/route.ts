import { fetchFromStrapi } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchFromStrapi('lookbooks');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Falha em puxar dados' }, { status: 500 });
  }
}
