import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import { File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { IndicadorConexao } from "@/components/IndicadorConexao";
import { AvisoSemDocumentos } from "@/components/ItensVazios/AvisoSemDocumentos";
import { ListaDocumentos } from "@/components/ListaDocumentos";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

import { database } from "@/db";
import { DocumentoModel } from "@/db/models/Documento";

function obterNomeSeguroArquivo(documento: DocumentoModel) {
  const nome = documento.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

  return nome || `documento-${documento.id}`;
}

export default function PaginaDocumentos() {
  const [documentos, setDocumentos] = useState<DocumentoModel[]>([]);
  const [documentoAbrindoId, setDocumentoAbrindoId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const inscricao = database
      .get<DocumentoModel>("documentos")
      .query()
      .observe()
      .subscribe(setDocumentos);

    return () => inscricao.unsubscribe();
  }, []);

  const abrirDocumento = async (documento: DocumentoModel) => {
    setDocumentoAbrindoId(documento.id);

    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Sua sessão expirou. Entre novamente para abrir o documento.",
        );
      }

      const response = await fetch(`/api/documentos/${documento.id}/arquivo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const respostaErro = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        throw new Error(
          respostaErro?.error ?? "Não foi possível baixar o documento.",
        );
      }

      const arquivo = new File(
        Paths.cache,
        `${documento.id}-${obterNomeSeguroArquivo(documento)}`,
      );
      arquivo.write(new Uint8Array(await response.arrayBuffer()));

      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(arquivo.uri);

        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: documento.fileMimeType || "application/octet-stream",
        });
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        throw new Error(
          "Não há um visualizador de arquivos disponível neste dispositivo.",
        );
      }

      await Sharing.shareAsync(arquivo.uri, {
        dialogTitle: "Abrir documento",
        mimeType: documento.fileMimeType || "application/octet-stream",
      });
    } catch (error) {
      console.error("Não foi possível abrir o documento.", error);
      Alert.alert(
        "Não foi possível abrir o documento",
        error instanceof Error
          ? error.message
          : "Tente novamente em alguns instantes.",
      );
    } finally {
      setDocumentoAbrindoId(null);
    }
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Box className="flex-1 pb-8">
        <Box className="border-b border-vistoria-borda bg-vistoria-superficie px-6 pb-6 pt-5">
          <Box className="flex-row items-start justify-between">
            <Box className="flex-1 pr-4">
              <Text className="text-xs font-bold tracking-[2px] text-vistoria-marca">
                PEACORE
              </Text>
              <Text className="mt-2 text-[30px] font-bold text-vistoria-titulo">
                Documentos
              </Text>
              <Text className="mt-2 text-base leading-6 text-vistoria-auxiliar">
                Consulte os documentos relacionados à vistoria selecionada.
              </Text>
            </Box>
            <IndicadorConexao />
          </Box>
        </Box>

        <Box className="px-6 pt-6">
          <Text className="text-xl font-bold text-vistoria-titulo">
            Documentos técnicos de suporte
          </Text>
          <Box className="mt-4">
            {documentos.length ? (
              <ListaDocumentos
                documentos={documentos}
                documentoAbrindoId={documentoAbrindoId}
                onAbrirDocumento={abrirDocumento}
              />
            ) : (
              <AvisoSemDocumentos />
            )}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}
