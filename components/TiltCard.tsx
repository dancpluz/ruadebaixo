import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { RouteT } from '@/types/other';
import ImageWithSkeleton from './ImageWithSkeleton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const ROTATION_RANGE = 50;
const HALF_ROTATION_RANGE = 50 / 2;

export default function TiltCard({ title, image, href, alt }: RouteT) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return [0, 0];
    const rect = ref.current.getBoundingClientRect();


    const width = rect.width;
    const height = rect.height;


    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;


    x.set(rX);
    y.set(rY);
  };


  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="group relative w-[300px] h-[450px]"
      >
        <ImageWithSkeleton
          className={cn("object-cover saturate-0 h-auto w-full brightness-50 duration-500 group-hover:brightness-100 z-10 group-hover:saturate-100", isActive && "brightness-100 saturate-100")}
          src={image}
          alt={alt}
          fill
        />
        <div
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-2 grid place-content-center shadow-lg"
        >
          <div 
            style={{
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }} className={cn('absolute shadow-lg inset-2 border-2 border-light scale-0 group-hover:scale-100 transition-transform duration-500', isActive && 'scale-100')}/>
          <p
            style={{
              transform: "translateZ(40px)",
            }}
            className="text-2xl text-light font-bold transition-transform duration-500 group-hover:scale-120"
          >
            {title}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

/* <div className='relative w-[200px] h-[300px] '>
  <Image
    alt='Rua de Baixo'
    className="object-cover h-auto w-full"
    src={image}
    fill
  />
</div> */