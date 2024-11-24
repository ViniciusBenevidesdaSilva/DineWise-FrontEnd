import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { UpdateUsuarioBasicInfo } from '@/feature/usuario/endpoints/update-basic-info';
import { useForm } from '@/shared/hooks/use-form';

import { profileValidationSchema } from '../validation-schema/profile-validation-schema';

type TUseFormProfileProps = {
  usuario?: Usuario;
  setFormStatus: (formStatus: FormStatus) => void;
};

async function submitProfileForm(data: FormikValues) {
  try {
    const usuario = data as Usuario;
    const result = await UpdateUsuarioBasicInfo.exec(usuario);

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao salvar dados do usuário' };
  }
}

export function useFormProfile({ usuario, setFormStatus }: TUseFormProfileProps) {
  const {
    values,
    touched,
    isValid,
    hasChanged,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    getFieldProps,
  } = useForm({
    initialValues: {
      ...usuario,
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (data) => {
      const result = await submitProfileForm(data);
      setFormStatus({ hasError: result.error });
    },
  });

  return {
    values,
    touched,
    isValid,
    hasChanged,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    getFieldProps,
  };
}
