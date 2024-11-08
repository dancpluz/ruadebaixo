'use client'

import { defineStepper } from "@stepperize/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './ui/form';
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FormT, orderSchema, paymentSchema,  personalSchemaRefined, orderSchemaRefined,  paymentSchemaRefined,personalSchema } from '@/types/checkout';
import FormPersonal from "./FormPersonal";
import FormOrder from "./FormOrder";
import FormPayment from "./FormPayment";
import React from 'react';
import { useCart, useUser } from '@/app/Context';
import { sendMessageToGroup } from "@/app/actions/zapbot";
import { postShipping } from "@/app/actions/kangu";
import CheckoutFooter from './CheckoutFooter'
import Link from 'next/link'
import CheckIcon from '@/public/icons/check.svg'

const { useStepper, steps } = defineStepper(
  { id: 'personal', label: 'Dados Pessoais', schema: personalSchemaRefined, keys: personalSchema.keyof().options },  
  { id: 'order', label: 'Dados do Pedido', schema: orderSchemaRefined, keys: orderSchema.keyof().options },
  { id: 'payment', label: 'Pagamento', schema: paymentSchemaRefined, keys: paymentSchema.keyof().options },
  { id: 'complete', label: 'Pedido Completo', schema: z.object({}) }
);

export default function CheckoutForm() {
  const stepper = useStepper();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      insta: '',
      selectedDelivery: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      feedback: '',
      //installments: undefined,
      parcels: '1',
      holderName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    },
    shouldFocusError: false,
  });

  const { setFormInfo, setInfo, deliveryOptions,  generatePix } = useUser((state) => state);
  const { cartItems, totalItems, totalPrice } = useCart((state) => state);

  async function onBuy(values: FormT) {
    const functions = []
    if (values.selectedDelivery && values.delivery === 'entrega') {
      functions.push(postShipping(values, cartItems))
    }
    functions.push(sendMessageToGroup(JSON.stringify({...values, ...cartItems},null,2)))

    await Promise.all(functions)
  }

  const onSubmit = async (values: z.infer<typeof stepper.current.schema>) => {
    for (const [key, value] of Object.entries(form.getValues())) {
      setFormInfo(form, key, value)
    }
    if (values.paymentType === 'pix') {
      
      let frete = 0;
      const delivery = form.getValues('delivery')
      const selectedDelivery = form.getValues('selectedDelivery')
      if (delivery === 'entrega' && selectedDelivery && deliveryOptions) {
        const selectedOption = deliveryOptions.find(({ referencia }) => referencia === selectedDelivery)
        
        frete = selectedOption.vlrFrete || 0
      }
      
      await generatePix(totalPrice() + frete, form.getValues('cpf'));
      
      setInfo('successCallback', async () => {
        setInfo('loading', true);
        await onBuy(form.getValues() as FormT);
        setInfo('loading', false);
        setInfo('paymentStatus', undefined)
        stepper.goTo('complete')}
      )
    } else if (values.paymentType === 'credit') {
      
    } 
  };

  const onChangeStep = async (id?: string, direction?: 'next' | 'prev') => {
    if (stepper.current.id === id) {
      console.log(form.getValues())
      console.log(form.formState.errors)
    }

    const goToIndex = id ? stepper.all.indexOf(stepper.all.find((step) => step.id === id)) : undefined;
    const currentIndex = stepper.current.index;

    if (goToIndex > currentIndex || direction === 'next' || id !== 'complete') {
      if (await form.trigger(stepper.current.keys)) {
        id ? stepper.goTo(id) : stepper.next()
      }
    } else if (goToIndex < currentIndex || direction === 'prev') {
      id ? stepper.goTo(id) : stepper.prev()
    }
  }

  if (totalItems() > 0) return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border-t grow md:max-w-[500px] border-foreground md:border-l md:border-t-0 px-5"
      >
        <nav aria-label="Checkout Steps" className="group flex py-5">
          <ol className="flex flex-col grow gap-2">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-3 flex-shrink-0">
                  <Button
                    type='button'
                    role="tab"
                    variant={index <= stepper.current.index ? 'default' : 'outline'}
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex text-base size-8 items-center justify-center rounded-full"
                    onClick={() => onChangeStep(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-2xl uppercase">{step.label}</span>
                </li>
                <div className="flex gap-4">
                  {index < array.length - 1 && (
                    <div
                      className="flex justify-center"
                      style={{
                        paddingInlineStart: '1.15rem',
                      }}
                    >
                      <Separator
                        orientation="vertical"
                        className={`w-[1px] h-full ${index < stepper.current.index ? 'bg-foreground' : 'bg-foreground/40'
                          }`}
                      />
                    </div>
                  )}
                  <div className="flex-1 my-4">
                    {stepper.current.id === step.id &&
                      stepper.switch({
                        personal: () => <FormPersonal />,
                        order: () => <FormOrder />,
                        payment: () => <FormPayment />,
                        complete: () => <CompleteComponent />,
                      })}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </ol>
        </nav>
        {!stepper.isLast &&
        <CheckoutFooter>
            <>
              <Button
                type='button'
                variant="outline"
                className='uppercase'
                onClick={() => onChangeStep(undefined,'prev')}
                disabled={stepper.isFirst}
              >
                Voltar
              </Button>
              <Button
                type='button'
                className='uppercase'
                onClick={() => onChangeStep(undefined,'next')}
                disabled={stepper.current.index === 2}
              >
                Próximo
              </Button>
            </>
        </CheckoutFooter>}
      </form>
    </Form>
  );
}

function CompleteComponent() {
  return (
    <div className='flex flex-col items-center gap-4 py-5'>
      <div className='size-20 border animate-pulse border-foreground rounded-full'>
        <CheckIcon className='text-foreground size-full' />
      </div>
      <p className='text-center grow text-md uppercase'>Seu pedido foi feito com sucesso! Muito obrigado e em breve falaremos com você.</p>
      <Link href='/'>
        <Button className='uppercase'>
          Voltar ao início
        </Button>
      </Link>
    </div>
  );
}