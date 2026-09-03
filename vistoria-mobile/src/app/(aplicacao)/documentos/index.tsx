import { AvisoSemDocumentos } from "@/components/EstadosVazios/AvisoSemDocumentos";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

export default function PaginaDocumentos() {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Box className="flex-1 pb-8">
        <Box className="border-b border-vistoria-borda bg-vistoria-superficie px-6 pb-6 pt-5">
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
