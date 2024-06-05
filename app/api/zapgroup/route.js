const ZAP_KEY = process.env.ZAP_API_TOKEN

export async function POST(req) {
  const order = await req.json()

  const res = await fetch(`http://hub.ruadebaixo.com.br:6969/client/sendMessage/ruadebaixo/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ZAP_KEY
    },
    body: JSON.stringify({
      chatId: '120363159389024765@g.us',
      contentType: "string",
      content: order.message
    }),
  })

  const data = await res.json();

  return Response.json(data);
}
