import { create } from 'zustand';

import { UnidadeMedida } from '@/entities/unidade-medida';

type Store = {
  unidadesMedida: UnidadeMedida[];
  setUnidadesMedida: (unidades: UnidadeMedida[]) => void;
};

export const useUnidadeMedidaStore = create<Store>((set) => ({
  unidadesMedida: [],
  setUnidadesMedida: (unidades) => set({ unidadesMedida: unidades }),
}));
