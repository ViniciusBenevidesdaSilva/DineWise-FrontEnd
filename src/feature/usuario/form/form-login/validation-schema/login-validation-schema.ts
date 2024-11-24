import { object, string } from 'yup';

export const loginValidationSchema = object().shape({
  email: string().required('E-mail é obrigatório').email('E-mail deve ser válido'),

  senha: string().required('Senha é obrigatória'),
});
