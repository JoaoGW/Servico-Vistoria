import { FormularioLogin } from "@/components/Login/FormularioLogin";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";

export default function PaginaLogin() {
  return (
    <SafeAreaView
      className="flex-1 bg-vistoria-fundo"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex-1 justify-center px-6 py-8">
          <Text className="text-center text-lg font-bold tracking-[2px] text-vistoria-marca">
            PEACORE
          </Text>
          <Text className="mt-2 text-center text-[30px] font-bold text-vistoria-titulo">
            Peacore Vistorias
          </Text>
          <Text className="mt-2 text-center leading-6 text-vistoria-auxiliar">
            Informe seus dados para acessar suas vistorias.
          </Text>

          <Box className="mt-8">
            <FormularioLogin />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
