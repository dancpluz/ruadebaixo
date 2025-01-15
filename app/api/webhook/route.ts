import { postShipping } from "@/app/actions/kangu";
import { getSale, updateProductQuantities, updateSale } from "@/app/actions/strapi";
import { sendMessageToGroup } from "@/app/actions/zapbot";
import { isError, orderMessage } from "@/lib/utils";
import { Payment } from "@/types/api";
import { FormT } from "@/types/checkout";
import { NextResponse } from "next/server";

type EventName =
  | "PAYMENT_RECEIVED"
  | "PAYMENT_CONFIRMED"
  | "PAYMENT_OVERDUE"
  | "PAYMENT_DELETED"
  | "PAYMENT_CREATED"
;

async function handleWebhook(body: { event: EventName; payment: Payment }) {
  const event = body.event as EventName;
  const payment = body.payment as Payment;

  const message: string[] = [];

  switch (event) {
    case 'PAYMENT_CREATED':
      message.push(`[WEBHOOK-200] Pagamento criado`)
      return NextResponse.json({ message }, { status: 200 });
    case 'PAYMENT_RECEIVED':
      message.push(`[WEBHOOK-200] Pagamento recebido`)

      const sale = await getSale(Number(payment.externalReference));
      
      if (isError(sale)) {
        message.push(`[WEBHOOK-500] ${sale.error.message}`)
        return NextResponse.json({ message}, { status: 200 });
      } else {
        message.push(`[WEBHOOK-200] Venda ${sale.id} atualizada com sucesso`)
      }

      const { cliente, confirmed } = sale.attributes;

      if (confirmed) {
        message.push(`[WEBHOOK-500] Pagamento já confirmado`)
        return NextResponse.json({ message }, { status: 200 });
      }

      if (!cliente) {
        message.push(`[WEBHOOK-500] Cliente não vinculado`)
        return NextResponse.json({ message }, { status: 200 });
      }

      const { nome, email, celular, insta, cpf, cep, endereco, distrito, cidade, estado, numero, complemento } = cliente.data.attributes;

      const { cartItems, id_kangu, tipo_entrega, local_retirada, feedback, tipo_pagamento, parcelas } = sale.attributes;

      const values = {
        name: nome,
        email,
        phone: celular,
        insta,
        cep,
        address: endereco,
        number: numero,
        complement: complemento,
        district: distrito,
        city: cidade,
        state: estado,
        cpf,
        delivery: tipo_entrega,
        selectedLocation: local_retirada,
        selectedDelivery: id_kangu,
        feedback,
        paymentType: tipo_pagamento,
        parcels: parcelas?.toString(),
      } as FormT;

      if (id_kangu) {
        const shipping = await postShipping(values, cartItems)

        if (isError(shipping)) {
          message.push(`[WEBHOOK-500] Erro ao postar entrega: ${shipping.error.message}`)
        } else {
          message.push(`[WEBHOOK-200] Entrega postada com sucesso`)
        }
      }

      let { subtotal, frete, total } = sale.attributes;

      subtotal = subtotal || 0;
      frete = frete || 0;
      total = total || 0;

      const messageGroup = await sendMessageToGroup(orderMessage({ values, cartItems, total, freight: frete, discount: subtotal - (total - frete) }))

      if (isError(messageGroup)) {
        message.push(`[WEBHOOK-500] Erro ao enviar mensagem: ${messageGroup.error.message}`)
      } else {
        message.push(`[WEBHOOK-200] Mensagem enviada com sucesso ao grupo`)
      }

      const quantities = await updateProductQuantities(cartItems);

      if (isError(quantities)) {
        message.push(`[WEBHOOK-500] Erro ao atualizar quantidades: ${quantities.error.message}`)
      } else {
        message.push(`[WEBHOOK-200] Quantidades atualizadas no site com sucesso`)
      }

      const updatedSale = await updateSale(Number(payment.externalReference), payment.id);

      if (isError(updatedSale)) {
        message.push(`[WEBHOOK-500] ${updatedSale.error.message}`)
        return NextResponse.json({ message }, { status: 200 });
      } else {
        message.push(`[WEBHOOK-200] Venda ${updatedSale.id} atualizada com sucesso`)
      }

      return NextResponse.json({ message }, { status: 200 });
    case 'PAYMENT_OVERDUE':
      message.push(`Pagamento vencido`)
      return NextResponse.json({ message }, { status: 200 });
    case 'PAYMENT_CONFIRMED':
      message.push(`Pagamento confirmado`)
      return NextResponse.json({ message }, { status: 200 });
    default:
      message.push(`Tipo de evento inválido`)
      return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const webhookResponse = await handleWebhook(body);

    const responseBody = await webhookResponse.json();
    const status = webhookResponse?.status || 200;
    responseBody.message = responseBody.message.join('\n');
    console.log(responseBody.message);

    return NextResponse.json(responseBody, {
      status,
    });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: 'Webhook falhou.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Mande somente chamadas POST' }, { status: 400 });
}

