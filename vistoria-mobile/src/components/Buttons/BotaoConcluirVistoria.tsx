import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import { CircleCheck } from "lucide-react-native";

interface IBotaoConcluirVistoriaProps {
  possuiVistoriaAtiva: boolean;
}

export function BotaoConcluirVistoria({
  possuiVistoriaAtiva,
}: IBotaoConcluirVistoriaProps) {
  return (
    <Pressable
      accessibilityLabel={
        possuiVistoriaAtiva ? "Concluir vistoria" : "Selecione uma vistoria"
      }
      accessibilityRole="button"
      onPress={() => {}}
      className="h-14 flex-row items-center justify-center rounded-xl bg-vistoria-marca gap-3 data-[active=true]:bg-vistoria-marca-pressionada"
    >
      <Icon as={CircleCheck} className="text-white" size="xl" />
      <Text className="text-lg font-bold text-white">
        {possuiVistoriaAtiva ? "Concluir vistoria" : "Selecione uma vistoria"}
      </Text>
    </Pressable>
  );
}
