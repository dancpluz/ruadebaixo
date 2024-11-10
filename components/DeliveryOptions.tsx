'use client'

import { useUser } from '@/app/Context';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { cn, formatToBRL } from '@/lib/utils';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FormT } from '@/types/checkout';

export default function DeliveryOptions({ form }: { form: UseFormReturn<FormT> }) {
  const { deliveryOptions, form: { selectedDelivery }, setFormInfo, loading } = useUser((state) => state)

  return (
    <div className='flex flex-col'>
      {deliveryOptions.length > 0 ? 
        loading ?
          <Skeleton className='border border-foreground flex h-[74px]' />
        :
        deliveryOptions.map(({ referencia, transp_nome, url_logo, prazoEnt, vlrFrete }) => 
          <Button key={referencia} type='button' className='h-auto text-start p-0 block' variant='ghost' onClick={() => setFormInfo(form, 'selectedDelivery', referencia)}>
            <Card className={cn('flex transition border-foreground/70 cursor-pointer p-2 gap-4', referencia === selectedDelivery ? 'border-foreground' : 'hover:animate-none animate-pulse' )}>
            <CardContent className='p-0'>
                <div className='aspect-square invert grayscale h-full'>
                  <Image className='object-cover w-full h-full' alt={transp_nome + ' logo'} src={url_logo} height={48} width={48} />
              </div>
            </CardContent>
            <CardHeader className='p-0 m-0 uppercase space-y-0 grow justify-between'>
              <h3 className='text-xl'>{transp_nome}</h3>
              <div className='flex justify-between items-end'>
                <p className='text-lg'>{formatToBRL(vlrFrete)}</p>
                <span className='text-foreground/70'>{`${prazoEnt + 1} a ${prazoEnt + 4} dias`}</span>
              </div>
            </CardHeader>
          </Card>
        </Button>
        )
      :
        <Card className='flex p-4 gap-4'>
          <span className='uppercase text-sm text-foreground/70'>Informe o CEP para ver opções de entrega</span>
        </Card>
      }
    </div>
  )
}
