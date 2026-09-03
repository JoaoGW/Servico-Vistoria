import { CircleAlert } from 'lucide-react-native'

import { AvisoSemRegistros } from '@/components/EstadosVazios/AvisoSemRegistros'

export function AvisoSemVistorias() {
  return <AvisoSemRegistros icone={CircleAlert} mensagem="Não há vistorias cadastradas ainda." />
}
