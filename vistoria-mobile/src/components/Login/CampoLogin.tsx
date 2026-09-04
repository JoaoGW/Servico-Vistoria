import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import type { LucideIcon } from "lucide-react-native";

interface ICampoLoginProps {
  icone: LucideIcon;
  label: string;
  placeholder: string;
  tipo: "email" | "senha";
  value: string;
  setValue: (value: string) => void;
}

/**
 * Exibe um campo de e-mail ou senha para o formulário de autenticação.
 * @param props - Rótulo, valor, ícone e função de atualização do campo.
 * @returns Retorna o campo de entrada configurado.
 */
export function CampoLogin({
  icone,
  label,
  placeholder,
  tipo,
  value,
  setValue,
}: ICampoLoginProps) {
  const eCampoDeSenha = tipo === "senha";

  return (
    <Box>
      <Text className="mb-2 ml-2 text-md font-bold text-vistoria-titulo">
        {label}
      </Text>
      <Input>
        <Icon as={icone} className="ml-4 text-vistoria-auxiliar" size="lg" />
        <InputField
          accessibilityLabel={label}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={eCampoDeSenha ? "default" : "email-address"}
          placeholder={placeholder}
          secureTextEntry={eCampoDeSenha}
          value={value}
          onChangeText={(v: string) => setValue(v)}
        />
      </Input>
    </Box>
  );
}
