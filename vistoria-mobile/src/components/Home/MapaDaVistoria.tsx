import { MapPinned } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { CoresVistoria } from '@/constants/theme'

export function MapaDaVistoria() {
  return (
    <View accessibilityLabel="Área reservada para o mapa da vistoria" style={styles.mapa}>
      <MapPinned color={CoresVistoria.marca} size={36} strokeWidth={1.75} />
      <Text style={styles.titulo}>Mapa da vistoria</Text>
      <Text style={styles.descricao}>A localização será exibida aqui.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mapa: {
    alignItems: 'center',
    backgroundColor: CoresVistoria.fundo,
    borderBottomColor: CoresVistoria.borda,
    borderBottomWidth: 1,
    borderTopColor: CoresVistoria.borda,
    borderTopWidth: 1,
    height: 264,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titulo: {
    color: CoresVistoria.titulo,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  descricao: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
})
