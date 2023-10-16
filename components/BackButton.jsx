'use client';

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';

const Back = styled.u`
  cursor: pointer;
  font-size: 1.25rem;
`;

export default function BackButton() {
  const { router } = useStateContext();

  const handleGoBack = () => {
    const hasPreviousPage = window.history.length > 2;

    if (hasPreviousPage) {
      router.back();
    } else {
      router.push("/produtos/");
    }
  }

  return (
    <Back onClick={handleGoBack}>
      {"< Voltar"}
    </Back>
  )
}
