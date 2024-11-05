'use client'

import { useCart } from "@/app/Context"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import XIcon from '@/public/icons/x.svg'
import { CartItem } from "@/types/cart";
import EmptyIcon from '@/public/icons/empty.svg'
import { Button } from '@/components/ui/button';
import Link from 'next/link'

export default function Cart() {
  const { cartOpen, toggleCartOpen, totalItems } = useCart((state) => state)

  function QtyCounter({ onClick }: { onClick?: () => void }) {
    return (
      <span onClick={onClick} className='size-8 cursor-pointer hover:bg-foreground/20 transition-colors flex justify-center items-center touch-pan-up rounded-full border-foreground bg-background border text-sm'>
        {totalItems()}
      </span>
    )
  }
  
  return (
    <Sheet open={cartOpen} onOpenChange={toggleCartOpen}>
      <SheetTrigger className=''>
        <QtyCounter />
      </SheetTrigger>
      <SheetContent close={<XIcon className='text-foreground size-8' />} className="w-screen flex flex-col">
        <SheetHeader className='flex p-5 flex-row items-center justify-between border-b border-foreground'>
          <QtyCounter onClick={toggleCartOpen} />
          <SheetTitle className='mt-0'>CARRINHO</SheetTitle>
          <span aria-hidden='true' className='size-10'/>
        </SheetHeader>
        <CartItems />
      </SheetContent>
    </Sheet>
  )
}

function CartCard({ cartItem }: { cartItem: CartItem }) {
  const product = cartItem.attributes;
  const variants = cartItem.cartVariants;

  console.log(product)
  console.log(variants)

  return (
    <div >
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  )
}


export function CartItems() {
  const { cartItems, toggleCartOpen } = useCart((state) => state)

  if (cartItems.length === 0) {
    return (
      <div className='flex grow flex-col justify-center items-center px-5'>
        <EmptyIcon className='text-foreground size-36' />
        <p className='text-center uppercase clash text-xl font-semibold'>Seu carrinho está vazio</p>
        <span className='text-center uppercase text-md'>Da uma olhada nas peças:</span>
        <Button variant='outline' className='uppercase w-full mt-5' onClick={toggleCartOpen} asChild>
          <Link href='/catalogo'>
            Ver Catálogo
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='flex grow flex-col px-5'>
      {cartItems.map((cartItem) => <CartCard key={cartItem.attributes.id} cartItem={cartItem} />)}
    </div>
  )
}
