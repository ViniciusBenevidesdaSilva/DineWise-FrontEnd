import { Preparo } from './preparo';

export type Cardapio = {
  id?: number;
  date: string;
  data: Date;
  preparosIds: number[];
  preparos: Preparo[];
  refeicao: Refeicao;
  tipoAQPCAlertas: TipoAQPCAlertas;
};

export type Refeicao = {
  id?: number;
  preparosIds: number[];
};

export type TipoAQPCAlertas = {
  percentualRecomendadoAtual: number;
  avisoAlimentoRecomendado: boolean;
  percentualControladoAtual: number;
  avisoAlimentoControlado: boolean;
};
