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

/**
 * Converte o estado da rede no estado de conexão usado pela aplicação.
 * @param estadoDaRede - Estado atual informado pelo Expo Network.
 * @returns Retorna se a conexão está online ou offline.
 */
function obterEstadoConexao(estadoDaRede: Network.NetworkState): EstadoConexao {
  if (
    estadoDaRede.isConnected === true &&
    estadoDaRede.isInternetReachable !== false
  ) {
    return "online";
  }

  return "offline";
}

/**
 * Disponibiliza o estado de conexão e a sincronização para a aplicação.
 * @param props - Propriedades que contêm os componentes filhos do provedor.
 * @returns Retorna o provedor, os filhos e os feedbacks de sincronização.
 */
export function ProvedorConexao({ children }: PropsWithChildren) {
  const [estadoConexao, setEstadoConexao] =
    useState<EstadoConexao>("verificando");
  const [estaSincronizando, setEstaSincronizando] = useState(false);
  const [erroSincronizacao, setErroSincronizacao] = useState<string | null>(
    null,
  );
  const [avisoConflito, setAvisoConflito] = useState<string | null>(null);
  const sincronizacaoEmAndamento = useRef(false);
  const estadoAnterior = useRef<EstadoConexao | null>(null);

  /**
   * Sincroniza os dados locais, evitando execuções concorrentes.
   * @returns Conclui quando a sincronização terminar ou já estiver em andamento.
   */
  const executarSincronizacao = useCallback(async () => {
    if (sincronizacaoEmAndamento.current) {
      return;
    }

    sincronizacaoEmAndamento.current = true;
    setEstaSincronizando(true);
    setErroSincronizacao(null);

    try {
      const resultado = await sincronizarDadosComApi();

      if (resultado.conflitos.length) {
        setAvisoConflito(
          "Uma ou mais vistorias já haviam sido concluídas por uma marcação anterior. Os dados vencedores foram atualizados.",
        );
      }
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

    /**
     * Atualiza a conexão e sincroniza ao recuperar o acesso à internet.
     * @param estadoDaRede - Estado de rede recebido do Expo Network.
     * @returns Não retorna valor.
     */
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

  /**
   * Solicita a sincronização manual quando há conexão com a internet.
   * @returns Conclui após sincronizar ou quando não houver conexão.
   */
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
      {avisoConflito ? (
        <ErrorModal
          message={avisoConflito}
          title="Vistoria já concluída"
          onClose={() => setAvisoConflito(null)}
        />
      ) : null}
    </ConexaoContexto.Provider>
  );
}

/**
 * Obtém o estado de conexão e a ação de sincronização do contexto.
 * @returns Retorna os dados e ações disponibilizados pelo ProvedorConexao.
 * @throws Retorna erro quando usado fora do ProvedorConexao.
 */
export function useConexao() {
  const contexto = useContext(ConexaoContexto);

  if (!contexto) {
    throw new Error("useConexao deve ser usado dentro de ProvedorConexao.");
  }

  return contexto;
}
