'use server'

import { checkEnvVars } from "@/lib/utils";
import { Shipping } from "@/types/checkout";

const KANGU_API_URL = process.env.NEXT_PUBLIC_KANGU_API_URL;
const KANGU_API_TOKEN = process.env.KANGU_API_TOKEN;

export async function simulateShipping(shipping: Shipping) {
  checkEnvVars(['NEXT_PUBLIC_KANGU_API_URL', 'KANGU_API_TOKEN']);

  const response = await fetch(`${KANGU_API_URL}/simular`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': KANGU_API_TOKEN || '',
    },
    body: JSON.stringify(shipping),
  });

  if (!response.ok) {
    throw new Error(`Erro ao simular frete: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Erro ao simular frete: (${data.error.codigo}) ${data.error.mensagem}`);
  }

  return data;
}