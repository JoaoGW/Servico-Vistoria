import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import type { LucideIcon } from "lucide-react-native";

interface IAvisoSemRegistrosProps {
  icone: LucideIcon;
  mensagem: string;
}

export function AvisoSemRegistros({
  icone,
  mensagem,
}: IAvisoSemRegistrosProps) {
  return (
    <Box
      accessibilityRole="alert"
      className="flex-row items-center rounded-xl border border-vistoria-borda bg-vistoria-superficie p-4"
    >
      <Icon as={icone} className="mr-3 text-vistoria-marca" size="lg" />
      <Text className="flex-1 text-base leading-6 text-vistoria-auxiliar">
        {mensagem}
      </Text>
    </Box>
  );
}
