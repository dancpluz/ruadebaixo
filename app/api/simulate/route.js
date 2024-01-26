import { NextResponse } from "next/server";

const KANGU_TOKEN = process.env.NEXT_PUBLIC_KANGU_TOKEN

export async function POST(req) {
  const shippingInfo = await req.json()

  const res = await fetch('https://portal.kangu.com.br/tms/transporte/simular', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': KANGU_TOKEN
    },
    body: JSON.stringify(shippingInfo)
  })

  const data = await res.json()

  return NextResponse.json(data)
}
