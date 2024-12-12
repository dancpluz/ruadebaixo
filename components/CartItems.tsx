'use client'

import { useCart } from "@/app/Context";
import { ScrollArea } from "./ui/scroll-area";
import Link from 'next/link';
import { Button } from "./ui/button";
import EmptyIcon from '@/public/icons/empty.svg';
import CartCard from "./CartCard";

export default function CartItems({ scrollable = false }: { scrollable?: boolean }) {
  const { cartItems } = useCart((state) => state)

  if (cartItems.length === 0) {
    return <CartEmpty />
  }
  const Component = scrollable ? ScrollArea : 'div'

  return (
    <Component className='flex-1'>
      <div className={`flex flex-col gap-6 ${scrollable ? 'px-5' : ''}`}>
        {cartItems.map((cartItem) => <CartCard key={cartItem.id} cartItem={cartItem} />)}
      </div>
    </Component>
  )
}

export function CartEmpty() {
  const { toggleCartOpen, cartOpen } = useCart((state) => state)

  return (
    <div className='flex grow flex-col justify-center items-center px-5 py-8'>
      <EmptyIcon className='text-foreground size-36' />
      <p className='text-center uppercase clash text-xl font-semibold'>Seu carrinho está vazio</p>
      <span className='text-center uppercase text-md'>Da uma olhada nas peças:</span>
      <Button variant='outline' className='uppercase w-full mt-5' onClick={() => cartOpen ? toggleCartOpen() : ''} asChild>
        <Link href='/catalogo'>
          Ver Catálogo
        </Link>
      </Button>
    </div>
  )
}