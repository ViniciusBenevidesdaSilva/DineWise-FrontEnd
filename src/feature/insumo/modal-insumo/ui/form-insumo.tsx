'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { FormStatus } from '@/entities/form-status';
import { Insumo } from '@/entities/insumo';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { useUnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputSelect } from '@/widgets/inputs/input-select';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormInsumo } from '../hook/use-form-insumo';

type TFormInsumoProps = {
  insumo?: Insumo;
  setIsOpen: (isOpen: boolean) => void;
};

export function FormInsumo({ insumo = undefined, setIsOpen }: Readonly<TFormInsumoProps>) {
  const { setModalIsOpen } = useModalStore();
  const { unidadesMedida } = useUnidadeMedidaStore();
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { isValid, isSubmitting, hasChanged, getFieldProps, handleSubmit, setFieldValue } =
    useFormInsumo({
      insumo,
      setFormStatus,
    });

  useEffect(() => {
    if (formStatus?.hasError !== undefined) {
      setIsOpen(false);

      setModalIsOpen(formStatus?.hasError ? ModalType.Error : ModalType.Success);
    }
  }, [formStatus, setIsOpen, setModalIsOpen]);

  function handleInputSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setFieldValue('unidadeMedida', Number(e.target.value));
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputText {...getFieldProps('id')} label='id' type='hidden' />
      <InputText {...getFieldProps('nome')} label='nome' />
      <InputText {...getFieldProps('preco')} label='preço' type='number' min={0} step={0.01} />
      <InputSelect
        {...getFieldProps('unidadeMedida')}
        label={'Unidade Medida'}
        options={unidadesMedida}
        onChange={handleInputSelectChange}
      />
      <div className='w-full flex justify-center pt-6'>
        <ButtonPrimary
          type='submit'
          aria-label='Submeter formulario Insumo'
          disabled={!hasChanged || !isValid || isSubmitting}
          className='px-16'
        >
          Salvar
        </ButtonPrimary>
      </div>
    </form>
  );
}
