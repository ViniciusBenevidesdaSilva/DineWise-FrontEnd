import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { ResetPassword } from '@/feature/usuario/endpoints/reset-password';
import { useForm } from '@/shared/hooks/use-form';

import { resetPasswordValidationSchema } from '../validation-schema/reset-password-validation-schema';

type TUseFormResetPasswordProps = {
  token: string;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitResetPasswordForm(data: FormikValues, token: string) {
  try {
    const novaSenha = data.novaSenha;

    if (!novaSenha || !token) {
      return { error: true, errorMessage: 'Campos obrigatórios não preenchidos' };
    }

    const result = await ResetPassword.exec(novaSenha, token);

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao fazer login' };
  }
}

export function useFormResetPassword({ token, setFormStatus }: TUseFormResetPasswordProps) {
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
      novaSenha: '',
      confirmarSenha: '',
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (data) => {
      const result = await submitResetPasswordForm(data, token);
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
