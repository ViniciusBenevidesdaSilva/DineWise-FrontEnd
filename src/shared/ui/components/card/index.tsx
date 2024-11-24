type TCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  divClassName?: string;
};

export function Card({
  title = undefined,
  children,
  className = '',
  divClassName = '',
}: Readonly<TCardProps>) {
  return (
    <div className={`flex flex-col gap-4 ${divClassName}`}>
      {title && (
        <h2 className='text-xl text-functional-heavy-medium font-semibold lg:w-1/2 capitalize'>
          {title}
        </h2>
      )}
      <div
        className={`h-full w-full p-8 bg-functional-soft-lightest shadow-lg rounded-3xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
