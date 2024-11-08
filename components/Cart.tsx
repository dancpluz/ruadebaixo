'use client'

import { useCart } from "@/app/Context"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import XIcon from '@/public/icons/x.svg';
import CartItems from "./CartItems";
import CartFooter from "./CartFooter";

export default function Cart() {
  const { cartOpen, toggleCartOpen, totalItems } = useCart((state) => state)
  const qty = totalItems()
  
  return (
    <Sheet open={cartOpen} onOpenChange={toggleCartOpen}>
      <SheetTrigger className='place-self-end self-center items-center'>
        <QtyCounter qty={qty} />
      </SheetTrigger>
      <SheetContent close={<XIcon className='text-foreground size-8' />} className="w-screen flex flex-col gap-5">
        <SheetHeader className='flex p-5 flex-row items-center justify-between border-b border-foreground'>
          <QtyCounter onClick={toggleCartOpen} qty={qty} />
          <SheetTitle className='mt-0 uppercase'>Carrinho</SheetTitle>
          <span aria-hidden='true' className='size-10'/>
        </SheetHeader>
        <CartItems scrollable />
        {totalItems() > 0 && <CartFooter />}
      </SheetContent>
    </Sheet>
  )
}

export function QtyCounter({ onClick, qty }: { onClick?: () => void, qty: number }) {
    return (
      <span onClick={onClick} className='size-8 cursor-pointer hover:bg-foreground/20 transition-colors flex justify-center items-center touch-pan-up rounded-full border-foreground bg-background border text-sm'>
        {qty}
      </span>
    )
  }