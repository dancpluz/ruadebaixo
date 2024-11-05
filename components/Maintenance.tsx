import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import AlertIcon from "@/public/icons/warning.svg"
import Link from "next/link"

export default function Maintenance() {
  return (
    <div className='bg-background flex flex-col flex-1 items-center justify-center text-center px-5'>
      <div className="mb-6 relative">
        <AlertIcon className="size-36 text-foreground animate-bounce duration-1000" />
        <Clock className="size-8 text-muted-foreground mix-blend-difference absolute bottom-2 right-0 animate-spin" />
      </div>
      <h1 className="text-4xl font-semibold mb-2 uppercase clash">Página em manutenção</h1>
      <p className="text-md lg:text-lg text-muted-foreground uppercase mb-6">
        Ainda estamos trabalhando nesta página. Por favor, volte mais tarde.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/" className="inline-flex items-center uppercase">
            {/* <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" /> */}
            Voltar ao início
          </Link>
        </Button>
      </div>
    </div>
  )
}
