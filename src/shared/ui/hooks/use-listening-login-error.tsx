'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';

export function UseListeningLoginError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setModalIsOpen } = useModalStore();

  const error = searchParams?.get('error');

  useEffect(() => {
    if (error) {
      const sanitizedUrl = window.location.pathname;
      router.replace(sanitizedUrl);
      setModalIsOpen(ModalType.Error);
    }
  }, [error, router, setModalIsOpen]);

  return null;
}
