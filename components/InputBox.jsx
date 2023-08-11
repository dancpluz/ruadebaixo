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

export default function InputBox({ title, span, errorMessage, children }) {
  return (
    <InputDiv>
      <HeaderDiv>
        <div>
          <h3>{title}</h3>
          <span>{span}</span>
        </div>
        {errorMessage && <p>{errorMessage.message}</p>}
      </HeaderDiv>
      {children}
    </InputDiv>
  );
}
  
  