import { getUserInfo } from '@/app/actions/instagram'
import React from 'react'
import Image from 'next/image';
import { HTTPValidationError, User } from '@/types/instagram';

export default async function InstagramCard() {
  const result = await getUserInfo('dancpluz')
  let user;
  if (result.details) {
    user = result as HTTPValidationError
    return (
      <div className='window relative min-w-64'>
        <div className="title-bar max-h-0 min-h-7">
          <h1 className="title-bar-text flex items-center gap-1 text-sx">
            FCK IA - Erro
          </h1>
        </div>
        <div className="window-body mx-1 flex grow flex-col">
          <div className="window-body-content text-foreground">
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
      <pre className='px-32 whitespace-break-spaces break-all'>{JSON.stringify(user,null,2)}</pre>
      <div className='window relative min-w-64'>
        <div className="title-bar max-h-0 min-h-7">
          <h1 className="title-bar-text flex items-center gap-1 text-sx">
            FCK IA - {username}
          </h1>
        </div>
        <div className="window-body mx-1 flex grow flex-col">
          <div className="window-body-content text-foreground">
            <Image 
              src={profile_pic_url_hd}
              alt='Instagram Profile'
              width={150}
              height={150}
              className='object-cover rounded-full'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-bold'>{full_name}</h1>
              <p className='text-sm'>{biography}</p>
              <p className='text-sm'>Seguidores: {follower_count}</p>
              <p className='text-sm'>Seguindo: {following_count}</p>
              <p className='text-sm'>Publicações: {media_count}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
