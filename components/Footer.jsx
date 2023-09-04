import { FooterDiv,NavDiv,SocialsDiv,Rights,IconDiv } from './styles/Footer.styled';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';

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
                <Image src={'assets/icons/instagram.svg'} alt={'@ruadebaixoloja'} width={28} height={28} priority/>
              </div>
            </Link>
            <Link target={'_blank'} href='https://wa.me/message/GMJP6IY5DXZOM1'>
              <div>
                <Image src={'assets/icons/whatsapp.svg'} alt={'+5561996492791'} width={28} height={28} priority />
              </div>
            </Link>
            <Link target={'_blank'} href='https://www.tiktok.com/@ruadebaixoloja'>
              <div>
                <Image src={'assets/icons/tiktok.svg'} alt={'@ruadebaixoloja'} width={28} height={28} priority/>
              </div>
            </Link>
            <Link target={'_blank'} href='https://www.youtube.com/channel/UCwWDhzN4M-vi-CVd8oaak_A'>
              <div>
                <Image src={'assets/icons/youtube.svg'} alt={'@ruadebaixoloja'} width={28} height={28} priority />
              </div>
            </Link>
            <Link target={'_blank'} href='mailto:contato@ruadebaixo.com.br'>
              <div>
                <Image src={'assets/icons/mail.svg'} alt={'contato@ruadebaixo.com.br'} width={28} height={28} priority/>
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