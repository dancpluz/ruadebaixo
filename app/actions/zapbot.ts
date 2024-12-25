'use server'

import { checkEnvVars, logError } from "@/lib/utils";
import { ZAP_API_TOKEN, ZAP_URL } from "./env";

export async function sendMessageToClient(message: string = 'message', phone: string) {
  checkEnvVars(['ZAP_API_TOKEN', 'ZAP_URL']);

  const response = await fetch(`${ZAP_URL}/client/sendMessage/ruadebaixo/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ZAP_API_TOKEN || '',
    },
    body: JSON.stringify({ 
      chatId: `55${phone}@c.us`,
      contentType: "string",
      content: message
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar mensagem: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Erro ao enviar mensagem: ${data.error}`);
  }
}

export async function sendMessageToGroup(message: string) {
  checkEnvVars(['ZAP_API_TOKEN', 'ZAP_URL']);

  const response = await fetch(`${ZAP_URL}/client/sendMessage/ruadebaixo/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ZAP_API_TOKEN || '',
    },
    body: JSON.stringify({
      chatId: '120363159389024765@g.us',
      contentType: "string",
      content: message
    }),
  });

  if (!response.ok) {
    const error = { error: { code: response.status, message: `Erro ao enviar mensagem ao grupo ${response.statusText}` } }
    logError(error);
    return error;
  }

  const data = await response.json();

  if (!data.success) {
    const error = { error: { code: 500, message: data.error } }
    logError(error);
    return error;
  }

  return data;
}

export async function sendMessageToGroupError(message: string) {
  checkEnvVars(['ZAP_API_TOKEN', 'ZAP_URL']);

  const response = await fetch(`${ZAP_URL}/client/sendMessage/ruadebaixo/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ZAP_API_TOKEN || '',
    },
    body: JSON.stringify({
      chatId: '120363338633479351@g.us',
      contentType: "string",
      content: message
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar erro: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Erro ao enviar erro: ${data.error}`);
  }
}