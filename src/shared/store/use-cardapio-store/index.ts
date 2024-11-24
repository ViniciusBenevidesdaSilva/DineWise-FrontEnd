import { create } from 'zustand';

import { Cardapio } from '@/entities/cardapio';
import { RetriveCardapio } from '@/feature/cardapio/endpoints/retrive-cardapio';

type Store = {
  cardapios: Cardapio[];
  setCardapios: (startDate: Date, endDate: Date, token?: string) => void;
};

export const useCardapioStore = create<Store>((set) => ({
  cardapios: [],
  setCardapios: (startDate, endDate, token) => {
    RetriveCardapio.exec(startDate, endDate, token)
      .then((response) => {
        set({ cardapios: response.data ?? [] });
      })
      .catch(() => {
        set({ cardapios: [] });
      });
  },
}));
