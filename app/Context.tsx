'use client'

import { Produto } from "@/types/api/produto";
import { createContext, useContext, useState } from "react"
import { createStore, StoreApi, useStore } from "zustand"

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
  cartItems: Produto[];
  addItemToCart: (item: Produto) => void;
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
const createCartSlice = (set: (fn: (state: CartState) => Partial<CartState>) => void): CartState => ({
  cartOpen: false,
  toggleCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
  cartItems: [],
  addItemToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),

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
    createStore<StoreState>((set) => ({
      ...createCartSlice(set),
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
