import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useConexao } from "@/providers/ConexaoProvider";

import { RefreshCw, Wifi, WifiOff } from "lucide-react-native";

/**
 * Exibe o estado da conexão e uma ação manual para sincronizar os dados.
 * @returns Retorna o indicador de rede e o botão de sincronização.
 */
export function IndicadorConexao() {
  const { estadoConexao, sincronizarAgora } = useConexao();
  const estaOffline = estadoConexao === "offline";
  const podeSincronizar = estadoConexao === "online";

  return (
    <Box className="flex-row items-center gap-2 pt-1">
      <Box
        accessibilityLabel={
          estaOffline ? "Sem conexão com a internet" : "Conexão com a internet"
        }
        accessibilityRole="image"
      >
        <Icon
          as={estaOffline ? WifiOff : Wifi}
          className={estaOffline ? "text-red-700" : "text-vistoria-marca"}
          size="xl"
        />
      </Box>

      <Pressable
        accessibilityLabel="Sincronizar vistorias e documentos"
        accessibilityRole="button"
        accessibilityState={{ disabled: !podeSincronizar }}
        className="h-11 w-11 items-center justify-center rounded-lg data-[active=true]:bg-vistoria-fundo data-[disabled=true]:opacity-40"
        disabled={!podeSincronizar}
        onPress={() => {
          void sincronizarAgora();
        }}
      >
        <Icon as={RefreshCw} className="text-vistoria-marca" size="xl" />
      </Pressable>
    </Box>
  );
}
