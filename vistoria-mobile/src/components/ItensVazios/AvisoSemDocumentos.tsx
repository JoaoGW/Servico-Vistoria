import { FileWarning } from 'lucide-react-native'

import { AvisoSemRegistros } from '@/components/ItensVazios/AvisoSemRegistros'

export function AvisoSemDocumentos() {
  return <AvisoSemRegistros icone={FileWarning} mensagem="Não há documentos cadastrados ainda." />
}
