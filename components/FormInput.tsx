'use client'

import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';
import { FloatingLabelInput } from './ui/floating-label-input';
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCepFields } from '@/app/actions/other';
import { useUser } from '@/app/Context';
import { FormField, FormItem, FormMessage, FormControl } from './ui/form';

interface FormInputProps<T extends FieldValues> {
  id: string;
  label: string;
  items?: { label: string, id: string }[];
  form: UseFormReturn<T>;
  type?: 'textarea' | 'radio' | 'select' | 'cep';
  className: string;
  errors: FieldErrors<T>;
  mask?: (string | RegExp)[];
}

export default function FormInput<T extends FieldValues>({ id, type, mask, className, label, items = [], form }: FormInputProps<T>) {
  const {
    setValue,
  } = form;
  
  const { setFormInfo, setInfo, getDeliveryOptions, loading } = useUser((state) => state)

  const fillCepFields = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const cep = e.target.value.replace(/\D/g, '')
      if (cep.length === 8) {
        setInfo('loading', true)
        await getDeliveryOptions(cep)
        
        const { logradouro, complemento, bairro, localidade, uf } = await getCepFields(cep)

        setFormInfo(form, 'address', logradouro)
        setFormInfo(form, 'complement', complemento)
        setFormInfo(form, 'district', bairro)
        setFormInfo(form, 'city', localidade)
        setFormInfo(form, 'state', uf)
        setFormInfo(form, 'cep', cep)
      }
    } catch (error) {
      setFormInfo(form, 'address', '')
      setFormInfo(form, 'complement', '')
      setFormInfo(form, 'district', '')
      setFormInfo(form, 'city', '')
      setFormInfo(form, 'state', '')
      setFormInfo(form, 'selectedDelivery', '')
      setInfo('deliveryOptions', []);
    } finally {
      setInfo('loading', false)
    }
  }

  switch (type) {
    case 'cep':
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  mask={mask}
                  label={label}
                  loading={loading}
                  onChange={(e) => { setValue(id, e.target.value); fillCepFields(e) }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case 'select':
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={(val) => setFormInfo(form, id, val)}>
                  <SelectTrigger label={label} className="grow relative uppercase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map(({label, id}) => 
                        <SelectItem className='uppercase' key={id} value={id}>{label}</SelectItem>
                    )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case 'radio':
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value} onValueChange={(val) => setFormInfo(form,id,val)} className='flex flex-row gap-4'>
                  {items.map(({ label, id }) => 
                    <div key={id} className="flex items-center gap-2">
                      <RadioGroupItem value={id} id={id} />
                      <Label className='uppercase' htmlFor={id}>{label}</Label>
                    </div>
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case 'textarea':
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  label={label}
                  onChange={(e) => { setValue(id, e.target.value)}}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    default:
      return (
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem className={className}>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  mask={mask}
                  label={label}
                  loading={loading}
                  onChange={(e) => { setValue(id, e.target.value)}}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
  }
}