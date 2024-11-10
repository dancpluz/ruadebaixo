'use client'

import { CartItem } from "@/types/cart";
import { Variante } from "@/types/components/produto/Variante";
import { useEffect } from 'react';
import { createContext, useContext, useState } from "react"
import { createStore, StoreApi, useStore } from "zustand"
import { persist } from 'zustand/middleware'
import { applyDiscount, isError } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Produto } from "@/types/api/produto";
import { simulateShipping } from '@/app/actions/kangu';
import { FormOrder, FormPersonal, FormT } from "@/types/checkout";
import { DeliveryOption } from './../types/kangu';
import { createPayment, getPixQR, checkPaymentStatus, createCustomer } from "./actions/asaas";
import { Payment, Customer, Status } from "@/types/api";
import { add } from 'date-fns';
import { UseFormReturn } from "react-hook-form";
import { getParcelOptions } from '@/app/actions/asaas';
import { formatToBRL } from '@/lib/utils';

// Define TimeLeft interface
interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

// Cart State Slice
type CartState = {
  cartOpen: boolean;
  toggleCartOpen: () => void;
  cepFreight: { cep: string, frete: number | null, loading: boolean };
  calculateFreight: (formData: FormData) => void;
  cartItems: CartItem[];
  addItemToCart: (item: Produto, variant: Variante) => void;
  removeItemFromCart: (item: CartItem, variant: Variante) => void;
  totalPrice: () => number;
  totalItems: () => number;
  resetCart: () => void;
}

// Time State Slice
type TimeState = {
  timeLeft: TimeLeft;
  calculateTimeLeft: () => void;
}

// Cart State Slice
type UserState = { 
  form: FormPersonal & FormOrder
  loading: boolean,
  setInfo: (id: string, value: any) => void,
  setFormInfo: (form: UseFormReturn, id: string, value: string) =>  void,
  deliveryOptions: DeliveryOption[]
  getDeliveryOptions: (cep: string) => Promise<void>,
  cobranca?: Payment,
  pix: {
    success?: boolean,
    encodedImage: string,
    payload: string,
    expirationDate: string,
  },
  timeout?: Date,
  resetTimeout: () => void,
  paymentStatus?: Status,
  checkPayment: () => Promise<void>,
  customer?: Customer,
  successCallback?: () => Promise<void>,
  makePayment: (total: number, values: FormT, description: string) => Promise<void>,
  resetPayment: () => void,
  parcelOptions: { id: string, label: string, value: number }[];
  calculateParcelOptions: (value: number, installmentCount: number) => void;
}

// Combined Store State
type StoreState = CartState & TimeState & UserState;

// Store Context
const StoreContext = createContext<StoreApi<StoreState> | undefined>(undefined);

// Cart state slice function
const createCartSlice = (set: (fn: (state: CartState) => CartState) => void, get: () => CartState): CartState => ({
  cartOpen: false,
  toggleCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
  cepFreight: { cep: '', frete: null, loading: false },
  calculateFreight: async (formData) => {
    let cep = formData.get('cep') as string;
    cep = cep.replace('-', '').replace('_', '');
    if (!cep) return

    try {
      set((state) => ({ cepFreight: { ...state.cepFreight, loading: true } }))
      
      if (cep.length !== 8) {
        throw new Error('CEP inválido')
      }

      const data = await simulateShipping(cep, get().cartItems);
      set({ cepFreight: { cep: cep, frete: data[0].vlrFrete, loading: false }})
    } catch (error) {
      toast({
        title: `Erro ao calcular frete`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      set((state) => ({ cepFreight: { ...state.cepFreight, loading: false } }))
    }
  },
  cartItems: [],
  totalItems: () => get().cartItems.reduce((acc, item) => acc + item.cartVariants.reduce((acc, variant) => acc + variant.quantity, 0), 0),
  totalPrice: () => get().cartItems.reduce((acc, item) => acc + item.cartVariants.reduce((acc, variant) => acc + applyDiscount(variant.variant.valor, variant.variant.desconto) * variant.quantity, 0), 0),
  addItemToCart: (item, variant) => set((state) => {
    // Checa quantidade
    if (variant.quantidade === 0) {
      // Error toast
      toast({
        title: `Não é possível adicionar ao carrinho`,
        description: `Não há ${item.attributes.nome} disponível no estoque.`,
        variant: "destructive",
        duration: 3000,
      });
      return state;
    }

    // Checa se item existe no carrinho
    const existingCartItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      // Checa se variante existe no carrinho
      const existingVariant = existingCartItem.cartVariants?.find((cartVariant) => cartVariant.variant.id === variant.id);

      if (existingVariant) {
        // Se a quantidade da variante existente for maior que a existente, não adiciona
        if (existingVariant.quantity + 1 > variant.quantidade) {
          // Error toast
          toast({
            title: `Não é possível adicionar ao carrinho`,
            description: `Somente ${variant.quantidade === 1 ? variant.quantidade + ' unidade disponível' : variant.quantidade + ' unidades disponíveis'} de ${item.attributes.nome}.`,
            variant: "destructive",
            duration: 3000,
          });
          return state;
        } else {
          // Adiciona 1 na quantidade da variante existente
          existingVariant.quantity += 1;
          toast({
            title: "Carrinho atualizado",
            description: `+1 ${item.attributes.nome} adicionado ao carrinho.`,
            duration: 3000,
          });
        }
      } else {
        // Caso não tenha uma variante existente, adiciona uma nova
        existingCartItem.cartVariants.push({ variant, quantity: 1 });
        toast({
          title: "Carrinho atualizado",
          description: `Novo tipo de ${item.attributes.nome} adicionado ao carrinho.`,
          duration: 3000,
        });
      }
    } else {
      // Caso não tenha um item existente, adiciona um novo
      state.cartItems.push({ ...item, cartVariants: [{ variant, quantity: 1 }] });
      toast({
        title: "Carrinho atualizado",
        description: `${item.attributes.nome} adicionado ao carrinho.`,
        duration: 3000,
      })
    }
    return { cartItems: [...state.cartItems] };
  }),
  resetCart: () => set(() => ({ cartItems: [], freight: { cep: '', frete: null, loading: false } })),
  removeItemFromCart: (item, variant) => set((state) => {
    // Checa se item existe no carrinho
    const existingCartItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      // Checa se variante existe no carrinho
      const existingVariant = existingCartItem.cartVariants?.find((cartVariant) => cartVariant.variant.id === variant.id);

      if (existingVariant) {
        // Se a quantidade da variante existente for maior que a existente, não remove
        if (existingVariant.quantity - 1 === 0) {
          // Remove the variant from the cart item
          existingCartItem.cartVariants = existingCartItem.cartVariants.filter((cartVariant) => cartVariant.variant.id !== variant.id);
          toast({
            title: "Carrinho atualizado",
            description: `${item.attributes.nome} removido do carrinho.`,
            duration: 3000,
          });

          // If no variants are left, remove the cart item
          if (existingCartItem.cartVariants.length === 0) {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== item.id);
          }
        } else {
          // Remove 1 na quantidade da variante existente
          existingVariant.quantity -= 1;
          toast({
            title: "Carrinho atualizado",
            description: `-1 ${item.attributes.nome} removido do carrinho.`,
            duration: 3000,
          });
        }
      } else {
        // Error toast
        toast({
          title: `Não é possível remover do carrinho`,
          description: `Não há ${item.attributes.nome} no carrinho.`,
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      // Error toast
      toast({
        title: `Não é possível remover do carrinho`,
        description: `Não há ${item.attributes.nome} no carrinho.`,
        variant: "destructive",
        duration: 3000,
      });
    }
    return { cartItems: [...state.cartItems] };
  }),
});

// Time state slice function
const createTimeSlice = (set: (fn: (state: TimeState) => TimeState) => void, finalDate: string): TimeState => ({
  timeLeft: { dias: 0, horas: 0, minutos: 0, segundos: 0 },
  calculateTimeLeft: () => {
    const difference = +new Date(finalDate) - +new Date();
    if (difference > 0) {
      set({
        timeLeft: {
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        }
      });
    } else {
      set({ timeLeft: { dias: 0, horas: 0, minutos: 0, segundos: 0 } });
    }
  },
});

// User state slice function
const createUserSlice = (set: (fn: (state: UserState) => UserState) => void, get: () => UserState): UserState => ({
  form: {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    insta: '',
    delivery: '',
    selectedLocation: undefined,
    selectedDelivery: undefined,
    cep: '',
    address: '',
    number: '',
    complement: '',
  },
  loading: false,
  deliveryOptions: [],
  setFormInfo: (form, id, value) => { form.setValue(id,value), set((state) => ({ form: { ...state.form, [id]: value } }))},
  setInfo: (id, value) => set({ [id]: value }),
  getDeliveryOptions: async (cep) => {
    if (!cep) return

    try {
      set(() => ({ loading: true }))

      if (cep.length !== 8) {
        throw new Error('CEP inválido')
      }

      const data = await simulateShipping(cep, get().cartItems);
      set({ deliveryOptions: data })
      set(() => ({ loading: false }))
    } catch (error) {
      toast({
        title: `Erro ao calcular frete`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      set(() => ({ loading: false }))
      throw error
    }
  },
  cobranca: undefined,
  pix: {
    success: undefined,
    encodedImage: '',
    payload: '',
    expirationDate: '',
  },
  paymentStatus: undefined,
  successCallback: undefined,
  resetPayment: () => set(() => ({
    paymentStatus: undefined,
    cobranca: undefined,
    loading: false,
    pix: {
      success: undefined,
      encodedImage: '',
      payload: '',
      expirationDate: '',
    },
    timeout: undefined,
  })),
  timeout: undefined,
  resetTimeout: () => set(() => ({ timeout: undefined })),
  parcelOptions: [],
  calculateParcelOptions: async (value, installmentCount) => {
    try {
      set(() => ({ loading: true }))
      const data = await getParcelOptions(value, installmentCount);

      const parcelOptions = []

      for (const [key, value] of Object.entries(data)) {
        if (key === '1') {
          parcelOptions.push({ id: key, label: `${formatToBRL(value)} À vista`, value })
          continue
        }
        const label = `${formatToBRL(value)} (${formatToBRL(value/Number(key))} em ${key}x)`
        parcelOptions.push({ id: key, label, value })
      }

      set((state) => ({ parcelOptions, form: {...state.form, parcels: '1'}, loading: false }))
    } catch (error) {
      toast({
        title: `Erro ao calcular parcelas`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      set(() => ({ parcelOptions: [], loading: false }))
    }
  },
  checkPayment: async () => {
    try {
      const id = get().cobranca?.id
      if (!id) {
        throw new Error('Tente novamente')
      }

      const { status } = await checkPaymentStatus(id)

      switch (status) {
        case 'PENDING':
          toast({
            title: `Aguardando pagamento`,
            description: `Não saia dessa página, por favor aguarde.`,
            duration: 3000,
          });
          break;
        case 'RECEIVED':
        case 'CONFIRMED':
          toast({
            title: `Pagamento Recebido`,
            description: `Recebemos seu pagamento!`,
            duration: 3000,
          });
          get().resetPayment()
          set(() => ({ paymentStatus: status }))
          if (get().successCallback) {
            await get().successCallback();
          }

          break;
        default:
          toast({
            title: `Pagamento Cancelado`,
            description: `Infelizmente seu pagamento foi cancelado, tente novamente`,
            variant: "destructive",
            duration: 3000,
          });
          get().resetPayment()
          break;
      }
    } catch (error) {
      toast({
        title: `Erro ao checar pagamento`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      get().resetPayment()
    }
  },
  customer: undefined,
  makePayment: async (total, values, description) => {
    try {
      set(() => ({ loading: true }))

      const customer = await createCustomer({...values, id: get().customer?.id})
      
      if (isError(customer)) {
        throw new Error(customer.error.message)
      }
      
      set(() => ({ customer }))

      let cobranca = undefined

      if (!cobranca) {
        cobranca = await createPayment(values, total, description, customer?.id)
        if (isError(cobranca)) {
          console.log('cobranca',cobranca)
          throw new Error(cobranca.error.message)
        }
      }

      set(() => ({ cobranca, paymentStatus: cobranca.status }))

      const expirationTime = add(new Date(), { minutes: 10 });

      if (values.paymentType === 'pix') {
        
        const pix = await getPixQR(cobranca.id);
  
        if (isError(pix)) {
          throw new Error(pix.error.message)
        }
  
        set(() => ({ loading: false, pix, timeout: expirationTime }))

      } else if (values.paymentType === 'credit') {
        await get().checkPayment()
        set(() => ({ loading: false, timeout: expirationTime }))
      } else {
        throw new Error('Forma de pagamento inválida')
      }
    } catch (error) {
      toast({
        title: `Erro ao criar pagamento`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      get().resetPayment()
    }
  }
});

type StoreProviderProps = {
  children: React.ReactNode;
  finalDate: string;
}

// Store Provider with merged slices
export default function StoreProvider({ children, finalDate = '' }: StoreProviderProps) {
  const [store] = useState(() =>
    createStore<StoreState, [["zustand/persist", Partial<StoreState>]]>(persist((set, get) => ({
      ...createCartSlice(set, get),
      ...createTimeSlice(set, finalDate),
      ...createUserSlice(set, get),
    }),
      {
        name: 'cart',
        partialize: (state) => ({ cartItems: state.cartItems, cepFreight: state.cepFreight, customer: state.customer }),
        skipHydration: true,
      },
    )
  ));

  useEffect(() => {
    store.persist.rehydrate();
  }, [store.persist])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// Custom hook for cart state
export function useCart<T>(selector: (state: CartState) => T) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useCart must be used within a StoreProvider");
  }
  return useStore(context, selector);
}

// Custom hook for time state
export function useTime<T>(selector: (state: TimeState) => T) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useTime must be used within a StoreProvider");
  }
  return useStore(context, selector);
}

// Custom hook for user state
export function useUser<T>(selector: (state: UserState) => T) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useUser must be used within a StoreProvider");
  }
  return useStore(context, selector);
}
