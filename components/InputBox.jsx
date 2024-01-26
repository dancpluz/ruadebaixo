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

export default function InputBox({ title, span, error, children }) {
  return (
    <InputDiv>
      <HeaderDiv>
        <div>
          <h3>{title}</h3>
          <span>{span}</span>
        </div>
        {error && <Error>{error.message}</Error>}
      </HeaderDiv>
      {children}
    </InputDiv>
  );
}
  
  