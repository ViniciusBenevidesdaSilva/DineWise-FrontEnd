import { object, ref, string } from 'yup';

export const resetPasswordValidationSchema = object().shape({
  novaSenha: string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .matches(/[a-zA-Z]/, 'Senha deve conter ao menos uma letra')
    .matches(/\d/, 'Senha deve conter ao menos um número')
    .matches(/[!@#$%^&*(),.?":;{}|<>]/, 'Senha deve conter ao menos um caractere especial'),
  confirmarSenha: string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([ref('novaSenha')], 'As senhas devem ser iguais'),
});
