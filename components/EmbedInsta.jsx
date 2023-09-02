'use client';

import { InstagramEmbed } from 'react-social-media-embed';
import { instagramUrl } from '@/lib/config'

export default function EmbedInsta() {
  return (
    <InstagramEmbed url={instagramUrl} width={'100%'} />
  )
}
