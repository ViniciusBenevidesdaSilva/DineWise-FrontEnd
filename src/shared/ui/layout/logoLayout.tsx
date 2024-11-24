import { LogoDinewise } from '../components/logo-dinewise';

export function LogoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      <header className='flex justify-center items-center h-1/6 lg:h-full lg:w-1/2 bg-gradient-to-r lg:bg-gradient-to-b from-brand-primary-light to-brand-primary-darkest'>
        <div className='px-32 lg:px-0'>
          <LogoDinewise width={400} />
        </div>
      </header>
      <main className='h-5/6 lg:h-full lg:w-1/2 lg:max-h-full lg:overflow-y-scroll container mx-auto p-4 lg:px-12'>
        {children}
      </main>
    </div>
  );
}
