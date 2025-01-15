import { z } from "zod";
import { personalSchema, paymentSchema, orderSchema } from "../lib/fields";

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