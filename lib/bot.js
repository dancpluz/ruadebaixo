import emailjs from '@emailjs/browser';

const topBarSize = 26;
const middleBarSize = 50;

function getDateNow() {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  };

  const formatter = new Intl.DateTimeFormat('pt-BR',options);
  const now = new Date();

  const splittedDate = formatter.format(now).replace(',','').split(' ');

  const formattedDate = splittedDate[0].split('/').reverse().join('-') + '_' + splittedDate[1];

  return formattedDate;
}

export async function sendMessageToClient(json) {
  const { name,phone,shipping,order,payment } = json;
  const { total,subtotal,fee,products } = order;

  const message = `Salvee ${name}!!🔥
Antes de tudo, nós da Rua de Baixo agradecemos muito pela preferência e saiba que você faz parte disso!💖
Mas então... bora confirmar seu pedido:

${'='.repeat(topBarSize)}
*📦 Sua Caixa* (${products.length} ${products.length > 1 ? 'itens' : 'item'} + Adesivo)
${'-'.repeat(middleBarSize)}
${formatProducts(products)}
${'-'.repeat(middleBarSize)}
💴 Subtotal: *R$${subtotal}*
💷 ${shipping.type}: *${parseInt(fee) > 0 ? 'R$' + fee : 'Grátis'}*
💰 Total${payment == 'Cartão de Crédito' ? ' + Taxa' : ''}: *R$${total}*
${'='.repeat(topBarSize)}

🌆 Você escolheu ${shipping.type} - ${shipping.type === 'Retirada' ? shipping.local : [shipping.address,shipping.district,shipping.number,shipping.complement,shipping.city,shipping.uf].filter((e) => { return e != '' }).join(', ')}
${payment === 'Cartão de Crédito' ? `📃 Você já pagou no ${payment}!` : `📃 E vai pagar no ${payment}`}
😉 Me confirma e em breve respondemos pra trocar uma ideia`

  const sendToClient = await fetch('/api/zapclient', {
    method: 'POST',
    body: JSON.stringify({ number: `55${phone}@c.us`, message })
  })

  if (sendToClient.ok) {
    await sendToClient.json()
      .then((data) => {
        if (!data.success) {
          throw new Error(`Ocorreu um erro: ${data.error}`)
        }
      })
  } else {
    throw new Error(sendToClient.statusText);
  }
};

export async function sendMessageToGroup(json) {
  const id = getDateNow();

  const { name,email,phone,insta,shipping,order,payment,cpf } = json;
  const { total,subtotal,fee,products } = order;

  const message = `*PEDIDO* #${id}
👤 ${name}
📞 ${phone}
✉️ ${email}
${insta ? `🤳 ${insta}\n` : ''}${'='.repeat(topBarSize)}
*PRODUTOS* (${products.length} ${products.length > 1 ? 'itens' : 'item'})
${'-'.repeat(middleBarSize)}
${formatProducts(products)}
${'-'.repeat(middleBarSize)}
💰 Subtotal: *R$${subtotal}*
💰 ${shipping.type}: *${parseInt(fee) > 0 ? 'R$' + fee : 'Grátis'}*
💰 Total${payment == 'Cartão de Crédito' ? ' + Taxa' : ''}: *R$${total}*
${'='.repeat(topBarSize)}
📦 ${shipping.type} - ${shipping.type === 'Retirada' ? shipping.local : [shipping.address,shipping.district,shipping.number,shipping.complement,shipping.city,shipping.uf,shipping.cep].filter((e) => { return e != '' }).join(', ')}
${cpf ? `📃 ${cpf}\n` : ''}💳 Tipo de Pagamento: ${payment}`

 const sendToGroup = await fetch('/api/zapgroup', {
    method: 'POST',
    body: JSON.stringify({ message })
  })

  if (sendToGroup.ok) {
    await sendToGroup.json()
      .then((data) => {
        if (!data.success) {
          throw new Error(`Ocorreu um erro: ${data.error}`)
        }
      })
  } else {
    throw new Error(sendToGroup.statusText);
  }
};

export async function sendEmailToGroup(json) {
  const id = getDateNow();

  const { name,email,phone,insta,shipping,order,payment,cpf } = json;
  const { total,subtotal,fee,products } = order;

  const message = `*PEDIDO* #${id}
👤 ${name}
📞 ${phone}
✉️ ${email}
${insta ? `🤳 ${insta}\n` : ''}${'='.repeat(topBarSize)}
*PRODUTOS* (${products.length} ${products.length > 1 ? 'itens' : 'item'})
${'-'.repeat(middleBarSize)}
${formatProducts(products)}
${'-'.repeat(middleBarSize)}
💰 Subtotal: *R$${subtotal}*
💰 ${shipping.type}: *${parseInt(fee) > 0 ? 'R$' + fee : 'Grátis'}*
💰 Total${payment == 'Cartão de Crédito' ? ' + Taxa' : ''}: *R$${total}*
${'='.repeat(topBarSize)}
📦 ${shipping.type} - ${shipping.type === 'Retirada' ? shipping.local : [shipping.address,shipping.district,shipping.number,shipping.complement,shipping.city,shipping.uf,shipping.cep].filter((e) => { return e != '' }).join(', ')}
${cpf ? `📃 ${cpf}\n` : ''}💳 Tipo de Pagamento: ${payment}`

  await emailjs.send('service_rdb','template_rdb-venda',{ email: 'contato@ruadebaixo.com.br, dan08jan@gmail.com',id,message },{ publicKey: process.env.NEXT_PUBLIC_EMAILJS_TOKEN } ).then(
      (response) => {
        console.log('Enviado com Sucesso!', response.status, response.text);
      },
      (error) => {
        console.log('Erro:', error);
      },
    );
};

function formatProducts(products) {
  const strArray = products.map((product,n) => {
    if (product.fullPrice == product.offerPrice) {
      return `👕 _${n + 1}. ${product.type} ${product.name}_\n💵 Preço: *R$${product.fullPrice}*${products.length == n + 1 ? '' : '\n'}`
    } else {
      return `👕 _${n + 1}. ${product.type} ${product.name}_\n💵 Preço: ~R$${product.fullPrice}~\n💸 Preço com Desconto: *R$${product.offerPrice}*${products.length == n + 1 ? '' : '\n'}`
    }
  })

  const stickerMessage = `\n${'-'.repeat(middleBarSize)}\n⤵️ _+Adesivo Rua de Baixo_\n💵 Preço: *Grátis*`
  return strArray.join('-'.repeat(middleBarSize) + '\n') + stickerMessage;
};