import { Metadata } from 'next';

import Error404 from '@/shared/ui/components/error-404';

export const metadata: Metadata = {
  title: 'Erro 404',
  description: 'Erro 404 - Página não encontrada.',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <Error404 />;
}
