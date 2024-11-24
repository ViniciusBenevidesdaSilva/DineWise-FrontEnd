import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export const homeLinks = [
  {
    href: '/sobre',
    label: 'Sobre',
  },
  {
    href: '/cadastro',
    label: 'Cadastre-se',
  },
  {
    href: '/login',
    label: 'Login',
  },
];

export const footerIcons = [
  {
    label: 'Linkedin',
    icon: (
      <Linkedin
        size={22}
        strokeWidth={1.5}
        className='transition-transform duration-200 hover:scale-125'
      />
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <Instagram
        size={22}
        strokeWidth={1.5}
        className='transition-transform duration-200 hover:scale-125'
      />
    ),
  },
  {
    label: 'Youtube',
    icon: (
      <Youtube
        size={22}
        strokeWidth={1.5}
        className='transition-transform duration-200 hover:scale-125'
      />
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <Facebook
        size={22}
        strokeWidth={1.5}
        className='transition-transform duration-200 hover:scale-125'
      />
    ),
  },
];
