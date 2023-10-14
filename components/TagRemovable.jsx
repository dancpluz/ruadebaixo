'use client'

import { TagDiv } from './styles/Tag.styled';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
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

export default function TagRemovable({ searchParams,selectedTags }) {

  const removeQueryString = (name) => {
    const params = new URLSearchParams(searchParams)

    for (const [key, value] of params.entries()) {
      const array = value.split(','); 
      for (const x of array) {
        if (x === name) {
          array.splice(array.indexOf(x),1);
          if (array.length == 0) {
            params.delete(key);
            return params.toString();
          } else {
            params.set(key,array);
            return params.toString();
          }
        }
      } 
    }
  }

  const tags = Object.values(selectedTags).flat().filter(item => item !== undefined);

  return (
    <TagDiv>
      {tags?.map((tag) =>
        <Link key={tag} href={`?${removeQueryString(tag)}`}>
          <StyledChip
            label={tag}
            deleteIcon={<RemoveIcon alt={'X'} src={plusIcon} />}
            onDelete={() => console.log(tag)} />
        </Link>
      )}
    </TagDiv>
  )
}