import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IVistoriaAtiva {
  id: string;
  titulo: string;
}

interface IEstadoVistoria {
  vistoriaAtiva: IVistoriaAtiva | null;
  limparVistoriaAtiva: () => void;
  selecionarVistoria: (vistoria: IVistoriaAtiva) => void;
}

export const useVistoriaStore = create<IEstadoVistoria>()(
  persist(
    (set) => ({
      vistoriaAtiva: null,
      limparVistoriaAtiva: () => set({ vistoriaAtiva: null }),
      selecionarVistoria: (vistoria) => set({ vistoriaAtiva: vistoria }),
    }),
    {
      name: "peacore-vistoria-ativa",
      partialize: (estado) => ({ vistoriaAtiva: estado.vistoriaAtiva }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
