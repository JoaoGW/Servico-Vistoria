import { useEffect, useState } from "react";

import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
 * Autentica o usuário diretamente na API de domínio.
 * @param dados - E-mail e senha informados pelo usuário.
 * @returns Retorna os dados de acesso disponibilizados pela API.
 * @throws Retorna erro quando a autenticação ou a requisição falhar.
 */
export const login = async ({ email, senha }: Autenticacao) => {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL + "/usuarios/login";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: senha }),
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

/**
 * Exibe o formulário de login e verifica uma sessão salva ao iniciar.
 * @returns Retorna o formulário e o modal de erro quando necessário.
 */
export function FormularioLogin() {
  const [email, setEmail] = useState<Autenticacao["email"]>("");
  const [senha, setSenha] = useState<Autenticacao["senha"]>("");
  const [modalErro, setModalErro] = useState<boolean>(false);
  const [estaVerificandoToken, setEstaVerificandoToken] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let estaMontado = true;

    /**
     * Verifica se existe um token salvo e redireciona para a tela inicial.
     * @returns Conclui após verificar o armazenamento local.
     */
    const verificarTokenSalvo = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (token?.trim()) {
          router.replace("/home");
          return;
        }
      } catch (error) {
        console.error("Não foi possível verificar o token salvo.", error);
      } finally {
        if (estaMontado) {
          setEstaVerificandoToken(false);
        }
      }
    };

    void verificarTokenSalvo();

    return () => {
      estaMontado = false;
    };
  }, [router]);

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
        accessibilityState={{
          busy: estaVerificandoToken,
          disabled: estaVerificandoToken,
        }}
        className="mt-8 h-14 items-center justify-center rounded-xl bg-vistoria-marca data-[active=true]:bg-vistoria-marca-pressionada"
        disabled={estaVerificandoToken}
        onPress={async () => {
          try {
            const data = await login({ email, senha });
            await AsyncStorage.setItem("accessToken", data.accessToken);
            router.push("/home");
          } catch {
            setModalErro(true);
          }
        }}
      >
        <Text className="text-lg font-bold text-white">
          {estaVerificandoToken ? "Carregando..." : "Fazer Login"}
        </Text>
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
