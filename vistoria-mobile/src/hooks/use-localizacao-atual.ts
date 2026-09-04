import * as Location from "expo-location";
import { useEffect, useState } from "react";

export interface ICoordenadasAtuais {
  latitude: number;
  longitude: number;
}

const OPCOES_DE_LOCALIZACAO = {
  accuracy: Location.Accuracy.High,
};

/**
 * Converte a resposta do Expo Location em coordenadas usadas pela aplicação.
 * @param localizacao - Localização retornada pelo serviço do dispositivo.
 * @returns Retorna a latitude e a longitude atuais.
 */
function coordenadasDaLocalizacao(
  localizacao: Location.LocationObject,
): ICoordenadasAtuais {
  return {
    latitude: localizacao.coords.latitude,
    longitude: localizacao.coords.longitude,
  };
}

/**
 * Solicita permissão e obtém a localização atual do dispositivo.
 * @returns Retorna as coordenadas atuais após a permissão ser concedida.
 * @throws Retorna erro quando o acesso à localização for negado ou falhar.
 */
export async function obterCoordenadasAtuais(): Promise<ICoordenadasAtuais> {
  const permissao = await Location.requestForegroundPermissionsAsync();

  if (!permissao.granted) {
    throw new Error(
      "Permita o acesso à localização para concluir esta vistoria.",
    );
  }

  const localizacao = await Location.getCurrentPositionAsync(
    OPCOES_DE_LOCALIZACAO,
  );

  return coordenadasDaLocalizacao(localizacao);
}

/**
 * Monitora a localização do dispositivo enquanto o componente estiver montado.
 * @returns Retorna as coordenadas atuais ou null enquanto não estiverem disponíveis.
 */
export function useLocalizacaoAtual() {
  const [coordenadas, setCoordenadas] =
    useState<ICoordenadasAtuais | null>(null);

  useEffect(() => {
    let estaMontado = true;
    let monitoramento: Location.LocationSubscription | null = null;

    /**
     * Atualiza o estado com a localização observada enquanto o hook estiver ativo.
     * @param localizacao - Nova localização recebida do monitoramento.
     * @returns Não retorna valor.
     */
    const atualizarCoordenadas = (localizacao: Location.LocationObject) => {
      if (estaMontado) {
        setCoordenadas(coordenadasDaLocalizacao(localizacao));
      }
    };

    /**
     * Obtém a posição inicial e inicia o monitoramento de localização.
     * @returns Conclui após configurar o monitoramento quando possível.
     */
    const iniciarMonitoramento = async () => {
      try {
        const localizacaoInicial = await obterCoordenadasAtuais();

        if (!estaMontado) {
          return;
        }

        setCoordenadas(localizacaoInicial);
        monitoramento = await Location.watchPositionAsync(
          {
            ...OPCOES_DE_LOCALIZACAO,
            distanceInterval: 5,
            timeInterval: 5_000,
          },
          atualizarCoordenadas,
        );

        if (!estaMontado) {
          monitoramento.remove();
        }
      } catch (error) {
        console.warn("Não foi possível obter a localização atual.", error);
      }
    };

    void iniciarMonitoramento();

    return () => {
      estaMontado = false;
      monitoramento?.remove();
    };
  }, []);

  return coordenadas;
}
