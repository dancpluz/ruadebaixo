import { FormOrderValues } from '@/types/checkout';
import { useFormContext } from 'react-hook-form';
import FormInput from './FormInput';
import DeliveryOptions from './DeliveryOptions';


export default function FormOrder() {
  const form = useFormContext<FormOrderValues>();
  const delivery = form.watch('delivery');
  const selectedDelivery = form.watch('selectedDelivery');
  const deliveryItems = [
    { label: 'Entrega', id: 'entrega' },
    { label: 'Retirada (Frete grátis)', id: 'retirada' }
  ]
  const pickupItems = [
    { label: 'UnB', id: 'UnB' },
    { label: 'Rodoviária', id: 'Rodoviária' },
    { label: 'Guará II', id: 'Guará II' },
    { label: 'Asa Norte', id: 'Asa Norte' },
    { label: 'Paranoá', id: 'Paranoá' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <FormInput type='radio' id='delivery' label='TIPO DE ENTREGA' items={deliveryItems} form={form} />
      {delivery === 'entrega' && (
        <>
          <FormInput type='cep' mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id='cep' label='CEP' form={form} />
          <DeliveryOptions form={form} />
          {selectedDelivery &&
          <>
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
          </>
          }
        </>
      )}
      {delivery === 'retirada' && (
        <>
          <span className='uppercase text-sm text-foreground/70'>Somente fazemos retirada em brasília</span>
          <FormInput type='select' items={pickupItems} id='selectedLocation' label='LOCAL DE RETIRADA' form={form} />
        </>
      ) 
      }
      {!delivery && <span className='uppercase text-sm text-foreground/70'>Selecione um tipo de entrega</span>}
      <FormInput type='textarea' id='feedback' label='DEIXE UMA MENSAGEM PRA GENTE' form={form} />
    </div>
  );
}
