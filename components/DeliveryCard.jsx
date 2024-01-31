'use client'

import Image from 'next/image';
import styled from 'styled-components';
import { formatFloat } from '@/lib/format';

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.dark}; 
  padding: 0 16px 0 16px;
  gap: 16px;
  
  div {
    flex-grow: 1;
  }
  h3 {
    font-weight: 500;
    @media ${({ theme }) => theme.sizes.small} {
      font-size: 1.2rem;
    }
  }

  h2 {
    @media ${({ theme }) => theme.sizes.small} {
      font-size: 1.25rem;
    }
    font-weight: 400;
  }
`;

const Logo = styled(Image)`
  filter: grayscale(100%);
  
  @media ${({ theme }) => theme.sizes.small} {
    display: none;
  }
`;


export default function DeliveryCard({children, delivery: { transp_nome,url_logo,prazoEnt,vlrFrete }}) {
  return (
    <Card>
      {children}
      <Logo alt={transp_nome} src={url_logo} width={60} height={60}/>
      <div>
        <h3>{transp_nome}</h3>
        <span><u>{`${prazoEnt}-${prazoEnt+3} dias`}</u></span>
      </div>
      <h2>R${formatFloat(vlrFrete)}</h2>
    </Card>
  )
}


// {
//   "vlrFrete": 27.19,
//   "prazoEnt": 13,
//   "prazoEntMin": 12,
//   "dtPrevEnt": "2024-02-14 00:51:34",
//   "dtPrevEntMin": "2024-02-09 00:51:34",
//   "tarifas": [
//     {
//       "valor": 27.19,
//       "descricao": "Frete Peso + Seguro"
//     }
//   ],
//   "error": {
//     "codigo": "",
//     "mensagem": ""
//   },
//   "idSimulacao": 885647758,
//   "idTransp": 1761837,
//   "cnpjTransp": "04884082000135",
//   "idTranspResp": 1761837,
//   "cnpjTranspResp": "04884082000135",
//   "alertas": [
//     "NF-e obrigatória para envio."
//   ],
//   "nf_obrig": "S",
//   "url_logo": "https://portal.kangu.com.br/public/images/transportadoras/svg/reduzida/Jadlog.svg",
//   "transp_nome": "Jadlog",
//   "descricao": "Jadlog via Kangu",
//   "servico": "E",
//   "referencia": "kangu_E_04884082000135_885647758"
// }
