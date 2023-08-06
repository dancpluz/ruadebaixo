import { TagDiv } from './styles/Tag.styled';
import Chip from '@mui/material/Chip';

// Tipos: 'top' | 'bottom' | undefined

export default function Tag({ tags, type }) {
  return (
    <TagDiv type={type}>
      {tags?.map((tag) =>
        <Chip
          key={'Categoria-'+ tag}
          label={tag}
          component='a'
          href={`/produtos?${type == 'size' ? 'size' : 'type'}=${tag}`}
          clickable />
      )}
    </TagDiv>
  )
}