import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { BotaoConcluirVistoria } from "@/components/Buttons/BotaoConcluirVistoria";
import { MapaDaVistoria } from "@/components/Home/MapaDaVistoria";
import { IndicadorConexao } from "@/components/IndicadorConexao";
import { ConfirmarFotoVistoria } from "@/components/Modals/ConfirmarFotoVistoria";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

import {
  obterCoordenadasAtuais,
  useLocalizacaoAtual,
} from "@/hooks/use-localizacao-atual";
import { useRelogioGlobal } from "@/hooks/use-relogio-global";

import { useConexao } from "@/providers/ConexaoProvider";
import { useVistoriaStore } from "@/stores/use-vistoria-store";

import { aplicarVistoriaDaApi } from "@/db/sincronizacao";

import {
  enfileirarConclusaoVistoria,
  enviarConclusaoVistoria,
  ConflitoConclusaoVistoriaError,
} from "@/services/sincronizacao-offline";

function abreviarDescricao(descricao: string) {
  return descricao.length > 20 ? `${descricao.slice(0, 20)}...` : descricao;
}

export default function PaginaInicial() {
  const router = useRouter();
  const { dataAtual, horarioAtual } = useRelogioGlobal();
  const vistoriaAtiva = useVistoriaStore((estado) => estado.vistoriaAtiva);
  const limparVistoriaAtiva = useVistoriaStore(
    (estado) => estado.limparVistoriaAtiva,
  );
  const possuiVistoriaAtiva = Boolean(vistoriaAtiva);
  const [fotoParaConfirmar, setFotoParaConfirmar] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [estaConcluindo, setEstaConcluindo] = useState(false);
  const coordenadasAtuais = useLocalizacaoAtual();
  const { estaOnline, estadoConexao } = useConexao();

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

    if (estadoConexao === "verificando") {
      Alert.alert(
        "Verificando conexão",
        "Aguarde um instante antes de concluir a vistoria.",
      );
      return;
    }

    setEstaConcluindo(true);

    try {
      const completedAt = new Date().toISOString();
      const localizacao = await obterCoordenadasAtuais();
      const mimeType = fotoParaConfirmar.mimeType ?? "image/jpeg";
      const nomeArquivo =
        fotoParaConfirmar.fileName ?? `vistoria-${vistoriaAtiva.id}.jpg`;
      const dadosConclusao = {
        completedAt,
        fotoMimeType: mimeType,
        fotoNome: nomeArquivo,
        fotoUri: fotoParaConfirmar.uri,
        id: vistoriaAtiva.id,
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
      };

      if (estaOnline) {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          throw new Error(
            "Sua sessão expirou. Entre novamente para concluir a vistoria.",
          );
        }

        const vistoriaConcluida = await enviarConclusaoVistoria(
          dadosConclusao,
          token,
        );
        await aplicarVistoriaDaApi(vistoriaConcluida);
        Alert.alert(
          "Vistoria concluída",
          "A foto e a localização foram enviadas.",
        );
      } else {
        await enfileirarConclusaoVistoria(dadosConclusao);
        Alert.alert(
          "Vistoria salva",
          "A foto e a localização serão sincronizadas quando a conexão for restabelecida.",
        );
      }

      limparVistoriaAtiva();
      setFotoParaConfirmar(null);
    } catch (error) {
      console.error("Não foi possível concluir a vistoria.", error);
      if (error instanceof ConflitoConclusaoVistoriaError) {
        await aplicarVistoriaDaApi(error.vistoria);
        limparVistoriaAtiva();
        setFotoParaConfirmar(null);
        Alert.alert("Vistoria já concluída", error.message);
        return;
      }
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
            onSelecionarVistoria={() => router.push("/vistorias")}
            possuiVistoriaAtiva={possuiVistoriaAtiva}
          />
        </Box>

        {vistoriaAtiva ? (
          <Box className="mx-6 mt-6 rounded-xl border border-vistoria-borda bg-vistoria-superficie p-5">
            <Text className="text-xl font-bold text-vistoria-titulo">
              Resumo da vistoria
            </Text>
            <Text className="mt-3 text-base leading-6 text-vistoria-auxiliar">
              {vistoriaAtiva.titulo}
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
