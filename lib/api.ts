'use server'

import { Payload } from "@/types/common/Payload";

const TOKEN = process.env.STRAPI_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchFromStrapi<T>(path: string): Promise<Payload<T>> {
  const response = await fetch(`${API_URL}/api/${path}`, {
    headers: {
      Authorization: `bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha em puxar ${path}`);
  }

  return response.json();
}
