import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styled from 'styled-components';
import { Button } from '@/components/Cart';
import CircularProgress from '@mui/material/CircularProgress';


const Form = styled.form`
  margin: 16px 0;
  button {
    margin: 16px 0;
    font-weight: 600;
  }

`;

export default function CheckoutForm({ onSubmitInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message,setMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Pago com sucesso!");
          break;
        case "processing":
          setMessage("Seu pagamento está sendo processado");
          break;
        case "requires_payment_method":
          setMessage("Seu pagamento não foi completado, por favor tente novamente.");
          break;
        default:
          setMessage("Algum erro inesperado ocorreu.");
          break;
      }
    });
  },[stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    await onSubmitInfo();

    setIsLoading(true);

    const url = window.location.toString();

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${url}/sucesso`,
      // },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("Um erro inesperado aconteceu, tente reiniciar a página.");
    // }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <PaymentElement options={paymentElementOptions} />
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        {isLoading ? <CircularProgress color='inherit' /> : "PAGAR AGORA"}
      </Button>
      {message && <div >{message}</div>}
    </Form>
  );
}