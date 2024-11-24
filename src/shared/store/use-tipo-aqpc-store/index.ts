import { create } from 'zustand';

import { TipoAQPC } from '@/entities/tipo-aqpc';

type Store = {
  tiposAQPC: TipoAQPC[];
  setTiposAQPC: (tipos: TipoAQPC[]) => void;
};

export const useTipoAQPCStore = create<Store>((set) => ({
  tiposAQPC: [],
  setTiposAQPC: (tipos) => set({ tiposAQPC: tipos }),
}));
