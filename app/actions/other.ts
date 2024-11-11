'use server'

import { headers } from 'next/headers'
import { CepInfo } from '@/types/api'

export async function getUserIP(): Promise<string> {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}

export async function getCepFields(inputCep: string): Promise<CepInfo> {
  const response = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`);

  const data = await response.json();

  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  
  return data
}