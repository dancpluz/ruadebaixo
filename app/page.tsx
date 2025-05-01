import { UserInfoResponse, UserMediasResponse } from "@/types/instagram"
import Link from "next/link"
import { Suspense } from "react"
import Image from 'next/image';
import { ICONS } from "@/lib/const";
import { checkStrapiAvailability } from "@/lib/strapi";
import { getArtists } from "./actions/db/read";
import { generateRandomColor } from "@/lib/utils";

export default async function Landing() {
  const availabilityResult = await checkStrapiAvailability();
  if (availabilityResult.isErr()) return <pre>Erro \n{JSON.stringify(availabilityResult,null,2)}</pre>

  const artists = await getArtists();
  //console.log(artists)

  return (
    <>
      <pre>{JSON.stringify(artists,null,2)}</pre>
      <div className='h-screen relative flex flex-col items-center justify-center px-64'>
        <Image
          src='/wallpaper.webp'
          alt='Wallpaper'
          className='absolute w-full h-full object-cover -z-1'
          fill
        />
        <div className="window w-full">
          <div className="title-bar max-h-0 min-h-7">
            <h1 className="title-bar-text flex items-center gap-1 text-sx">
              <Image src='/gpt.png' alt='Ícone Gerador de arte' width={20} height={20} />Gerador de arte</h1>
            <div className="title-bar-controls">
              <button aria-label="Minimize"/>
              <button aria-label="Maximize"/>
              <button aria-label="Close"/>
            </div>
          </div>
          <div className="window-body mx-1 flex grow flex-col">
            <div className="window-body-content font-normal flex items-center border-b border-border *:text-sm *:text-black *:px-2 *:py-1 *:hover:bg-border/20 overflow-hidden">
              <p>Arquivo</p>
              <p>Editar</p>
              <p>Exibir</p>
              <p>Imagem</p>
              <p>Cores</p>
              <p>Ajuda</p>
            </div>
            <div className='flex'>
              <div className='flex p-2 flex-col gap-2 border-r border-border'>
                <div className='grid grid-cols-2 grid-flow-row'>
                  {ICONS.map((icon, i) => (
                    <div className='relative size-8 hover:outline-1 outline-border rounded-sm' key={i}>
                      <Image
                        key={i}
                        src={icon.src}
                        alt={icon.alt}
                        fill
                        className='size-full p-1'
                      />
                    </div>
                  ))}
                </div>
                <div className='w-full h-full max-h-24 inset-bevel'/>
             </div>
              <div className='relative h-[50vh] overflow-x-auto overflow-y-auto w-full'>
                <div className='bg-white h-[110%] w-[110%] min-w-fit min-h-fit justify-center items-center flex flex-col'>
                  <div className='relative h-[70%] w-[50%] -translate-x-[10%] flex justify-center items-center'>
                    <Image
                      alt='exemplo'
                      src={'/fck-ia.jpg'}
                      className='border-2 border-border max-h-full size-auto object-contain'
                      width={1080}
                      height={1350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex relative grow mx-1 border-t border-border p-2 gap-1 items-center overflow-auto'>
            <div className='relative bg-white/40 aspect-square h-10 inset-bevel-bg'>
              <div className='absolute size-5 top-1.5 left-1.5 z-10 border-border border-2 border-t-white border-l-white'>
                <div className='bg-black size-full hover:opacity-80'/>
              </div>
              <div className='absolute size-5 bottom-1.5 right-1.5 border-border border-2 border-t-white border-l-white'>
                <div className='bg-white size-full hover:opacity-80' />
              </div>
            </div>
            <div className='grid grid-rows-2 grid-flow-col gap-0.5'>
              {Array(28).fill(0).map((_, i) => (
                <div key={i} style={{ background: generateRandomColor() }} className='hover:opacity-80 size-5 inset-bevel-bg' />
              ))}
            </div>
            <button className='absolute-center h-[70%] text-sx'>GERAR ARTE</button>
          </div>
          <div className='status-bar'>
            <p className="status-bar-field">Para ajuda, procure em <Link className='hover:underline' href='https://www.instagram.com/ruadebaixoloja/' target='_blank'>@ruadebaixoloja</Link></p>
            <p className="status-bar-field">Feito por Rua de Baixo ®</p>
          </div>
        </div>
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <pre>
          {JSON.stringify(posts, null, 2)}
        </pre>
      </Suspense> */}
    </>
  )
}
