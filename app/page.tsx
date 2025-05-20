import Image from 'next/image';
import Generator from "@/components/Generator";
import InstagramSection from '@/components/InstagramSection';
import AnimatedImage from '@/components/AnimatedImage';

export default async function Landing() {
  return (
    <main>
      <section className='h-[115vh] relative flex flex-col items-center pt-48 lg:px-64 px-4 gap-16'>
        <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-b from-transparent to-foreground z-0" />
        <Image
          src='/wallpaper.webp'
          alt='Wallpaper'
          className='absolute w-full h-full object-cover -z-1'
          fill
        />
        <div className='absolute hover:scale-110 transition-transform -top-8 left-1/2 -translate-x-1/2 size-64 z-100'>
          <AnimatedImage
            src='/fck-ia-logo.webp'
            alt='FCK AI'
            className='object-contain size-full'
            fill
          />
        </div>
        <Generator />
        <Image
          src='/arrow.webp'
          alt='Landing Image'
          className='w-32 h-32 animate-bounce'
          width={128}
          height={128}
        />
      </section>
      <section className='min-h-screen pt-16 pb-52 gap-16 relative flex flex-col justify-center text-background bg-foreground'>
        <div className='flex px-4 flex-col items-center gap-6'>
          <AnimatedImage
            src='/burning.gif'
            alt='GPT burning'
            className='w-32 h-32'
            width={128}
            height={128}
          />
          <h1 className='text-3xl font-pixelated font-bold text-center'>Artistas <u>REAIS</u> que apoiam o projeto:</h1>
        </div>
        <InstagramSection />
      </section>
      <section className='relative bg-background min-h-screen flex'>
        <Image
          src='/fire-bg.webp'
          alt='Fire Background'
          className='absolute -top-32 left-1/2 -translate-x-1/2'
          width={1920}
          height={391}
        />
      </section>
    </main>
  )
}
