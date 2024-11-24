import { LogoDinewise } from '@/shared/ui/components/logo-dinewise';

export function SideBarLogo() {
  return (
    <LogoDinewise
      link='/cardapio'
      height={50}
      width={200}
      className='flex justify-center py-6 lg:py-8'
    />
  );
}
