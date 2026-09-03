import { CircleCheck, X } from "lucide-react-native";
import { Modal } from "react-native";

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

interface SuccessModalProps {
  title: string;
  message: string;
  actionLabel: string;
  onClose: () => void;
}

export default function SuccessModal({
  actionLabel,
  message,
  onClose,
  title,
}: SuccessModalProps) {
  return (
    <Modal animationType="fade" transparent visible onRequestClose={onClose}>
      <Box className="flex-1 items-center justify-center bg-vistoria-titulo/65 px-4 py-6">
        <Box
          accessibilityViewIsModal
          className="w-full max-w-md rounded-2xl bg-vistoria-superficie p-6"
        >
          <Box className="flex-row items-start justify-between gap-4">
            <Box className="flex-1 flex-row items-start gap-3">
              <Icon as={CircleCheck} className="mt-0.5 text-green-700" size="2xl" />
              <Text className="flex-1 text-2xl font-bold text-vistoria-titulo">
                {title}
              </Text>
            </Box>

            <Pressable
              accessibilityLabel="Fechar aviso de sucesso"
              accessibilityRole="button"
              className="h-11 w-11 items-center justify-center rounded-lg data-[active=true]:bg-vistoria-fundo"
              onPress={onClose}
            >
              <Icon as={X} className="text-vistoria-auxiliar" size="lg" />
            </Pressable>
          </Box>

          <Box className="mt-6 border-y border-vistoria-borda py-5">
            <Text className="text-base leading-6 text-vistoria-auxiliar">
              {message}
            </Text>
          </Box>

          <Box className="mt-6 flex-row justify-end">
            <Pressable
              accessibilityLabel={actionLabel}
              accessibilityRole="button"
              className="h-12 items-center justify-center rounded-lg bg-vistoria-marca px-5 data-[active=true]:bg-vistoria-marca-pressionada"
              onPress={onClose}
            >
              <Text className="text-base font-bold text-white">{actionLabel}</Text>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
