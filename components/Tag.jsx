import { TagDiv, StyledChip } from './styles/Tag.styled';

export default function Tag({ tags, isSize, type, marginTop, marginLeft }) {
  return (
    <TagDiv type={type} marginTop={marginTop} marginLeft={marginLeft}>
      {tags?.map((tag) =>
        <StyledChip
          key={'Categoria-'+ tag}
          label={tag}
          component='a'
          href={`/produtos?${isSize ? 'size' : 'type'}=${tag}`}
          clickable />
      )}
    </TagDiv>
  )
}