import { FormikValues } from 'formik';

import { Cardapio } from '@/entities/cardapio';
import { FormStatus } from '@/entities/form-status';
import { SaveCardapio } from '@/feature/cardapio/endpoints/save-cardapio';
import { UpdateCardapio } from '@/feature/cardapio/endpoints/update-cardapio';
import { useForm } from '@/shared/hooks/use-form';

import { cardapioValidationSchema } from '../validation-schema/cardapio-validation-schema';

type TUseFormCardapioProps = {
  cardapio?: Cardapio;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitCardapioForm(data: FormikValues) {
  try {
    const cardapio = data as Cardapio;
    let result;

    if (cardapio.id) {
      result = await UpdateCardapio.exec(cardapio);
    } else {
      result = await SaveCardapio.exec(cardapio);
    }

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao salvar o cardapio' };
  }
}

export function useFormCardapio({ cardapio, setFormStatus }: TUseFormCardapioProps) {
  const {
    values,
    touched,
    isValid,
    errors,
    isSubmitting,
    hasChanged,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    getFieldProps,
  } = useForm({
    initialValues: {
      ...cardapio,
    },
    validationSchema: cardapioValidationSchema,
    onSubmit: async (data) => {
      const result = await submitCardapioForm(data);
      setFormStatus({ hasError: result.error });
    },
  });

  return {
    values,
    touched,
    isValid,
    errors,
    isSubmitting,
    hasChanged,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    getFieldProps,
  };
}
