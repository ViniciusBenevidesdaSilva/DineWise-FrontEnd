import { object, ref, string } from 'yup';

export const registerValidationSchema = object().shape({
  nome: string().required('Nome é obrigatório'),
  email: string().required('E-mail é obrigatório').email('E-mail deve ser válido'),
  senha: string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .matches(/[a-zA-Z]/, 'Senha deve conter ao menos uma letra')
    .matches(/\d/, 'Senha deve conter ao menos um número')
    .matches(/[!@#$%^&*(),.?":;{}|<>]/, 'Senha deve conter ao menos um caractere especial'),
  confirmarSenha: string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([ref('senha')], 'As senhas devem ser iguais'),
});
