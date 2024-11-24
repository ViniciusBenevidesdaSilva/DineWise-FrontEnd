import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Insumo } from '@/entities/insumo';
import { InsumoPreparo } from '@/entities/preparo';
import { formatNumberToString } from '@/shared/utils/format-number';
import { ButtonCreate } from '@/widgets/buttons/button-create';
import { InputSelect } from '@/widgets/inputs/input-select';
import { InputText } from '@/widgets/inputs/input-text';

type TFormInsumoPreparoProps = {
  insumosPreparosSelected: InsumoPreparo[];
  insumos: Insumo[];
  setInsumosIds: (insumosIds: InsumoPreparo[]) => void;
};

type TInsumoPreparoProps = {
  insumosPreparos: InsumoPreparo[];
  removeInsumoPreparo: (insumoId: number) => void;
};

function TableInsumoPreparo({
  insumosPreparos,
  removeInsumoPreparo,
}: Readonly<TInsumoPreparoProps>) {
  if (insumosPreparos.length === 0) {
    return (
      <div className='p-2 text-sm bg-functional-soft-lightest text-center text-functional-heavy-medium'>
        <p>Nenhum insumo cadastrado</p>
      </div>
    );
  }

  return (
    <table className='table-auto w-full text-sm text-functional-heavy-dark'>
      <thead className='text-xs uppercase bg-functional-soft-darkest'>
        <tr>
          <th scope='col' className='text-center p-2'>
            Insumo
          </th>
          <th scope='col' className='text-center p-2'>
            Quantidade
          </th>
          <th scope='col' className='text-center p-2'>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {insumosPreparos.map((insumoPreparo) => (
          <tr
            key={insumoPreparo.insumoId}
            className='bg-functional-soft-lightest hover:bg-functional-soft-dark'
          >
            <td className='p-2 text-center'>{insumoPreparo.insumoNome}</td>
            <td className='p-2 text-center'>
              {formatNumberToString(insumoPreparo.quantidade, 1)} {insumoPreparo.unidadeMedidaNome}
            </td>
            <td className='p-2 text-center'>
              <button
                aria-label={`Excluir insumo ${insumoPreparo.insumoId}`}
                onClick={() => removeInsumoPreparo(insumoPreparo.insumoId)}
              >
                <Trash2
                  size={16}
                  className='transition-colors duration-200 ease-in-out hover:text-feedback-danger-dark'
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FormInsumoPreparo({
  insumosPreparosSelected,
  insumos,
  setInsumosIds,
}: Readonly<TFormInsumoPreparoProps>) {
  const [insumosPreparos, setInsumosPreparos] = useState<InsumoPreparo[]>(insumosPreparosSelected);
  const [insumoId, setInsumoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [btnSymbol, setBtnSymbol] = useState<'add' | 'edit'>('add');

  const [errorNome, setErrorNome] = useState<{
    hasError?: boolean;
    errorMsg?: string;
  }>();

  const [errorQuantidade, setErrorQuantidade] = useState<{
    hasError?: boolean;
    errorMsg?: string;
  }>();

  const insumoUnidade = insumos.find((insumo) => insumo.id === insumoId)?.unidadeMedidaNome ?? '';

  function addInsumoPreparo() {
    const insumoAtual = insumos.find((insumo) => insumo.id === insumoId);
    const insumoPreparo: InsumoPreparo = {
      insumoId,
      insumoNome: insumoAtual?.nome ?? '',
      quantidade,
      unidadeMedidaNome: insumoAtual?.unidadeMedidaNome ?? '',
    };

    if (insumoPreparo.quantidade <= 0) {
      setErrorQuantidade({ hasError: true, errorMsg: 'Quantidade inválida' });
    }

    if (!insumoPreparo.insumoNome) {
      setErrorNome({ hasError: true, errorMsg: 'Insumo inválido' });
    }

    if (insumoPreparo.quantidade > 0 && insumoPreparo.insumoNome) {
      const result = [
        ...insumosPreparos.filter((ip) => ip.insumoId !== insumoPreparo.insumoId),
        insumoPreparo,
      ];

      setInsumosPreparos(result);
      setInsumosIds(result);

      setBtnSymbol('edit');
    }
  }

  function removeInsumoPreparo(insumoId: number) {
    const result = insumosPreparos.filter((insumo) => insumo.insumoId !== insumoId);
    setInsumosPreparos(result);
    setInsumosIds(result);
  }

  function handleInsumoIdChange(insumoId: number) {
    setInsumoId(insumoId);
    const insumoAtual = insumos.find((insumo) => insumo.id === insumoId);

    if (!insumoAtual) {
      setErrorNome({ hasError: true, errorMsg: 'Insumo inválido' });
    } else {
      setErrorNome({ hasError: false, errorMsg: '' });
      setBtnSymbol(insumosPreparos.some((ip) => ip.insumoId === insumoId) ? 'edit' : 'add');
    }
  }

  function handleQuantidadeChange(quantidade: number) {
    setQuantidade(quantidade);

    if (quantidade <= 0) {
      setErrorQuantidade({ hasError: true, errorMsg: 'Quantidade inválida' });
    } else {
      setErrorQuantidade({ hasError: false, errorMsg: '' });
    }
  }

  return (
    <>
      <div className='flex flex-row pb-4 gap-4'>
        <div className='flex flex-col lg:flex-row lg:gap-4 basis-4/5'>
          <InputSelect
            label='Novo Insumo'
            options={insumos as { id: string | number; nome: string }[]}
            onChange={(e) => handleInsumoIdChange(Number(e.target.value))}
            divClassName='basis-1/2'
            disabledOptionLabel='Selecione'
            inputSize='small'
            defaultValue={''}
            meta={errorNome}
          />
          <InputText
            label={`Quantidade ${insumoUnidade && '(' + insumoUnidade + ')'}`}
            type='number'
            defaultValue={0}
            min={0}
            step={0.1}
            inputSize='small'
            divClassName='basis-1/2'
            onChange={(e) => handleQuantidadeChange(Number(e.target.value))}
            meta={errorQuantidade}
          />
        </div>
        <ButtonCreate
          type='button'
          text=''
          symbol={btnSymbol}
          className='self-center h-1/5'
          onClick={addInsumoPreparo}
        />
      </div>

      <TableInsumoPreparo
        insumosPreparos={insumosPreparos}
        removeInsumoPreparo={removeInsumoPreparo}
      />
    </>
  );
}
