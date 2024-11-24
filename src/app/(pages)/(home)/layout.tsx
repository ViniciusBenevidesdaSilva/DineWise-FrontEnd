import { FooterHome } from '@/widgets/home/footer';
import { HeaderHome } from '@/widgets/home/header';

type THomeLayoutProps = {
  children: React.ReactNode;
  showAnimation?: boolean;
};

export default async function HomeLayout({
  children,
  showAnimation = true,
}: Readonly<THomeLayoutProps>) {
  return (
    <>
      <HeaderHome />
      <main className='container min-h-[60vh] mx-auto py-12 px-8'>{children}</main>
      <FooterHome showAnimation={showAnimation} />
    </>
  );
}
