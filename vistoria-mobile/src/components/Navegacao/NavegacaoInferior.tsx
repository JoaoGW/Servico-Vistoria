import { type Href, useRouter } from "expo-router";

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import { ClipboardCheck, FileText, House } from "lucide-react-native";

interface INavegacaoInferiorProps {
  abaAtiva: "home" | "vistoria" | "documentos";
}

interface IItemNavegacao {
  destino?: Href;
  icone: typeof House;
  identificador: INavegacaoInferiorProps["abaAtiva"];
  titulo: string;
}

const itensNavegacao = [
  {
    destino: "/vistorias",
    icone: ClipboardCheck,
    identificador: "vistoria",
    titulo: "Vistoria",
  },
  { destino: "/home", icone: House, identificador: "home", titulo: "Home" },
  {
    destino: "/documentos",
    icone: FileText,
    identificador: "documentos",
    titulo: "Documentos",
  },
] satisfies IItemNavegacao[];

/**
 * Exibe a navegação inferior e destaca a aba atualmente selecionada.
 * @param props - Identificador da aba ativa na rota atual.
 * @returns Retorna a barra de navegação inferior.
 */
export function NavegacaoInferior({ abaAtiva }: INavegacaoInferiorProps) {
  const router = useRouter();

  return (
    <Box
      accessibilityRole="tablist"
      className="min-h-[108px] flex-row border-t border-vistoria-borda bg-vistoria-superficie"
    >
      {itensNavegacao.map((item) => {
        const Icone = item.icone;
        const selecionado = item.identificador === abaAtiva;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionado }}
            key={item.titulo}
            onPress={() => {
              if (item.destino) {
                router.push(item.destino);
              }
            }}
            className="min-h-24 flex-1 items-center justify-center gap-2 data-[active=true]:bg-vistoria-fundo"
          >
            <Icon
              as={Icone}
              className={
                selecionado ? "text-vistoria-marca" : "text-vistoria-auxiliar"
              }
              size="xl"
            />
            <Text
              className={
                selecionado
                  ? "text-lg font-semibold text-vistoria-marca"
                  : "text-lg font-semibold text-vistoria-auxiliar"
              }
            >
              {item.titulo}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}
