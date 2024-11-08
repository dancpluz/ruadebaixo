import { FormPaymentValues } from '@/types/checkout';
import { useFormContext } from 'react-hook-form';
import FormInput from './FormInput'
import Pix from './Pix'
import { Button } from '@/components/ui/button';
import { useCart, useUser } from '@/app/Context';
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { getParcelOptions } from '@/app/actions/asaas';

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function FormPersonal() {
  const form = useFormContext<FormPaymentValues>();
  const paymentType = form.watch('paymentType');
  const paymentTypes = [
    { label: 'Cartão de Crédito', id: 'credit' },
    { label: 'PIX', id: 'pix' }
  ]
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const { loading, timeout, deliveryOptions, resetTimeout } = useUser((state) => state);
  const { totalPrice, calculateParcelOptions, parcelOptions } = useCart((state) => state);

  const delivery = form.getValues('delivery')
  const selectedDelivery = form.getValues('selectedDelivery')

  let frete = 0;
  if (delivery === 'entrega' && selectedDelivery && deliveryOptions) {
    const selectedOption = deliveryOptions.find(({ referencia }) => referencia === selectedDelivery)

    frete = selectedOption.vlrFrete
  }

  useEffect(() => {
    if (timeout) {
      const interval = setInterval(() => {
        const secondsRemaining = differenceInSeconds(timeout, new Date());

        if (secondsRemaining > 0) {
          setRemainingTime(formatTime(secondsRemaining));
        } else {
          setRemainingTime(null);
          resetTimeout();
          clearInterval(interval);
        }
      }, 1000);

      return () => { resetTimeout(); setRemainingTime(null); clearInterval(interval)};
    }
  }, [timeout]);

  useEffect(() => {
    const runCalculateParcelOptions = async () => {
      try {
        await calculateParcelOptions(totalPrice() + frete,12);
      } catch (error) {
        console.error("Error calculating parcel options:", error);
      }
    };

    if (false) runCalculateParcelOptions();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <FormInput type='radio' items={paymentTypes} id='paymentType' form={form} />
      {paymentType === 'credit' ? 
        <span className='uppercase text-center'>
          Infelizmente ainda não terminamos de integrar o pagamento em cartão de crédito. Em breve vamos liberar.
        </span>
        // <>
        //   <FormInput id='holderName' label='NOME DO TITULAR' form={form} />
        //   <FormInput mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]} id='cardNumber' label='NÚMERO DO CARTÃO' form={form} />
        //   <div className='flex gap-4'>
        //     <FormInput mask={[/[0-1]/, /[0-9]/, '/', /\d/, /\d/]} id='expirationDate' label='DATA DE VALIDADE' form={form} />
        //     <FormInput id='cvv' className={'max-w-24'} mask={[/\d/, /\d/, /\d/]} label='CVV' form={form} />
        //   </div>
        //   <FormInput type='select' items={parcelOptions} id='parcels' label='Parcelamento' form={form} />
        //   <Button type='submit' className='uppercase'>
        //     Finalizar Compra
        //   </Button>
        // </>
        : paymentType === 'pix' ?
        <>
          <Pix />
          <Button type='submit' disabled={loading || timeout}
          className='uppercase'>
            Gerar Pix{remainingTime && ` - ${remainingTime}`}
          </Button>
        </>
        :
        <span className='uppercase text-sm text-foreground/70'>Selecione um tipo de pagamento</span>
      }
    </div>
  );
}
