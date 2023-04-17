import Image from 'next/image';
import BoxIcon from '../assets/box.svg';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';


const StyledButton = styled.button`
  font-size: 25px;
  color: black;
  cursor: pointer;
  position: relative;
  transition: transform .4s ease;
  border: none;
  background-color: transparent;
`;

const StyledSpan = styled.span`
  position: absolute;
  right: 1px;
  top: 3px;
  font-size: 8px;
  color: #fff;
  background-color: #f02d34;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  font-weight: 600;
`;

export default function CartButton({}) {
  const { setShowCart, totalQuantities } = useStateContext();

  return (
    <StyledButton type='button' onClick={() => setShowCart(true)}>
      <Image src={BoxIcon} alt={'box'} height={30} />
      <StyledSpan>{totalQuantities}</StyledSpan>
    </StyledButton>
    );
}
  
  