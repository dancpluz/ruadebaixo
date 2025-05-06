import { getUserInfo } from '@/app/actions/instagram'
import React from 'react'
import Image from 'next/image';
import { HTTPValidationError, User } from '@/types/instagram';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function InstagramCard() {
  const result = await getUserInfo('dancpluz')
  let user;
  if (result.details) {
    user = result as HTTPValidationError
    return (
      <div className='window relative min-w-64'>
        <div className="title-bar-text flex items-center gap-1 text-sx">
          <h1 className="title-bar-text flex items-center gap-1 text-sx">
            <Image
              src='/insta.svg'
              alt='Instagram Logo'
              width={20}
              height={20}
              className='object-cover rounded-full'
            />
            FCK IA - Erro
          </h1>
        </div>
        <div className="window-body mx-1 flex grow flex-col">
          <div className="text-foreground">
            <h1 className='text-2xl font-bold'>Erro ao buscar usuário</h1>
            <p className='text-sm'>{user.details[0].msg}</p>
          </div>
        </div>
      </div>
    )
  } else {
    user = result as User
  }

  const { username, full_name, profile_pic_url_hd, biography, media_count, follower_count, following_count } = user

  return (
    <>
      {/* <pre className='px-32 whitespace-break-spaces break-all'>{JSON.stringify(user,null,2)}</pre> */}
      <div className='window relative w-[400px]'>
        <div className="title-bar max-h-0 min-h-7">
          <h1 className="title-bar-text flex items-center gap-1 text-sx">
            <Image
              src='/insta/insta.svg'
              alt='Instagram Logo'
              width={20}
              height={20}
            />instagram.exe - @{username}
          </h1>
          <div className="title-bar-controls">
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body mx-1 flex grow flex-col font-pixelated text-foreground">
          <div className="font-normal flex items-center *:text-sm *:text-black *:px-2 *:py-1 *:hover:bg-border/20 overflow-hidden">
            <p>Arquivo</p>
            <p>Editar</p>
            <p>Exibir</p>
            <p>Opções</p>
            <p>Ajuda</p>
          </div>
          <Link href={`https://instagram.com/${username}`} target='_blank' className='w-full'>
            <h1 className='flex grow justify-center items-center py-4 mx-1 text-[16px] font-bold decoration-none border-b border-border text-foreground'>{username}</h1>
          </Link>
          <div className="text-foreground p-2 flex flex-col gap-2">
            <div className='flex gap-5 items-center'>
              <Image 
                src={profile_pic_url_hd}
                alt='Instagram Profile'
                width={92}
                height={92}
                className='object-cover border border-t-border rounded-full'
              />
              <div className='flex flex-col gap-2 grow'>
                <div className='flex flex-row items-center gap-4 w-full'>
                  <SocialDiv text={'publicações'} number={media_count} />
                  <SocialDiv text={'seguidores'} number={follower_count} />
                  <SocialDiv text={'seguindo'} number={following_count} />
                </div>
                <div className='flex gap-0.5 w-full'>
                  <Link href={`https://instagram.com/${username}`} target='_blank' className='w-full'>
                    <button className='w-full h-8 text-[.9rem] relative text-foreground gap-2'>
                      <Image
                      src='/insta/add.svg'
                      alt='Seta pixelada'
                      width={30}
                      height={30}
                      className='absolute top-1/2 -translate-y-1/2 left-2 size-4'
                    />Seguir</button>
                  </Link>
                  <button className='size-8 relative max-w-8 min-w-8 flex items-center justify-center'>
                    <Image 
                      src='/insta/chevron.svg'
                      alt='Seta pixelada'
                      width={30}
                      height={30}
                      className='size-6'
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col p-2 border-b border-border'>
              <h1 className='text-[1rem] font-bold'>{full_name}</h1>
              <p className='text-sm'>{JSON.stringify(biography)}</p>
            </div>
            <div className='flex grow gap-0.5'>
              <SocialTabsButtons href={`https://instagram.com/${username}`} imageSrc='/insta/cam.webp' active />
              <SocialTabsButtons href={`https://instagram.com/${username}/reels`} imageSrc='/insta/videocam.webp' />
              <SocialTabsButtons href={`https://instagram.com/${username}/tagged`} imageSrc='/insta/globe.webp' />
            </div>
            <div className='grid grid-cols-3 gap-0.5'>
              {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className='relative w-full aspect-square bg-border'>
                <Image
                src={`/gpt.png`}
                alt={`Image ${index + 1}`}
                className='size-full object-cover'
                fill
                />
              </div>
              ))}
            </div>
            <div className='flex grow gap-0.5'>
              <SocialTabsButtons href={`https://instagram.com/${username}`} imageSrc='/insta/magnify.webp' />
              <SocialTabsButtons href={`https://instagram.com/${username}`} imageSrc='/insta/floppy.webp' />
              <SocialTabsButtons href={`https://instagram.com/${username}`} imageSrc='/insta/star.webp' />
              <SocialTabsButtons href={`https://instagram.com/${username}`} imageSrc='/insta/earth.webp' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function SocialDiv({ number, text }: { number: number, text: string }) {
  return (
    <div className='flex items-center flex-col'>
      <p className='text-[.9rem] font-bold'>{number}</p>
      <span className='text-[.8rem]'>{text}</span>
    </div>
  )
}

function SocialTabsButtons({ href, imageSrc, active }: { href: string, imageSrc: string, active?: boolean }) {
  return (
    <Link href={href} target='_blank' className='w-full'>
      <button className={cn(
        'w-full flex items-center justify-center h-7',
        'border-1 border-[#003c74] rounded-sm',
        'bg-gradient-to-b from-white via-[#ecebe5] to-[#d8d0c4]',
        'active:bg-gradient-to-b active:from-[#cdcac3] active:via-[#e3e3db] active:to-[#f2f2f1]',
        'hover:shadow-[inset_-1px_1px_#fff0cf,inset_1px_2px_#fdd889,inset_-2px_2px_#fbc761,inset_2px_-2px_#e5a01a]',
        'focus:shadow-[inset_-1px_1px_#cee7ff,inset_1px_2px_#98b8ea,inset_-2px_2px_#bcd4f6,inset_1px_-1px_#89ade4,inset_2px_-2px_#89ade4]',
        {
          '!bg-[linear-gradient(180deg,#cdcac3,#e3e3db_8%,#e5e5de_94%,#f2f2f1)]': active // Add "pressed" offset
        }
      )}>
        <Image
          src={imageSrc}
          alt='Ícone grade'
          width={30}
          height={30}
          style={{ filter: active ? 'brightness(0.9)' : 'none' }}
          className='size-5'
        />
      </button>
    </Link>
  )
}