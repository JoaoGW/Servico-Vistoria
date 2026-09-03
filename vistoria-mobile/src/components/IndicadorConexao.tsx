import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { useConexao } from "@/providers/ConexaoProvider";

import { Wifi, WifiOff } from "lucide-react-native";

export function IndicadorConexao() {
  const { estadoConexao } = useConexao();
  const estaOffline = estadoConexao === "offline";

  return (
    <Box
      accessibilityLabel={
        estaOffline ? "Sem conexão com a internet" : "Conexão com a internet"
      }
      accessibilityRole="image"
      className="pt-1"
    >
      <Icon
        as={estaOffline ? WifiOff : Wifi}
        className={estaOffline ? "text-red-700" : "text-vistoria-marca"}
        size="xl"
      />
    </Box>
  );
}
