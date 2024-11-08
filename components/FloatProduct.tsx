'use client'

import { Produto } from "@/types/api/produto";
import AddCartModal from "./AddCartModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { formatToBRL, applyDiscount, cn } from "@/lib/utils";
import { hoverAnim } from './../lib/utils';
import { Separator } from "./ui/separator";

export default function FloatProduct({ product }: { product: Produto }) {
  const [isOpen, setIsOpen] = useState(false)
  const { tipo, nome, variantes, descricao } = product.attributes;

  const sold = variantes.reduce((acc, variant) => acc + variant.quantidade, 0) === 0;

  const { valor, desconto, cor, tamanho } = variantes[0];

  return (
    <div className='bottom-[80px] border flex-1 border-foreground flex left-1/2 -translate-x-1/2 h-[105px] w-[80%] bg-background fixed md:bottom-[190px] divide-x'>
      <Accordion className='grow group hover:bg-foreground/20 transition-colors' type="single" collapsible>
        <AccordionItem className='border-0 grow' value='1'>
          <AccordionTrigger className='border-0 flex bg-transparent flex-col grow z-20 h-auto p-4 text-start items-start justify-start' onClick={() => setIsOpen(!isOpen)} >
            <h2 className='uppercase leading-none text-foreground/70 text-lg'>
              {tipo}
            </h2>
            <h1 className={cn('uppercase font-semibold clash text-foreground sm:text-2xl text-xl', nome.length > 10 ? 'text-md' : '')}>
              {nome}
            </h1>
            {!sold ?
              desconto ?
                <p className={cn('text-xl flex items-center gap-2',hoverAnim)}><strong className='text-lg font-normal opacity-50 line-through'>{formatToBRL(valor)}</strong>{formatToBRL(applyDiscount(valor, desconto))}</p>
                :
                <p className={cn('text-xl leading-snug text-foreground/70',hoverAnim)}>{formatToBRL(valor)}</p>
              :
              <p className={cn('text-xl uppercase leading-snug text-foreground/70',hoverAnim)}>Vendido</p>
            }
          </AccordionTrigger>
          <AccordionContent className='absolute top-0 p-0 -translate-y-full w-full bg-background border border-foreground'>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-2xl font-semibold uppercase">Sobre</h3>
              <BlocksRenderer
                content={descricao}
                blocks={{
                  list: ({ format, children }) => {
                    if (format === 'ordered') {
                      return <ol>{children}</ol>;
                    }

                    return <ul className='list-disc list-inside leading-snug text-lg uppercase'>{children}</ul>;
                  },
                }} />
              <div className='flex gap-2 items-center'>
                <span className='size-8 flex items-center justify-center border border-foreground'>
                  {tamanho}
                </span>
                <div className='size-7 rounded-full border' style={{ backgroundColor: cor }} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className='absolute ring-0 w-full top-4 left-1/2 -translate-x-1/2 flex justify-center items-center'>
        <Separator className='w-[8%] h-0.5' />
      </div>
      {!sold && <div className='aspect-square grow-0 w-auto h-full'>
        <AddCartModal product={product} className='p-6' />
      </div>}
    </div>
  )
}
