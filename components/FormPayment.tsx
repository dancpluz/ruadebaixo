import { FormT } from '@/types/checkout';
import { useFormContext } from 'react-hook-form';
import FormInput from './FormInput'
import Pix from './Pix'
import { Button } from '@/components/ui/button';
import { useCart, useUser } from '@/app/Context';
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function FormPayment() {
  const form = useFormContext<FormT>();
  const paymentType = form.watch('paymentType');
  const paymentTypes = [
    { label: 'Cartão de Crédito', id: 'credit' },
    { label: 'PIX', id: 'pix' }
  ]
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const { loading, timeout, deliveryOptions, checkPayment, paymentStatus, calculateParcelOptions, parcelOptions, resetTimeout } = useUser((state) => state);
  const { totalPrice } = useCart((state) => state);
  
  const delivery = form.getValues('delivery')
  const selectedDelivery = form.getValues('selectedDelivery')

  let freight = 0;
  if (delivery === 'entrega' && selectedDelivery && deliveryOptions.length > 0) {
    const selectedOption = deliveryOptions.find(({ referencia }) => referencia === selectedDelivery)

    if (selectedOption) {
      freight = selectedOption.vlrFrete;
    }
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
        const total = totalPrice() + freight;
        await calculateParcelOptions(total,12);
      } catch (error) {
        console.error("Error calculating parcel options:", error);
      }
    };

    runCalculateParcelOptions();
  }, [freight]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paymentStatus === 'PENDING') {
        checkPayment();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [paymentStatus]);

  return (
    <div className="flex flex-col gap-5">
      <FormInput type='radio' items={paymentTypes} id='paymentType' form={form} />
      {paymentType === 'credit' ? 
        <>
          <FormInput id='holderName' label='NOME DO TITULAR' form={form} />
          <FormInput mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]} id='cardNumber' label='NÚMERO DO CARTÃO' form={form} />
          <div className='flex gap-4 grow'>
            <FormInput mask={[/[0-1]/, /[0-9]/, '/', /\d/, /\d/]} className='grow' id='expirationDate' label='DATA DE VALIDADE' form={form} />
            <FormInput id='cvv' className={'max-w-24'} mask={[/\d/, /\d/, /\d/]} label='CVV' form={form} />
          </div>
          <FormInput type='select' items={parcelOptions} id='parcels' label='Parcelamento' form={form} />
          <span className='uppercase text-sm text-foreground/70'>Endereço de Cobrança {delivery === 'entrega' && '(Mesmo da entrega)'}</span>
          <FormInput type='cep' mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id='cep' label='CEP' form={form} />
          <FormInput id='address' label='ENDEREÇO' form={form} />
          <div className='flex gap-4'>
            <FormInput id='district' label='BAIRRO' form={form} />
            <FormInput id='city' label='CIDADE' form={form} />
          </div>
          <div className='flex gap-4'>
            <FormInput id='state' label='ESTADO' form={form} />
            <FormInput id='number' label='NÚMERO' form={form} />
            <FormInput id='complement' label='COMPLEMENTO' form={form} />
          </div>
          <Button type='submit' disabled={loading || timeout} className='uppercase'>
            Finalizar Compra{remainingTime && ` - ${remainingTime}`}
          </Button>
          {JSON.stringify(paymentStatus)}
        </>
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
