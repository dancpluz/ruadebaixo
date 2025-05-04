import Image from 'next/image';
import Generator from "@/components/Generator";

export default async function Landing() {
  return (
    <div className='h-screen relative flex flex-col items-center justify-center lg:px-64 px-4'>
      <Image
        src='/wallpaper.webp'
        alt='Wallpaper'
        className='absolute w-full h-full object-cover -z-1'
        fill
      />
      <Generator />
    </div>
  )
}
