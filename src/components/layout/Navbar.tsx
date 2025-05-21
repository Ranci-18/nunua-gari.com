import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

const navLinks = [
  { href: '/', label: 'Listings', icon: <Car className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact Us', icon: <Mail className="h-5 w-5" /> },
  { href: '/admin', label: 'Admin Panel', icon: <ShieldCheck className="h-5 w-5" /> },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href} className="flex items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-4">
                <Logo isMobile={true} />
                <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                  <Button key={link.href} variant="ghost" asChild className="justify-start text-lg py-3">
                    <Link href={link.href} className="flex items-center gap-3">
                      {link.icon}
                      {link.label}
                    </Link>
                  </Button>
                ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
