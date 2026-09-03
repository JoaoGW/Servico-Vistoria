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
  fotoMimeType: string;
  fotoNome: string;
  fotoUri: string;
  id: string;
  latitude: number;
  longitude: number;
}

function obterExtensaoArquivo(nome: string, mimeType: string) {
  const extensao = nome.match(/\.[a-zA-Z0-9]+$/)?.[0];

  if (extensao) {
    return extensao;
  }

  return mimeType === "image/png" ? ".png" : ".jpg";
}

function obterNomePersistenteArquivo({
  fotoMimeType,
  fotoNome,
  id,
}: IDadosConclusaoVistoria) {
  const idSeguro = id.replace(/[^a-zA-Z0-9_-]/g, "_");
  const identificador = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${idSeguro}-${identificador}${obterExtensaoArquivo(fotoNome, fotoMimeType)}`;
}

async function obterMensagemDeErro(response: Response, mensagemPadrao: string) {
  const respostaErro = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  return respostaErro?.error ?? mensagemPadrao;
}

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

  if (!response.ok) {
    throw new Error(
      await obterMensagemDeErro(
        response,
        "Não foi possível concluir a vistoria.",
      ),
    );
  }
}

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

export async function sincronizarDadosComApi() {
  const conclusoesPendentes = await listarConclusoesPendentes();
  const token = await AsyncStorage.getItem("accessToken");

  if (!token) {
    if (conclusoesPendentes.length) {
      throw new Error(
        "Sua sessão expirou. Entre novamente para sincronizar as vistorias pendentes.",
      );
    }

    return;
  }

  for (const conclusaoPendente of conclusoesPendentes) {
    const arquivo = new File(conclusaoPendente.fotoUri);

    if (!arquivo.exists) {
      throw new Error(
        "A foto de uma vistoria pendente não está disponível para sincronização.",
      );
    }

    await enviarConclusaoVistoria(
      {
        fotoMimeType: conclusaoPendente.fotoMimeType,
        fotoNome: conclusaoPendente.fotoNome,
        fotoUri: conclusaoPendente.fotoUri,
        id: conclusaoPendente.vistoriaId,
        latitude: conclusaoPendente.latitude,
        longitude: conclusaoPendente.longitude,
      },
      token,
    );

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
}
