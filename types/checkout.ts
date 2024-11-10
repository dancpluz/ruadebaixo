import { z } from "zod";
import { personalSchema, paymentSchema, orderSchema } from "../lib/fields";

export const clothesWeight = {
  'Anel': 0.1,
  'Bermuda': 0.4,
  'Boné': 0.2,
  'Calça': 0.6,
  'Camisa': 0.3,
  'Camiseta': 0.3,
  'Casaco': 0.6,
  'Cinto': 0.2,
  'Colar': 0.1,
  'Colete': 0.4,
  'Isqueiro': 0.1,
  'Jaqueta': 0.8,
  'Macacão': 0.8,
  'Óculos': 0.2,
  'Polo': 0.3,
  'Pulseira': 0.1,
  'Relógio': 0.2,
  'Short': 0.4,
  'Shoulder Bag': 0.4,
  'Suéter': 0.6,
  'Tênis': 0.8,
}

export type FormPersonalValues = z.infer<typeof personalSchema>;
export type FormPaymentValues = z.infer<typeof paymentSchema>;
export type FormOrderValues = z.infer<typeof orderSchema>;

export type FormPersonal = {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  insta?: string;
}

export type FormOrder = {
  delivery: 'retirada' | 'entrega' | '';
  selectedLocation?: 'UnB' | 'Rodoviária' | 'Guará II' | 'Asa Norte' | 'Paranoá';
  selectedDelivery?: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  number: string;
  state: string;
  complement?: string;
  feedback?: string;
}

export type FormPayment = {
  paymentType: 'credit' | 'pix';
  holderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  parcels: string;
}

export type FormT = FormPersonal & FormOrder & FormPayment;