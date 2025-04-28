import LoadingScreen from "@/components/LoadingScreen"
import { UserInfoResponse, UserMediasResponse } from "@/types/instagram"
import Link from "next/link"
import { Suspense } from "react"

export default async function Landing() {
  // const login = await fetch(`${process.env.INSTAGRAM_API_URL!}/auth/login_by_sessionid`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     sessionid: process.env.SESSION_ID,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  // }).then((res) => res.json())

  const user: UserInfoResponse = await fetch(`${process.env.INSTAGRAM_API_URL!}/user/info_by_username`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      username: 'dancpluz',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json())

  const posts: UserMediasResponse = await fetch(`${process.env.INSTAGRAM_API_URL!}/media/user_medias`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      user_id: user.pk,
      amount: 6,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json())

  return (
    <>
      <LoadingScreen />
      <div className='h-screen flex flex-col items-center justify-center p-16'>
        <div className="window h-full w-full">
          <div className="title-bar max-h-0 min-h-7">
            <h1 className="title-bar-text text-sx">Gerador de arte</h1>
            <div className="title-bar-controls">
              <button aria-label="Minimize"/>
              <button aria-label="Maximize"/>
              <button aria-label="Close"/>
            </div>
          </div>
          <div className="window-body flex grow flex-col">
            <div className="window-body-content flex items-center border-b border-border *:text-sm *:text-black *:px-2 *:py-1 *:hover:bg-border/20">
              <p>Arquivo</p>
              <p>Editar</p>
              <p>Exibir</p>
              <p>Imagem</p>
              <p>Cores</p>
              <p>Ajuda</p>
            </div>
            <div className='flex'>
              <div className='p-2 flex flex-col gap-2 border-r border-border'>
                <div className='grid grid-cols-2 grid-flow-row gap-2'>
                  <div className='size-6 border' />
                  <div className='size-6 border' />
                  <div className='size-6 border' />
                  <div className='size-6 border' />
                </div>
                <div className='w-full h-24 inset-shadow-[1px_1px_0px_grey] relative after:absolute after:inset-0 after:inset-shadow-[-1px_-1px_0px_white]'>
  
                </div>
             </div>
              <div className='bg-white mr-2 flex grow'>
                asfas
              </div>
            </div>
          </div>
          <div className='flex grow border-t border-border p-2 gap-2'>
            <div className='aspect-square h-full border bg-white '>
              
            </div>
            <div className='grid grid-rows-2 grid-flow-col gap-2'>
              <div className='size-6 border' />
              <div className='size-6 border' />
              <div className='size-6 border' />
              <div className='size-6 border' />
              <div className='size-6 border' />
              <div className='size-6 border' />
            </div>
          </div>
          <div className='status-bar'>
            <p className="status-bar-field">Para ajuda, procure em <Link href='https://www.instagram.com/ruadebaixoloja/' target='_blank'>@ruadebaixoloja</Link></p>
            <p className="status-bar-field">17/05/2025</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <pre>
          {JSON.stringify(posts, null, 2)}
        </pre>
      </Suspense>
    </>
  )
}
