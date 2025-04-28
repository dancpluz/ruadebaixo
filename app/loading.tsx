import Image from 'next/image'

export default function loading() {
  return (
    <div className="fixed w-screen z-100 bg-background h-screen flex items-center justify-center flex-col">
      <div className='relative size-64'>
        <Image
          style={{
            clipPath: `inset(0 100% 0 0)`,
          }}
          src='/logo.webp'
          alt='Logo'
          fill
          className="size-full object-contain"
        />
      </div>
      <div className="w-64 flex flex-col gap-4 p-4">
        <progress className="w-full" />
      </div>
    </div>
  )
}
