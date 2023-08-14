import { useEffect } from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Error = styled.p`
  text-decoration: underline;
`;

export default function InputBox({ title, span, errorMessage, children }) {
  useEffect(() => {
    console.log(errorMessage);
  },[errorMessage]);
  
  return (
    <InputDiv>
      <HeaderDiv>
        <div>
          <h3>{title}</h3>
          <span>{span}</span>
        </div>
        {errorMessage && <Error>{errorMessage.message}</Error>}
      </HeaderDiv>
      {children}
    </InputDiv>
  );
}
  
  