'use client'

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CardPayment({ order, onSubmitInfo }) {
  const [clientSecret,setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data));
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'Clash Display, sans-serif',
      colorPrimary: 'black',
      colorBackground: 'white',
      colorText: 'black',
      colorDanger: '#df1b41',
      spacingUnit: '3px',
      borderRadius: '0px',
      fontSizeBase: '1.25rem',
      fontWeightBold: '600',
      fontWeightNormal: '500',
      fontWeightLight: '400',
    }
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && 
        <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutForm onSubmitInfo={onSubmitInfo} />
          </Elements>
      }
    </div>
  );
}