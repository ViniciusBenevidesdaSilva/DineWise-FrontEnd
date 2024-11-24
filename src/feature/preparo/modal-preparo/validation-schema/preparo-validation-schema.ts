import { array, number, object, string } from 'yup';

export const preparoValidationSchema = object().shape({
  nome: string().required('Nome é obrigatório'),

  porcaoIndividualQuantidade: number()
    .required('Porção individual quantidade é obrigatória')
    .positive('Porção individual quantidade deve ser maior que zero')
    .typeError('Porção individual quantidade deve ser um número válido'),

  porcaoIndividualUnidadeMedida: number().required(
    'Porção individual unidade de medida é obrigatória'
  ),

  porcaoIndividualCalorias: number()
    .required('Porção individual calorias é obrigatória')
    .positive('Porção individual calorias deve ser maior que zero')
    .typeError('Porção individual calorias deve ser um número válido'),

  insumosIds: array()
    .of(
      object().shape({
        insumoId: number().required('Insumo ID é obrigatório'),
        quantidade: number()
          .required('Quantidade é obrigatória')
          .positive('Quantidade deve ser maior que zero')
          .typeError('Quantidade deve ser um número válido'),
      })
    )
    .min(1, 'Deve haver ao menos um insumo'),
});
