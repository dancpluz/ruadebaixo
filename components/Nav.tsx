'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"

const routes = [
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Lookbook', href: '/contato' },
  { label: 'Adesivo', href: '/sobre' },
  { label: 'Links', href: '/links' },
]

const estimateWidth = (text: string) => {
  const baseWidth = 20
  const charWidth = 16
  return baseWidth + text.length * charWidth
}

export default function Nav({ onSwitchTab }: { onSwitchTab?: () => void }) {
  return (
    <Carousel className="w-full border-t border-b border-foreground">
      <CarouselContent className="ml-0">
        {routes.map(({ label, href }, index) => {
          const estimatedWidth = estimateWidth(label)
          return (
            <CarouselItem key={index} className="pl-0 border-r last:border-0 " style={{ flex: `0 0 ${estimatedWidth}px` }}>
              <div
                onClick={onSwitchTab}
                className="flex flex-row justify-center items-center py-1"
              >
                <Link
                  href={href}
                  className="text-lg uppercase text-foreground/60 px-2 whitespace-nowrap hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselNext className='absolute size-9 bg-background border-0 border-l border-foreground rounded-none hover:bg-background/80 right-0 disabled:hidden' />
      <CarouselPrevious className='absolute size-9 bg-background border-0 border-r border-foreground rounded-none hover:bg-background/80 left-0 disabled:hidden' />
    </Carousel>
  )
}