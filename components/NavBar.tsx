import React from 'react'
import TiltCard from './TiltCard';
import { ROUTES } from '@/lib/const';

export default function NavBar() {

  return (
    <nav className='flex flex-col w-full gap-4'>
      <h1 className='text-2xl'>EXPLORE</h1>
      <div className='flex gap-4'>
        {ROUTES.map((route, index) => (
          <TiltCard key={index} title={route.title} image={route.image} href={route.href} alt={route.alt} />
        ))}
      </div>
    </nav>
  )
}
