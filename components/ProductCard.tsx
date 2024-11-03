import type { Produto } from "@/types/api/produto";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatToBRL } from "@/lib/utils";
import ProductCarousel from '@/components/ProductCarousel';
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow.svg";
import { Button } from '@/components/ui/button';
import AddCartModal from "@/components/AddCartModal";


export default function ProductCard({ product }: { product: Produto }) {
  const { nome, descricao, slug, variantes, loja, imagens_produto } = product.attributes;
  console.log(variantes)

  const { valor, desconto, tamanho } = variantes[0];

  const hoverAnim = 'relative flex flex-col after:absolute after:bg-foreground after:bottom-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300'

  return (
    <Card className='border-0 relative'>
      <CardHeader className='absolute p-4 space-y-0 w-full flex justify-between z-10 flex-row'>
        <AddCartModal variantes={variantes} />
        <Link href={`/catalogo/${slug}`}>
          <Button className='size-12 p-0 text-foreground' variant='ghost' asChild>
            <ArrowIcon />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className='p-0 border border-foreground'>
        <ProductCarousel images={imagens_produto.data} />
      </CardContent>
      <Link href={`/catalogo/${slug}`}>
        <CardFooter className='justify-between p-0 pt-2'>
          <CardTitle className={cn('text-xl font-regular clash uppercase', hoverAnim)}>{nome}</CardTitle>
          <CardDescription className={cn('text-xl ',hoverAnim)}>{formatToBRL(valor)}</CardDescription>
        </CardFooter>
      </Link>
    </Card>
  )
}
