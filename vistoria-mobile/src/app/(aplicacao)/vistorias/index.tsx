import AsyncStorage from "@react-native-async-storage/async-storage";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

import { IndicadorConexao } from "@/components/IndicadorConexao";
import { AvisoSemVistorias } from "@/components/ItensVazios/AvisoSemVistorias";
import { ListaVistorias } from "@/components/ListaVistorias";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { database } from "@/db";
import { VistoriaModel } from "@/db/models/Vistoria";
import { sincronizarVistorias } from "@/db/sincronizacao";
import type { VistoriaApi } from "@/db/types";

/**
 * Busca todas as vistorias disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de vistorias cadastradas.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarVistorias = async (token: string) => {
  const response = await fetch("/api/vistorias/verVistorias", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar as vistorias.");
  }

  return response.json() as Promise<VistoriaApi[]>;
};

export default function PaginaVistorias() {
  const [vistorias, setVistorias] = useState<VistoriaModel[]>([]);

  useEffect(() => {
    const inscricao = database
      .get<VistoriaModel>("vistorias")
      .query(Q.where("pendente", true))
      .observe()
      .subscribe(setVistorias);

    return () => inscricao.unsubscribe();
  }, []);

  useEffect(() => {
    const atualizarVistorias = async () => {
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      try {
        const vistoriasApi = await visualizarVistorias(token);
        await sincronizarVistorias(vistoriasApi);
      } catch (error) {
        console.error("Não foi possível atualizar as vistorias locais.", error);
      }
    };

    void atualizarVistorias();
  }, []);

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
            {vistorias.length ? (
              <ListaVistorias vistorias={vistorias} />
            ) : (
              <AvisoSemVistorias />
            )}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}
