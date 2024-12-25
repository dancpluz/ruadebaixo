'use server'

import { cartItemsToString, checkEnvVars, logError } from "@/lib/utils";
import { Payload } from "@/types/common/Payload";
import { NEXT_PUBLIC_STRAPI_API_URL, STRAPI_TOKEN } from "./env";
import { CartItem } from "@/types/cart";
import { Variante } from "@/types/components/produto/Variante";
import { FormT } from "@/types/checkout";
import { Cliente } from "@/types/api/cliente";
import { Venda } from "@/types/api/venda";
import { CustomError } from "@/types/api";

export async function fetchFromStrapi<T>(path: string, noCache: boolean = false): Promise<Payload<T>> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  try {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/${path}`, {
      headers: {
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: noCache ? 0 : 60 }
    });

    if (!response.ok) {
      throw new Error(`Erro em puxar ${path}`);
    }

    console.log(`[Puxado ${path} com sucesso]`);
    
    return response.json();
  } catch (error) {
    console.error(`Erro ao tentar puxar ${path}:`, error);
    throw error;
  }
}

export async function updateVariants(productId: number, variantes: Variante[]): Promise<void> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  
  try {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/produtos/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          variantes,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar a quantidade das variantes do produto ${productId}`);
    }

    console.log(`Quantidade da variante do produto ${productId} atualizada com sucesso`);
  } catch (error) {
    console.error(`Erro ao tentar atualizar a quantidade da variante do produto ${productId}:`, error);
    throw error;
  }
}

export async function updateProductQuantities(cartItems: CartItem[]): Promise<undefined | { error: CustomError }> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  try {
    for (const { id: productId, attributes, cartVariants } of cartItems) {
      const { variantes } = attributes;
      const newVariants = variantes;
  
      for (const { quantity, variant } of cartVariants) {
        const prevVariant = variantes.find((v) => v.id === variant.id);
        if (prevVariant) {
          newVariants[newVariants.indexOf(prevVariant)] = {
            ...prevVariant,
            quantidade: prevVariant.quantidade - quantity,
          };
        }
      }
      await updateVariants(productId, newVariants);
    }
    return;
  } catch (error) {
    return { error: { code: 500, message: 'Erro ao atualizar a quantidade dos produtos' } };
  }
  
}

export async function verifyVariantsSold(cartItems: CartItem[]): Promise<void> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);
  //WIP

  for (const { id: productId, cartVariants } of cartItems) {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/produtos/${productId}`, {
      headers: {
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao tentar puxar o produto ${productId}`);
    }

    const product = await response.json();
    const { variantes } = product.data.attributes;

    for (const { variant } of cartVariants) {
      const soldVariant = variantes.find((v: Variante) => v.id === variant.id);
      if (!soldVariant || soldVariant.quantidade <= 0) {
        console.log(`Variante ${variant.id} do produto ${productId} foi vendida`);
      } else {
        console.log(`Variante ${variant.id} do produto ${productId} ainda está disponível`);
      }
    }
  }
}

interface ClientProps {
  values: FormT;
  asaasCustomerId?: string;
  clientId?: number;
  checkCpf?: boolean;
}

export async function createNewClient({ values, asaasCustomerId, clientId, checkCpf=true }: ClientProps): Promise<Cliente | { error: CustomError }> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  const { name, email, cpf, phone, insta, cep, address, city, district, state, number, complement } = values;

  if (clientId) {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/clientes/${clientId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${STRAPI_TOKEN}`,
      }
    });

    if (response.status === 404) {
      console.log(`[404] Cliente ${clientId} não encontrado, criando novo cliente`);
      return await createNewClient({ values, asaasCustomerId, checkCpf: true});
    }

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao puxar dados do cliente ${clientId} ${response.statusText}` } }
      logError(error)
      return error;
    }

    console.log(`[200] Cliente ${clientId} puxado com sucesso`);
    const client = await response.json();
    return client.data;
  } else if (checkCpf) {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/clientes?filters[cpf][$eq]=${values.cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${STRAPI_TOKEN}`,
      }
    });

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao puxar cpfs ${response.statusText}` } }
      logError(error)
      return error;
    }

    const clients = await response.json();
    if (clients.data.length > 0) {
      console.log(`[200] Cliente com CPF ${values.cpf} já existe`);
      const client = clients.data[0]

      const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/clientes/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            email: email || client.attributes.email,
            celular: phone || client.attributes.celular,
            cep: cep || client.attributes.cep,
            endereco: address || client.attributes.endereco,
            distrito: district || client.attributes.distrito,
            cidade: city || client.attributes.cidade,
            estado: state || client.attributes.estado,
            numero: number || client.attributes.numero,
            complemento: complement || client.attributes.complemento,
            id_asaas: asaasCustomerId,
          },
        }),
      });

      if (!response.ok) {
        const error = { error: { code: response.status, message: `Erro ao puxar dados do cliente ${clientId} ${response.statusText}` } }
        logError(error)
        return error;
      }

      const updatedClient = await response.json()
      console.log(`[200] Cliente ${client.id} atualizado com sucesso`);
      return updatedClient.data;
    } else {
      console.log(`[404] Cliente com CPF ${values.cpf} não encontrado, criando novo cliente`);
      return await createNewClient({ values, asaasCustomerId, checkCpf: false });
    }
  } else {
    
    const body = {
      data: {
        nome: name,
        email,
        cpf,
        celular: phone,
        insta,
        cep,
        endereco: address,
        distrito: district,
        cidade: city,
        estado: state,
        numero: number,
        complemento: complement,
        id_asaas: asaasCustomerId,
        values: values
      },
    } as unknown as Cliente;

    const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao tentar criar cliente ${response.statusText}` } }
      logError(error)
      return error;
    }

    const client = await response.json();
    console.log(`Cliente ${client.data.id} criado com sucesso`);
    return client.data;
  }
}

interface SaleProps {
  values: FormT;
  cartItems: CartItem[];
  total: number;
  freight: number;
  discount: number;
  strapiClientId: string;
}

export async function createNewSale({ values, total, discount, freight, cartItems, strapiClientId }: SaleProps): Promise<Venda | { error: CustomError }> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  const { feedback, delivery, selectedLocation, selectedDelivery, paymentType, parcels } = values;

  const body = {
    data: {
      feedback,
      cliente: { connect: [strapiClientId] },
      produtos: { connect: cartItems.map(item => item.id ) },
      tipo_entrega: delivery,
      local_retirada: selectedLocation,
      tipo_pagamento: paymentType,
      id_kangu: delivery === 'entrega' ? selectedDelivery : undefined,
      descricao: cartItemsToString(cartItems),
      subtotal: total - freight + discount,
      frete: freight,
      total,
      cartItems,
      parcelas: Number(parcels),
    },
  } as unknown as Venda;

  const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/vendas`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao criar venda ${response.statusText}` } }
    logError(error)
    return error;
  }

  const sale = await response.json();
  console.log(`[200] Venda ${sale.data.id} criada com sucesso`);
  console.log(sale)
  return sale.data;
}

export async function updateSale(stripeSaleId: number, asaasPaymentId: string): Promise<Venda | { error: CustomError }> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/vendas/${stripeSaleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        id_pagamento: asaasPaymentId,
        confirmed: true,
      },
    }),
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao confirmar venda ${stripeSaleId} ${response.statusText}` } }
    logError(error)
    return error;
  }

  const sale = await response.json();
  console.log(`[200] Venda ${stripeSaleId} confirmada com sucesso`);

  return sale.data;
}

export async function getSale(stripeSaleId: number): Promise<Venda | { error: CustomError }> {
  checkEnvVars(['STRAPI_TOKEN', 'NEXT_PUBLIC_STRAPI_API_URL']);

  const response = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/api/vendas/${stripeSaleId}?populate[0]=cliente`, {
    headers: {
      Authorization: `bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao puxar dados da venda ${stripeSaleId} ${response.statusText}` } }
    logError(error)
    return error;
  }
  const sale = await response.json();
  console.log(`[200] Venda ${stripeSaleId} puxada com sucesso`);

  return sale.data;
}
