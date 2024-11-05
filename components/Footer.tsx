import Nav from '@/components/Nav';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react'
import WhatsappIcon from '@/public/icons/whatsapp.svg';
import InstagramIcon from '@/public/icons/instagram.svg';

export default function Footer() {
  const socials: { label: string, href: string, icon?: React.ReactElement }[] = [
    { label: 'Instagram', href: 'https://www.instagram.com/ruadebaixoloja/', icon: <InstagramIcon className='text-foreground size-5' /> },
    { label: 'WhatsApp', href: 'https://wa.me/message/6OFIKLNWAM2GA1', icon: <WhatsappIcon className='text-foreground size-5' /> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@ruadebaixoloja' },
    { label: 'Email', href: 'mailto:contato@ruadebaixo.com.br' }
  ];

  return (
    <footer className='flex flex-col divide-y border-t z-10 bg-background'>
      <div className='flex flex-col py-2 px-5'>
        <h2 className='uppercase clash text-lg font-semibold'>FALE CONOSCO</h2>
        <ul className='grid grid-cols-2 md:grid-cols-4'>
          {socials.map(({ label, href, icon }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
              <li className='flex uppercase items-center gap-2'>
                {label}
                {icon ?
                  icon
                  :
                  <ArrowUpRight className='text-foreground size-4' />
                }
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* <Nav /> */}
      <span className='text-xs py-2 px-5 text-center w-full wide-letter tracking-wider uppercase'>
        Todos os direitos reservados ruadebaixo ®
      </span>
    </footer>
  );
}
