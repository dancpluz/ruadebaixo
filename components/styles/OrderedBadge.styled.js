'use client'

import styled from 'styled-components';
import Image from 'next/image';

export const EyeIcon = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.light};
  filter: invert(1);
  padding: 5px;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`;