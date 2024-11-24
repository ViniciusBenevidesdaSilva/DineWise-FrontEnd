import { array, date, number, object } from 'yup';

export const cardapioValidationSchema = object().shape({
  date: date().required('A data é obrigatória').typeError('A data deve ser válida'),

  preparosIds: array()
    .of(
      number()
        .required('Preparo ID é obrigatório')
        .positive('Preparo ID deve ser maior que zero')
        .typeError('Preparo ID deve ser um número válido')
    )
    .min(1, 'Deve haver ao menos um preparo ID'),
});
