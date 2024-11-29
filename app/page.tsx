import { fetchFromStrapi } from "@/app/actions/strapi";
import Countdown from "@/components/Countdown";
import { buildImgUrl, selectImageUrl } from "@/lib/utils";
import Image from 'next/image';
import LogoAnimation from '@/components/LogoScroll';
import { Skeleton } from "@/components/ui/skeleton"
import type { Home } from "@/types/api/home";
//import { format, parseISO } from 'date-fns';
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import ArrowIcon from "@/public/icons/arrow.svg";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const data = await fetchFromStrapi<Home>('home?populate[0]=imagens');
  const images = data.data?.attributes?.imagens?.data;
  //const date = data.data?.attributes?.data_lancamento;

  //const isoDate = parseISO(date);

  return (
    <main className="flex flex-col flex-1 overflow-hidden">
      {/* <div>
        <h1 className="text-4xl md:text-5xl md:text-center md:px-16 px-5 font-regular clash uppercase tracking-wider">Vendas liberadas em:</h1>
        <h2 className="text-4xl md:text-5xl md:text-center md:px-16 px-5 font-regular clash uppercase font-semibold tracking-wider">{date ? format(isoDate, 'dd/MM - HH:mm') : ''}</h2>
      </div> */}
      <Link href='/catalogo'>
        <Button variant='ghost' className='hover:bg-background/75 group uppercase py-3 pr-3 pl-6 md:pl-10 md:pr-4 md:py-4 h-auto bg-background/90 border fixed md:bottom-[100px] bottom-[150px] -translate-x-1/2 left-1/2 md:text-4xl text-xl'>
          <div>
            <h1 className='clash font-semibold leading-tight'>Vendas liberadas</h1>
            <p className='leading-tight'>Veja o Catálogo</p>
          </div>
          <ArrowIcon className='transition-transform md:group-hover:translate-x-3 md:group-hover:-translate-y-3 group-hover:translate-x-2 group-hover:-translate-y-2 md:size-28 size-16 text-foreground' />
        </Button>
      </Link>
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
