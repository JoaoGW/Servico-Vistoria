import { useEffect, useState } from "react";

import { Asset } from "expo-asset";
import { readAsStringAsync } from "expo-file-system/legacy";

import { LeafletView } from "react-native-leaflet-view";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const ARQUIVO_LEAFLET = require("../../../assets/leaflet.html");
const POSICAO_INICIAL_NEUTRA = { lat: 0, lng: 0 };

interface IMapaDaVistoriaProps {
  coordenadas: { latitude: number; longitude: number } | null;
}

/**
 * Exibe o mapa e um marcador para as coordenadas atuais da vistoria.
 * @param props - Coordenadas que definem o centro e o marcador do mapa.
 * @returns Retorna o mapa ou seu estado de carregamento.
 */
export function MapaDaVistoria({ coordenadas }: IMapaDaVistoriaProps) {
  const [conteudoMapa, setConteudoMapa] = useState<string | null>(null);
  const posicaoAtual = coordenadas
    ? { lat: coordenadas.latitude, lng: coordenadas.longitude }
    : POSICAO_INICIAL_NEUTRA;
  const marcadores = coordenadas
    ? [
        {
          icon: "📍",
          id: "posicao-atual",
          position: posicaoAtual,
          title: "Sua localização atual",
        },
      ]
    : [];

  useEffect(() => {
    let estaMontado = true;

    /**
     * Carrega o arquivo HTML do mapa para o componente Leaflet.
     * @returns Conclui após disponibilizar o conteúdo do mapa no estado.
     */
    const carregarMapa = async () => {
      const assetMapa = Asset.fromModule(ARQUIVO_LEAFLET);

      await assetMapa.downloadAsync();

      if (assetMapa.localUri && estaMontado) {
        const conteudo = await readAsStringAsync(assetMapa.localUri);

        if (estaMontado) {
          setConteudoMapa(conteudo);
        }
      }
    };

    void carregarMapa();

    return () => {
      estaMontado = false;
    };
  }, []);

  if (!conteudoMapa) {
    return (
      <Box className="min-h-[380px] flex-1 items-center justify-center border-y border-vistoria-borda bg-vistoria-fundo px-6">
        <Text className="text-base text-vistoria-auxiliar">
          Carregando mapa...
        </Text>
      </Box>
    );
  }

  return (
    <Box className="min-h-[380px] flex-1 overflow-hidden border-y border-vistoria-borda">
      <LeafletView
        doDebug={false}
        mapCenterPosition={posicaoAtual}
        mapMarkers={marcadores}
        source={{ html: conteudoMapa }}
        zoom={coordenadas ? 16 : 2}
      />
    </Box>
  );
}
