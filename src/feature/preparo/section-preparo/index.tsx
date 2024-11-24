'use client';

import { useEffect, useState } from 'react';

import { Insumo } from '@/entities/insumo';
import { Preparo } from '@/entities/preparo';
import { useTipoAQPCStore } from '@/shared/store/use-tipo-aqpc-store';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';
import { SearchInput } from '@/widgets/inputs/search-input';

import { TablePreparo } from '../table-preparo';

type TSectionPreparoProps = {
  insumos: Insumo[];
  preparos: Preparo[];
};

export function SectionPreparo({ insumos, preparos }: Readonly<TSectionPreparoProps>) {
  const { unidadesMedida } = useUnidadeMedidaStore();
  const { tiposAQPC } = useTipoAQPCStore();

  const [preparosWithDependencies, setPreparosWithDependencies] = useState<Preparo[]>([]);
  const [filteredPreparos, setFilteredPreparos] = useState<Preparo[]>(preparos);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    const mapPreparoWithDependencies = (preparo: Preparo): Preparo => {
      const preparoInsumos = getPreparoInsumos(preparo);
      const preparoUnidadeMedida = getPreparoUnidadeMedida(preparo);
      const preparoTiposAQPC = getPreparoTiposAQPC(preparo);

      return {
        ...preparo,
        insumos: preparoInsumos,
        porcaoIndividualUnidadeMedidaNome: preparoUnidadeMedida?.nomeAbreviado ?? '',
        tiposAQPC: preparoTiposAQPC,
      };
    };

    const getPreparoInsumos = (preparo: Preparo) => {
      return insumos.filter((insumo) => hasInsumo(preparo, insumo));
    };

    const hasInsumo = (preparo: Preparo, insumo: Insumo) => {
      return preparo.insumosIds.some((insumoPreparo) => insumoPreparo.insumoId === insumo.id);
    };

    const getPreparoUnidadeMedida = (preparo: Preparo) =>
      unidadesMedida.find((unidade) => unidade.id === preparo.porcaoIndividualUnidadeMedida);

    const getPreparoTiposAQPC = (preparo: Preparo) =>
      tiposAQPC.filter((tipo) => preparo.tiposAQPCIds.includes(tipo.id ?? 0));

    const preparosWithDependencies: Preparo[] = preparos.map(mapPreparoWithDependencies);
    setPreparosWithDependencies(preparosWithDependencies);
  }, [insumos, preparos, tiposAQPC, unidadesMedida]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = preparosWithDependencies.filter(
        (preparo) =>
          preparo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          preparo.tiposAQPC.find((tipo) => tipo.nome.toLowerCase().includes(searchTerm))
      );
      setFilteredPreparos(filtered);
    } else {
      setFilteredPreparos(preparosWithDependencies);
    }
  }, [preparosWithDependencies, searchTerm]);

  return (
    <section className='w-full max-h-screen'>
      <SearchInput inputName='preparo' onChange={setSearchTerm} />
      <div className='relative overflow-x-auto max-h-[50vh] lg:max-h-[75vh] overflow-y-auto shadow-md rounded-lg'>
        <TablePreparo preparos={filteredPreparos} insumos={insumos} />
      </div>
    </section>
  );
}
