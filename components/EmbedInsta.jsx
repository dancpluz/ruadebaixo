'use client';

import { InstagramEmbed } from 'react-social-media-embed';

export default function EmbedInsta({ link }) {
  return (
    <InstagramEmbed url={link} width={'100%'} />
  )
}
