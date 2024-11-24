import { number, object, string } from 'yup';

export const insumoValidationSchema = object().shape({
  nome: string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome pode ter no máximo 100 caracteres'),

  preco: number()
    .required('Preço é obrigatório')
    .positive('Preço deve ser maior que zero')
    .typeError('Preço deve ser um número válido'),

  unidadeMedida: number().required('Unidade de medida é obrigatória'),
});
