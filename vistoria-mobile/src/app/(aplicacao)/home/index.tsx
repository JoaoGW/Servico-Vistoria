import AsyncStorage from "@react-native-async-storage/async-storage";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { BotaoConcluirVistoria } from "@/components/Buttons/BotaoConcluirVistoria";
import { MapaDaVistoria } from "@/components/Home/MapaDaVistoria";
import { IndicadorConexao } from "@/components/IndicadorConexao";
import { ConfirmarFotoVistoria } from "@/components/Modals/ConfirmarFotoVistoria";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

import { useRelogioGlobal } from "@/hooks/use-relogio-global";

import { concluirVistoriaLocal } from "@/db/sincronizacao";
import { useVistoriaStore } from "@/stores/use-vistoria-store";

function abreviarDescricao(descricao: string) {
  return descricao.length > 20 ? `${descricao.slice(0, 20)}...` : descricao;
}

export default function PaginaInicial() {
  const { dataAtual, horarioAtual } = useRelogioGlobal();
  const vistoriaAtiva = useVistoriaStore((estado) => estado.vistoriaAtiva);
  const limparVistoriaAtiva = useVistoriaStore(
    (estado) => estado.limparVistoriaAtiva,
  );
  const possuiVistoriaAtiva = Boolean(vistoriaAtiva);
  const [fotoParaConfirmar, setFotoParaConfirmar] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [estaConcluindo, setEstaConcluindo] = useState(false);
  const [coordenadasAtuais, setCoordenadasAtuais] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let estaMontado = true;
    let monitoramento: Location.LocationSubscription | null = null;

    const atualizarCoordenadas = (localizacao: Location.LocationObject) => {
      if (!estaMontado) {
        return;
      }

      setCoordenadasAtuais({
        latitude: localizacao.coords.latitude,
        longitude: localizacao.coords.longitude,
      });
    };

    const iniciarMonitoramento = async () => {
      try {
        const permissao = await Location.requestForegroundPermissionsAsync();

        if (!permissao.granted || !estaMontado) {
          return;
        }

        const localizacaoInicial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        atualizarCoordenadas(localizacaoInicial);

        monitoramento = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
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

  const capturarFoto = async () => {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o uso da câmera para registrar a foto do trabalho realizado.",
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (!resultado.canceled) {
        setFotoParaConfirmar(resultado.assets[0]);
      }
    } catch (error) {
      console.error("Não foi possível abrir a câmera.", error);
      Alert.alert(
        "Não foi possível abrir a câmera",
        "Tente novamente em alguns instantes.",
      );
    }
  };

  const confirmarConclusao = async () => {
    if (!vistoriaAtiva || !fotoParaConfirmar) {
      return;
    }

    setEstaConcluindo(true);

    try {
      const permissao = await Location.requestForegroundPermissionsAsync();

      if (!permissao.granted) {
        throw new Error(
          "Permita o acesso à localização para concluir esta vistoria.",
        );
      }

      const localizacao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Sua sessão expirou. Entre novamente para concluir a vistoria.");
      }

      const mimeType = fotoParaConfirmar.mimeType ?? "image/jpeg";
      const nomeArquivo =
        fotoParaConfirmar.fileName ?? `vistoria-${vistoriaAtiva.id}.jpg`;
      const dados = new FormData();
      const arquivoFoto = new File(fotoParaConfirmar.uri);
      dados.append("id", vistoriaAtiva.id);
      dados.append("latitude", String(localizacao.coords.latitude));
      dados.append("longitude", String(localizacao.coords.longitude));
      dados.append("photo", arquivoFoto, nomeArquivo);

      const response = await fetch("/api/vistorias/concluirVistoria", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dados,
      });

      if (!response.ok) {
        throw new Error("Não foi possível concluir a vistoria.");
      }

      await concluirVistoriaLocal({
        id: vistoriaAtiva.id,
        latitude: localizacao.coords.latitude,
        longitude: localizacao.coords.longitude,
        photoMimeType: mimeType,
      });
      limparVistoriaAtiva();
      setFotoParaConfirmar(null);
      Alert.alert("Vistoria concluída", "A foto e a localização foram enviadas.");
    } catch (error) {
      console.error("Não foi possível concluir a vistoria.", error);
      Alert.alert(
        "Não foi possível concluir a vistoria",
        error instanceof Error
          ? error.message
          : "Tente novamente em alguns instantes.",
      );
    } finally {
      setEstaConcluindo(false);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
    >
      <Box className="flex-1 pb-8">
        <Box className="border-b border-vistoria-borda bg-vistoria-superficie px-6 pb-6 pt-5">
          <Box className="flex-row items-start justify-between">
            <Box className="flex-1 pr-4">
              <Text className="text-xs font-bold tracking-[2px] text-vistoria-marca">
                PEACORE
              </Text>
              <Text className="mt-2 text-[30px] font-bold text-vistoria-titulo">
                Peacore Vistorias
              </Text>
              <Text className="mt-2 text-base leading-6 text-vistoria-auxiliar">
                Os dados da vistoria serão exibidos aqui.
              </Text>
            </Box>
            <IndicadorConexao />
          </Box>
        </Box>

        <MapaDaVistoria coordenadas={coordenadasAtuais} />

        <Box className="flex-row items-end justify-between bg-vistoria-superficie px-6 py-8">
          <Text className="text-[64px] font-bold leading-none text-vistoria-marca">
            {horarioAtual}
          </Text>
          <Box className="ml-4 items-end pb-1">
            <Text className="text-lg font-bold text-vistoria-marca">
              {dataAtual}
            </Text>
            <Text
              className="mt-2 text-sm font-semibold text-vistoria-titulo"
              numberOfLines={1}
            >
              {vistoriaAtiva
                ? abreviarDescricao(vistoriaAtiva.titulo)
                : "Nenhuma vistoria selecionada"}
            </Text>
          </Box>
        </Box>

        <Box className="px-6 pt-6">
          <BotaoConcluirVistoria
            estaConcluindo={estaConcluindo}
            onPress={capturarFoto}
            possuiVistoriaAtiva={possuiVistoriaAtiva}
          />
        </Box>

        {possuiVistoriaAtiva ? (
          <Box className="mx-6 mt-6 rounded-xl border border-vistoria-borda bg-vistoria-superficie p-5">
            <Text className="text-xl font-bold text-vistoria-titulo">
              Resumo da vistoria
            </Text>
            <Text className="mt-3 text-base leading-6 text-vistoria-auxiliar">
              Nenhum dado disponível.
            </Text>
            <Text className="mt-1 text-sm leading-5 text-vistoria-auxiliar">
              As informações serão exibidas nesta área.
            </Text>
          </Box>
        ) : null}
      </Box>

      {fotoParaConfirmar ? (
        <ConfirmarFotoVistoria
          carregando={estaConcluindo}
          fotoUri={fotoParaConfirmar.uri}
          onCancelar={() => setFotoParaConfirmar(null)}
          onConfirmar={confirmarConclusao}
          onTirarOutra={() => {
            setFotoParaConfirmar(null);
            void capturarFoto();
          }}
        />
      ) : null}
    </ScrollView>
  );
}
