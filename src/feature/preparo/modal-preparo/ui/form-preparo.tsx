'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { FormStatus } from '@/entities/form-status';
import { Insumo } from '@/entities/insumo';
import { InsumoPreparo, Preparo } from '@/entities/preparo';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { useTipoAQPCStore } from '@/shared/store/use-tipo-aqpc-store';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { ComboBoxOption, InputComboBox } from '@/widgets/inputs/input-combobox';
import { InputSelect } from '@/widgets/inputs/input-select';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormPreparo } from '../hook/use-form-preparo';

import { FormInsumoPreparo } from './form-insumo-preparo';

type TFormPreparoProps = {
  preparo?: Preparo;
  insumos: Insumo[];
  setIsOpen: (isOpen: boolean) => void;
};

export function FormPreparo({
  preparo = undefined,
  insumos,
  setIsOpen,
}: Readonly<TFormPreparoProps>) {
  const { setModalIsOpen } = useModalStore();
  const { unidadesMedida } = useUnidadeMedidaStore();
  const { tiposAQPC } = useTipoAQPCStore();

  const [optionsTiposAQPC, setOptionsTiposAQPC] = useState<ComboBoxOption[]>([]);
  const [insumosWithUnidadeMedida, setInsumosWithUnidadeMedida] = useState<Insumo[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { isValid, isSubmitting, hasChanged, values, getFieldProps, handleSubmit, setFieldValue } =
    useFormPreparo({
      preparo,
      setFormStatus,
    });

  const insumosPreparosWithDependencies: InsumoPreparo[] =
    preparo?.insumosIds.map((ip) => {
      const insumo = insumos.find((i) => i.id === ip.insumoId);
      const unidadeMedida = unidadesMedida.find((um) => um.id === insumo?.unidadeMedida);

      return {
        ...ip,
        insumoNome: insumo?.nome ?? '',
        unidadeMedidaNome: unidadeMedida?.nomeAbreviado ?? '',
      };
    }) ?? [];

  useEffect(() => {
    setOptionsTiposAQPC(
      tiposAQPC.map((tipo) => {
        return {
          id: tipo.id ?? 0,
          nome: tipo.nome,
          dangerColor: !tipo.isSaudavel,
        };
      })
    );
  }, [tiposAQPC]);

  useEffect(() => {
    if (formStatus?.hasError !== undefined) {
      setIsOpen(false);

      setModalIsOpen(formStatus?.hasError ? ModalType.Error : ModalType.Success);
    }
  }, [formStatus, setIsOpen, setModalIsOpen]);

  useEffect(() => {
    const insumosWithUnidadeMedida: Insumo[] = insumos.map((insumo) => {
      const unidadeMedida = unidadesMedida.find((unidade) => unidade.id === insumo.unidadeMedida);

      return {
        ...insumo,
        unidadeMedidaNome: unidadeMedida?.nomeAbreviado ?? '',
      };
    });
    setInsumosWithUnidadeMedida(insumosWithUnidadeMedida);
  }, [insumos, unidadesMedida]);

  function handleInputSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setFieldValue('porcaoIndividualUnidadeMedida', Number(e.target.value));
  }

  function setTiposAQPCsIds(ids: number[]) {
    setFieldValue('tiposAQPCIds', ids);
  }

  function setInsumosIds(insumosPreparos: InsumoPreparo[]) {
    setFieldValue('insumosIds', insumosPreparos);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputText {...getFieldProps('id')} label='id' type='hidden' />
      <div className='w-full flex flex-row gap-4 pb-2'>
        <InputText {...getFieldProps('nome')} label='nome' divClassName='basis-1/2' />
        <InputText
          {...getFieldProps('porcaoIndividualCalorias')}
          label='Calorias PI'
          type='number'
          min={0}
          step={0.01}
          divClassName='basis-1/2'
        />
      </div>
      <div className='w-full flex flex-row gap-4'>
        <InputText
          {...getFieldProps('porcaoIndividualQuantidade')}
          label='Quantidade PI'
          type='number'
          min={0}
          step={0.01}
          divClassName='basis-1/2'
        />
        <InputSelect
          {...getFieldProps('porcaoIndividualUnidadeMedida')}
          label='Unidade Medida PI'
          options={unidadesMedida}
          onChange={handleInputSelectChange}
          divClassName='basis-1/2'
          disabledOptionLabel='Selecione'
        />
      </div>

      <div className='collapse collapse-arrow mb-4 border text-start'>
        <input type='checkbox' />
        <div className='collapse-title text-base font-medium text-functional-heavy-dark'>
          Tipos AQPCs <span className='text-sm'>({values.tiposAQPCIds?.length ?? 0})</span>
        </div>
        <div className='collapse-content'>
          <InputComboBox
            {...getFieldProps('tiposAQPCIds')}
            options={optionsTiposAQPC}
            selectedOptions={values.tiposAQPCIds ?? []}
            setSelectedOptions={setTiposAQPCsIds}
          />
        </div>
      </div>
      <div className='collapse collapse-arrow border text-start'>
        <input type='checkbox' />
        <div className='collapse-title text-base font-medium text-functional-heavy-dark'>
          Insumos <span className='text-sm'>({values.insumosIds?.length ?? 0})</span>
        </div>
        <div className='collapse-content'>
          <FormInsumoPreparo
            insumosPreparosSelected={insumosPreparosWithDependencies}
            insumos={insumosWithUnidadeMedida}
            setInsumosIds={setInsumosIds}
          />
        </div>
      </div>
      <div className='w-full flex justify-center pt-4'>
        <ButtonPrimary
          type='submit'
          aria-label='Submeter formulario Preparo'
          disabled={!hasChanged || !isValid || isSubmitting}
          className='px-16'
        >
          Salvar
        </ButtonPrimary>
      </div>
    </form>
  );
}
