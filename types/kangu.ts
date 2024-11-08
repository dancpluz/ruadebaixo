type Address = {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
};

type Remetente = {
  nome: string;
  cnpjCpf: string;
  endereco: Address;
  contato?: string;
  email?: string;
  telefone?: string;
  celular: string;
};

type Destinatario = {
  nome: string;
  cnpjCpf: string;
  endereco: Address;
  contato?: string;
  email: string;
  telefone?: string;
  celular: string;
};

type Produto = {
  peso: number;
  altura: number;
  largura: number;
  comprimento: number;
  produto: string; // nome do produto
  valor: number;
  quantidade: number;
  ean?: string; // optional in case of volumes
  numeroCli?: string; // optional in case of volumes
};

type Volume = Produto & {
  tipo: string;
  ean: string;
  numeroCli: string;
};

type Pedido = {
  tipo: 'D' | 'N';
  numero?: string;
  serie?: string;
  chave?: string;
  chaveCTe?: string;
  xml?: string;
  numeroCli?: string;
  vlrMerc: number;
  pesoMerc: number;
};

export interface ShippingInfo {
  gerarPdf?: boolean;
  formatoPdf?: string;
  pedido: Pedido;
  remetente: Remetente;
  destinatario: Destinatario;
  volumes?: Volume[]; // optional
  produtos: Produto[];
  pontoPostagem?: string; // optional
  pontoEntrega?: string; // optional
  transportadora?: string; // optional
  referencia?: string; // optional
  usarTransportadoraContrato?: boolean;
  servicos: ('P' | 'C' | 'R' | 'V' | 'E' | 'X')[];
}

export type SimulateShipping = {
  cepOrigem: string;
  cepDestino: string;
  vlrMerc: number;
  pesoMerc: number;
  produtos: Produto[];
  servicos: ('E' | 'X' | 'M' | 'R')[];
};

type ErrorInfo = {
  codigo: string;
  mensagem: string;
};

export interface DeliveryOption {
  vlrFrete: number;               // Freight cost
  prazoEnt: number;               // Estimated delivery time in days
  prazoEntMin: number;            // Minimum estimated delivery time in days
  prazoEntTransp: number;         // Transport time in days
  prazoEntTranspMin: number;      // Minimum transport time in days
  dtPrevEnt: string;              // Estimated delivery date (max)
  dtPrevEntMin: string;           // Estimated delivery date (min)
  dtPrevPostagem: string;         // Estimated posting date
  //tarifas: Tarifa[];              // Tariff details (assuming it holds an array of objects)
  error: ErrorInfo;               // Error information
  idSimulacao: number;            // Simulation ID
  place_only: boolean;            // Whether it's a place-only delivery
  idTransp: number;               // Transporter ID
  cnpjTransp: string;             // Transporter CNPJ
  idTranspResp: number;           // Responsible transporter ID
  cnpjTranspResp: string;         // Responsible transporter CNPJ
  alertas: string[];              // Array of alerts or messages
  nf_obrig: string;               // Whether a NF-e (invoice) is required ('S' or 'N')
  url_logo: string;               // URL for the transporter's logo
  transp_nome: string;            // Transporter name
  descricao: string;              // Description of the delivery option
  servico: string;                // Service code (e.g., 'X', 'E')
  referencia: string;             // Reference code for the delivery
}