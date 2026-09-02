import { ClipboardCheck, FileText, House } from 'lucide-react-native'
import { type Href, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { CoresVistoria } from '@/constants/theme'

interface INavegacaoInferiorProps {
  abaAtiva: 'home' | 'vistoria' | 'documentos'
}

interface IItemNavegacao {
  destino?: Href
  icone: typeof House
  identificador: INavegacaoInferiorProps['abaAtiva']
  titulo: string
}

const itensNavegacao = [
  { destino: '/', icone: House, identificador: 'home', titulo: 'Home' },
  { destino: '/vistoria', icone: ClipboardCheck, identificador: 'vistoria', titulo: 'Vistoria' },
  { icone: FileText, identificador: 'documentos', titulo: 'Documentos' },
] satisfies IItemNavegacao[]

export function NavegacaoInferior({ abaAtiva }: INavegacaoInferiorProps) {
  const router = useRouter()

  return (
    <View accessibilityRole="tablist" style={styles.navegacao}>
      {itensNavegacao.map((item) => {
        const Icone = item.icone
        const selecionado = item.identificador === abaAtiva
        const cor = selecionado ? CoresVistoria.marca : CoresVistoria.textoAuxiliar

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionado }}
            key={item.titulo}
            onPress={() => {
              if (item.destino) {
                router.push(item.destino)
              }
            }}
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
            <Icone color={cor} size={24} strokeWidth={2} />
            <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>{item.titulo}</Text>
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
