'use server'

import { checkEnvVars, roundToDecimal } from "@/lib/utils";
import { Customer, ListInfo, NewCustomer, Payment, SimulatePayment, PixQR, CreditCard } from "@/types/api";

const NEXT_PUBLIC_ASAAS_API_URL = process.env.NEXT_PUBLIC_ASAAS_API_URL;
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

const asaasHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "ruadebaixo",
  'access-token': ASAAS_API_KEY || '',
}

export async function getCustomer({ id, cpfCnpj }: { id?: string, cpfCnpj?: string }): Promise<ListInfo<Customer> | Customer | undefined> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);
  if (id) {
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers/${id}`, {
      headers: asaasHeaders,
    });

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      throw new Error(`Erro ao puxar cliente: (${response.status}) ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } else {
    // CPF PRECISA SER TRATADO
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers`, {
      headers: asaasHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro ao puxar clientes: (${response.status}) ${response.statusText}`);
    }

    const data = await response.json();

    return data.data.find((customer: Customer) => customer.cpfCnpj === cpfCnpj);
  }
}

export async function createCustomer({ id, name, cpf, email, phone, cep, number, complement, feedback }: FormCustomer & { id?: string }): Promise<FormCustomer | undefined> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);
  let customer;

  if (id) {
    // Check if there is customer with id, if there is update it
    customer = await getCustomer({ id }) as Customer;
  }

  if (!customer && cpf) {
    // Check if there is customer with cpf, if there is update it
    customer = await getCustomer({ cpfCnpj: cpf }) as Customer;
  }

  const body: NewCustomer = {
    name,
    email: email ?? null,
    mobilePhone: phone,
    addressNumber: number ?? null,
    complement: complement ?? null,
    postalCode: cep ?? null,
    cpfCnpj: cpf,
    observations: feedback ?? null,
  };

  if (customer) {
    body.observations = feedback ? `${customer.observations || ''}\n${feedback}` : customer.observations;

    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers/${customer.id}`, {
      method: 'PUT',
      headers: asaasHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(`Erro ao atualizar cliente: ${data.errors[0].description}`);
    }

    if (response.status === 404) {
      return;
    }

    if (!response.ok) {
      throw new Error(`Erro ao puxar cliente: (${response.status}) ${response.statusText}`);
    }

    console.log('[Cliente atualizado com sucesso:', customer.name, customer.id + ']')
    return data;

  } else {
    if (!cpf) {
      throw new Error('CPF é obrigatório');
    }
    if (!name) {
      throw new Error('Nome é obrigatório');
    }
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers`, {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(`Erro ao criar cliente: ${data.errors[0].description}`);
    }

    if (!response.ok) {
      const data = await response.json();
      console.log('[Erro ao puxar cliente:', data + ']')
      throw new Error(`Erro ao puxar cliente: (${response.status}) ${response.statusText}`);
    }

    console.log('[Cliente criado com sucesso:', data.name, data.id + ']')
    return data;
  }
}

export async function simulatePayment({ value, installmentCount, billingTypes }: { value: number, installmentCount: number, billingTypes: string[] }): Promise<SimulatePayment> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/simulate`, {
    method: 'POST',
    headers: asaasHeaders,
    body: JSON.stringify({
      value,
      installmentCount,
      billingTypes,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao simular pagamento: (${response.status}) ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.log('[Erro ao simular pagamento:', data + ']')
    throw new Error(`Erro ao simular pagamento: ${data.errors[0].description}`);
  }

  return data;
}

export async function getParcelOptions(value: number, parcelNumber: number): Promise<{ [key: number]: number }> {
  const parcels = [1, 3, 6, 9, 12];
  const filteredParcels = parcels.filter(parcel => parcel <= parcelNumber);

  const parcelOptionsArray = await Promise.all(filteredParcels.map(async (parcel) => {
    try {
      const payment = await simulatePayment({ value, installmentCount: parcel, billingTypes: ['CREDIT_CARD'] });
      console.log(payment)
      
      const { feePercentage, operationFee } = payment.creditCard;
      const fee = feePercentage + operationFee;

      return {
        [parcel]: roundToDecimal(value * ((fee / 100) + 1))
      }
    } catch (error) {
      console.log('Erro ao obter opções de parcela:', error)
      return;
    }
  }));

  const parcelOptions: { [key: number]: number } = parcelOptionsArray.filter(option => option !== undefined).reduce((acc, option) => {
    return { ...acc, ...option };
  }, {});

  for (let i = 1; i <= parcelNumber; i++) {
    if (!parcelOptions[i]) {
      const closestHigherParcel = filteredParcels.find(parcel => parcel >= i);
      if (closestHigherParcel) {
        parcelOptions[i] = parcelOptions[closestHigherParcel];
      }
    }
  }

  return parcelOptions;
}

export async function createPayment({ id, cpf, billingType, value, installmentCount, description }: { id?: string, cpf?: string, billingType: 'CREDIT_CARD' | 'PIX' | 'BOLETO', value: number, installmentCount?: number, description?: string }): Promise<Payment> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const customer = await getCustomer({ id, cpfCnpj: cpf }) as Customer;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 1);
  const formattedDueDate = dueDate.toISOString().split('T')[0];

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments`, {
    method: 'POST',
    headers: asaasHeaders,
    body: JSON.stringify({
      customer: customer.id,
      billingType,
      value,
      dueDate: formattedDueDate,
      installmentCount: billingType === 'CREDIT_CARD' ? installmentCount : undefined,
      totalValue: billingType === 'CREDIT_CARD' ? value : undefined,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar pagamento: (${response.status}) ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Erro ao criar pagamento: ${data.errors[0].description}`);
  }

  return data;
}


export async function getPixQR( id: string ): Promise<PixQR> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/${id}/pixQrCode`, {
    headers: asaasHeaders,
  });

  if (!response.ok) {
    throw new Error(`Erro ao puxar QR Code: (${response.status}) ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Erro ao puxar QR Code: ${data.error}`);
  }

  return data;
}

export async function checkPaymentStatus(id: string): Promise<Pick<Payment, 'status'>> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  console.log(id)
  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/${id}/status`, {
    headers: asaasHeaders,
  });

  if (!response.ok) {
    throw new Error(`Erro ao checar status de pagamento: (${response.status}) ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}

export async function payCreditCard({ creditCard, creditCardHolderInfo }: CreditCard): Promise<Payment> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/${id}/pixQrCode`, {
    headers: asaasHeaders,
  });

  if (!response.ok) {
    throw new Error(`Erro ao puxar QR Code: (${response.status}) ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Erro ao puxar QR Code: ${data.error}`);
  }

  return data;
}