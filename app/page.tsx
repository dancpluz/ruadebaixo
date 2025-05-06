import Image from 'next/image';
import Generator from "@/components/Generator";
import InstagramCard from '@/components/InstagramCard';
import client from '@/lib/apify';

export default async function Landing() {
  return (
    <main>
      {/* <section className='h-screen relative flex flex-col items-center justify-center lg:px-64 px-4'>
        <Image
          src='/wallpaper.webp'
          alt='Wallpaper'
          className='absolute w-full h-full object-cover -z-1'
          fill
        />
        <Generator />
      </section> */}
      <section className='min-h-screen relative flex flex-col items-center justify-center text-background bg-foreground'>
        <InstagramCard />
      </section>
    </main>
  )
}
