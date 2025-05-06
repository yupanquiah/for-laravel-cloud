import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
  {
    title: 'Perfil',
    href: '/company/identity',
    icon: null,
  },
  {
    title: 'Logo',
    href: '/company/logo',
    icon: null,
  },
  {
    title: 'Ubicación',
    href: '/company/location',
    icon: null,
  },
];

interface CompanySettings extends PropsWithChildren {
  className?: string;
}

export default function CompanySettingsLayout({ children, className }: CompanySettings) {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentPath = window.location.pathname;

  return (
    <main className={`px-4 py-6 ${className}`}>
      <Heading title="Configuracíon" description="Administra el perfil y la configuración de tu cuenta de empresa" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                size="sm"
                variant="ghost"
                asChild
                className={cn('w-full justify-start', {
                  'bg-muted': currentPath === item.href,
                })}
              >
                <Link href={item.href} prefetch>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>
        <Separator className="my-6 md:hidden" />
        <section className="w-full space-y-12">{children}</section>
      </div>
    </main>
  );
}
