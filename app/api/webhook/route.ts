type EventName =
  | "PAYMENT_RECEIVED"
  | "PAYMENT_CONFIRMED"
  | "PAYMENT_OVERDUE"
  | "PAYMENT_DELETED"
  | "PAYMENT_CREATED"
;

async function handleWebhook(event: EventName) {
  switch (event) {
    case 'PAYMENT_CREATED':
      console.log('Payment created', event);
      return new Response(JSON.stringify({ message: "Payment created" }), {
        status: 200,
      });
    case 'PAYMENT_RECEIVED':
      console.log('Payment received', event);
      return new Response(JSON.stringify({ message: "Payment received" }), {
        status: 200,
      });
    default:
      console.log('Invalid event type', event);
      return new Response(JSON.stringify({ error: "Invalid event type" }), {
        status: 400,
      });
  }

}

export async function POST(request: Request) {
  try {
    // Request Body.
    const rawBody = await request.text();
    const body = await request.json();
    
    // Verify the webhook signature
    // try {
    //   const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    //   if (!stripeWebhookSecret) {
    //     throw new Error("STRIPE_WEBHOOK_SECRET not set");
    //   }

    //   const sig = request.headers.get("Stripe-Signature");
    //   if (!sig) {
    //     throw new Error("Stripe Signature missing");
    //   }

    //   // Assuming you have a Stripe instance configured
    //   event = Stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
    // } catch (err) {
    //   console.error(`⚠️  Webhook signature verification failed.`, err.message);
    //   return new Response(
    //     JSON.stringify({ error: "Webhook signature verification failed" }),
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const webhookResponse = await handleWebhook(body.event);

    return new Response(webhookResponse?.body, {
      status: webhookResponse?.status || 200,
    });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return new Response(JSON.stringify({ error: "Webhook falhou." }), {
      status: 500,
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ error: "Bad Request" }), {
    status: 400,
  });
}

