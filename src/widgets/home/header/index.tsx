import Link from 'next/link';

import { LogoDinewise } from '@/shared/ui/components/logo-dinewise';

import { homeLinks } from '../consts';

export function HeaderHome() {
  return (
    <header className='flex flex-col lg:flex-row items-center gap-4 lg:h-[10vh] justify-around h-auto shadow-lg p-6 bg-gradient-to-r from-brand-primary-light to-brand-primary-darkest'>
      <LogoDinewise />
      <ul className='flex gap-8 text-functional-soft-light'>
        {homeLinks.map((link) => (
          <li
            key={`header-${link.label}`}
            className='border-transparent border-b-2 hover:border-functional-soft-lightest hover:border-b-2'
          >
            <Link href={link.href} title={`Link para página de ${link.label} do DineWise`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
