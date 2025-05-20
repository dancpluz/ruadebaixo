'use server'

import { WHATSAPP_GROUP_ID } from "@/lib/const";

export async function sendMessageToGroup(message: string) {
  try {
    if (!process.env.ZAP_URL || !process.env.ZAP_API_TOKEN) {
      throw new Error('Variáveis de ambiente ZAP não definidas');
    }

    const response = await fetch(`${process.env.ZAP_URL!}/client/sendMessage/ruadebaixo/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ZAP_API_TOKEN!,
      },
      body: JSON.stringify({
        chatId: WHATSAPP_GROUP_ID,
        contentType: "string",
        content: message
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.log(data.error)
      throw new Error('Falha na API ao enviar mensagem');
    }

    return data;
  } catch (error) {
    console.error('Erro ao mandar messagem no WhatsApp:', error);
    return {
      error: error instanceof Error ? error.message : String(error)
    }
  }
}