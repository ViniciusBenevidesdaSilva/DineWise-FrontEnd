import { Insumo } from './insumo';
import { TipoAQPC } from './tipo-aqpc';

export type Preparo = {
  id?: number;
  nome: string;
  porcaoIndividualQuantidade: number;
  porcaoIndividualUnidadeMedida: number;
  porcaoIndividualUnidadeMedidaNome: string;
  porcaoIndividualCalorias: number;
  tiposAQPCIds: number[];
  tiposAQPC: TipoAQPC[];
  insumosIds: InsumoPreparo[];
  insumos: Insumo[];
};

export type InsumoPreparo = {
  insumoId: number;
  insumoNome: string;
  quantidade: number;
  unidadeMedidaNome: string;
};
