import { ActivityIndicator, Modal } from "react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

interface IModalSincronizacaoProps {
  visivel: boolean;
}

export function ModalSincronizacao({ visivel }: IModalSincronizacaoProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visivel}
      onRequestClose={() => undefined}
    >
      <Box className="flex-1 items-center justify-center bg-vistoria-titulo/65 px-6">
        <Box
          accessibilityLabel="Sincronizando vistorias e documentos"
          accessibilityRole="progressbar"
          accessibilityViewIsModal
          className="w-full max-w-sm items-center rounded-2xl bg-vistoria-superficie p-7"
        >
          <ActivityIndicator color="#0f5b78" size="large" />
          <Text className="mt-5 text-center text-lg font-bold text-vistoria-titulo">
            Sincronizando vistorias e documentos...
          </Text>
        </Box>
      </Box>
    </Modal>
  );
}
