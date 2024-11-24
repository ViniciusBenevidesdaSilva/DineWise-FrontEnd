import {
  BookOpenText,
  ChartArea,
  CircleUserRound,
  Milk,
  Settings,
  ShoppingCart,
  Utensils,
} from 'lucide-react';

export const links = [
  { href: '/dashboard', label: 'Dashboard', adminRequired: true, icon: <ChartArea size={20} /> },
  { href: '/insumo', label: 'Insumos', adminRequired: false, icon: <Milk size={20} /> },
  { href: '/preparo', label: 'Preparos', adminRequired: false, icon: <Utensils size={20} /> },
  { href: '/cardapio', label: 'Cardápios', adminRequired: false, icon: <BookOpenText size={20} /> },
  { href: '/compra', label: 'Compras', adminRequired: false, icon: <ShoppingCart size={20} /> },
  { href: '/usuario', label: 'Usuários', adminRequired: true, icon: <CircleUserRound size={20} /> },
  {
    href: '/minha-conta',
    label: 'Minha Conta',
    adminRequired: false,
    icon: <Settings size={20} />,
  },
];
