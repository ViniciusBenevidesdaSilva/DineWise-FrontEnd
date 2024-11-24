'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { LogOut } from 'lucide-react';

export function SideBarLogout({ className = '' }: Readonly<{ className?: string }>) {
  const router = useRouter();

  async function handleLogout() {
    router.push('/');
    await signOut({ redirect: false });
  }

  return (
    <button aria-label='Botão Logout' onClick={handleLogout} className={`${className}`}>
      <LogOut size={20} />
      <span className='text-xs lg:text-lg'>Sair</span>
    </button>
  );
}
