import { IndicadorConexao } from "@/components/IndicadorConexao";
import { AvisoSemVistorias } from "@/components/ItensVazios/AvisoSemVistorias";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

export interface Vistoria {
  id: string;
  description: string;
  pendente: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Busca todas as vistorias disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de vistorias cadastradas.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarVistorias = async (token: string) => {
  const response = await fetch("/api/vistorias", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar as vistorias.");
  }

  return response.json() as Promise<Vistoria[]>;
};

export default function PaginaVistorias() {
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
                Vistorias
              </Text>
              <Text className="mt-2 text-base leading-6 text-vistoria-auxiliar">
                Acompanhe as vistorias pendentes e consulte os detalhes do
                atendimento.
              </Text>
            </Box>
            <IndicadorConexao />
          </Box>
        </Box>

        <Box className="px-6 pt-6">
          <Text className="text-xl font-bold text-vistoria-titulo">
            Vistorias pendentes
          </Text>
          <Box className="mt-4">
            <AvisoSemVistorias />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}
