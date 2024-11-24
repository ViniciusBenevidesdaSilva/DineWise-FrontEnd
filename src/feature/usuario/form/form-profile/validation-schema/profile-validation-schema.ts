import { object, string } from 'yup';

export const profileValidationSchema = object().shape({
  nome: string().required('Nome é obrigatório'),
  email: string().required('E-mail é obrigatório').email('E-mail deve ser válido'),
});
