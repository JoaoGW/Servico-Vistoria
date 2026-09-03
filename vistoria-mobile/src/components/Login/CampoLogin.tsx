import type { LucideIcon } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

interface ICampoLoginProps {
  icone: LucideIcon;
  label: string;
  placeholder: string;
  tipo: "email" | "senha";
}

export function CampoLogin({
  icone,
  label,
  placeholder,
  tipo,
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
        />
      </Input>
    </Box>
  );
}
