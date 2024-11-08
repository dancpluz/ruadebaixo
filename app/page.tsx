import { fetchFromStrapi } from "@/app/actions/strapi";
import Countdown from "@/components/Countdown";
import { buildImgUrl, selectImageUrl } from "@/lib/utils";
import Image from 'next/image';
import LogoAnimation from '@/components/LogoScroll';
import { Skeleton } from "@/components/ui/skeleton"
import type { Home } from "@/types/api/home";
import { format, parseISO } from 'date-fns';


export const dynamic = 'force-dynamic'

export default async function Home() {
  const data = await fetchFromStrapi<Home>('home?populate[0]=imagens');
  const images = data.data?.attributes?.imagens?.data;
  const date = data.data?.attributes?.data_lancamento;

  const isoDate = parseISO(date);

  return (
    <main className="mt-8 flex flex-col flex-1 gap-8 overflow-hidden">
      <div>
        <h1 className="text-4xl md:text-5xl md:text-center md:px-16 px-5 font-regular clash uppercase tracking-wider">Vendas liberadas em:</h1>
        <h2 className="text-4xl md:text-5xl md:text-center md:px-16 px-5 font-regular clash uppercase font-semibold tracking-wider">{date ? format(isoDate, 'dd/MM - HH:mm') : ''}</h2>
      </div>
      <Countdown />
      <div className="flex flex-wrap w-full -z-10 after:content-[''] after:grow-[999]">
        {images ? images.map(({ id, attributes }) => {
          const { formats, width, height, alternativeText } = attributes;

          const { imageUrl, sizes } = selectImageUrl(formats);

          return (
            <div key={id} className="w-full outline outline-1 outline-foreground sm:w-1/2 md:w-1/3 lg:w-1/4 ">
              <Image
                className="object-contain h-auto w-full"
                src={buildImgUrl(imageUrl)}
                alt={alternativeText || `Lookbook Image ${id}`}
                width={width}
                height={height}
                sizes={sizes}
                priority={id === 0}
              />
            </div>
          );
        }) :
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-72 rounded-lg border text-center" />
          ))
        }
      </div>
      <LogoAnimation />
    </main>
  );
}
