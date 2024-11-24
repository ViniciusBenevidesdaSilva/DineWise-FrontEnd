import { FormikValues } from 'formik';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { SaveUsuario } from '@/feature/usuario/endpoints/save-usuario';
import { useForm } from '@/shared/hooks/use-form';

import { registerValidationSchema } from '../validation-schema/register-validation-schema';

type TUseFormRegisterProps = {
  usuario?: Usuario;
  setFormStatus: (formStatus: FormStatus) => void;
};

async function submitRegisterForm(data: FormikValues) {
  try {
    const usuario = data as Usuario;

    const result = await SaveUsuario.exec(usuario);

    return result;
  } catch (error) {
    return { error: true, errorMessage: String(error) || 'Error ao criar usuário' };
  }
}

export function useFormRegister({ usuario, setFormStatus }: TUseFormRegisterProps) {
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
    validationSchema: registerValidationSchema,
    onSubmit: async (data) => {
      const result = await submitRegisterForm(data);
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
