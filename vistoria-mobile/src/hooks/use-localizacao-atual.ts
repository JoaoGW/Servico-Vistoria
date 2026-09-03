import * as Location from "expo-location";
import { useEffect, useState } from "react";

export interface ICoordenadasAtuais {
  latitude: number;
  longitude: number;
}

const OPCOES_DE_LOCALIZACAO = {
  accuracy: Location.Accuracy.High,
};

function coordenadasDaLocalizacao(
  localizacao: Location.LocationObject,
): ICoordenadasAtuais {
  return {
    latitude: localizacao.coords.latitude,
    longitude: localizacao.coords.longitude,
  };
}

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

export function useLocalizacaoAtual() {
  const [coordenadas, setCoordenadas] =
    useState<ICoordenadasAtuais | null>(null);

  useEffect(() => {
    let estaMontado = true;
    let monitoramento: Location.LocationSubscription | null = null;

    const atualizarCoordenadas = (localizacao: Location.LocationObject) => {
      if (estaMontado) {
        setCoordenadas(coordenadasDaLocalizacao(localizacao));
      }
    };

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
