import { object, string } from 'yup';

export const requestPasswordResetValidationSchema = object().shape({
  email: string().required('E-mail é obrigatório').email('E-mail deve ser válido'),
});
