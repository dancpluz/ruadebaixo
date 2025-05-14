'use client'

import { getUserInfo, getUserPosts } from '@/app/actions/instagram'
import React from 'react'
import Image from 'next/image';
import { Media, User } from '@/types/instagram';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Tooltip from './Tooltip';
import { ArtistEntity } from '@/types/strapi';
import { useQuery } from '@tanstack/react-query';
import AnimatedImage from './AnimatedImage';

export default function InstagramCard({ insta }: { insta: string }) {
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError
  } = useQuery({
    queryKey: ['instagram-user', insta],
    queryFn: () => getUserInfo(insta),
    //staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const {
    data: medias,
    isLoading: isLoadingMedia,
    error: mediaError
  } = useQuery({
    queryKey: ['instagram-media', user?.pk],
    queryFn: () => getUserPosts(user?.pk!, 9),
    enabled: !!user?.pk, // Only fetch when user data is available
    //staleTime: 1000 * 60 * 5
  });

  if (userError) {
    return (
      <div className='window relative w-[400px]'>
        <div className="title-bar max-h-0 min-h-7">
          <h1 className="title-bar-text text-sx">Error</h1>
        </div>
        <div className="window-body p-4 text-red-600">
          Failed to load user data: {(userError as Error).message}
        </div>
      </div>
    )
  }

  const { 
    username, 
    full_name, 
    profile_pic_url_hd, 
    biography, 
    media_count, 
    follower_count, 
    following_count 
  } = user || {};

  return (
    <div className='window w-[400px] max-w-[400px] min-w-[400px] transform transition-transform duration-300 hover:scale-[1.02]'>
      <div className="title-bar max-h-0 min-h-7">
        {isLoadingUser ? 
          <div className='flex items-center gap-1'>
            <Image
              src='/insta/insta.svg'
              alt='Instagram Logo'
              width={20}
              height={20}
            />
            <h1 className={"title-bar-text text-sx loading-dots"}>instagram.exe - carregando</h1>
          </div>
        :
          <Link href={`https://instagram.com/${username}`} target='_blank' className='flex items-center gap-1'>
            <Image
              src='/insta/insta.svg'
              alt='Instagram Logo'
              width={20}
              height={20}
            />
            <h1 className={cn("title-bar-text text-sx", isLoadingUser ? 'loading-dots' : '')}>instagram.exe - {`@${username}`}</h1>
          </Link>
        }
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
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
        {isLoadingUser ?
          <div className='w-full'>
            <h1 className='flex grow justify-center items-center py-4 mx-1 text-[16px] font-bold decoration-none border-b border-border text-foreground loading-dots'>carregando artista</h1>
          </div>
        :
          <Link href={`https://instagram.com/${username}`} target='_blank' className='w-full'>
            <h1 className='flex grow justify-center items-center py-4 mx-1 text-[16px] font-bold decoration-none border-b border-border text-foreground'>{username}</h1>
          </Link>}
        <div className="text-foreground p-2 flex flex-col gap-2">
          <div className='flex gap-5 items-center'>
            <Image 
              src={isLoadingUser ? '/hourglass.webp' : profile_pic_url_hd}
              alt='Instagram Profile'
              width={92}
              height={92}
              className={cn('object-contain border border-border rounded-full', isLoadingUser ? 'p-6' : '')}
            />
            <div className='flex flex-col gap-2 grow'>
              <div className='flex flex-row items-center gap-4 w-full'>
                <SocialDiv text={'publicações'} number={media_count} loading={isLoadingUser} />
                <SocialDiv text={'seguidores'} number={follower_count} loading={isLoadingUser} />
                <SocialDiv text={'seguindo'} number={following_count} loading={isLoadingUser} />
              </div>
              <div className='flex gap-0.5 w-full'>
                {isLoadingUser ? 
                  <div className='w-full'>
                    <button className='w-full h-8 text-[.9rem] relative text-foreground gap-2'>
                      <Image
                      src='/insta/add.svg'
                      alt='Ícone Usuário'
                      width={30}
                      height={30}
                      className='absolute top-1/2 -translate-y-1/2 left-2 size-4'
                    />seguir</button>
                  </div>
                :
                  <Link href={`https://instagram.com/${username}`} target='_blank' className='w-full'>
                    <button className='w-full h-8 text-[.9rem] relative text-foreground gap-2'>
                      <Image
                        src='/insta/add.svg'
                        alt='Ícone Usuário'
                        width={30}
                        height={30}
                        className='absolute top-1/2 -translate-y-1/2 left-2 size-4'
                      />seguir</button>
                  </Link>
                }
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
            <h1 className={cn('text-sm font-bold', isLoadingUser ? 'loading-dots' : '')}>{isLoadingUser ? 'nome' : full_name}</h1>
            <p className={cn('text-xs whitespace-pre-line', isLoadingUser ? 'loading-dots' : '')}>{isLoadingUser ? 'bio' : biography}</p>
          </div>
          <div className='flex grow gap-0.5'>
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}`} imageSrc='/insta/cam.webp' active />
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}/reels`} imageSrc='/insta/videocam.webp' />
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}/tagged`} imageSrc='/insta/globe.webp' />
          </div>
          <div className='relative grid grid-cols-3 gap-0.5 min-h-[250px]'>
            {isLoadingMedia || isLoadingUser ? 
            <>
              <div className='window absolute-center w-[80%]'>
                <div className="title-bar max-h-0 min-h-7">
                  <h1 className="title-bar-text text-sx loading-dots">{isLoadingUser ? 'artista carregando' : 'arte carregando'}</h1>
                  <div className="title-bar-controls">
                      <button aria-label="Close" />
                  </div>
                </div>
                <div className="window-body p-4 mx-1 flex grow flex-col font-pixelated text-foreground">
                  <p className='text-xl font-bold loading-dots'>{isLoadingUser ? 'artistas não são algoritmos' : 'arte não é imediata'}</p>
                </div>
              </div>
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="aspect-square bg-border flex items-center justify-center">
                  <Image
                    src="/hourglass.webp"
                    alt="Loading"
                    width={48}
                    height={48}
                  />
                </div>
              ))}
            </> : (
              medias?.length === 0 || !medias ? 
                  <div className='w-full text-sm font-bold decoration-none py-4 text-foreground col-span-3'>nenhuma publicação</div>
              :
                medias.map(media => <InstagramMedia key={media.pk} media={media} />)
            )}
          </div>
          <div className='flex grow gap-0.5'>
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}`} imageSrc='/insta/magnify.webp' />
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}`} imageSrc='/insta/floppy.webp' />
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}`} imageSrc='/insta/star.webp' />
            <SocialTabsButtons href={isLoadingUser ? undefined : `https://instagram.com/${username}`} imageSrc='/insta/earth.webp' />
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialDiv({ number, text, loading }: { number: number, text: string, loading: boolean }) {
  return (
    <div className='flex items-center flex-col'>
      <p className={cn('text-[.9rem] font-bold', loading ? 'loading-dots' : '')}>{loading ? '' : number}</p>
      <span className='text-[.8rem]'>{text}</span>
    </div>
  )
}

function SocialTabsButtons({ href, imageSrc, active }: { href?: string, imageSrc: string, active?: boolean }) {
  const TabButton = () => (
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
        alt={`Ícone grade - ${imageSrc}`}
        width={30}
        height={30}
        style={{ filter: active ? 'brightness(0.9)' : 'none' }}
        className='size-5'
      />
    </button>
  )

  return href ? (
    <Link href={href} target='_blank' className='w-full'>
      <TabButton />
    </Link>
  ) :
  (
    <div className='w-full'>
      <TabButton />
    </div>
  )
}

function InstagramMedia({ media }: { media: Media }) {
  const firstResource = media.resources ? media.resources[0] : null;
  if (!firstResource) return null;

  return (
    <Tooltip
      key={media.pk}
      trigger={
        <div className='relative w-full aspect-square bg-border hover:opacity-80'>
          <AnimatedImage
            src={firstResource.thumbnail_url}
            alt={media.caption_text}
            className='size-full object-cover'
            fill
          />
        </div>
      }
    >
      <div className="bg-background text-sm font-pixelated text-foreground py-1 px-2 rounded-sm border-border border max-w-[250px] whitespace-pre-line">
        {media.caption_text}
      </div>
    </Tooltip>
  )
}