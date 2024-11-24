'use client';

import { useEffect, useState } from 'react';

import { Insumo } from '@/entities/insumo';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';
import { SearchInput } from '@/widgets/inputs/search-input';

import { TableInsumo } from '../table-insumo';

type TSectionInsumoProps = {
  insumos: Insumo[];
};

export function SectionInsumo({ insumos }: Readonly<TSectionInsumoProps>) {
  const { unidadesMedida } = useUnidadeMedidaStore();

  const [insumosWithUnidadeMedida, setInsumosWithUnidadeMedida] = useState<Insumo[]>([]);
  const [filteredInsumos, setFilteredInsumos] = useState<Insumo[]>(insumos);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    const insumosWithUnidadeMedida: Insumo[] = insumos.map((insumo) => {
      const unidadeMedida = unidadesMedida.find((unidade) => unidade.id === insumo.unidadeMedida);

      return {
        ...insumo,
        unidadeMedidaNome: unidadeMedida?.nome ?? '',
      };
    });
    setInsumosWithUnidadeMedida(insumosWithUnidadeMedida);
  }, [insumos, unidadesMedida]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = insumosWithUnidadeMedida.filter((insumo) =>
        insumo.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInsumos(filtered);
    } else {
      setFilteredInsumos(insumosWithUnidadeMedida);
    }
  }, [insumosWithUnidadeMedida, searchTerm]);

  return (
    <section className='w-full max-h-screen'>
      <SearchInput inputName='insumo' onChange={setSearchTerm} />
      <div className='relative overflow-x-auto max-h-[50vh] lg:max-h-[75vh] overflow-y-auto shadow-md rounded-lg'>
        <TableInsumo insumos={filteredInsumos} />
      </div>
    </section>
  );
}
