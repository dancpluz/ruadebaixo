import { FooterDiv,NavDiv,SocialsDiv,Rights,IconDiv } from './styles/Footer.styled';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import instagram from '@/public/assets/icons/instagram.svg';
import whatsapp from '@/public/assets/icons/whatsapp.svg';
import tiktok from '@/public/assets/icons/tiktok.svg';
import youtube from '@/public/assets/icons/youtube.svg';
import mail from '@/public/assets/icons/mail.svg';


export default function Footer() {
  return (
    <>
      <FooterDiv>
        <NavDiv>
          <h4>Explore</h4>
          <Navbar />
        </NavDiv>
        <SocialsDiv>
          <h4>Contato</h4>
          <IconDiv>
            <Link target={'_blank'} href='https://www.instagram.com/invites/contact/?i=1qfflkcpzs25j&utm_content=qysp11r'>
              <div>
                <Image src={instagram} alt={'@ruadebaixoloja'} width={28} height={28} />
              </div>
            </Link>
            <Link target={'_blank'} href='https://wa.me/message/GMJP6IY5DXZOM1'>
              <div>
                <Image src={whatsapp} alt={'+5561996492791'} width={28} height={28} />
              </div>
            </Link>
            <Link target={'_blank'} href='https://www.tiktok.com/@ruadebaixoloja'>
              <div>
                <Image src={tiktok} alt={'@ruadebaixoloja'} width={28} height={28} />
              </div>
            </Link>
            <Link target={'_blank'} href='https://www.youtube.com/channel/UCwWDhzN4M-vi-CVd8oaak_A'>
              <div>
                <Image src={youtube} alt={'@ruadebaixoloja'} width={28} height={28} />
              </div>
            </Link>
            <Link target={'_blank'} href='mailto:contato@ruadebaixo.com.br'>
              <div>
                <Image src={mail} alt={'contato@ruadebaixo.com.br'} width={28} height={28} />
              </div>
            </Link>
          </IconDiv>
        </SocialsDiv>
      </FooterDiv>
      <Rights>
        <p>Todos os direitos reservados RUA DE BAIXO © 2023</p>
      </Rights>
    </>
  );
}