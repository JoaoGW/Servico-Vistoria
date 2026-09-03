import { Asset } from 'expo-asset'
import { readAsStringAsync } from 'expo-file-system/legacy'
import { useEffect, useState } from 'react'
import { LeafletView } from 'react-native-leaflet-view'

import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'

const ARQUIVO_LEAFLET = require('../../../assets/leaflet.html')
const POSICAO_INICIAL_NEUTRA = { lat: 0, lng: 0 }

export function MapaDaVistoria() {
  const [conteudoMapa, setConteudoMapa] = useState<string | null>(null)

  useEffect(() => {
    let estaMontado = true

    const carregarMapa = async () => {
      const assetMapa = Asset.fromModule(ARQUIVO_LEAFLET)

      await assetMapa.downloadAsync()

      if (assetMapa.localUri && estaMontado) {
        const conteudo = await readAsStringAsync(assetMapa.localUri)

        if (estaMontado) {
          setConteudoMapa(conteudo)
        }
      }
    }

    void carregarMapa()

    return () => {
      estaMontado = false
    }
  }, [])

  if (!conteudoMapa) {
    return (
      <Box className="min-h-[380px] flex-1 items-center justify-center border-y border-vistoria-borda bg-vistoria-fundo px-6">
        <Text className="text-base text-vistoria-auxiliar">Carregando mapa...</Text>
      </Box>
    )
  }

  return (
    <Box className="min-h-[380px] flex-1 overflow-hidden border-y border-vistoria-borda">
      <LeafletView
        doDebug={false}
        mapCenterPosition={POSICAO_INICIAL_NEUTRA}
        source={{ html: conteudoMapa }}
        zoom={2}
      />
    </Box>
  )
}
