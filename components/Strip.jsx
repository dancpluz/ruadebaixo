import styled from 'styled-components';

const StripDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-overflow: clip;
  margin-left: -40px;
  margin-bottom: 160px;
  rotate: 7deg;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 30px;
  margin: 6px 0;
  color: white;
  -webkit-text-stroke: 1px black;
  letter-spacing: 1px;
`;

export default function Strip() {
  return (
    <StripDiv>
      <Text>
      {"RUA DE BAIXO - ".repeat(9)}
      </Text>
    </StripDiv>
  )
}
