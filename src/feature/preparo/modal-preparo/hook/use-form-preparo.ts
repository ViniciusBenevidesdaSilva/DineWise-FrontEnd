import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Preparo } from '@/entities/preparo';
import { SavePreparo } from '@/feature/preparo/endpoints/save-preparo';
import { UpdatePreparo } from '@/feature/preparo/endpoints/update-preparo';
import { useForm } from '@/shared/hooks/use-form';

import { preparoValidationSchema } from '../validation-schema/preparo-validation-schema';

type TUseFormPreparoProps = {
  preparo?: Preparo;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitPreparoForm(data: FormikValues) {
  try {
    const preparo = data as Preparo;
    let result;

    if (preparo.id) {
      result = await UpdatePreparo.exec(preparo);
    } else {
      result = await SavePreparo.exec(preparo);
    }

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao salvar o preparo' };
  }
}

export function useFormPreparo({ preparo, setFormStatus }: TUseFormPreparoProps) {
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
      ...preparo,
    },
    validationSchema: preparoValidationSchema,
    onSubmit: async (data) => {
      const result = await submitPreparoForm(data);
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
