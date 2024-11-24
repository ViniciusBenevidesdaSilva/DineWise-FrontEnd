'use client';

import { useEffect } from 'react';

import { RetriveUnidadeMedida } from '@/feature/unidade-medida/endpoints/retrive-unidade-medida';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';

type TUnidadeMedidaStoreProps = {
  userToken?: string;
};

export function UnidadeMedidaStore({ userToken = undefined }: Readonly<TUnidadeMedidaStoreProps>) {
  const { setUnidadesMedida } = useUnidadeMedidaStore();

  useEffect(() => {
    const fetchUnidadesMedida = async () => {
      const { data, error } = await RetriveUnidadeMedida.exec(userToken);
      if (!error) {
        setUnidadesMedida(data);
      }
    };

    fetchUnidadesMedida();
  }, [setUnidadesMedida, userToken]);

  return <></>;
}
