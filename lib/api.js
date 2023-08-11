import { client,urlForImage } from '@/sanity/lib/client';
import { cache } from 'react';

export const revalidate = 3600;

export const fetchLookBook = cache(async (lookbookDate) => {
  const data = await client.fetch(`*[_type == "lookbook" && date == "${lookbookDate}"][0] {
				images[] {
					asset->{
						...,
						metadata
					}
				}
			}`);

  const photos = data.images.map(image => {
    return {
      url: urlForImage(image),
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      blur: image.asset.metadata.lqip,
    }
  });

  return { date: lookbookDate, images: photos };
});