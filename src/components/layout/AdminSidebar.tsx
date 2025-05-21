
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, LayoutDashboard, Settings, PlusCircle, MessageSquare } from 'lucide-react'; // Added MessageSquare
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/admin/cars', label: 'Manage Cars', icon: <Car /> },
  { href: '/admin/cars/new', label: 'Add New Car', icon: <PlusCircle /> },
  { href: '/admin/messages', label: 'Messages', icon: <MessageSquare /> }, // New messages link
  // { href: '/admin/settings', label: 'Settings', icon: <Settings /> },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Logo />
        <SidebarTrigger className="md:hidden"/>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {adminNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))}
                tooltip={{children: link.label}}
              >
                <Link href={link.href} className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full" asChild>
            <Link href="/">View Public Site</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
