'use client';

import { useEffect } from 'react';

import { RetriveTipoAQPC } from '@/feature/tipo-aqpc/endpoints/retrive-tipo-aqpc';
import { useTipoAQPCStore } from '@/shared/store/use-tipo-aqpc-store';

type TTipoAQPCStoreProps = {
  userToken?: string;
};

export function TipoAQPCStore({ userToken = undefined }: Readonly<TTipoAQPCStoreProps>) {
  const { setTiposAQPC } = useTipoAQPCStore();

  useEffect(() => {
    const fetchTiposAQPC = async () => {
      const { data, error } = await RetriveTipoAQPC.exec(userToken);
      if (!error) {
        setTiposAQPC(data);
      }
    };

    fetchTiposAQPC();
  }, [setTiposAQPC, userToken]);

  return <></>;
}
