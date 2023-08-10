'use client'

import styled from 'styled-components';
import Image from 'next/image';

export const LogoCMS = styled(Image)`
  height: auto;
  width: 60px;
  filter: invert(100%);
  position: absolute;
  z-index: 120;
  top: 15px;
  left: 20px;
`;
