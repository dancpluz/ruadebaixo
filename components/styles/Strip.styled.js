'use client'

import styled from 'styled-components';

export const StripDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid ${({ theme }) => theme.colors.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  text-overflow: clip;
  margin-left: -40px;
  margin-bottom: 160px;
  transition: all 0.15s ease;
  rotate: 7deg;
`;

export const Text = styled.h2`
  font-family: 'Clash Display', sans-serif;
  font-weight: 700;
  margin: 6px 0;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.dark};
  letter-spacing: 1px;
`;