export type TipoAQPCMensal = {
  mes: string;
  percentuaisTipoAQPC: {
    percentualRecomendadoAtual: number;
    avisoAlimentoRecomendado: boolean;
    percentualControladoAtual: number;
    avisoAlimentoControlado: boolean;
  };
};
