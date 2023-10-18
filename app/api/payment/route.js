// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json()
  //const { amount,customer } = body;
  //console.log(customer, typeof customer)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    ...body,
    currency: 'brl',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    payment_method_types: ['card']
    // automatic_payment_methods: {
    //   enabled: false,
    // },
  });

  return new Response(JSON.stringify(paymentIntent.client_secret))
}