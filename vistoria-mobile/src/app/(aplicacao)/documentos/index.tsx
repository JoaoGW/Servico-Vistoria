import { IndicadorConexao } from "@/components/IndicadorConexao";
import { AvisoSemDocumentos } from "@/components/ItensVazios/AvisoSemDocumentos";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

export interface Documento {
  createdAt: string;
  fileMimeType:
    | "application/pdf"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  fileName: string;
  id: string;
  title: string;
}

/**
 * Busca todos os documentos disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de documentos cadastrados.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarDocumentos = async (token: string) => {
  const response = await fetch("/api/documentos/recuperarDocumentos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar os documentos.");
  }

  return response.json() as Promise<Documento[]>;
};

export default function PaginaDocumentos() {
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
            <AvisoSemDocumentos />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}
