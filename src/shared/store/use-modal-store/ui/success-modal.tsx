import { CircleCheck } from 'lucide-react';

export function SuccessModal() {
  return (
    <div className='w-full flex flex-col gap-8 items-center'>
      <CircleCheck
        size={100}
        strokeWidth={1}
        className='text-brand-primary-dark animate-jump animate-once animate-duration-500 animate-ease-linear'
      />
      <p>Operação realizada com sucesso.</p>
    </div>
  );
}
