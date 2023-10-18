import { TagDiv } from './styles/Tag.styled';
import Chip from '@mui/material/Chip';

// Tipos: 'top' | 'bottom' | undefined

export default function Tag({ tags, type, isSize }) {
  return (
    <TagDiv type={type} isSize={isSize}>
      {tags?.map((tag) =>
        ( tag &&
        <Chip
          key={'Categoria-'+ tag}
          label={tag}
          component='a'
          href={`/produtos?${type == 'size' ? 'size' : 'type'}`}
          clickable
        />
        )
      )}
    </TagDiv>
  )
}