import { BotaoConcluirVistoria } from "@/components/Buttons/BotaoConcluirVistoria";
import { MapaDaVistoria } from "@/components/Home/MapaDaVistoria.native";
import { IndicadorConexao } from "@/components/IndicadorConexao";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

import { useRelogioGlobal } from "@/hooks/use-relogio-global";

import { useVistoriaStore } from "@/stores/use-vistoria-store";

export default function PaginaInicial() {
  const { dataAtual, horarioAtual } = useRelogioGlobal();
  const vistoriaAtiva = useVistoriaStore((estado) => estado.vistoriaAtiva);
  const possuiVistoriaAtiva = Boolean(vistoriaAtiva);

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

        <MapaDaVistoria />

        <Box className="flex-row items-end justify-between bg-vistoria-superficie px-6 py-8">
          <Text className="text-[64px] font-bold leading-none text-vistoria-marca">
            {horarioAtual}
          </Text>
          <Box className="ml-4 items-end pb-1">
            <Text className="text-lg font-bold text-vistoria-marca">
              {dataAtual}
            </Text>
            <Text className="mt-2 text-sm font-semibold text-vistoria-titulo">
              {vistoriaAtiva?.titulo ?? "Nenhum vistoria selecionada"}
            </Text>
          </Box>
        </Box>

        <Box className="px-6 pt-6">
          <BotaoConcluirVistoria possuiVistoriaAtiva={possuiVistoriaAtiva} />
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
    </ScrollView>
  );
}
