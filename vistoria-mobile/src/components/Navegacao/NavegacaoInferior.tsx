import { ClipboardCheck, FileText, House } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { CoresVistoria } from '@/constants/theme'

const itensNavegacao = [
  { icone: House, selecionado: true, titulo: 'Home' },
  { icone: ClipboardCheck, selecionado: false, titulo: 'Vistoria' },
  { icone: FileText, selecionado: false, titulo: 'Documentos' },
]

export function NavegacaoInferior() {
  return (
    <View accessibilityRole="tablist" style={styles.navegacao}>
      {itensNavegacao.map((item) => {
        const Icone = item.icone
        const cor = item.selecionado ? CoresVistoria.marca : CoresVistoria.textoAuxiliar

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: item.selecionado }}
            key={item.titulo}
            onPress={() => {}}
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
            <Icone color={cor} size={24} strokeWidth={2} />
            <Text style={[styles.texto, item.selecionado && styles.textoSelecionado]}>{item.titulo}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  navegacao: {
    backgroundColor: CoresVistoria.superficie,
    borderTopColor: CoresVistoria.borda,
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 72,
  },
  botao: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 56,
  },
  botaoPressionado: {
    backgroundColor: CoresVistoria.fundo,
  },
  texto: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 12,
    fontWeight: '600',
  },
  textoSelecionado: {
    color: CoresVistoria.marca,
  },
})
