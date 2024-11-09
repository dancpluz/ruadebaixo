'use client'

import { formatToBRL } from "@/lib/utils";
import { useCart, useUser } from "@/app/Context";

export default function CheckoutFooter({ children }) {
  const { totalPrice } = useCart((state) => state)
  const { form: { delivery, selectedDelivery, paymentType, parcels }, deliveryOptions, parcelOptions } = useUser((state) => state)
  const selectedOption = deliveryOptions.find(({ referencia }) => referencia === selectedDelivery)
  const { vlrFrete } = selectedOption || {};

  return (
    <div className="fixed p-5 sm:px-12 flex flex-col z-20 bg-background border-t w-full min-h-[180px] left-0 bottom-0 gap-4">
      <div>
        <div className='flex uppercase text-lg md:text-xl text-foreground justify-between'>
          <p>Subtotal</p>
          <span>{formatToBRL(totalPrice())}</span>
        </div>
        <div className='flex w-full uppercase md:text-xl text-lg text-foreground/70 justify-between'>
          <p>Entrega</p>
          <span>
            {delivery === undefined || delivery === 'entrega' 
              ? vlrFrete === undefined ? 'Calcule o frete' :
                vlrFrete === 0 ? 'Grátis' : '+' + formatToBRL(vlrFrete)
             :
              'Grátis'
            }
          </span>
        </div>
        <div className='flex uppercase text-xl text-foreground justify-between md:text-2xl'>
          <p>Total</p>
          <span>{paymentType === 'credit' && parcelOptions && parcels ? formatToBRL(parcelOptions.find(({ id }) => id === parcels).value) : formatToBRL(totalPrice() + (vlrFrete && delivery !== 'retirada' ? vlrFrete : 0))}</span>
        </div>
      </div>
      <div className={'flex grow items-end justify-end gap-2'} >
        {children}
      </div>
    </div>
  )
}
