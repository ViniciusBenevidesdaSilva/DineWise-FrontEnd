import { Insumo } from './insumo';

export type Compra = {
  insumoId: number;
  insumo?: Insumo;
  quantidadeInsumo: number;
  dataLimiteCompra: string;
  precoTotal: number;
};
