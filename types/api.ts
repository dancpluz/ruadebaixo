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
  errors: { code: string; description: string }[] | null;
};

export type CustomError = {
  code: number | string;
  message: string;
}

export type NewCustomer = Pick<Customer, 'name' | 'email' | 'cpfCnpj' | 'mobilePhone' | 'postalCode' | 'addressNumber' | 'complement' | 'observations'>;

export type Product = {
  peso: number;
  altura: number;
  largura: number;
  comprimento: number;
  tipo?: 'C' | 'E';
  valor?: number;
  quantidade?: number;
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


export type BillingType = 'UNDEFINED' | 'BOLETO' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER' | 'DEPOSIT' | 'PIX';

export type Status = 'PENDING' | 'RECEIVED' | 'CONFIRMED' | 'OVERDUE' | 'REFUNDED' | 'RECEIVED_IN_CASH' | 'REFUND_REQUESTED' | 'REFUND_IN_PROGRESS' | 'CHARGEBACK_REQUESTED' | 'CHARGEBACK_DISPUTE' | 'AWAITING_CHARGEBACK_REVERSAL' | 'DUNNING_REQUESTED' | 'DUNNING_RECEIVED' | 'AWAITING_RISK_ANALYSIS';

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
  billingType: 'UNDEFINED' | 'BOLETO' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER' | 'DEPOSIT' | 'PIX';
  pixTransaction: string | null;
  status: Status;
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

export type CreditPayment = {
  billingType: 'CREDIT_CARD';
  customer: string;
  value: number;
  dueDate: string;
  description: string;
  externalReference: string;
  installmentCount: number;
  totalValue: number;
  installmentValue: number;
  remoteIp: string;
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
    addressComplement: string;
    phone?: string;
    mobilePhone: string;
  };
};

export interface CepInfo {
  cep: string;                // Postal code (ZIP code)
  logradouro: string;         // Street or address
  complemento: string;        // Address complement (optional)
  unidade: string;            // Unit (optional)
  bairro: string;             // Neighborhood
  localidade: string;         // City
  uf: string;                 // State abbreviation
  estado: string;             // Full state name
  regiao: string;             // Region name
  ibge: string;               // IBGE (Brazilian Institute of Geography and Statistics) code
  gia?: string;               // GIA code (optional, specific for São Paulo)
  ddd: string;                // Area code (telephone)
  siafi: string;              // SIAFI (Federal Administration Integrated System) code
}