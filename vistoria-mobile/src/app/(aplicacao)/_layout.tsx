import { Slot, usePathname } from 'expo-router'

import { NavegacaoInferior } from '@/components/Navegacao/NavegacaoInferior'
import { Box } from '@/components/ui/box'
import { SafeAreaView } from '@/components/ui/safe-area-view'

function obterAbaAtiva(caminho: string) {
  if (caminho.startsWith('/vistorias')) {
    return 'vistoria' as const
  }

  if (caminho.startsWith('/documentos')) {
    return 'documentos' as const
  }

  return 'home' as const
}

export default function LayoutAplicacao() {
  const caminho = usePathname()

  return (
    <SafeAreaView className="flex-1 bg-vistoria-fundo" edges={['top', 'bottom']}>
      <Box className="flex-1">
        <Slot />
      </Box>
      <NavegacaoInferior abaAtiva={obterAbaAtiva(caminho)} />
    </SafeAreaView>
  )
}
