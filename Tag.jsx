import React from "react";
export function Tag({
  tags,
  map,
  tag,
  n
}) {
  return <TagDiv>
          {tags?.map((tag, n) => <Link key={n} href={`/produtos/${tag}`}>
            <Tag key={n} label={tag} clickable />
          </Link>)}
        </TagDiv>;
}
  