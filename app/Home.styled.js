'use client'

import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 24px 32px;
  gap: 12px;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  border-bottom: 1px black solid;
`;

export const Logo = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 200px;
`;
