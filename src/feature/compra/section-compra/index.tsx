'use client';

import { useEffect, useState } from 'react';

import { Compra } from '@/entities/compra';
import { Insumo } from '@/entities/insumo';
import { TableCompra } from '@/feature/compra/table-compra';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';
import { getDateInfo } from '@/shared/utils/date-methods';
import { formatNumberToString } from '@/shared/utils/format-number';
import { SearchInput } from '@/widgets/inputs/search-input';

type TSectionCompraProps = {
  insumos: Insumo[];
  compras: Compra[];
};

export function SectionCompra({ insumos, compras }: Readonly<TSectionCompraProps>) {
  const { unidadesMedida } = useUnidadeMedidaStore();

  const [comprasWithDependencies, setComprasWithDependencies] = useState<Compra[]>([]);
  const [filteredCompras, setFilteredCompras] = useState<Compra[]>(comprasWithDependencies);
  const [insumoSearchTerm, setInsumoSearchTerm] = useState<string | null>(null);
  const [dataSearchTerm, setDataSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    const comprasWithDependencies: Compra[] = compras.map((compra) => {
      const insumo = insumos.find((insumo) => insumo.id === compra.insumoId);
      if (insumo) {
        insumo.unidadeMedidaNome = unidadesMedida.find(
          (unidade) => unidade.id === insumo?.unidadeMedida
        )?.nomeAbreviado;
      }

      const { formattedDate } = getDateInfo(new Date(compra.dataLimiteCompra));

      return {
        ...compra,
        dataLimiteCompra: formattedDate,
        insumo,
      };
    });
    setComprasWithDependencies(comprasWithDependencies);
  }, [compras, insumos, unidadesMedida]);

  useEffect(() => {
    const filtered = comprasWithDependencies.filter(
      (compra) =>
        (!insumoSearchTerm ||
          compra.insumo?.nome.toLowerCase().includes(insumoSearchTerm?.toLowerCase())) &&
        (!dataSearchTerm ||
          compra.dataLimiteCompra?.toLowerCase().includes(dataSearchTerm?.toLowerCase()))
    );

    setFilteredCompras(filtered);
  }, [comprasWithDependencies, insumoSearchTerm, dataSearchTerm]);

  const formatDateInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue;

    if (numericValue.length > 2) {
      formattedValue = numericValue.slice(0, 2) + '/' + numericValue.slice(2);
    }
    if (numericValue.length > 4) {
      formattedValue =
        numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4) + '/' + numericValue.slice(4, 8);
    }

    return formattedValue;
  };

  return (
    <section className='w-full max-h-screen'>
      <div className='flex flex-col md:flex-row md:gap-4'>
        <SearchInput inputName='insumo' onChange={setInsumoSearchTerm} />
        <SearchInput
          inputName='data'
          formatInputValue={formatDateInput}
          onChange={setDataSearchTerm}
        />
      </div>
      <p className='text-end font-medium mb-6'>
        Preço total estimado: R${' '}
        {formatNumberToString(
          filteredCompras.reduce((sum, compra) => sum + (compra.precoTotal || 0), 0)
        )}
      </p>
      <div className='relative overflow-x-auto max-h-[50vh] lg:max-h-[75vh] overflow-y-auto shadow-md rounded-lg'>
        <TableCompra compras={filteredCompras} />
      </div>
    </section>
  );
}
