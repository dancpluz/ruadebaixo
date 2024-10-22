import { fetchFromStrapi } from "@/lib/api";
import { Lookbook } from "@/types/api/lookbook";
import Image from 'next/image';

export default async function Home() {
  const data = await fetchFromStrapi<Lookbook[]>('lookbooks?populate[0]=capa&populate[1]=fotos');
  const fotos = data?.data?.[0]?.attributes?.fotos?.data || []
  console.log(fotos)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="">
      <h1 className='clash text-6xl'>Rua de Baixo</h1>
      rdgddrghdrdhASFASFASFASFASFSA
      {fotos.map(({id, attributes}, i) => i % 2 == 0 ? (
        <div key={id} className='bg-accent'>
          <Image src={API_URL + attributes.url} width={128} height={128} />
        </div> 
      ) : (
        <div key={id} className=''>
          <Image src={API_URL + attributes.url} width={128} height={128} />
        </div>
      ))}
    </div>
  );
}
