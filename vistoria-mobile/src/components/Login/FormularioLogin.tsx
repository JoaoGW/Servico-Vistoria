import { useState } from "react";

import { useRouter } from "expo-router";

import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import ErrorModal from "../Modals/ErrorModal";
import { CampoLogin } from "./CampoLogin";

import { LockKeyhole, Mail } from "lucide-react-native";

interface Autenticacao {
  email: string;
  senha: string;
}

/**
 * Responsável por chamar a rota de autenticação do portal.
 *
 * @param email - E-mail informado pelo usuário.
 * @param senha - Senha informada pelo usuário.
 * @returns Retorna o token de acesso disponibilizado pela API.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
export const login = async ({ email, senha }: Autenticacao) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      if (response?.status === 429) {
        console.log(
          "Muitas requisições enviadas esgotaram o limite do servidor",
        );
      }
      console.log("Respoonse de login: ", response);
      throw new Error("Falha ao fazer login");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "O seguinte erro foi encontrado ao tentar fazer login: ",
      error,
    );
    throw error;
  }
};

export function FormularioLogin() {
  const [email, setEmail] = useState<Autenticacao["email"]>("");
  const [senha, setSenha] = useState<Autenticacao["senha"]>("");
  const [modalErro, setModalErro] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <CampoLogin
        icone={Mail}
        label="E-mail"
        placeholder="Informe seu e-mail"
        tipo="email"
        value={email}
        setValue={setEmail}
      />

      <Box className="mt-5">
        <CampoLogin
          icone={LockKeyhole}
          label="Senha"
          placeholder="Informe sua senha"
          tipo="senha"
          value={senha}
          setValue={setSenha}
        />
      </Box>

      <Pressable
        accessibilityLabel="Fazer Login"
        accessibilityRole="button"
        className="mt-8 h-14 items-center justify-center rounded-xl bg-vistoria-marca data-[active=true]:bg-vistoria-marca-pressionada"
        onPress={() => {
          async () => {
            try {
              const data = await login({ email, senha });
              sessionStorage.setItem("accessToken", data.accessToken);
              router.push("/home");
            } catch {
              setModalErro(true);
            }
          };
        }}
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

      {modalErro ? (
        <ErrorModal
          onClose={() => setModalErro(false)}
          title="Erro ao fazer login"
          message="Não foi possível fazer login. Confira os dados inseridos e tente novamente."
        />
      ) : null}
    </>
  );
}
