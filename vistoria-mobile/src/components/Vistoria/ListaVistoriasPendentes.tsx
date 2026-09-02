import { ChevronDown, ClipboardCheck } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { CoresVistoria } from '@/constants/theme'

interface IVistoriaPendente {
  id: string
}

const vistoriasPendentes: IVistoriaPendente[] = [{ id: 'pendente-1' }, { id: 'pendente-2' }]

export function ListaVistoriasPendentes() {
  const [vistoriaExpandida, setVistoriaExpandida] = useState<string | null>(null)

  const alternarVistoria = (id: string) => {
    setVistoriaExpandida((vistoriaAtual) => (vistoriaAtual === id ? null : id))
  }

  return (
    <View style={styles.lista}>
      {vistoriasPendentes.map((vistoria) => {
        const estaExpandida = vistoriaExpandida === vistoria.id

        return (
          <View key={vistoria.id} style={styles.item}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: estaExpandida }}
              onPress={() => alternarVistoria(vistoria.id)}
              style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
              <ClipboardCheck color={CoresVistoria.marca} size={24} strokeWidth={2} />
              <View style={styles.informacoes}>
                <Text style={styles.titulo}>Vistoria pendente</Text>
                <Text style={styles.status}>Aguardando atendimento</Text>
              </View>
              <ChevronDown
                color={CoresVistoria.textoAuxiliar}
                size={22}
                style={estaExpandida ? styles.iconeExpandido : undefined}
              />
            </Pressable>

            {estaExpandida ? (
              <View style={styles.detalhes}>
                <Text style={styles.detalhesTitulo}>Detalhes da vistoria</Text>
                <Text style={styles.detalhesDescricao}>
                  As informações do atendimento serão exibidas nesta área.
                </Text>
              </View>
            ) : null}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  lista: {
    gap: 12,
  },
  item: {
    backgroundColor: CoresVistoria.superficie,
    borderColor: CoresVistoria.borda,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  botao: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  botaoPressionado: {
    backgroundColor: CoresVistoria.fundo,
  },
  informacoes: {
    flex: 1,
  },
  titulo: {
    color: CoresVistoria.titulo,
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 14,
    marginTop: 4,
  },
  iconeExpandido: {
    transform: [{ rotate: '180deg' }],
  },
  detalhes: {
    borderTopColor: CoresVistoria.borda,
    borderTopWidth: 1,
    padding: 16,
  },
  detalhesTitulo: {
    color: CoresVistoria.titulo,
    fontSize: 16,
    fontWeight: '600',
  },
  detalhesDescricao: {
    color: CoresVistoria.textoAuxiliar,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
})
