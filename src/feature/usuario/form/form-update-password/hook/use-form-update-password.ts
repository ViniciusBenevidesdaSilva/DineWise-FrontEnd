import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { UpdateUsuarioPassword } from '@/feature/usuario/endpoints/update-password';
import { useForm } from '@/shared/hooks/use-form';

import { updatePasswordValidationSchema } from '../validation-schema/update-password-validation-schema';

type TUseFormUpdatePasswordProps = {
  usuario?: Usuario;
  setFormStatus: (formStatus: FormStatus) => void;
};

async function submitChangePasswordForm(data: FormikValues) {
  try {
    const usuario = data as Usuario;
    const result = await UpdateUsuarioPassword.exec(usuario);

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao salvar dados do usuário' };
  }
}

export function useFormUpdatePassword({ usuario, setFormStatus }: TUseFormUpdatePasswordProps) {
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
    validationSchema: updatePasswordValidationSchema,
    onSubmit: async (data) => {
      const result = await submitChangePasswordForm(data);
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
