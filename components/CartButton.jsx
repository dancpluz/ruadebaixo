import Image from 'next/image';
import BoxIcon from '../assets/boxclosed.svg';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import { useStateContext } from '../context/StateContext';

const StyledBadge = styled(Badge)`
  cursor: pointer;
  .MuiBadge-badge {
    font-family: 'Clash Display', sans-serif;
    font-weight: 700;
    right: 7px;
    top: 12px;
    background-color: black;
    color: white;
    border: 2px solid white;
    }
`;

const Box = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
`;

export default function CartButton({}) {
  const { setShowCart, totalQuantities } = useStateContext();


  return (
    <StyledBadge onClick={() => setShowCart(true)} badgeContent={totalQuantities} showZero>
      <Box src={BoxIcon} alt={'box'} />
    </StyledBadge>
    );
}
  
  