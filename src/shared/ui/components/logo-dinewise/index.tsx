import Image from 'next/image';
import Link from 'next/link';

type TDinewiseLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  link?: string;
};

export function LogoDinewise({
  width = 200,
  height = 100,
  className = '',
  link = '/',
}: Readonly<TDinewiseLogoProps>) {
  return (
    <Link href={link} title='Link para Home do DineWise'>
      <Image
        src='/images/logo-name.png'
        title='Logo DineWise'
        alt='Logo DineWise'
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        priority
        className={className}
      />
    </Link>
  );
}
