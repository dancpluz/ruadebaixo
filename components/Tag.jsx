import { TagDiv } from './styles/Tag.styled';
import Chip from '@mui/material/Chip';

// poition: 'top' | 'bottom' | undefined

export default function Tag({ tags, position, isSize }) {
  return (
    <TagDiv position={position} isSize={isSize}>
      {tags?.map((tag) =>
        ( tag &&
        <Chip
          key={'Categoria-'+ tag.value}
          label={tag.value}
          component='a'
          href={`/produtos?${new URLSearchParams({[tag.type]: tag.value}).toString()}`}
          clickable
        />
        )
      )}
    </TagDiv>
  )
}