import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Insumo } from '@/entities/insumo';
import { SaveInsumo } from '@/feature/insumo/endpoints/save-insumo';
import { UpdateInsumo } from '@/feature/insumo/endpoints/update-insumo';
import { useForm } from '@/shared/hooks/use-form';

import { insumoValidationSchema } from '../validation-schema/insumo-validation-schema';

type TUseFormInsumoProps = {
  insumo?: Insumo;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitInsumoForm(data: FormikValues) {
  try {
    const insumo = data as Insumo;
    let result;

    if (insumo.id) {
      result = await UpdateInsumo.exec(insumo);
    } else {
      result = await SaveInsumo.exec(insumo);
    }

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao salvar o insumo' };
  }
}

export function useFormInsumo({ insumo, setFormStatus }: TUseFormInsumoProps) {
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
      ...insumo,
    },
    validationSchema: insumoValidationSchema,
    onSubmit: async (data) => {
      const result = await submitInsumoForm(data);
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
