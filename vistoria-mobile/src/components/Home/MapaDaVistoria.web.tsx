import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

interface IMapaDaVistoriaProps {
  coordenadas: { latitude: number; longitude: number } | null;
}

/**
 * O Leaflet usado no aplicativo depende de WebView nativa. Esta versão evita
 * carregá-lo quando o Expo gera a bundle web das rotas de API.
 */
export function MapaDaVistoria({ coordenadas }: IMapaDaVistoriaProps) {
  return (
    <Box className="min-h-[380px] flex-1 items-center justify-center border-y border-vistoria-borda bg-vistoria-fundo px-6">
      <Text className="text-center text-base text-vistoria-auxiliar">
        {coordenadas
          ? "O mapa está disponível no aplicativo móvel."
          : "Aguardando a localização do dispositivo..."}
      </Text>
    </Box>
  );
}
