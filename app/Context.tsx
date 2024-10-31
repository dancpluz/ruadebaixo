'use client'

import { createContext, useContext, useState } from "react"
import { createStore, StoreApi, useStore } from "zustand"

// Define the structure of our time left object
interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

type CartState = {
  cartOpen: boolean;
  toggleCartOpen: () => void;
  timeLeft: TimeLeft;
  calculateTimeLeft: () => void;
}

const StoreContext = createContext<StoreApi<CartState> | undefined>(undefined)

type StoreProviderProps = {
  children: React.ReactNode;
  finalDate: string;
}

export default function StoreProvider({ children, finalDate='' }: StoreProviderProps) {

  const [store] = useState(() =>
    createStore<CartState>((set) => ({
      cartOpen: false,
      toggleCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
      timeLeft: { dias: 0, horas: 0, minutos: 0, segundos: 0 },
      calculateTimeLeft: () => {
        const difference = +new Date(finalDate) - +new Date()

        if (difference > 0) {
          set({
            timeLeft: {
              dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
              horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutos: Math.floor((difference / 1000 / 60) % 60),
              segundos: Math.floor((difference / 1000) % 60)
            }
          })
        } else {
          set({ timeLeft: { dias: 0, horas: 0, minutos: 0, segundos: 0 } })
        }
      }
    }))
  )

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useCart<T>(selector: (state: CartState) => T) {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return useStore(context, selector);
}