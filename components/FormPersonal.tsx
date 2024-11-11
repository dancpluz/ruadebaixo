import { FormPersonalValues } from '@/types/checkout';
import { useFormContext } from 'react-hook-form';
import FormInput from './FormInput'

export default function FormPersonal() {
  const form = useFormContext<FormPersonalValues>();

  return (
    <div className="flex flex-col gap-5">
      <FormInput id='name' label='NOME' form={form} />
      <FormInput id='email' label='EMAIL' form={form} />
      <FormInput id='cpf' mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]} label='CPF' form={form} />
      <FormInput id='phone' mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, /\d/]} label='CELULAR' form={form} />
      <FormInput id='insta' mask={['@', ...Array(20).fill(/^[a-zA-Z0-9._]/)]} label='INSTAGRAM' form={form} />
    </div>
  );
}
