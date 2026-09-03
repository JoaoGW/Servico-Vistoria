import { Image, Modal } from "react-native";

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import { Camera, CircleCheck, X } from "lucide-react-native";

interface IConfirmarFotoVistoriaProps {
  carregando: boolean;
  fotoUri: string;
  onCancelar: () => void;
  onConfirmar: () => void;
  onTirarOutra: () => void;
}

export function ConfirmarFotoVistoria({
  carregando,
  fotoUri,
  onCancelar,
  onConfirmar,
  onTirarOutra,
}: IConfirmarFotoVistoriaProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={carregando ? undefined : onCancelar}
    >
      <Box className="flex-1 justify-end bg-vistoria-titulo/65">
        <Box className="rounded-t-3xl bg-vistoria-superficie px-6 pb-8 pt-6">
          <Box className="flex-row items-start justify-between gap-4">
            <Box className="flex-1">
              <Text className="text-2xl font-bold text-vistoria-titulo">
                Confirmar foto
              </Text>
              <Text className="mt-2 text-base leading-6 text-vistoria-auxiliar">
                Confira a foto do trabalho realizado antes de concluir a vistoria.
              </Text>
            </Box>
            <Pressable
              accessibilityLabel="Cancelar foto"
              accessibilityRole="button"
              className="h-11 w-11 items-center justify-center rounded-lg data-[active=true]:bg-vistoria-fundo data-[disabled=true]:opacity-40"
              disabled={carregando}
              onPress={onCancelar}
            >
              <Icon as={X} className="text-vistoria-auxiliar" size="lg" />
            </Pressable>
          </Box>

          <Image
            accessibilityLabel="Foto capturada para conclusão da vistoria"
            source={{ uri: fotoUri }}
            style={{ borderRadius: 16, height: 320, marginTop: 20, width: "100%" }}
          />

          <Text className="mt-4 text-sm leading-5 text-vistoria-auxiliar">
            Ao confirmar, sua localização atual será registrada junto com a foto.
          </Text>

          <Box className="mt-6 gap-3">
            <Pressable
              accessibilityLabel="Tirar outra foto"
              accessibilityRole="button"
              className="h-14 flex-row items-center justify-center gap-2 rounded-xl border border-vistoria-marca data-[active=true]:bg-vistoria-fundo data-[disabled=true]:opacity-40"
              disabled={carregando}
              onPress={onTirarOutra}
            >
              <Icon as={Camera} className="text-vistoria-marca" size="lg" />
              <Text className="text-base font-bold text-vistoria-marca">
                Tirar outra foto
              </Text>
            </Pressable>

            <Pressable
              accessibilityLabel="Confirmar foto e concluir vistoria"
              accessibilityRole="button"
              accessibilityState={{ busy: carregando, disabled: carregando }}
              className="h-14 flex-row items-center justify-center gap-2 rounded-xl bg-vistoria-marca data-[active=true]:bg-vistoria-marca-pressionada data-[disabled=true]:opacity-60"
              disabled={carregando}
              onPress={onConfirmar}
            >
              <Icon as={CircleCheck} className="text-white" size="lg" />
              <Text className="text-base font-bold text-white">
                {carregando ? "Concluindo..." : "Confirmar e concluir"}
              </Text>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
