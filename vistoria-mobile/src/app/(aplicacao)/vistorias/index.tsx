import { AvisoSemVistorias } from '@/components/Vistoria/AvisoSemVistorias'
import { Box } from '@/components/ui/box'
import { ScrollView } from '@/components/ui/scroll-view'
import { Text } from '@/components/ui/text'

export default function PaginaVistorias() {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Box className="flex-1 pb-8">
        <Box className="border-b border-vistoria-borda bg-vistoria-superficie px-6 pb-6 pt-5">
          <Text className="text-xs font-bold tracking-[2px] text-vistoria-marca">PEACORE</Text>
          <Text className="mt-2 text-[30px] font-bold text-vistoria-titulo">Vistorias</Text>
          <Text className="mt-2 text-base leading-6 text-vistoria-auxiliar">
            Acompanhe as vistorias pendentes e consulte os detalhes do atendimento.
          </Text>
        </Box>

        <Box className="px-6 pt-6">
          <Text className="text-xl font-bold text-vistoria-titulo">Vistorias pendentes</Text>
          <Box className="mt-4">
            <AvisoSemVistorias />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
}
