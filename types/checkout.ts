export type ListInfo<Type> = {
  object: "list";
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: Type[];
};

export type Customer = {
  id: string;
  dateCreated: string;
  name: string;
  email: string | null;
  company: string | null;
  phone: string | null;
  mobilePhone: string | null;
  address: string | null;
  addressNumber: string | null;
  complement: string | null;
  province: string | null;
  postalCode: string | null;
  cpfCnpj: string;
  personType: 'FISICA' | 'JURIDICA';
  deleted: boolean;
  additionalEmails: string[] | null;
  externalReference: string | null;
  notificationDisabled: boolean;
  observations: string | null;
  municipalInscription: string | null;
  stateInscription: string | null;
  canDelete: boolean;
  cannotBeDeletedReason: string | null;
  canEdit: boolean;
  cannotEditReason: string | null;
  city: string | null;
  cityName: string | null;
  state: string | null;
  country: string | null;
};

export type NewCustomer = Pick<Customer, 'name' | 'email' | 'cpfCnpj' | 'mobilePhone' | 'postalCode' | 'addressNumber' | 'complement' | 'observations'>;

export type FormCustomer = {
  name: string;
  email?: string;
  cpf: string;
  phone: string;
  cep?: string;
  number?: string;
  complement?: string;
  feedback?: string;
}

export const clothesWeight = {
  'Camiseta': 0.3,
  'Camisa': 0.3,
  'Cinto': 0.2,
  'Polo': 0.3,
  'Boné': 0.2,
  'Calça': 0.6,
  'Shorts': 0.4,
  'Jaqueta': 0.8,
  'Suéter': 0.6,
  'Casaco': 0.6,
  'Óculos': 0.2,
  'Shoulder Bag': 0.4,
  'Tênis': 0.8,
}

export type Product = {
  peso: number;
  altura: number;
  largura: number;
  comprimento: number;
  tipo?: 'C' | 'E';
  valor?: number;
  quantidade?: number;
};

export type Shipping = {
  cepOrigem: string;
  cepDestino: string;
  vlrMerc: number;
  pesoMerc: number;
  produtos: Product[];
  servicos: ('E' | 'X' | 'M' | 'R')[];
};

export type Discount = {
  value: number;
  limitDate: string | null;
  dueDateLimitDays: number;
  type: "FIXED" | "PERCENTAGE";
};

export type Fine = {
  value: number;
  type: "FIXED" | "PERCENTAGE";
};

export type Interest = {
  value: number;
  type: "FIXED" | "PERCENTAGE";
};


export type SimulatePayment = {
  value: number;
  creditCard: {
    netValue: number;
    feePercentage: number;
    operationFee: number;
    installment: {
      paymentNetValue: number;
      paymentValue: number;
    } | null;
  };
  bankSlip: {
    netValue: number;
    feeValue: number;
    installment: {
      paymentNetValue: number;
      paymentValue: number;
    } | null;
  };
  pix: {
    netValue: number;
    feePercentage: number | null;
    feeValue: number;
    installment: {
      paymentNetValue: number;
      paymentValue: number;
    } | null;
  };
};


export type Payment = {
  object: "payment";
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  value: number;
  netValue: number;
  originalValue: number | null;
  interestValue: number | null;
  description: string | null;
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED";
  pixTransaction: string | null;
  status: "PENDING" | "PAID" | "CANCELLED";
  dueDate: string;
  originalDueDate: string;
  paymentDate: string | null;
  clientPaymentDate: string | null;
  installmentNumber: number | null;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference: string | null;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate: string | null;
  estimatedCreditDate: string | null;
  transactionReceiptUrl: string | null;
  nossoNumero: string | null;
  bankSlipUrl: string | null;
  lastInvoiceViewedDate: string | null;
  lastBankSlipViewedDate: string | null;
  discount: Discount;
  fine: Fine;
  interest: Interest;
  postalService: boolean;
  custody: string | null;
  refunds: string | null;
};

export type PixQR = {
  success: boolean;
  encodedImage: string;
  payload: string;
  expirationDate: string;
};

export type CreditCard = {
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    phone?: string;
    mobilePhone: string;
    addressComplement: string;
  };
};
