import { AvisoSemRegistros } from "@/components/ItensVazios/AvisoSemRegistros";

import { CircleAlert } from "lucide-react-native";

export function AvisoSemVistorias() {
  return (
    <AvisoSemRegistros
      icone={CircleAlert}
      mensagem="Não há vistorias cadastradas ainda."
    />
  );
}
