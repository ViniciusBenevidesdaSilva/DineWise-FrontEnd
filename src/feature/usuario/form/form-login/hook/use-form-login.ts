import { FormikValues } from 'formik';
import { signIn } from 'next-auth/react';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { useForm } from '@/shared/hooks/use-form';

import { loginValidationSchema } from '../validation-schema/login-validation-schema';

type TUseFormLoginProps = {
  usuario?: Usuario;
  setFormStatus: (formStatusError: FormStatus) => void;
};

async function submitLoginForm(data: FormikValues) {
  try {
    const usuario = data as Usuario;

    if (!usuario.email || !usuario.senha) {
      return { error: true, errorMessage: 'E-mail e Senha são obrigatórios' };
    }

    const response = await signIn('credentials', {
      email: usuario.email,
      password: usuario.senha,
      redirectUrl: false,
    });

    if (response?.error) {
      return { error: true, errorMessage: 'Erro ao fazer login. Verifique suas credenciais.' };
    }

    return { error: false };
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Erro ao fazer login' };
  }
}

export function useFormLogin({ usuario, setFormStatus }: TUseFormLoginProps) {
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
    validationSchema: loginValidationSchema,
    onSubmit: async (data) => {
      const result = await submitLoginForm(data);
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
