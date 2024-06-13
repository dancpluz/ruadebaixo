import Plunk from '@plunk/node';
import { renderAsync } from '@react-email/render';

export const sendEmailToGroup = async (component) => {
  const plunk = new Plunk(process.env.PLUNK_API_KEY);

  const emailHtml = await renderAsync(component);

  // await plunk.events.track({
  //   event: "product-buy",
  //   email: "dan08jan@gmail.com",
  //   data: {
  //     name: "Danilo",
  //     phone: "11999999999",
  //     email: "",
  //   },
  //   subscribed: true,
  // })

  plunk.emails.send({
    to: "contato@ruadebaixo.com.br",
    subject: `Pedido Cofirmado {id}`,
    body: emailHtml,
  });
}