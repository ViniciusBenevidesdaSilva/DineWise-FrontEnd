'use client';

import { useEffect, useState } from 'react';

import { Cardapio } from '@/entities/cardapio';
import { FormStatus } from '@/entities/form-status';
import { Preparo } from '@/entities/preparo';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { getDateInfo } from '@/shared/utils/date-methods';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { ComboBoxOption, InputComboBox } from '@/widgets/inputs/input-combobox';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormCardapio } from '../hook/use-form-cardapio';

type TFormCardapioProps = {
  cardapio?: Cardapio;
  preparos: Preparo[];
  setIsOpen: (isOpen: boolean) => void;
};

export function FormCardapio({
  cardapio = undefined,
  preparos,
  setIsOpen,
}: Readonly<TFormCardapioProps>) {
  const { setModalIsOpen } = useModalStore();

  const { americanFormattedDate } = getDateInfo(cardapio?.data ?? new Date());
  const [optionsPreparos, setOptionsPreparos] = useState<ComboBoxOption[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { isValid, isSubmitting, hasChanged, values, getFieldProps, handleSubmit, setFieldValue } =
    useFormCardapio({
      cardapio,
      setFormStatus,
    });

  useEffect(() => {
    setOptionsPreparos(
      preparos.map((preparo) => {
        return {
          id: preparo.id ?? 0,
          nome: preparo.nome,
        };
      })
    );
  }, [preparos]);

  useEffect(() => {
    if (formStatus?.hasError !== undefined) {
      setIsOpen(false);

      //window?.location?.reload();
      setModalIsOpen(formStatus?.hasError ? ModalType.Error : ModalType.Success);
    }
  }, [formStatus, setIsOpen, setModalIsOpen]);

  function setPreparosIds(preparosId: number[]) {
    setFieldValue('preparosIds', preparosId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputText {...getFieldProps('id')} label='id' type='hidden' />
      <InputText label='date' type='date' value={americanFormattedDate} readOnly />

      <div className='collapse collapse-arrow mb-4 border text-start'>
        <input type='checkbox' />
        <div className='collapse-title text-base font-medium text-functional-heavy-dark'>
          Preparos <span className='text-sm'>({values.preparosIds?.length ?? 0})</span>
        </div>
        <div className='collapse-content'>
          <InputComboBox
            {...getFieldProps('preparosIds')}
            options={optionsPreparos}
            selectedOptions={values.preparosIds ?? []}
            setSelectedOptions={setPreparosIds}
          />
        </div>
      </div>
      <div className='w-full flex justify-center pt-4'>
        <ButtonPrimary
          type='submit'
          aria-label='Submeter formulario Cardapio'
          disabled={!hasChanged || !isValid || isSubmitting}
          className='px-16'
        >
          Salvar
        </ButtonPrimary>
      </div>
    </form>
  );
}
