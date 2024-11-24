import { ButtonHTMLAttributes } from 'react';

type TButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  btnStyle?: 'default' | 'danger' | 'light' | 'secondary';
  children: React.ReactNode;
};

export function ButtonPrimary({
  children,
  className,
  type = 'button',
  btnStyle = 'default',
  ...restProps
}: Readonly<TButtonPrimaryProps>) {
  let currentStyle = '';

  switch (btnStyle) {
    case 'light': {
      currentStyle =
        'bg-functional-soft-lightest text-brand-primary-darkest ring-1 ring-brand-primary-darkest hover:bg-brand-primary-darkest hover:text-functional-soft-lightest';
      break;
    }
    case 'danger': {
      currentStyle =
        'bg-functional-soft-lightest text-feedback-danger-dark ring-1 ring-feedback-danger-dark hover:bg-feedback-danger-dark hover:text-functional-soft-lightest';
      break;
    }
    case 'secondary': {
      currentStyle =
        'bg-functional-soft-lightest text-functional-heavy-medium ring-1 ring-functional-heavy-medium hover:bg-functional-heavy-medium hover:text-functional-soft-lightest';
      break;
    }
    default: {
      currentStyle =
        'bg-brand-primary-dark text-functional-soft-light hover:bg-brand-primary-darkest hover:text-functional-soft-lightest';
      break;
    }
  }

  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-lg disabled:bg-functional-soft-darkest disabled:text-functional-heavy-dark transition-all duration-500 hover:scale-105 ${currentStyle} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}
