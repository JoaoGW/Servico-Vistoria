import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import type { VistoriaModel } from "@/db/models/Vistoria";

interface IListaVistoriasProps {
  vistorias: VistoriaModel[];
}

export function ListaVistorias({ vistorias }: IListaVistoriasProps) {
  return (
    <Box className="gap-3">
      {vistorias.map((vistoria) => (
        <Box
          key={vistoria.id}
          className="rounded-xl border border-vistoria-borda bg-vistoria-superficie p-4"
        >
          <Text className="text-base font-bold text-vistoria-titulo">
            {vistoria.description}
          </Text>
          <Text className="mt-1 text-sm font-bold text-vistoria-marca">
            {vistoria.pendente ? "Pendente" : "Concluída"}
          </Text>
          {vistoria.latitude !== null && vistoria.longitude !== null ? (
            <Text className="mt-3 text-sm text-vistoria-auxiliar">
              Localização: {vistoria.latitude}, {vistoria.longitude}
            </Text>
          ) : null}
          <Text className="mt-1 text-sm text-vistoria-auxiliar">
            Criada em {vistoria.createdAt.toLocaleDateString("pt-BR")}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
