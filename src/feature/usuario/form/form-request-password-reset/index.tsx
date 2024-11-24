'use client';

import { useEffect, useState } from 'react';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormRequestPasswordReset } from './hook/use-form-request-password-reset';

type TFormRequestPasswordResetProps = {
  usuario?: Usuario;
};

export function FormRequestPasswordReset({
  usuario = undefined,
}: Readonly<TFormRequestPasswordResetProps>) {
  const { setModalIsOpen } = useModalStore();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { handleSubmit, getFieldProps, isValid, isSubmitting } = useFormRequestPasswordReset({
    usuario,
    setFormStatus,
  });

  useEffect(() => {
    if (formStatus?.hasError) {
      setModalIsOpen(ModalType.Error);
    } else if (formStatus?.hasError === false) {
      setEmailSent(true);
      setTimeLeft(30);
    }
  }, [formStatus, setModalIsOpen]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [emailSent, timeLeft]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col lg:w-1/2'>
      <InputText
        {...getFieldProps('email')}
        label='Email'
        placeholder='Digite seu email'
        type='email'
      />
      <ButtonPrimary
        type='submit'
        disabled={!isValid || isSubmitting || timeLeft > 0}
        className='self-center mt-2'
      >
        Solicitar alteração de senha
      </ButtonPrimary>

      {emailSent && (
        <div className='self-center mt-10 text-center'>
          <p className='text-functional-heavy-dark pb-2 lg:pb-4'>
            Enviamos um link para o e-mail cadastrado!
          </p>
          {timeLeft > 0 ? (
            <p className='text-functional-heavy-medium'>
              Caso não tenha recebido, aguarde{' '}
              <span className='text-brand-primary-dark'>{timeLeft} segundos</span> para solicitar o
              reenvio. Verifique sua caixa de entrada e pasta de spam.
            </p>
          ) : (
            <p className='text-functional-heavy-medium'>
              Ainda não recebeu? Clique no botão acima e solicite a alteração de senha novamente!
            </p>
          )}
        </div>
      )}
    </form>
  );
}
