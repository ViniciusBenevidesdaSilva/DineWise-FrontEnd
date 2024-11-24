import { AnchorHTMLAttributes } from 'react';

import Link from 'next/link';

type TLinkPrimaryProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  isDanger?: boolean;
  children: React.ReactNode;
};

export function LinkPrimary({
  title,
  children,
  className,
  isDanger = false,
  href,
  ...restProps
}: Readonly<TLinkPrimaryProps>) {
  const dangerClassName =
    'bg-functional-soft-lightest text-feedback-danger-dark ring-1 ring-feedback-danger-dark hover:bg-feedback-danger-dark hover:text-functional-soft-lightest transition-colors duration-300';
  const defaultClassName =
    'transition-all duration-500 hover:scale-105 bg-brand-primary-dark hover:bg-brand-primary-darkest text-functional-soft-lightest';

  return (
    <Link
      title={title}
      href={href ?? ''}
      className={`inline-block py-2 px-4 rounded-lg disabled:bg-functional-soft-darkest disabled:text-functional-heavy-dark ${isDanger ? dangerClassName : defaultClassName} ${className}`}
      {...restProps}
    >
      {children}
    </Link>
  );
}
