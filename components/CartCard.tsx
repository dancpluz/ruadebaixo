'use client'

import MinusIcon from '@/public/icons/minus.svg'
import PlusIcon from '@/public/icons/plus.svg'
import { CartItem } from "@/types/cart";
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applyDiscount, buildImgUrl, cn, selectImageUrl } from "@/lib/utils";
import { formatToBRL } from './../lib/utils';
import { useCart } from "@/app/Context"
import { QtyCounter } from './Cart';

export default function CartCard({ cartItem }: { cartItem: CartItem }) {
  const product = cartItem.attributes;
  const variants = cartItem.cartVariants;
  const { removeItemFromCart, addItemToCart, toggleCartOpen, cartOpen } = useCart((state) => state)

  const { nome, slug, tipo, unico, imagens_produto } = product;

  if (variants.length === 1 && unico) {
    const { valor, desconto, cor, tamanho } = variants[0].variant
    const image = imagens_produto.data[0]
    const { formats, width, height, alternativeText } = image.attributes
    const { imageUrl, sizes } = selectImageUrl(formats)

    return (
      <Card className='flex'>
        <Link href={`/catalogo/${slug}`}>
          <div onClick={() => cartOpen ? toggleCartOpen() : ''} className='w-[120px] h-[160px] hover:opacity-70 transition-opacity'>
            {image &&
            <Image
              className="object-cover h-full w-full"
              src={buildImgUrl(imageUrl)}
              alt={alternativeText || `Produto ${image.id}`}
              width={width}
              height={height}
              sizes={sizes}
            />}
          </div>
        </Link>
        <div className='flex flex-col grow p-5 relative'>
          <CardHeader className='p-0 space-y-0 gap-4 items-center flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='uppercase text-sm text-foreground/70 leading-none'>{tipo}</span>
              <CardTitle className='p-0 uppercase clash font-semibold text-2xl'>{nome}</CardTitle>
            </div>
            <QtyCounter qty={variants[0].quantity} />
          </CardHeader>
          <CardContent className='p-0 grow'>
            {desconto ?
            <CardDescription className={'text-xl items-center gap-2'}><strong className='text-lg font-normal line-through'>{formatToBRL(valor)}</strong>{formatToBRL(applyDiscount(valor, desconto))}</CardDescription>
            :
            <CardDescription className={'text-xl'}>{formatToBRL(valor)}</CardDescription>
            }
          </CardContent>
          <CardFooter className='p-0 flex items-center justify-between gap-2'>
            <div className='p-0 flex gap-2 items-center'>
              {!unico && <div className='size-7 rounded-full border' style={{ backgroundColor: cor }} />}
              <span className='size-8 flex items-center justify-center border border-foreground'>
                {tamanho}
              </span>
            </div>
            <div className='p-0 flex items-end gap-2 justify-end'>
              <Button onClick={() => removeItemFromCart(cartItem, variants[0].variant)} variant='ghost' className='text-foreground size-10 p-0'>
                <MinusIcon className='size-10' />
              </Button>
              <Button onClick={() => addItemToCart(cartItem, variants[0].variant)} variant='ghost' className='text-foreground size-10 p-0'>
                <PlusIcon className='size-10' />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return variants.map((variant) => {
    const { valor, desconto, cor, tamanho } = variant.variant
    const image = imagens_produto.data[0]
    const { formats, width, height, alternativeText } = image.attributes
    const { imageUrl, sizes } = selectImageUrl(formats)

    return (
      <Card key={cor} className='flex'>
        <Link href={`/catalogo/${slug}`}>
          <div onClick={() => cartOpen ? toggleCartOpen() : ''} className='w-[120px] h-[160px]'>
            <Image
              className="object-cover h-full w-full"
              src={buildImgUrl(imageUrl)}
              alt={alternativeText || `Produto ${image.id}`}
              width={width}
              height={height}
              sizes={sizes}
            />
          </div>
        </Link>
        <div className='flex flex-col grow p-5 relative'>
          <CardHeader className='p-0 space-y-0 gap-4 items-center flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='uppercase text-sm text-foreground/70 leading-none'>{tipo}</span>
              <CardTitle className={cn('uppercase p-0 font-semibold clash text-foreground sm:text-2xl text-xl', nome.length > 10 ? 'text-sm' : '')}>{nome}</CardTitle>
            </div>
            <QtyCounter qty={variant.quantity} />
          </CardHeader>
          <CardContent className='p-0 grow'>
            {<div className='flex gap-2 items-center'>
              <strong className='font-normal opacity-50 line-through'>{formatToBRL(valor)}</strong>
              <h2 className='text-xl'>{formatToBRL(applyDiscount(valor, desconto))}</h2>
            </div>}
          </CardContent>
          <CardFooter className='p-0 flex items-center justify-between gap-2'>
            <div className='p-0 flex gap-2 items-center'>
              {!unico && <div className='size-7 rounded-full border' style={{ backgroundColor: cor }} />}
              <span className='size-8 flex items-center justify-center border border-foreground'>
                {tamanho}
              </span>
            </div>
            <div className='p-0 flex items-end gap-2 justify-end'>
              <Button onClick={() => removeItemFromCart(cartItem, variant.variant)} variant='ghost' className='text-foreground size-10 p-0'>
                <MinusIcon className='size-10' />
              </Button>
              <Button onClick={() => addItemToCart(cartItem, variant.variant)} variant='ghost' className='text-foreground size-10 p-0'>
                <PlusIcon className='size-10' />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  })
}