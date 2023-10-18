import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styled from 'styled-components';
import { Button } from '@/components/Cart';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorText } from '@/components/BuyForm';


const Form = styled.form`
  margin: 16px 0;
  button {
    margin-top: 24px;
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

    setIsLoading(true);

    const url = window.location.toString();

    await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${url}/sucesso`,
      // },
    }).then((result) => {
      const { error } = result;

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("Um erro inesperado aconteceu, tente reiniciar a página.");
        }
      } else {
        onSubmitInfo()
      }

      setIsLoading(false);
      });   
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
      {message && <ErrorText>{message}</ErrorText>}
    </Form>
  );
}