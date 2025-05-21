import Image from 'next/image';
import Generator from "@/components/Generator";
import InstagramSection from '@/components/InstagramSection';
import AnimatedImage from '@/components/AnimatedImage';
import ContactForm from '@/components/ContactForm';
import ScrollLogo from '@/components/ScrollLogo';

export default async function Landing() {
  return (
    <main>
      <ScrollLogo />
      <section className='h-[115vh] relative flex flex-col items-center pt-48 lg:px-64 px-4 gap-16'>
        <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-b from-transparent to-foreground z-0" />
        <Image
          src='/wallpaper.webp'
          alt='Wallpaper'
          className='absolute w-full h-full object-cover -z-1'
          fill
        />
        <Generator />
        <Image
          src='/arrow.webp'
          alt='Landing Image'
          className='w-32 h-32 z-10 animate-bounce'
          width={128}
          height={128}
        />
      </section>
      <section className='min-h-screen lg:pt-16 pt-48 lg:pb-52 pb-32 gap-16 relative flex flex-col justify-center text-background bg-foreground px-4'>
        <div className='flex px-4 flex-col items-center gap-6'>
          <AnimatedImage
            src='/burning.gif'
            alt='GPT burning'
            className='w-32 h-32'
            width={128}
            height={128}
            unoptimized
          />
          <h1 className='text-3xl font-pixelated font-bold text-center'>Artistas <u>REAIS</u> que apoiam o projeto:</h1>
        </div>
        <InstagramSection />
      </section>
      <section className='relative bg-background min-h-screen flex flex-col items-center lg:pt-64 pt-32 px-4'>
        <div className='absolute w-full lg:h-[20vw] h-[40vw] top-0 -translate-y-1/2'>
          <Image
            src='/fire-bg.webp'
            alt='Fire Background'
            className='object-cover size-full'
            width={1920}
            height={391}
          />
        </div>
        <div className='h-[50vh] flex justify-center items-center'>
          <h1 className='text-3xl font-pixelated text-foreground font-bold text-center'><u>IA</u> não faz arte, essas pessoas <u>sim</u>.</h1>
        </div>
        <div className='h-[50vh] flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-pixelated text-foreground font-bold text-center -mb-8'>Feito por</h1>
          <AnimatedImage
            src='/logo.webp'
            alt='Logo Rua de Baixo'
            className='object-contain animate-pulse size-64'
            width={96}
            height={96}
          />
        </div>
      </section>
      <section id='participe' className='relative h-[50vh] flex flex-col items-center justify-center pb-64 px-4'>
        <ContactForm />
      </section>
    </main>
  )
}
