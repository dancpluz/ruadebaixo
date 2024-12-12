'use server'

import { checkEnvVars, isError, logError, roundToDecimal } from "@/lib/utils";
import type { Customer, NewCustomer, Payment, SimulatePayment, PixQR, CustomError, Status, CreditPayment } from "@/types/api";
import { FormT } from "@/types/checkout";
import { getUserIP } from "./other";

const NEXT_PUBLIC_ASAAS_API_URL = process.env.NEXT_PUBLIC_ASAAS_API_URL;
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

const asaasHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'ruadebaixo',
  'access-token': '$' + ASAAS_API_KEY || ''
}

export async function getCustomer({ id, cpfCnpj }: { id?: string, cpfCnpj?: string }): Promise<Customer | { error: CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  if (id) {
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers/${id}`, {
      headers: asaasHeaders,
    });

    if (response.status === 404) {
      const error = { error: { code: 404, message: 'Cliente não encontrado' }}
      logError(error)
      return error;
    }

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao encontrar cliente ${response.statusText}` }}
      logError(error)
      return error;
    }

    const data = await response.json();

    return data;
  } else {
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers`, {
      headers: asaasHeaders,
    });

    if (response.status === 404) {
      const error = { error: { code: 404, message: 'Clientes não encontrado' }}
      logError(error)
      return error;
    }

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao encontrar clientes ${response.statusText}` }}
      logError(error)
      return error;
    }

    const data = await response.json();

    let customer = data.data.find((customer: Customer) => cpfCnpj && customer.cpfCnpj === cpfCnpj.replace(/\D/g, ''));
    
    customer = customer ? customer : { error: { code: 404, message: 'CPF não encontrado' } }

    if (isError(customer)) {
      logError(customer)
      return customer;
    } else {
      console.log(`[200] Cliente encontrado: ${customer.name} ${customer.id}`)
    }

    return customer;
  }
}

export async function createCustomer(values: FormT, asaasCustomerId?: string): Promise<Customer | { error: CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const { name, cpf, email, phone, cep, number, complement, feedback } = values;
  let customer;

  if (asaasCustomerId) {
    // Check if there is customer with id, if there is update it
    customer = await getCustomer({ asaasCustomerId });
  }

  if (!customer && cpf) {
    // Check if there is customer with cpf, if there is update it
    customer = await getCustomer({ cpfCnpj: cpf });
  }

  const body: NewCustomer = {
    name,
    email: email ?? null,
    mobilePhone: phone ? phone.replace(/\D/g, '') : null,
    addressNumber: number ?? null,
    complement: complement ?? null,
    postalCode: cep ? cep.replace(/\D/g, '') : null,
    cpfCnpj: cpf.replace(/\D/g, ''),
    observations: feedback ?? null,
  };

  if (!isError(customer)) {
    const { id, observations } = customer as Customer;

    body.observations = feedback ? `${observations || ''}\n${feedback}` : observations;

    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers/${id}`, {
      method: 'PUT',
      headers: asaasHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.errors) {
      const error = { error: { code: 400, message: data.errors[0].description }}
      logError(error)
      return error;
    }

    if (response.status === 404) {
      const error = { error: { code: 404, message: `Cliente ${id} não encontrado` }}
      logError(error)
      return error;
    }

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao editar cliente ${response.statusText}` }}
      logError(error)
      return error;
    }

    console.log(`[200] Cliente atualizado com sucesso: ${data.name} ${data.id} ${cpf}`)

    return data;

  } else {
    if (!cpf) {
      const error = { error: { code: 400, message: 'CPF é obrigatório' }}
      logError(error)
      return error;
    }
    if (!name) {
      const error = { error: { code: 400, message: 'Nome é obrigatório' } }
      logError(error)
      return error;
    }
    const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/customers`, {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.errors) {
      const error = { error: { code: 400, message: data.errors[0].description }}
      logError(error)
      return error;
    }

    if (!response.ok) {
      const error = { error: { code: response.status, message: `Erro ao criar cliente ${response.statusText}` }}
      logError(error)
      return error; 
    }

    console.log(`[200] Cliente criado com sucesso: ${data.name} ${data.id} ${data.cpfCnpj}`)
    return data;
  }
}

export async function simulatePayment({ value, installmentCount, billingTypes }: { value: number, installmentCount: number, billingTypes: string[] }): Promise<SimulatePayment | { error: CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const body = {
    value,
    installmentCount,
    billingTypes,
  }

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/simulate`, {
    method: 'POST',
    headers: asaasHeaders,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao simular pagamento ${response.statusText}` }}
    logError(error)
    return error;
  }

  const data = await response.json();

  if (data.errors) {
    const error = { error: { code: 400, message: data.errors[0].description }}
    logError(error)
    return error;
  }

  return data;
}

export async function getParcelOptions(value: number, parcelNumber: number): Promise<{ [id: number]: number; }> {
  const parcels = [1, 3, 6, 9, 12];
  const filteredParcels = parcels.filter(parcel => parcel <= parcelNumber);

  const parcelOptionsArray = await Promise.all(filteredParcels.map(async (parcel) => {
    try {
      const payment = await simulatePayment({ value, installmentCount: parcel, billingTypes: ['CREDIT_CARD'] });
      if (isError(payment)) {
        throw new Error(payment.error.message);
      }
      
      const { feePercentage, operationFee } = payment.creditCard;
      const fee = feePercentage + operationFee;

      return {
        [parcel]: roundToDecimal(value * ((fee / 100) + 1))
      }
    } catch {
      const customError = { error: { code: 500, message: `Erro ao obter opções de parcela ${parcel}` }}
      logError(customError)
      return;
    }
  }));

  const parcelOptions = parcelOptionsArray.filter(option => option !== undefined).reduce((acc, option) => {
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

export async function createPayment(values: FormT, total: number, description: string, id?: string): Promise<Payment | { error: CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const { cpf, paymentType, parcels } = values;

  const customer = await getCustomer({ id, cpfCnpj: cpf }) as Customer;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 1);
  const formattedDueDate = dueDate.toISOString().split('T')[0];

  const body = {
    customer: customer.id,
    billingType: paymentType === 'pix' ? 'PIX' : 'CREDIT_CARD',
    value: total,
    dueDate: formattedDueDate,
    installmentCount: paymentType === 'credit' && parcels !== '1' ? Number(parcels) : undefined,
    totalValue: paymentType === 'credit' ? total : undefined,
    description,
    remoteIp: paymentType === 'credit' ? await getUserIP() : undefined,
  } as CreditPayment;

  if (paymentType === 'credit') {
    const { holderName, email, cpf, cep, number, phone, complement, cardNumber, expirationDate, cvv } = values;

    body['creditCard'] = {
      holderName,
      number: cardNumber.replace(/\D/g, ''),
      expiryMonth: expirationDate.split('/')[0],
      expiryYear: `20${expirationDate.split('/')[1]}`,
      ccv: cvv,
    };

    body['creditCardHolderInfo'] = {
      name: holderName,
      email,
      cpfCnpj: cpf.replace(/\D/g, ''),
      postalCode: cep.replace(/\D/g, ''),
      addressNumber: number,
      addressComplement: complement ?? null,
      mobilePhone: phone ? phone.replace(/\D/g, '') : null,
    }
  }

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments`, {
    method: 'POST',
    headers: asaasHeaders,
    body: JSON.stringify(body),
  });

  // if (!response.ok) {
  //   const error = { error: { code: response.status, message: response.statusText }}
  //   logError(error)
  //   return error;
  // }

  const data = await response.json();

  if (data.errors) {
    const error = { error: { code: 400, message: data.errors[0].description }}
    logError(error)
    return error;
  }

  console.log(`[200] Pagamento criado com sucesso: ${data.id} ${data.value} ${data.status}`)
  return data;
}


export async function getPixQR( id: string ): Promise<PixQR | {  error:  CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/${id}/pixQrCode`, {
    headers: asaasHeaders,
  });

  if (response.status === 404) {
    const error = { error: { code: 404, message: 'QR Code não encontrado' }}
    logError(error)
    return error;
  }

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao encontrar QR code ${response.statusText}` }}
    logError(error)
    return error;
  }

  const data = await response.json() as PixQR;

  if (!data.success) {
    const error = { error: { code: 500, message: 'Ocorreu um erro ao  puxar o QR code' }}
    logError(error)
    return error;
  }

  console.log(`[200] QR Code puxado com sucesso: ${id}`)
  return data;
}

export async function checkPaymentStatus(id: string): Promise<{ status: Status } | { error: CustomError }> {
  checkEnvVars(['NEXT_PUBLIC_ASAAS_API_URL', 'ASAAS_API_KEY']);

  const response = await fetch(`${NEXT_PUBLIC_ASAAS_API_URL}/payments/${id}/status`, {
    headers: asaasHeaders,
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao checar pagamento ${response.statusText}` }}
    logError(error)
    return error;
  }

  const data = await response.json();

  if (data.errors) {
    const error = { error: { code: 400, message: data.errors[0].description }}
    logError(error)
    return error;
  }

  console.log(`[200] Status do pagamento ${id}: ${data.status}`)
  return data;
}