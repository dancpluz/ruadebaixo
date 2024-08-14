'use client'
import { StyledNav,NavLink } from './styles/Navbar.styled';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Popover from '@mui/material/Popover';
import Image from 'next/image';
import maintenance from '@/public/assets/icons/triangle-alert.svg';

export default function Navbar() {
  const currentPage = usePathname().split('/')[1];
  const [popoverElement,setPopoverElement] = useState(null);
  
  return (
      <StyledNav>
        <NavLink selected={currentPage === 'produtos'} href={'/produtos'}>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
              padding: '8px'
            }}
            open={Boolean(popoverElement)}
            anchorEl={popoverElement}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={() => setPopoverElement(null)}
            disableRestoreFocus
          >
            Em manutenção
          </Popover>
          <Image alt='Aviso' onMouseEnter={(e) => setPopoverElement(e.currentTarget)} onMouseLeave={() => setPopoverElement(null)} src={maintenance} height={16} width={16}/>
          <p>Produtos</p>
        </NavLink>
        <NavLink selected={currentPage === 'lookbook'} href={'/lookbook'}>
          <p>LookBook</p>
        </NavLink>
        <NavLink selected={currentPage === 'adesivo'} href={'/adesivo'}>
          <p>Adesivo</p>
        </NavLink>
        <NavLink selected={currentPage === 'links'} href={'/links'}>
          <p>Links</p>
        </NavLink>
      </StyledNav>
  )
}
  