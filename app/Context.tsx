'use client'

import { CartItem } from "@/types/cart";
import { Variante } from "@/types/components/produto/Variante";
import { createContext, useContext, useState } from "react"
import { createStore, StoreApi, useStore } from "zustand"
import { applyDiscount } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Produto } from "@/types/api/produto";

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
  cartItems: CartItem[];
  addItemToCart: (item: Produto, variant: Variante) => void;
  totalPrice: () => number;
  totalItems: () => number;
}

// Time State Slice
type TimeState = {
  timeLeft: TimeLeft;
  calculateTimeLeft: () => void;
}

// Combined Store State
type StoreState = CartState & TimeState;

// Store Context
const StoreContext = createContext<StoreApi<StoreState> | undefined>(undefined);

type StoreProviderProps = {
  children: React.ReactNode;
  finalDate: string;
}

// Cart state slice function
const createCartSlice = (set: (fn: (state: CartState) => CartState) => void, get: () => CartState): CartState => ({
  cartOpen: false,
  toggleCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
  cartItems: [],
  totalItems: () => get().cartItems.reduce((acc, item) => acc + item.cartVariants.reduce((acc, variant) => acc + variant.quantity, 0), 0),
  totalPrice: () => get().cartItems.reduce((acc, item) => acc + item.cartVariants.reduce((acc, variant) => acc + applyDiscount(variant.variant.valor, variant.variant.desconto) * variant.quantity, 0), 0),
  addItemToCart: (item, variant) => set((state) => {
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

// Store Provider with merged slices
export default function StoreProvider({ children, finalDate = '' }: StoreProviderProps) {
  const [store] = useState(() =>
    createStore<StoreState>((set, get) => ({
      ...createCartSlice(set, get),
      ...createTimeSlice(set, finalDate),
    }))
  );

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
