const ZAP_KEY = process.env.NEXT_PUBLIC_ZAP_API_TOKEN

export async function POST(req) {
  const order = await req.json()

  const res = await fetch(`http://mc.ruadebaixo.com.br:6969/client/sendMessage/ruadebaixo/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ZAP_KEY
    },
    body: JSON.stringify({
      chatId: order.number,
      contentType: "string",
      content: order.message
    }),
  })

  const data = await res.json();

  return Response.json(data);
}
