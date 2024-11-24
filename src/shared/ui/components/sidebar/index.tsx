import { SideBarLink } from '@/widgets/sidebar/sidebar-link';
import { SideBarLogo } from '@/widgets/sidebar/sidebar-logo';
import { SideBarLogout } from '@/widgets/sidebar/sidebar-logout';

import { links } from './consts/links';

type TSideBaseProps = {
  isAdmin?: boolean;
};

export function SideBar({ isAdmin = false }: Readonly<TSideBaseProps>) {
  const sideBaseItemsClass =
    'flex flex-col lg:flex-row items-center gap-1 lg:gap-3 min-w-20 lg:min-w-auto text-center py-2 lg:py-4 px-4 lg:px-12 w-full hover:bg-brand-primary-darkest transition';

  return (
    <nav className='flex flex-col items-center bg-brand-primary-dark text-functional-soft-lightest font-secondary pt-4 pb-2 lg:py-8 min-h-full lg:min-h-screen'>
      <SideBarLogo />
      <ul className='flex flex-row justify-start md:justify-center lg:flex-col w-full overflow-x-scroll lg:overflow-visible'>
        {links.map(
          (link) =>
            (!link.adminRequired || isAdmin) && (
              <li key={link.label}>
                <SideBarLink link={link} className={sideBaseItemsClass} />
              </li>
            )
        )}
        <li>
          <SideBarLogout className={sideBaseItemsClass} />
        </li>
      </ul>
    </nav>
  );
}
