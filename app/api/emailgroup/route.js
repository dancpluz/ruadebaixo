// const SENDGRID_KEY = process.env.SENDGRID_API_KEY

// export async function POST(req) {
//   const test = await req.json();

//   const res = await fetch(`https://api.sendgrid.com/v3/mail/send`,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${SENDGRID_KEY}`
//     },
//     body: JSON.stringify({
//       personalizations: [
//         { 
//           to: [
//             {
//               email: "contato@ruadebaixo.com.br"
//             }
//           ]
//         }
//       ],
//       from: {
//         email: "contato@ruadebaixo.com.br"
//       },
//       subject: 'pedido test',
//       content: [
//         {
//           type: 'text/plain',
//           value: test.message
//         }
//       ]
//     })
//     // body: JSON.stringify({
//     //   "personalizations": [
//     //     {
//     //       "to": [
//     //         {
//     //           "email": 'contato@ruadebaixo.com.br',
//     //         }
//     //       ]
//     //     }
//     //   ],
//     //   "from": {
//     //     "email": 'contato@ruadebaixo.com.br',
//     //   },
//     //   "subject": 'PEDIDO Teste',
//     //   "content": [
//     //     {
//     //       "type": 'text/plain',
//     //       "value": test.message,
//     //     }
//     //   ]
//     // })
//   })

//   const data = await res.json();

//   return Response.json(data);
// }
