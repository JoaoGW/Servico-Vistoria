import { useRouter } from "expo-router";

import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { CampoLogin } from "./CampoLogin";

import { LockKeyhole, Mail } from "lucide-react-native";

export function FormularioLogin() {
  const router = useRouter();

  return (
    <>
      <CampoLogin
        icone={Mail}
        label="E-mail"
        placeholder="Informe seu e-mail"
        tipo="email"
      />

      <Box className="mt-5">
        <CampoLogin
          icone={LockKeyhole}
          label="Senha"
          placeholder="Informe sua senha"
          tipo="senha"
        />
      </Box>

      <Pressable
        accessibilityLabel="Fazer Login"
        accessibilityRole="button"
        className="mt-8 h-14 items-center justify-center rounded-xl bg-vistoria-marca data-[active=true]:bg-vistoria-marca-pressionada"
        onPress={() => {}}
      >
        <Text className="text-lg font-bold text-white">Fazer Login</Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Entrar sem Conectar"
        accessibilityRole="button"
        className="mt-3 h-14 items-center justify-center rounded-xl border border-vistoria-marca bg-vistoria-superficie data-[active=true]:bg-vistoria-fundo"
        onPress={() => router.replace("/home")}
      >
        <Text className="text-lg font-bold text-vistoria-marca">
          Entrar sem Conectar
        </Text>
      </Pressable>
    </>
  );
}
