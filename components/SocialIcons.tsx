import { SocialIcon } from 'react-social-icons'

export default async function SocialIcons() {
  return (
    <div className='flex gap-1'>
      <SocialIcon target="_blank" bgColor='transparent' url="https://www.instagram.com/ruadebaixoloja/"/>
      <SocialIcon target="_blank" network='whatsapp' bgColor='transparent' url="https://wa.me/message/6OFIKLNWAM2GA1"/>
      <SocialIcon target="_blank" bgColor='transparent' url="https://www.tiktok.com/@ruadebaixoloja"/>
      <SocialIcon target="_blank" bgColor='transparent' url="mailto:contato@ruadebaixo.com.br" />
    </div>
  )
}
