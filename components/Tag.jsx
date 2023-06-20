import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

export const TagDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
`;

const StyledChip = styled(Chip)`
  z-index: 2;
  color: black;
  text-transform: capitalize;
  font-family: 'Clash Display', sans-serif;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: all .20s ease;
  
  &:hover{
    background-color: black;
    color: white;
  }
`;

export default function Tag({ tags, isSize, marginTop, marginLeft }) {
  return (
    <TagDiv marginTop={marginTop} marginLeft={marginLeft}>
      {tags?.map((tag,n) =>
      <Link key={n} href={isSize ? `/produtos/tamanho/${tag}` : `/produtos/${tag}`}>
        <StyledChip key={n} label={tag} clickable />
      </Link>
      )}
    </TagDiv>
  )
}