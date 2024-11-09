import { z } from "zod";
import { parse, isValid, isAfter, startOfToday } from 'date-fns';

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

const requiredMessage = (id: string) => ({ required_error: id + ' é obrigatório' })

export const personalSchema = z.object({
  name: z.string(requiredMessage('Nome')).min(1, 'Preencha seu nome'),
  email: z.string().email('Email inválido').or(z.literal('')),
  cpf: z.string(requiredMessage('CPF')).transform((val) => val.replace(/\D/g, '')).pipe(z.string().length(11, 'CPF deve ter 11 dígitos')),
  phone: z.string().transform((val) => val.replace(/\D/g, '')).pipe(z.string().min(10, 'Celular deve ter no mínimo 10 dígitos').max(12, 'Celular deve ter no máximo 12 dígitos')).or(z.literal('')),
  insta: z.string().or(z.literal(''))
});

export const personalSchemaRefined = personalSchema.superRefine(({ phone, email }, ctx) => {
  if (!phone && !email) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Adicione o email ou seu número para podermos contatar",
      path: ['phone'],
    });
  };
})

export const orderSchema = z.object({
  delivery: z.enum(['retirada', 'entrega'], { required_error: 'Selecione' }),
  selectedLocation: z.enum(['UnB', 'Rodoviária', 'Guará II', 'Asa Norte', 'Paranoá']).optional(),
  selectedDelivery: z.string(),
  cep: z.string().transform(val => val.replace(/\D/g, '')).pipe(z.string().length(8, 'O CEP deve ter 8 dígitos')).or(z.literal('')),
  address: z.string().min(1, 'Endereço é obrigatório').or(z.literal('')).optional(),
  district: z.string().min(1, 'Bairro é obrigatório').or(z.literal('')).optional(),
  city: z.string().min(1, 'Cidade é obrigatório').or(z.literal('')).optional(),
  state: z.string().min(1, 'Estado é obrigatório').or(z.literal('')).optional(),
  number: z.string().min(1, 'Número é obrigatório').or(z.literal('')).optional(),
  complement: z.string().optional(),
  feedback: z.string().optional(),
});

export const orderSchemaRefined = orderSchema.superRefine((values, ctx) => {
  if (values.delivery === 'entrega') {
    if (!values.selectedDelivery) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Selecione um tipo de entrega',  
        path: ['cep'],
      })
    }

    [['cep', 'CEP'],['address', 'Endereço'], ['district', 'Bairro'], ['city', 'Cidade'], ['state', 'Estado'], ['number', 'Número']].forEach(([id, name]) => {
      if (!values[id]) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: name + ' é obrigatório',  
          path: [id],
        })
      }
    })
  }

  if (values.delivery === 'retirada') {
    if (!values.selectedLocation) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Selecione um local de retirada',
        path: ['selectedLocation'],
      });
    }
  }


  // if (delivery === 'retirada' && selectedLocation === undefined) {
  //   return ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: "Local de retirada é obrigatório se a entrega for retirada",
  //     path: ['selectedLocation'],
  //   });
  // };
});

export const paymentSchema = z.object({
  paymentType: z.enum(['credit', 'pix']),
  holderName: z.string().or(z.literal('')),
  cardNumber: z.string().transform((val) => val.replace(/\D/g, '')).pipe(z.string().length(16, "Número do cartão deve ter 16 dígitos")).or(z.literal('')),
  expirationDate: z.string().min(1, "Data de validade é obrigatório").refine((value) => {
    const [month, year] = value.split('/');
    const date = parse(`${month}/01/20${year}`, 'MM/dd/yyyy', new Date());

    return isValid(date) && isAfter(date, startOfToday());
  }, {
    message: "Data inválida, use o formato MM/YY",
  }).or(z.literal('')),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos").or(z.literal('')),
  parcels: z.coerce.number({ invalid_type_error: 'Selecione uma parcela' }).optional(),
})

export const paymentSchemaRefined = paymentSchema.superRefine(({ paymentType, holderName, cardNumber, parcels, expirationDate, cvv }, ctx) => {
  if (paymentType === 'credit') {
    if (!holderName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nome do titular é obrigatório',
          path: ['holderName']
      });
    }

    if (!cardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Número do cartão é obrigatório',
        path: ['cardNumber']
      });
    }

    if (!expirationDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data de validade é obrigatória',
        path: ['expirationDate']
      });
    }

    if (!cvv) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CVV é obrigatório',
        path: ['cvv']
      });
    }

    if (!parcels) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Seleciona o número de parcelas',
        path: ['parcels']
      });
    }
  }
});

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