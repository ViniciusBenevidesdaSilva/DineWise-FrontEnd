'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { LogoDinewise } from '@/shared/ui/components/logo-dinewise';

import { footerIcons, homeLinks } from '../consts';

type TFooterHomeProps = {
  showAnimation: boolean;
};

export function FooterHome({ showAnimation }: Readonly<TFooterHomeProps>) {
  const [animationClass, setAnimationClass] = useState<string>('');
  const [footerInView, setFooterInView] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFooterInView(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = footerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const determineAnimationClass = useCallback(() => {
    if (showAnimation) {
      return footerInView ? 'animate-fade-up' : 'hidden';
    }
    return '';
  }, [showAnimation, footerInView]);

  useEffect(() => {
    setAnimationClass(determineAnimationClass());
  }, [determineAnimationClass]);

  return (
    <footer
      ref={footerRef}
      className='flex flex-col items-center gap-8 h-auto shadow-lg lg:h-[30vh] p-12 text-functional-soft-light bg-gradient-to-r from-functional-heavy-medium to-functional-heavy-dark'
    >
      <LogoDinewise className={animationClass} />
      <ul className={`flex gap-8 ${animationClass}`}>
        {homeLinks.map((link) => (
          <li
            key={`footer-${link.label}`}
            className='border-transparent border-b hover:border-functional-soft-light hover:border-b'
          >
            <Link href={link.href} title={`Link para página de ${link.label} do DineWise`}>
              {link.label}
            </Link>
          </li>
        ))}
        <li className='border-transparent border-b hover:border-functional-soft-light hover:border-b'>
          <Link
            title='Link para página de Política e Privacidade do DineWise'
            href='/politica-privacidade'
          >
            Política de Privacidade
          </Link>
        </li>
      </ul>

      <ul className={`flex gap-12 ${animationClass}`}>
        {footerIcons.map((icon) => (
          <li key={`icon-${icon.label}`}>{icon.icon}</li>
        ))}
      </ul>

      <span className={`text-sm text-functional-heavy-light text-center ${animationClass}`}>
        2024 © DineWise Desenvolvimento de Sistemas LTDA. CNPJ: 66.247.353/0001-07
        <br />
        Todos os direitos reservados.
      </span>
    </footer>
  );
}
