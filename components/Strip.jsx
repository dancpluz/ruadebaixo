import { StripDiv, Text } from './styles/Strip.styled'

export default function Strip({ text }) {
  return (
    <StripDiv>
      <Text>
        {text.repeat(9)}
      </Text>
    </StripDiv>
  )
}
