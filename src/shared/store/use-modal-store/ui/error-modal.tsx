import { CircleX } from 'lucide-react';

export function ErrorModal() {
  return (
    <div className='w-full flex flex-col gap-8 items-center'>
      <CircleX size={100} strokeWidth={1} className='text-feedback-danger-dark' />
      <p>Ocorreu um erro durante a operação.</p>
    </div>
  );
}
