'use server'

import { applyDiscount, checkEnvVars, logError } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { ShippingInfo, SimulateShipping, DeliveryOption } from "@/types/kangu";
import { FormT } from "@/types/checkout";
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getUserIP } from "./other";
import { NEXT_PUBLIC_KANGU_API_URL, KANGU_API_TOKEN } from "./env";
import { clothesWeight } from "@/lib/globals";
import { CustomError } from "@/types/api";

const rateLimiter = new RateLimiterMemory({
  points: 4, // Number of requests
  duration: 30,
});

function calculateCartInfo(cartItems: CartItem[]) {
  let pesoMerc = 0;
  let vlrMerc = 0;
  const produtos = [];

  for (const item of cartItems) {
    for (const variant of item.cartVariants) {
      pesoMerc += clothesWeight[item.attributes.tipo] * variant.quantity;
      vlrMerc += applyDiscount(variant.variant.valor, variant.variant.desconto) * variant.quantity;
      produtos.push({
        peso: clothesWeight[item.attributes.tipo],
        altura: 7,
        largura: 30,
        comprimento: 24,
        valor: applyDiscount(variant.variant.valor, variant.variant.desconto),
        produto: `${item.attributes.tipo} ${item.attributes.nome} (${variant.variant.cor} - ${variant.variant.tamanho})`,
        quantidade: variant.quantity
      });
    }
  }

  return { pesoMerc, vlrMerc, produtos };
}

export async function simulateShipping(inputCep: string, cartItems: CartItem[]): Promise<DeliveryOption[] | { error : CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_KANGU_API_URL', 'KANGU_API_TOKEN']);

  try {
    await rateLimiter.consume(await getUserIP());
  } catch {
    const error = { error: { code: 429, message: 'Muitas solicitações. Tente novamente mais tarde.' } }; 
    logError(error);
    return error;
  }

  const { pesoMerc, vlrMerc, produtos } = calculateCartInfo(cartItems);

  const simulateInfo = {
    cepOrigem: "71010959",
    cepDestino: inputCep,
    vlrMerc,
    pesoMerc,
    produtos,
  } as SimulateShipping;

  const response = await fetch(`${NEXT_PUBLIC_KANGU_API_URL}/simular`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': KANGU_API_TOKEN || '',
    },
    body: JSON.stringify(simulateInfo),
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao simular frete: ${response.statusText}` } };
    logError(error);
    return error;
  }

  const data = await response.json();

  // Melhorar dps
  if (data.error) {
    const error = { error: { code: 400, message: data.error.mensagem } };
    logError(error);
    return error;
  }

  const options = data.filter((option: DeliveryOption) => option.nf_obrig == "N")

  if (options.length === 0) {
    const error = { error: { code: 400, message: 'Nenhuma opção de frete disponível.' } };
    logError(error);
    return error;
  }

  console.log(`[200] Frete simulado com sucesso para o CEP ${inputCep}`);
  return options;
}

export async function postShipping(values: FormT, cartItems: CartItem[])  {
  checkEnvVars(['NEXT_PUBLIC_KANGU_API_URL', 'KANGU_API_TOKEN']);

  const { pesoMerc, vlrMerc, produtos } = calculateCartInfo(cartItems);

  const { name, cpf, email, phone, address, number, complement, cep, state, city, district, selectedDelivery } = values;

  const shippingInfo = {
    pedido: {
      tipo: "D",
      vlrMerc,
      pesoMerc,
    },
    remetente: {
      nome: "Daniel da Cunha Pereira Luz",
      cnpjCpf: "05749091171",
      endereco: {
        logradouro: "QE 2 Bloco P Área Especial SRIA",
        numero: "2",
        complemento: "",
        bairro: "Guará I",
        cep: "71010970",
        cidade: "Brasília",
        uf: "DF"
      },
      email: "contato@ruadebaixo.com.br",
      celular: "61936180162"
    },
    destinatario: {
      nome: name,
      cnpjCpf: cpf,
      endereco: {
        logradouro: address,
        numero: number,
        complemento: complement || undefined,
        bairro: district,
        cep: cep,
        cidade: city,
        uf: state,
      },
      email: email || undefined,
      celular: phone || undefined,
    },
    produtos,
    referencia: selectedDelivery,
    servicos: ["P"]
  } as ShippingInfo;

  const response = await fetch(`${NEXT_PUBLIC_KANGU_API_URL}/solicitar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': KANGU_API_TOKEN || '',
    },
    body: JSON.stringify(shippingInfo),
  });

  if (!response.ok) {
    throw new Error(`Erro ao solicitar frete: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();

  return data;
}