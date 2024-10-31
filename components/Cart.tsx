'use client'

import { useCart } from "@/app/Context"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import XIcon from '@/public/icons/x.svg'

export default function Cart() {
  const cartOpen = useCart(({ cartOpen }) => cartOpen)
  const toggleCartOpen = useCart(({ toggleCartOpen }) => toggleCartOpen)

  function QtyCounter({ onClick, count }: { onClick?: () => void, count: number }) {
    return (
      <span onClick={onClick} className='size-8 cursor-pointer hover:bg-foreground/20 transition-colors flex justify-center items-center touch-pan-up rounded-full border-foreground bg-background border text-sm'>
        {count}
      </span>
    )
  }
  
  return (
    <Sheet open={cartOpen} onOpenChange={toggleCartOpen}>
      <SheetTrigger className=''>
        <QtyCounter count={0} />
      </SheetTrigger>
      <SheetContent close={<XIcon className='text-foreground size-8' />} className="w-screen">
        <SheetHeader className='flex p-5 flex-row items-center justify-between'>
          <QtyCounter onClick={toggleCartOpen} count={0} />
          <SheetTitle className='mt-0'>CARRINHO</SheetTitle>
          <span aria-hidden='true' className='size-10'/>
        </SheetHeader>
        <CartItems />
      </SheetContent>
    </Sheet>
  )
}

export function CartItems() {
  return (
    <div>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  )
}
