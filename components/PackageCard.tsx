import type { Pacote } from "@/types/api/pacote";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatToBRL, applyDiscount, hoverAnim } from "@/lib/utils";
import ProductCarousel from '@/components/ProductCarousel';
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow.svg";
import { Button } from '@/components/ui/button';
import AddCartModal from "@/components/AddCartModal";

export default function PackageCard({ pkg }: { pkg: Pacote }) {
  
  const { capa, nome: nomePkg, desconto: descontoPkg, produtos } = pkg.attributes;

  const product = produtos.data.reduce((acc, produto) => (
    { nome: `${produto.attributes.nome}${acc.nome ? ' + ' + acc.nome : ''}`,
      slug: acc.slug ? acc.slug : produto.attributes.slug,
      imagens_produto: [...acc.imagens_produto, ...produto.attributes.imagens_produto.data],
      valor: acc.valor + produto.attributes.variantes[0].valor,
      desconto: acc.desconto + produto.attributes.variantes[0].desconto,
      sold: produto.attributes.variantes.reduce((acc, variant) => acc + variant.quantidade, 0) === 0
    }), { nome: '', slug: '', imagens_produto: [], valor: 0, desconto: 0, sold: false } as any);

  const temp = product.imagens_produto;
  const interleaved = temp.slice(0, Math.ceil(temp.length / 2))
  .flatMap((item, i) => [item, temp[Math.ceil(temp.length / 2) + i]]).filter(Boolean);

  product.imagens_produto = interleaved

  product.desconto += descontoPkg
  const { nome, slug, imagens_produto, valor, desconto, sold } = product;

  //const sold = variantes.reduce((acc, variant) => acc + variant.quantidade, 0) === 0;

  // MELHORAR
  //const { valor, desconto } = variantes[0];
  console.log(capa)

  return (
    // <pre>{JSON.stringify(pkg,null,2)}</pre>
    <Card className='border-0 relative bg-transparent'>
      <CardHeader className='absolute p-4 space-y-0 w-full flex justify-between z-10 flex-row'>
        <div className='size-12'>
          <AddCartModal products={produtos.data} />
        </div>
        <Link href={`/catalogo/${slug}`}>
          <Button className='size-12 p-0 text-foreground' variant='ghost' asChild>
            <ArrowIcon />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className='p-0 border border-foreground'>
        <ProductCarousel sold={sold} images={capa?.data ? [capa.data, ...imagens_produto] : imagens_produto} />
      </CardContent>
      <Link href={`/catalogo/${slug}`}>
        <CardFooter className='justify-between p-0 pt-2'>
          <CardTitle className={cn('text-xl leading-none font-regular clash uppercase', hoverAnim)}>{nomePkg}</CardTitle>
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
