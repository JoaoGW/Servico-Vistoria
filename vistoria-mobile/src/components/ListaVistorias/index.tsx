import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import type { VistoriaModel } from "@/db/models/Vistoria";
import { useVistoriaStore } from "@/stores/use-vistoria-store";
import { CircleCheck, Clock3 } from "lucide-react-native";

interface IListaVistoriasProps {
  vistorias: VistoriaModel[];
}

/**
 * Exibe as vistorias e permite definir qual delas está ativa.
 * @param props - Vistorias que serão listadas para seleção.
 * @returns Retorna a lista de vistorias renderizada.
 */
export function ListaVistorias({ vistorias }: IListaVistoriasProps) {
  const vistoriaAtiva = useVistoriaStore((estado) => estado.vistoriaAtiva);
  const selecionarVistoria = useVistoriaStore(
    (estado) => estado.selecionarVistoria,
  );
  const limparVistoriaAtiva = useVistoriaStore(
    (estado) => estado.limparVistoriaAtiva,
  );

  return (
    <Box className="gap-3">
      {vistorias.map((vistoria) => {
        const estaSelecionada = vistoriaAtiva?.id === vistoria.id;

        return (
          <Pressable
            key={vistoria.id}
            accessibilityLabel={`Selecionar vistoria: ${vistoria.description}`}
            accessibilityRole="button"
            accessibilityState={{ selected: estaSelecionada }}
            className={`rounded-xl border p-4 data-[active=true]:bg-vistoria-fundo ${
              estaSelecionada
                ? "border-vistoria-marca bg-vistoria-fundo"
                : "border-vistoria-borda bg-vistoria-superficie"
            }`}
            onPress={() => {
              if (estaSelecionada) {
                limparVistoriaAtiva();
                return;
              }

              selecionarVistoria({
                id: vistoria.id,
                titulo: vistoria.description,
              });
            }}
          >
            <Box className="flex-row items-start justify-between gap-4">
              <Box className="flex-1">
                <Text className="text-base font-bold text-vistoria-titulo">
                  {vistoria.description}
                </Text>
                <Box className="mt-3 self-start flex-row items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1">
                  <Icon as={Clock3} className="text-amber-800" size="sm" />
                  <Text className="text-xs font-extrabold uppercase tracking-[1px] text-amber-800">
                    {vistoria.pendente ? "Pendente" : "Concluída"}
                  </Text>
                </Box>
              </Box>

              {estaSelecionada ? (
                <Box className="flex-row items-center gap-1 rounded-full bg-vistoria-marca/10 px-2 py-1">
                  <Icon
                    as={CircleCheck}
                    className="text-vistoria-marca"
                    size="sm"
                  />
                  <Text className="text-xs font-bold text-vistoria-marca">
                    Ativa
                  </Text>
                </Box>
              ) : null}
            </Box>

            {vistoria.latitude !== null && vistoria.longitude !== null ? (
              <Text className="mt-3 text-sm text-vistoria-auxiliar">
                Localização: {vistoria.latitude}, {vistoria.longitude}
              </Text>
            ) : null}
            <Text className="mt-1 text-sm text-vistoria-auxiliar">
              Criada em {vistoria.createdAt.toLocaleDateString("pt-BR")}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}
