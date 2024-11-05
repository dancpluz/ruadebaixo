import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LogoAnimation from '@/components/LogoAnimation'

export default function Custom404() {

  return (
    <main className="flex flex-col flex-1 justify-center items-center gap-2 px-5">
      <LogoAnimation />
      <h1 className="text-4xl text-center font-semibold uppercase clash">404 - Página não encontrada</h1>
      <p className="text-xl text-center text-muted-foreground mb-6 lg:mb-4">A página que você está procurando não existe.</p>
      <Button asChild>
        <Link href="/" className="inline-flex items-center">
          VOLTAR AO INÍCIO
        </Link>
      </Button>
    </main>
  )
}