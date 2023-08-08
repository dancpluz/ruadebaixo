'use client'

import { TagDiv } from './styles/Tag.styled';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import plusIcon from '@/public/assets/icons/plus.svg';

const RemoveIcon = styled(Image)`
  height: 14px;
  width: 14px;
  rotate: 45deg;
  padding: 2px;
  transition: filter .20s ease;
`;

const StyledChip = styled(Chip)`
  &:hover {
    ${RemoveIcon} {
      filter: invert(100%);
    }
  }
`;

export default function TagRemovable() {
  const { selectedTags,setSelectedTags } = useStateContext();

  function handleDelete(tag) {
    setSelectedTags(selectedTags.filter((e) => { return e !== tag }))
  }

  return (
    <TagDiv>
      {selectedTags?.map((tag) =>
        <StyledChip
          key={tag}
          label={tag}
          deleteIcon={<RemoveIcon alt={'X'} src={plusIcon} />}
          onDelete={() => handleDelete(tag)} />
      )}
    </TagDiv>
  )
}