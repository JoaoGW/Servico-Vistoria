import * as Network from "expo-network";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ErrorModal from "@/components/Modals/ErrorModal";
import { ModalSincronizacao } from "@/components/Modals/ModalSincronizacao";
import { sincronizarDadosComApi } from "@/services/sincronizacao-offline";

export type EstadoConexao = "offline" | "online" | "verificando";

interface IConexaoContexto {
  estaOnline: boolean;
  estadoConexao: EstadoConexao;
  sincronizarAgora: () => Promise<void>;
}

const ConexaoContexto = createContext<IConexaoContexto | null>(null);

function obterEstadoConexao(estadoDaRede: Network.NetworkState): EstadoConexao {
  if (
    estadoDaRede.isConnected === true &&
    estadoDaRede.isInternetReachable !== false
  ) {
    return "online";
  }

  return "offline";
}

export function ProvedorConexao({ children }: PropsWithChildren) {
  const [estadoConexao, setEstadoConexao] =
    useState<EstadoConexao>("verificando");
  const [estaSincronizando, setEstaSincronizando] = useState(false);
  const [erroSincronizacao, setErroSincronizacao] = useState<string | null>(
    null,
  );
  const sincronizacaoEmAndamento = useRef(false);
  const estadoAnterior = useRef<EstadoConexao | null>(null);

  const executarSincronizacao = useCallback(async () => {
    if (sincronizacaoEmAndamento.current) {
      return;
    }

    sincronizacaoEmAndamento.current = true;
    setEstaSincronizando(true);
    setErroSincronizacao(null);

    try {
      await sincronizarDadosComApi();
    } catch (error) {
      console.error("Não foi possível sincronizar os dados locais.", error);
      setErroSincronizacao(
        error instanceof Error
          ? error.message
          : "Tente novamente em alguns instantes.",
      );
    } finally {
      sincronizacaoEmAndamento.current = false;
      setEstaSincronizando(false);
    }
  }, []);

  useEffect(() => {
    let estaAtivo = true;

    const atualizarConexao = (estadoDaRede: Network.NetworkState) => {
      if (!estaAtivo) {
        return;
      }

      const proximoEstado = obterEstadoConexao(estadoDaRede);
      const estadoAnteriorDaRede = estadoAnterior.current;

      estadoAnterior.current = proximoEstado;
      setEstadoConexao(proximoEstado);

      if (
        proximoEstado === "online" &&
        estadoAnteriorDaRede !== "online"
      ) {
        void executarSincronizacao();
      }
    };

    void Network.getNetworkStateAsync()
      .then(atualizarConexao)
      .catch((error) => {
        console.error("Não foi possível verificar o estado da rede.", error);
        atualizarConexao({ isConnected: false, isInternetReachable: false });
      });

    const inscricao = Network.addNetworkStateListener(atualizarConexao);

    return () => {
      estaAtivo = false;
      inscricao.remove();
    };
  }, [executarSincronizacao]);

  const sincronizarAgora = useCallback(async () => {
    if (estadoConexao !== "online") {
      return;
    }

    await executarSincronizacao();
  }, [estadoConexao, executarSincronizacao]);

  const valorDoContexto = useMemo<IConexaoContexto>(
    () => ({
      estaOnline: estadoConexao === "online",
      estadoConexao,
      sincronizarAgora,
    }),
    [estadoConexao, sincronizarAgora],
  );

  return (
    <ConexaoContexto.Provider value={valorDoContexto}>
      {children}
      <ModalSincronizacao visivel={estaSincronizando} />
      {erroSincronizacao ? (
        <ErrorModal
          message={erroSincronizacao}
          title="Não foi possível sincronizar"
          onClose={() => setErroSincronizacao(null)}
          onRetry={() => {
            void sincronizarAgora();
          }}
        />
      ) : null}
    </ConexaoContexto.Provider>
  );
}

export function useConexao() {
  const contexto = useContext(ConexaoContexto);

  if (!contexto) {
    throw new Error("useConexao deve ser usado dentro de ProvedorConexao.");
  }

  return contexto;
}
