import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import { CircleCheck } from "lucide-react-native";

interface IBotaoConcluirVistoriaProps {
  estaConcluindo: boolean;
  onPress: () => void;
  possuiVistoriaAtiva: boolean;
}

export function BotaoConcluirVistoria({
  estaConcluindo,
  onPress,
  possuiVistoriaAtiva,
}: IBotaoConcluirVistoriaProps) {
  const estaDesabilitado = !possuiVistoriaAtiva || estaConcluindo;

  return (
    <Pressable
      accessibilityLabel={
        possuiVistoriaAtiva ? "Concluir vistoria" : "Selecione uma vistoria"
      }
      accessibilityRole="button"
      accessibilityState={{ busy: estaConcluindo, disabled: estaDesabilitado }}
      className="h-14 flex-row items-center justify-center gap-3 rounded-xl bg-vistoria-marca data-[active=true]:bg-vistoria-marca-pressionada data-[disabled=true]:bg-vistoria-marca data-[disabled=true]:opacity-100"
      disabled={estaDesabilitado}
      onPress={onPress}
    >
      <Icon as={CircleCheck} className="text-white" size="xl" />
      <Text className="text-lg font-bold text-white">
        {estaConcluindo
          ? "Concluindo vistoria..."
          : possuiVistoriaAtiva
            ? "Concluir vistoria"
            : "Selecione uma vistoria"}
      </Text>
    </Pressable>
  );
}
