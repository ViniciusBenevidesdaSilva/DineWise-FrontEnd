'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TSideBarLinkProps = {
  link: {
    href?: string;
    label: string;
    icon: React.ReactNode;
  };
  className?: string;
};

export function SideBarLink({ link, className = '' }: Readonly<TSideBarLinkProps>) {
  const pathname = usePathname();

  return (
    <Link
      href={link.href ?? '/'}
      title={`Link para página de ${link.label} do DineWise`}
      passHref
      className={`${className} ${pathname === link.href && 'bg-brand-primary-medium'}`}
    >
      {link.icon}
      <span className='text-xs lg:text-lg'>{link.label}</span>
    </Link>
  );
}
