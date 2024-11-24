import { ButtonHTMLAttributes } from 'react';

import { Pencil, Plus } from 'lucide-react';

import { ButtonPrimary } from '@/widgets/buttons/button-primary';

type TButtonCreateProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  btnStyle?: 'default' | 'danger' | 'light' | 'secondary';
  symbol?: 'add' | 'edit';
};

export function ButtonCreate({
  className,
  text = 'Adicionar novo',
  btnStyle = 'default',
  symbol = 'add',
  ...restProps
}: Readonly<TButtonCreateProps>) {
  return (
    <ButtonPrimary
      btnStyle={btnStyle}
      aria-label='Butão adicionar novo'
      className={`flex items-center gap-2 ${className}`}
      {...restProps}
    >
      {symbol === 'add' ? <Plus size={16} /> : <Pencil size={16} />}
      {text && <span className='hidden lg:block'>{text}</span>}
    </ButtonPrimary>
  );
}
