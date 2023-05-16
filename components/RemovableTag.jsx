import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import plusIcon from '../assets/plus.svg'

const TagDiv = styled.div`
  margin-top: ${props => props.marginTop}px;
  margin-left: ${props => props.marginLeft}px;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const RemoveIcon = styled(Image)`
  height: 14px;
  width: 14px;
  rotate: 45deg;
  padding: 3px;
  transition: filter .20s ease;
`;

const StyledChip = styled(Chip)`
  z-index: 2;
  color: black;
  font-size: 18px;
  height: 50px;
  padding: 10px;
  border-radius: 28px;
  text-transform: capitalize;
  font-family: 'Clash Display', sans-serif;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: all .20s ease;
  
  &:hover {
    background-color: black;
    color: white; 
      ${RemoveIcon} {
      filter: invert(100%);
    }
  }
`;

export default function Tag({ tags, marginTop, marginLeft }) {
  function handleDelete() {
    return
  }

  return (
    <TagDiv marginTop={marginTop} marginLeft={marginLeft}>
      {tags?.map((tag,n) =>
        <StyledChip key={n} label={tag} deleteIcon={<RemoveIcon src={plusIcon} />} onDelete={handleDelete}/>
      )}
    </TagDiv>
  )
}