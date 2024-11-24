type TTooltipProps = {
  children: React.ReactNode;
};

export function Tooltip({ children }: Readonly<TTooltipProps>) {
  return (
    <div className='absolute top-[-30px] left-0 bg-functional-heavy-medium text-functional-soft-lightest text-sm p-2 rounded'>
      {children}
    </div>
  );
}
