import { z } from "zod";
import { parse, isValid, isAfter, startOfToday } from 'date-fns';

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

const deliverySchema = {
  cep: z.string().transform(val => val.replace(/\D/g, '')).pipe(z.string().length(8, 'O CEP deve ter 8 dígitos')).or(z.literal('')),
  address: z.string().min(1, 'Endereço é obrigatório').or(z.literal('')).optional(),
  district: z.string().min(1, 'Bairro é obrigatório').or(z.literal('')).optional(),
  city: z.string().min(1, 'Cidade é obrigatório').or(z.literal('')).optional(),
  state: z.string().min(1, 'Estado é obrigatório').or(z.literal('')).optional(),
  number: z.string().min(1, 'Número é obrigatório').or(z.literal('')).optional(),
  complement: z.string().optional(),
}

export const orderSchema = z.object({
  delivery: z.enum(['retirada', 'entrega'], { required_error: 'Selecione um tipo de entrega' }),
  selectedLocation: z.enum(['UnB', 'Rodoviária', 'Guará II', 'Asa Norte', 'Paranoá']).optional(),
  selectedDelivery: z.string(),
  feedback: z.string().optional(),
  ...deliverySchema
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
    [['cep', 'CEP'], ['address', 'Endereço'], ['district', 'Bairro'], ['city', 'Cidade'], ['state', 'Estado'], ['number', 'Número']].forEach(([id, name]) => {
      if (!values[id as keyof typeof values]) {
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
  ...deliverySchema
})

export const paymentSchemaRefined = paymentSchema.superRefine((values, ctx) => {
  if (values.paymentType === 'credit') {
    [['cvv', 'CVV'], ['expirationDate', 'Data de validade'], ['cardNumber', 'Número do cartão'], ['holderName', 'Nome do titular'], ['cep', 'CEP'], ['address', 'Endereço'], ['district', 'Bairro'], ['city', 'Cidade'], ['state', 'Estado'], ['number', 'Número']].forEach(([id, name]) => {
      if (!values[id as keyof typeof values]) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: name + ' é obrigatório',
          path: [id],
        })
      }
    })

    if (!values.parcels) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Seleciona o número de parcelas',
        path: ['parcels']
      });
    }
  }
});