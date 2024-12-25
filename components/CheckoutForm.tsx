'use client'

import { defineStepper } from "@stepperize/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './ui/form';
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FormT } from '@/types/checkout';
import FormPersonal from "./FormPersonal";
import FormOrder from "./FormOrder";
import FormPayment from "./FormPayment";
import React from 'react';
import { useCart, useUser } from '@/app/Context';
import { createNewClient, createNewSale } from "@/app/actions/strapi";
import CheckoutFooter from './CheckoutFooter'
import Link from 'next/link'
import CheckIcon from '@/public/icons/check.svg'
import { cartItemsToString, isError } from "@/lib/utils";
import { personalSchemaRefined, personalSchema, orderSchemaRefined, orderSchema, paymentSchemaRefined, paymentSchema } from "@/lib/fields";
import { createCustomer, updateCustomerExternalRef } from "@/app/actions/asaas";
import { toast } from "@/hooks/use-toast";

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
      district: '',
      city: '',
      state: '',
      address: '',
      number: '',
      complement: '',
      feedback: '',
      parcels: '1',
      holderName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    },
    shouldFocusError: false,
  });

  const { setFormInfo, setInfo, deliveryOptions, makePayment, customer, parcelOptions, resetPayment } = useUser((state) => state);
  const { cartItems, totalItems, resetCart, totalPrice, checkPackage } = useCart((state) => state);

  const onSubmit = async () => {
    try {      
      setInfo('loading', true)

      const values = form.getValues() as FormT;

      for (const [key, value] of Object.entries(values)) {
        setFormInfo(form, key, value)
      }

      const customerAsaas = await createCustomer(values, customer?.id);

      if (isError(customerAsaas)) {
        throw new Error(customerAsaas.error.message)
      }

      const clientStrapi = await createNewClient({ values, asaasCustomerId: customerAsaas.id });

      if (isError(clientStrapi)) {
        throw new Error(clientStrapi.error.message)
      }

      const updatedCustomerAsaas = await updateCustomerExternalRef(customerAsaas.id, clientStrapi.id);

      if (isError(updatedCustomerAsaas)) {
        throw new Error(updatedCustomerAsaas.error.message)
      };
  
      let freight = 0;
      const discount = checkPackage()
      
      const paymentType = values.paymentType
      const delivery = values.delivery
      const selectedDelivery = values.selectedDelivery

      if (delivery === 'entrega' && selectedDelivery && deliveryOptions) {
        const selectedOption = deliveryOptions.find(({ referencia }) => referencia === selectedDelivery)
        freight = selectedOption?.vlrFrete || 0
      }
  
      let total = totalPrice() + freight - discount;

      const sale = await createNewSale({ values, total, cartItems, freight, discount, strapiClientId: clientStrapi.id.toString() });

      if (isError(sale)) {
        throw new Error(sale.error.message)
      }
      
      if (paymentType === 'credit') {
        total = parcelOptions.find(({ id }) =>  id === values.parcels).value
      }
  
      setInfo('successCallback', () => {
        setInfo('paymentStatus', undefined);
        resetCart()
        setInfo('loading', false);
        stepper.goTo('complete');
      })
      
      //setInfo('customer', updatedCustomerAsaas);
  
      await makePayment(updatedCustomerAsaas.id, sale.id.toString(), total, values, cartItemsToString(cartItems, false));
    } catch (error) {
      toast({
        title: `Erro ao criar pagamento`,
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
      resetPayment()
    }
  };

  const onChangeStep = async (id?: string, direction?: 'next' | 'prev') => {
    // if (stepper.current.id === id) {
    //   console.log(form.getValues())
    //   console.log(form.formState.errors)
    // }

    const goToIndex = id ? stepper.all.indexOf(stepper.all.find((step) => step.id === id)) : undefined;
    const currentIndex = stepper.current.index;

    if (goToIndex === currentIndex + 1 || direction === 'next') {
      if (id !== 'complete' && await form.trigger(stepper.current.keys)) {
        id ? stepper.goTo(id) : stepper.next()
      }
    } else if ((goToIndex !== undefined && goToIndex < currentIndex) || (direction === 'prev') && stepper.current.id !== 'complete')  {
      id ? stepper.goTo(id) : stepper.prev()
    }
  }

  if (totalItems() > 0) return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border-t grow md:max-w-[500px] border-foreground md:border-l md:border-t-0 px-5 md:pr-12"
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