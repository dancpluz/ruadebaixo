import { TagDiv, StyledChip } from './styles/Tag.styled';
import Link from 'next/link';

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