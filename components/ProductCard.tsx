import type { Produto } from "@/types/api/produto";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatToBRL, applyDiscount, hoverAnim } from "@/lib/utils";
import ProductCarousel from '@/components/ProductCarousel';
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow.svg";
import { Button } from '@/components/ui/button';
import AddCartModal from "@/components/AddCartModal";

export default function ProductCard({ product }: { product: Produto }) {
  const { nome, descricao, slug, variantes, loja, imagens_produto } = product.attributes;

  const sold = variantes.reduce((acc, variant) => acc + variant.quantidade, 0) === 0;

  const { valor, desconto, tamanho } = variantes[0];

  return (
    <Card className='border-0 relative bg-transparent'>
      <CardHeader className='absolute p-4 space-y-0 w-full flex justify-between z-10 flex-row'>
        <div className='size-12'>
          <AddCartModal product={product} />
        </div>
        <Link href={`/catalogo/${slug}`}>
          <Button className='size-12 p-0 text-foreground' variant='ghost' asChild>
            <ArrowIcon />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className='p-0 border border-foreground'>
        <ProductCarousel sold={sold} images={imagens_produto?.data} />
      </CardContent>
      <Link href={`/catalogo/${slug}`}>
        <CardFooter className='justify-between p-0 pt-2'>
          <CardTitle className={cn('text-xl font-regular clash uppercase', hoverAnim)}>{nome}</CardTitle>
          {!sold ?
            desconto ?
            <CardDescription className={cn('text-xl items-center gap-2', hoverAnim)}><strong className='text-lg font-normal opacity-50 line-through'>{formatToBRL(valor)}</strong>{formatToBRL(applyDiscount(valor, desconto))}</CardDescription>
            :
            <CardDescription className={cn('text-xl',hoverAnim)}>{formatToBRL(valor)}</CardDescription>
            :
            <CardDescription className={cn('text-xl uppercase',hoverAnim)}>Vendido</CardDescription>
          }
        </CardFooter>
      </Link>
      {sold &&
        <span className='absolute uppercase font-semibold z-[-1] opacity-60 text-5xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          Vendido
        </span>
      }
    </Card>
  )
}
