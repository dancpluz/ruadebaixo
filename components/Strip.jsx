import styled from 'styled-components';

export const StripDiv = styled.div`
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-overflow: clip;
  margin-left: -40px;
  margin-bottom: 160px;
  transition: all 0.15s ease;
  rotate: 7deg;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 30px;
  margin: 6px 0;
  color: transparent;
  -webkit-text-stroke: 1px black;
  letter-spacing: 1px;
`;

export default function Strip({ text }) {
  return (
    <StripDiv>
      <Text>
        {text.repeat(9)}
      </Text>
    </StripDiv>
  )
}
