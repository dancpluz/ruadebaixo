import { ICONS } from '@/lib/const'
import { generateRandomColor } from '@/lib/utils'
import Link from 'next/link'
import Clippy from './Clippy'
import GenerateButton from './GenerateButton'
import GeneratedImage from './GeneratedImage'
import Image from 'next/image'

export default function Generator() {
  return (
    <div className="window relative w-full">
      <Clippy />
      <div className="title-bar max-h-0 min-h-7">
        <h1 className="title-bar-text flex items-center gap-1 text-sx">
          <Image src='/gpt.png' alt='Ícone Gerador de arte' width={20} height={20} />Gerador de arte</h1>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body mx-1 flex grow flex-col">
        <div className="window-body-content font-normal flex items-center border-b border-border lg:*:text-sm *:text-sx *:text-black *:px-2 *:py-1 *:hover:bg-border/20 overflow-hidden">
          <p>Arquivo</p>
          <p>Editar</p>
          <p>Exibir</p>
          <p>Imagem</p>
          <p>Cores</p>
          <p>Ajuda</p>
        </div>
        <div className='flex'>
          <div className='flex lg:p-2 p-1.5 flex-col gap-2 border-r border-border'>
            <div className='grid grid-cols-2 grid-flow-row'>
              {ICONS.map((icon, i) => (
                <div className='relative lg:size-8 size-6 hover:outline-1 outline-border rounded-sm' key={i}>
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
            <div className='w-full h-full max-h-24 inset-bevel' />
          </div>
          <div className='bg-white relative lg:h-[50vh] h-[65vh] overflow-x-auto overflow-y-auto w-full'>
            <div className='size-[110%] min-w-fit min-h-fit justify-center items-center flex flex-col'>
              <div className='relative lg:h-[70%] lg:w-[50%] w-[95%] lg:-translate-x-[10%] flex justify-center items-center'>
                <GeneratedImage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex relative grow mx-1 border-t border-border lg:p-2 p-1.5 gap-1 items-center overflow-auto'>
        <div className='relative bg-white/40 aspect-square lg:h-10 h-8.5 inset-bevel-bg'>
          <div className='absolute lg:size-5 size-4 top-1.5 left-1.5 z-10 border-border border-2 border-t-white border-l-white'>
            <div className='bg-black size-full hover:opacity-80' />
          </div>
          <div className='absolute lg:size-5 size-4 bottom-1.5 right-1.5 border-border border-2 border-t-white border-l-white'>
            <div className='bg-white size-full hover:opacity-80' />
          </div>
        </div>
        <div className='grid grid-rows-2 max-w-[40%] overflow-hidden grid-flow-col gap-0.5'>
          {Array(28).fill(0).map((_, i) => (
            <div key={i} style={{ background: generateRandomColor() }} className='hover:opacity-80 lg:size-5 size-4 inset-bevel-bg' />
          ))}
        </div>
        <GenerateButton />
      </div>
      <div className='status-bar'>
        <p className="status-bar-field">Para ajuda, procure em <Link className='hover:underline' href='https://www.instagram.com/ruadebaixoloja/' target='_blank'>@ruadebaixoloja</Link></p>
        <p className="status-bar-field">Feito por Rua de Baixo ®</p>
      </div>
    </div>
  )
}
