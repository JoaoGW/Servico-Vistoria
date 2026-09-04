import { FileWarning } from 'lucide-react-native'

import { AvisoSemRegistros } from '@/components/ItensVazios/AvisoSemRegistros'

/**
 * Exibe o aviso de que não há documentos disponíveis.
 * @returns Retorna o estado vazio específico para documentos.
 */
export function AvisoSemDocumentos() {
  return <AvisoSemRegistros icone={FileWarning} mensagem="Não há documentos cadastrados ainda." />
}
