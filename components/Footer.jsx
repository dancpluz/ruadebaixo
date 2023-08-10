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
            <Link href='https://www.instagram.com/invites/contact/?i=1qfflkcpzs25j&utm_content=qysp11r'>
              <Image src={'assets/icons/instagram.svg'} alt={'@ruadebaixoloja'} width={28} height={28}/>
            </Link>
            <Link href='https://wa.me/message/GMJP6IY5DXZOM1'>
              <Image src={'assets/icons/whatsapp.svg'} alt={'+5561996492791'} width={28} height={28} />
            </Link>
            <Link href='https://www.tiktok.com/@ruadebaixoloja'>
              <Image src={'assets/icons/tiktok.svg'} alt={'@ruadebaixoloja'} width={28} height={28} />
            </Link>
            <Link href='mailto:contato@ruadebaixo.com.br'>
              <Image src={'assets/icons/mail.svg'} alt={'contato@ruadebaixo.com.br'} width={28} height={28} />
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