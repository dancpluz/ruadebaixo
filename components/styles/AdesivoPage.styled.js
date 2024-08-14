'use client'

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  min-height: 79vh;
  padding-top: 65px;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 700px;
  width: 100%;
  gap: 16px;
  padding: 32px;

  form {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
  }
`;

export const ImageDiv = styled.div`
  position: relative;
  aspect-ratio: 1;
`;