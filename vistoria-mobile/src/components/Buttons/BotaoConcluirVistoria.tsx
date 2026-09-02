import { CircleCheck } from 'lucide-react-native'
import { Pressable, StyleSheet, Text } from 'react-native'

import { CoresVistoria } from '@/constants/theme'

interface IBotaoConcluirVistoriaProps {
  possuiVistoriaAtiva: boolean
}

export function BotaoConcluirVistoria({ possuiVistoriaAtiva }: IBotaoConcluirVistoriaProps) {
  const texto = possuiVistoriaAtiva ? 'Concluir vistoria' : 'Selecione uma vistoria'

  return (
    <Pressable
      accessibilityLabel={texto}
      accessibilityRole="button"
      onPress={() => {}}
      style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
      <CircleCheck color={CoresVistoria.superficie} size={24} strokeWidth={2.5} />
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  botao: {
    alignItems: 'center',
    backgroundColor: CoresVistoria.marca,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    height: 56,
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: CoresVistoria.marcaPressionada,
  },
  texto: {
    color: CoresVistoria.superficie,
    fontSize: 18,
    fontWeight: '700',
  },
})
