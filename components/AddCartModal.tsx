'use client'

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import type { Produto } from "@/types/api/produto";
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatToBRL } from '@/lib/utils';
import PlusIcon from "@/public/icons/plus.svg";
import { useCart } from '@/app/Context'
import { cn } from './../lib/utils';

export default function AddCartModal({ product, className }: { product: Produto, className?: string }) {
  const { variantes } = product.attributes;

  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { addItemToCart, toggleCartOpen } = useCart((state) => state)

  const uniqueColors = useMemo(() => 
    Array.from(new Set(variantes.map(variante => variante.cor))),
    [variantes]
  )

  const uniqueSizes = useMemo(() => 
    Array.from(new Set(variantes.map(variante => variante.tamanho))),
    [variantes]
  )

  const availableColors = useMemo(() => 
    selectedSize
      ? uniqueColors.filter(color => 
          variantes.some(v => v.cor === color && v.tamanho === selectedSize)
        )
      : uniqueColors,
    [variantes, selectedSize, uniqueColors]
  )

  const availableSizes = useMemo(() => 
    selectedColor
      ? uniqueSizes.filter(size => 
          variantes.some(v => v.tamanho === size && v.cor === selectedColor)
        )
      : uniqueSizes,
    [variantes, selectedColor, uniqueSizes]
  )

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const selectedVariant = useMemo(() =>
    variantes.find(v => v.cor === selectedColor && v.tamanho === selectedSize),
    [variantes, selectedColor, selectedSize]
  )

  const handleConfirm = () => {
    if (selectedColor && selectedSize) {
      const selectedVariant = variantes.find(
        v => v.cor === selectedColor && v.tamanho === selectedSize
      )
      if (selectedVariant) {
        addItemToCart(product, selectedVariant)
      }
    }
  }

  if (variantes.length === 1 || product.attributes.unico) {
    return (
      <Button onClick={() => {addItemToCart(product,variantes[0]); toggleCartOpen()}} className={cn('cursor-pointer size-full p-0 text-foreground', className)} variant='ghost' asChild>
        <PlusIcon />
      </Button>
    )
  }

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button className={cn('cursor-pointer size-full p-0 text-foreground', className)} variant='ghost' asChild>
          <PlusIcon />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className='uppercase'>Selecione o tamanho/cor</ResponsiveModalTitle>
          <div className='flex flex-col gap-4 w-full'>
            <div className='w-full flex items-center gap-4'>
              <h3 className="text-sm uppercase">Cor:</h3>
              <div className="flex flex-wrap gap-3">
                {availableColors.map(color => {
                  const variante = variantes.find(v => v.cor === color && (!selectedSize || v.tamanho === selectedSize))
                  const isOutOfStock = variante && variante.quantidade === 0
                  return (
                    <Button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      disabled={isOutOfStock}
                      className={`size-7 rounded-full border p-0 relative border-foreground/50 after:content-[''] after:absolute after:border after:border-foreground after:rounded-full after:scale-0 after:size-9 after:transition-transform after:duration-200 ${selectedColor === color ? 'after:scale-110' : ''} ${isOutOfStock ? 'opacity-50' : ''}
                      `}
                      style={{ backgroundColor: color }}
                    >
                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-destructive transform rotate-45"/>
                        </div>
                      )}
                      <span className="sr-only">{color}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
            <div className='w-full flex items-center gap-3'>
              <h3 className="text-sm uppercase">Tamanho:</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => {
                  const variante = variantes.find(v => v.tamanho === size && (!selectedColor || v.cor === selectedColor))
                  const isOutOfStock = variante && variante.quantidade === 0
                  return (
                    <Button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      disabled={isOutOfStock}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`px-3 py-1 text-md relative ${selectedSize === size ? 'hover:bg-foreground/60 hover:text-background' : ''}
                  ${isOutOfStock ? 'opacity-50' : ''}
                `}
                    >
                      {size}
                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-destructive transform rotate-45" />
                        </div>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
            <Button onClick={handleConfirm} disabled={!selectedColor || !selectedSize}>
              ADICIONAR AO CARRINHO{selectedVariant && ` +${formatToBRL(selectedVariant.valor - selectedVariant.desconto)}`}
            </Button>
          </div>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
