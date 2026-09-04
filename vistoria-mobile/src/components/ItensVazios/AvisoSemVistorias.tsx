import { AvisoSemRegistros } from "@/components/ItensVazios/AvisoSemRegistros";

import { CircleAlert } from "lucide-react-native";

/**
 * Exibe o aviso de que não há vistorias cadastradas.
 * @returns Retorna o estado vazio específico para vistorias.
 */
export function AvisoSemVistorias() {
  return (
    <AvisoSemRegistros
      icone={CircleAlert}
      mensagem="Não há vistorias cadastradas ainda."
    />
  );
}
