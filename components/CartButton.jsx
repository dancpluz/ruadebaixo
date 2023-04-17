import { ShoppingBagOutlined } from '@mui/icons-material';
import styled from 'styled-components';

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
  font-size: 12px;
  color: #eee;
  background-color: #f02d34;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  font-weight: 600;
`;

export default function CartButton({}) {
  return (
    <StyledButton type='button' onClick={''}>
      <ShoppingBagOutlined sx={{ fontSize: '50px' }} />
      <StyledSpan>{'3'}</StyledSpan>
    </StyledButton>
    );
}
  
  