'use client'

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CardPayment() {
  const [clientSecret,setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data));
  },[]);

  const appearance = {
    theme: 'stripe',
    variables: {
      fontFamily: 'Clash Display, sans-serif',
      fontWeightLight: '400',
      fontWeightNormal: '500',
      fontWeightMedium: '600',
      colorPrimary: 'black',
      colorBackground: 'white',
      colorText: 'black',
      colorDanger: '#df1b41',
      spacingUnit: '5px',
      borderRadius: '0px',
    }
  };
  
  const options = {
    clientSecret,
    appearance,
    fonts: [
      {
        cssSrc: 'https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap)',
      }
    ],
  };

  return (
    <div>
      {clientSecret && 
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
      }
    </div>
  );
}