'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useStateContext } from '@/context/StateContext';

const Arrow = styled(Image)`
  transform: rotate(180deg);
  margin: 16px 0;
`;

export default function BackButton() {
  const { router } = useStateContext();

  return (
    <div>
      <Arrow
        src='/assets/icons/arrow-right.svg'
        alt='Voltar'
        width={52}
        height={52}
        onClick={() => router.back()}
      />
    </div>
  )
}
