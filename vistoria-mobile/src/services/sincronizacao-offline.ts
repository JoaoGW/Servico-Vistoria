import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";

import {
  concluirVistoriaOffline,
  listarConclusoesPendentes,
  removerConclusaoPendente,
  sincronizarDocumentos,
  sincronizarVistorias,
} from "@/db/sincronizacao";
import type { DocumentoApi, VistoriaApi } from "@/db/types";

import { criarCorpoMultipart } from "./criar-corpo-multipart";

export interface IDadosConclusaoVistoria {
  completedAt: string;
  fotoMimeType: string;
  fotoNome: string;
  fotoUri: string;
  id: string;
  latitude: number;
  longitude: number;
}

export class ConflitoConclusaoVistoriaError extends Error {
  readonly vistoria: VistoriaApi;

  constructor(vistoria: VistoriaApi) {
    super(
      "Esta vistoria já foi concluída por uma marcação anterior. Os dados vencedores foram atualizados.",
    );
    this.name = "ConflitoConclusaoVistoriaError";
    this.vistoria = vistoria;
  }
}

/**
 * Obtém a extensão da foto a partir do nome ou do seu tipo MIME.
 * @param nome - Nome original do arquivo de foto.
 * @param mimeType - Tipo MIME informado para a foto.
 * @returns Retorna a extensão identificada ou um padrão de imagem.
 */
function obterExtensaoArquivo(nome: string, mimeType: string) {
  const extensao = nome.match(/\.[a-zA-Z0-9]+$/)?.[0];

  if (extensao) {
    return extensao;
  }

  return mimeType === "image/png" ? ".png" : ".jpg";
}

/**
 * Gera um nome seguro e único para armazenar uma foto pendente.
 * @param dadosConclusao - Dados da conclusão que identificam a foto.
 * @returns Retorna o nome que será usado no armazenamento local.
 */
function obterNomePersistenteArquivo({
  fotoMimeType,
  fotoNome,
  id,
}: IDadosConclusaoVistoria) {
  const idSeguro = id.replace(/[^a-zA-Z0-9_-]/g, "_");
  const identificador = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${idSeguro}-${identificador}${obterExtensaoArquivo(fotoNome, fotoMimeType)}`;
}

/**
 * Busca as vistorias disponíveis para o usuário autenticado.
 * @param token - Token de acesso usado na autorização da requisição.
 * @returns Retorna a lista de vistorias recebida da API.
 * @throws Retorna erro quando a API não puder recuperar as vistorias.
 */
async function buscarVistorias(token: string) {
  const response = await fetch("/api/vistorias/verVistorias", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar as vistorias.");
  }

  return response.json() as Promise<VistoriaApi[]>;
}

/**
 * Busca os documentos disponíveis para o usuário autenticado.
 * @param token - Token de acesso usado na autorização da requisição.
 * @returns Retorna a lista de documentos recebida da API.
 * @throws Retorna erro quando a API não puder recuperar os documentos.
 */
async function buscarDocumentos(token: string) {
  const response = await fetch("/api/documentos/recuperarDocumentos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar os documentos.");
  }

  return response.json() as Promise<DocumentoApi[]>;
}

/**
 * Envia à API a foto e a localização que concluem uma vistoria.
 * @param dadosConclusao - Dados da foto, localização e vistoria concluída.
 * @param token - Token de acesso usado na autorização da requisição.
 * @returns Conclui quando a API confirmar o envio da conclusão.
 * @throws Retorna erro quando o arquivo não puder ser lido ou a API falhar.
 */
export async function enviarConclusaoVistoria(
  dadosConclusao: IDadosConclusaoVistoria,
  token: string,
) {
  const dadosMultipart = await criarCorpoMultipart({
    arquivo: {
      campo: "photo",
      mimeType: dadosConclusao.fotoMimeType,
      nome: dadosConclusao.fotoNome,
      uri: dadosConclusao.fotoUri,
    },
    campos: {
      completedAt: dadosConclusao.completedAt,
      id: dadosConclusao.id,
      latitude: String(dadosConclusao.latitude),
      longitude: String(dadosConclusao.longitude),
    },
  });

  const response = await fetch("/api/vistorias/concluirVistoria", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": dadosMultipart.contentType,
    },
    body: dadosMultipart.body,
  });

  const resposta = (await response.json().catch(() => null)) as {
    code?: string;
    error?: string;
    vistoria?: VistoriaApi;
  } | null;

  if (
    response.status === 409 &&
    resposta?.code === "INSPECTION_COMPLETION_CONFLICT" &&
    resposta.vistoria
  ) {
    throw new ConflitoConclusaoVistoriaError(resposta.vistoria);
  }

  if (!response.ok) {
    throw new Error(resposta?.error ?? "Não foi possível concluir a vistoria.");
  }

  return resposta as VistoriaApi;
}

/**
 * Persiste a foto e a conclusão de uma vistoria para envio posterior.
 * @param dadosConclusao - Dados da vistoria concluída sem conexão.
 * @returns Conclui após copiar a foto e criar a pendência local.
 * @throws Retorna erro quando a foto não existir ou a fila local falhar.
 */
export async function enfileirarConclusaoVistoria(
  dadosConclusao: IDadosConclusaoVistoria,
) {
  const arquivoDeOrigem = new File(dadosConclusao.fotoUri);

  if (!arquivoDeOrigem.exists) {
    throw new Error("A foto da vistoria não está mais disponível para sincronização.");
  }

  const diretorioDePendencias = new Directory(
    Paths.document,
    "vistorias-pendentes",
  );
  diretorioDePendencias.create({ idempotent: true, intermediates: true });

  const arquivoDeDestino = new File(
    diretorioDePendencias,
    obterNomePersistenteArquivo(dadosConclusao),
  );

  await arquivoDeOrigem.copy(arquivoDeDestino);

  try {
    await concluirVistoriaOffline({
      ...dadosConclusao,
      fotoUri: arquivoDeDestino.uri,
    });
  } catch (error) {
    try {
      arquivoDeDestino.delete();
    } catch (erroAoRemoverArquivo) {
      console.warn(
        "Não foi possível remover a foto salva após falha ao criar a fila.",
        erroAoRemoverArquivo,
      );
    }

    throw error;
  }
}

/**
 * Envia conclusões pendentes e atualiza os dados locais com a API.
 * @returns Conclui após sincronizar as pendências, vistorias e documentos.
 * @throws Retorna erro quando a sessão, os arquivos locais ou a API falharem.
 */
export async function sincronizarDadosComApi() {
  const conflitos: string[] = [];
  const conclusoesPendentes = await listarConclusoesPendentes();
  const token = await AsyncStorage.getItem("accessToken");

  if (!token) {
    if (conclusoesPendentes.length) {
      throw new Error(
        "Sua sessão expirou. Entre novamente para sincronizar as vistorias pendentes.",
      );
    }

    return { conflitos };
  }

  for (const conclusaoPendente of conclusoesPendentes) {
    const arquivo = new File(conclusaoPendente.fotoUri);

    if (!arquivo.exists) {
      throw new Error(
        "A foto de uma vistoria pendente não está disponível para sincronização.",
      );
    }

    try {
      await enviarConclusaoVistoria(
        {
          completedAt: (
            conclusaoPendente.completedAt ?? conclusaoPendente.criadaEm
          ).toISOString(),
          fotoMimeType: conclusaoPendente.fotoMimeType,
          fotoNome: conclusaoPendente.fotoNome,
          fotoUri: conclusaoPendente.fotoUri,
          id: conclusaoPendente.vistoriaId,
          latitude: conclusaoPendente.latitude,
          longitude: conclusaoPendente.longitude,
        },
        token,
      );
    } catch (error) {
      if (!(error instanceof ConflitoConclusaoVistoriaError)) {
        throw error;
      }

      conflitos.push(conclusaoPendente.vistoriaId);
    }

    await removerConclusaoPendente(conclusaoPendente.id);

    try {
      arquivo.delete();
    } catch (erroAoRemoverArquivo) {
      console.warn(
        "A vistoria foi sincronizada, mas a foto local não pôde ser removida.",
        erroAoRemoverArquivo,
      );
    }
  }

  const [vistoriasApi, documentosApi] = await Promise.all([
    buscarVistorias(token),
    buscarDocumentos(token),
  ]);

  await Promise.all([
    sincronizarVistorias(vistoriasApi),
    sincronizarDocumentos(documentosApi),
  ]);

  return { conflitos };
}
