'use client'

import { formatToBRL } from "@/lib/utils";
import { Input } from './ui/input';
import { Spinner } from "./ui/spinner";
import MaskedInput from 'react-text-mask';
import ArrowIcon from "@/public/icons/arrow.svg";
import { useCart } from "@/app/Context";
import { Button } from "./ui/button";
import Link from 'next/link';

export default function CartFooter() {
  const { toggleCartOpen, cepFreight, calculateFreight, totalPrice, checkPackage } = useCart((state) => state)

  const { frete, loading } = cepFreight;
  const discount = checkPackage();
  const total = totalPrice()

  return (
    <div className='bg-background bottom-0 flex flex-col w-full border-t p-5 gap-4'>
      <div>
        <div className='flex uppercase text-lg text-foreground justify-between'>
          <p>Subtotal</p>
          <span>{formatToBRL(total)}</span>
        </div>
        {discount > 0 && <div className='flex uppercase text-lg text-foreground justify-between'>
          <p>Desconto Pacote</p>
          <span>- {formatToBRL(discount)}</span>
        </div>}
        <div className='flex uppercase text-lg text-foreground/70 justify-between'>
          <p>Entrega</p>
          <span>
            {frete === null ? 'Calcule o frete' : frete === 0 ? 'Grátis' : '+' + formatToBRL(frete)}
          </span>
        </div>
      </div>
      <form action={calculateFreight}>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
          name="cep"
          placeholder="Calcular Frete"
          id="cep"
          className='pr-10'
          render={(ref, props) => (
            <Input ref={ref as React.LegacyRef<HTMLInputElement>} {...props} >
              <Button disabled={loading} type='submit' className='absolute top-1/2 -translate-y-1/2 transform right-1 size-8 p-0 text-foreground' variant='ghost'>
                {loading ? <Spinner className='size-4 text-foreground/70' /> : <ArrowIcon className='size-8 p-0' />}
              </Button>
            </Input>
          )}
        />
      </form>
      <Link className='flex flex-1' href='/comprar'>
        <Button onClick={toggleCartOpen} disabled={loading} className='uppercase grow'>
          Finalizar Compra - {frete ? formatToBRL(total + frete - discount) : formatToBRL(total - discount)}
        </Button>
      </Link>
    </div>
  )
}
