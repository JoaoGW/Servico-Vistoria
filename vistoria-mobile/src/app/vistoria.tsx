import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NavegacaoInferior } from '@/components/Navegacao/NavegacaoInferior'
import { ListaVistoriasPendentes } from '@/components/Vistoria/ListaVistoriasPendentes'
import { CoresVistoria } from '@/constants/theme'

export default function VistoriaScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.areaSegura}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
          <View style={styles.cabecalho}>
            <Text style={styles.marca}>PEACORE</Text>
            <Text style={styles.titulo}>Vistorias</Text>
            <Text style={styles.descricao}>
              Acompanhe as vistorias pendentes e consulte os detalhes do atendimento.
            </Text>
          </View>

          <View style={styles.listaContainer}>
            <Text style={styles.subtitulo}>Vistorias pendentes</Text>
            <ListaVistoriasPendentes />
          </View>
        </ScrollView>

        <NavegacaoInferior abaAtiva="vistoria" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  areaSegura: {
    backgroundColor: CoresVistoria.fundo,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  conteudo: {
    paddingBottom: 24,
  },
  cabecalho: {
    backgroundColor: CoresVistoria.superficie,
    borderBottomColor: CoresVistoria.borda,
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  marca: {
    color: CoresVistoria.marca,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  titulo: {
    color: CoresVistoria.titulo,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 4,
  },
  descricao: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  listaContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  subtitulo: {
    color: CoresVistoria.titulo,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
})
