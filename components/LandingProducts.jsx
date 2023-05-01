import styled from 'styled-components';
import Card from './Card';


const Flexbox = styled.div`
  
`;

export default function LandingProducts() {
  return (
    <Flexbox>
      {[1,2,3,4].map()<Card/>}
    </Flexbox>
  )
}
