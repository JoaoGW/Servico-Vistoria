import { MapPinned } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export function MapaDaVistoria() {
  return (
    <Box
      accessibilityLabel="Área reservada para o mapa da vistoria"
      className="min-h-[380px] flex-1 items-center justify-center border-y border-vistoria-borda bg-vistoria-fundo px-6"
    >
      <Icon as={MapPinned} className="text-vistoria-marca" size="xl" />
      <Text className="mt-3 text-xl font-bold text-vistoria-titulo">
        Mapa da vistoria
      </Text>
      <Text className="mt-2 text-center text-base text-vistoria-auxiliar">
        A localização será exibida aqui.
      </Text>
    </Box>
  );
}
