import { CarFront } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isMobile?: boolean;
}

export function Logo({ className, isMobile = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-primary font-bold ${className}`}>
      <CarFront className={` ${isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-accent`} />
      <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>AutoList</span>
    </Link>
  );
}
