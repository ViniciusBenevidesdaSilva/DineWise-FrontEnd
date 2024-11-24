import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { RequestPasswordReset } from '@/feature/usuario/endpoints/request-password-reset';
import { useForm } from '@/shared/hooks/use-form';

import { requestPasswordResetValidationSchema } from '../validation-schema/request-password-reset-validation-schema';

type TUseFormRequestPasswordResetProps = {
  usuario?: Usuario;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitRequestPasswordResetForm(data: FormikValues) {
  try {
    const usuario = data as Usuario;

    if (!usuario.email) {
      return { error: true, errorMessage: 'E-mail é obrigatório' };
    }

    const result = await RequestPasswordReset.exec(usuario);

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao fazer login' };
  }
}

export function useFormRequestPasswordReset({
  usuario,
  setFormStatus,
}: TUseFormRequestPasswordResetProps) {
  const {
    values,
    touched,
    isValid,
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
    validationSchema: requestPasswordResetValidationSchema,
    onSubmit: async (data) => {
      const result = await submitRequestPasswordResetForm(data);
      setFormStatus({ hasError: result.error });
    },
  });

  return {
    values,
    touched,
    isValid,
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
