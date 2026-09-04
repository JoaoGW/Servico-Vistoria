import { Q } from "@nozbe/watermelondb";

import { database } from "./index";
import { ConclusaoPendenteModel } from "./models/ConclusaoPendente";
import { DocumentoModel } from "./models/Documento";
import { VistoriaModel } from "./models/Vistoria";
import type { DocumentoApi, VistoriaApi } from "./types";

/**
 * Preenche um documento local com os dados recebidos da API.
 * @param documento - Registro local que receberá os dados atualizados.
 * @param dados - Dados do documento retornados pela API.
 * @returns Não retorna valor.
 */
function preencherDocumento(documento: DocumentoModel, dados: DocumentoApi) {
  documento.title = dados.title;
  documento.fileMimeType = dados.fileMimeType;
  documento.fileName = dados.fileName;
  documento.createdAt = new Date(dados.createdAt);
  documento.updatedAt = new Date(dados.updatedAt);
}

/**
 * Preenche uma vistoria local com os dados recebidos da API.
 * @param vistoria - Registro local que receberá os dados atualizados.
 * @param dados - Dados da vistoria retornados pela API.
 * @returns Não retorna valor.
 */
function preencherVistoria(vistoria: VistoriaModel, dados: VistoriaApi) {
  vistoria.userId = dados.userId;
  vistoria.description = dados.description;
  vistoria.photoMimeType = dados.photoMimeType;
  vistoria.latitude = dados.latitude;
  vistoria.longitude = dados.longitude;
  vistoria.pendente = dados.pendente;
  vistoria.createdAt = new Date(dados.createdAt);
  vistoria.updatedAt = new Date(dados.updatedAt);
}

/**
 * Sincroniza os documentos locais com a lista recebida da API.
 * @param documentosApi - Documentos que devem existir no banco local.
 * @returns Conclui após criar, atualizar e remover os registros necessários.
 * @throws Retorna erro quando a escrita no banco local falhar.
 */
export async function sincronizarDocumentos(documentosApi: DocumentoApi[]) {
  const documentos = database.get<DocumentoModel>("documentos");

  await database.write(async () => {
    const documentosLocais = await documentos.query().fetch();
    const documentosPorId = new Map(
      documentosLocais.map((documento) => [documento.id, documento]),
    );
    const idsRecebidos = new Set(documentosApi.map((documento) => documento.id));

    const operacoes = documentosApi.map((dados) => {
      const documentoLocal = documentosPorId.get(dados.id);

      if (documentoLocal) {
        return documentoLocal.prepareUpdate((documento) => {
          preencherDocumento(documento, dados);
        });
      }

      return documentos.prepareCreate((documento) => {
        documento._raw.id = dados.id;
        preencherDocumento(documento, dados);
      });
    });

    documentosLocais.forEach((documento) => {
      if (!idsRecebidos.has(documento.id)) {
        operacoes.push(documento.prepareDestroyPermanently());
      }
    });

    await database.batch(...operacoes);
  });
}

/**
 * Sincroniza as vistorias locais com a lista recebida da API.
 * @param vistoriasApi - Vistorias que devem existir no banco local.
 * @returns Conclui após criar, atualizar e remover os registros necessários.
 * @throws Retorna erro quando a escrita no banco local falhar.
 */
export async function sincronizarVistorias(vistoriasApi: VistoriaApi[]) {
  const vistorias = database.get<VistoriaModel>("vistorias");

  await database.write(async () => {
    const vistoriasLocais = await vistorias.query().fetch();
    const vistoriasPorId = new Map(
      vistoriasLocais.map((vistoria) => [vistoria.id, vistoria]),
    );
    const idsRecebidos = new Set(vistoriasApi.map((vistoria) => vistoria.id));

    const operacoes = vistoriasApi.map((dados) => {
      const vistoriaLocal = vistoriasPorId.get(dados.id);

      if (vistoriaLocal) {
        return vistoriaLocal.prepareUpdate((vistoria) => {
          preencherVistoria(vistoria, dados);
        });
      }

      return vistorias.prepareCreate((vistoria) => {
        vistoria._raw.id = dados.id;
        preencherVistoria(vistoria, dados);
      });
    });

    vistoriasLocais.forEach((vistoria) => {
      if (!idsRecebidos.has(vistoria.id)) {
        operacoes.push(vistoria.prepareDestroyPermanently());
      }
    });

    await database.batch(...operacoes);
  });
}

interface IDadosConclusaoVistoria {
  id: string;
  latitude: number;
  longitude: number;
  photoMimeType: string;
}

interface IDadosConclusaoVistoriaOffline {
  fotoNome: string;
  fotoMimeType: string;
  fotoUri: string;
  id: string;
  latitude: number;
  longitude: number;
}

/**
 * Atualiza os dados locais que identificam uma vistoria como concluída.
 * @param registro - Vistoria local que será atualizada.
 * @param dados - Localização e tipo da foto usados na conclusão.
 * @returns Não retorna valor.
 */
function preencherConclusaoVistoriaLocal(
  registro: VistoriaModel,
  dados: IDadosConclusaoVistoria,
) {
  registro.latitude = dados.latitude;
  registro.longitude = dados.longitude;
  registro.photoMimeType = dados.photoMimeType;
  registro.pendente = false;
  registro.updatedAt = new Date();
}

/**
 * Registra localmente a conclusão de uma vistoria já enviada à API.
 * @param dados - Identificador, localização e tipo da foto da vistoria.
 * @returns Conclui após persistir as alterações no banco local.
 * @throws Retorna erro quando a vistoria não for encontrada ou a gravação falhar.
 */
export async function concluirVistoriaLocal({
  id,
  latitude,
  longitude,
  photoMimeType,
}: IDadosConclusaoVistoria) {
  const vistorias = database.get<VistoriaModel>("vistorias");
  const vistoria = await vistorias.find(id);

  await database.write(async () => {
    await vistoria.update((registro) => {
      preencherConclusaoVistoriaLocal(registro, {
        id,
        latitude,
        longitude,
        photoMimeType,
      });
    });
  });
}

/**
 * Salva uma conclusão de vistoria na fila local para sincronização posterior.
 * @param dados - Informações da foto e da localização da vistoria concluída.
 * @returns Conclui após criar a pendência e atualizar a vistoria local.
 * @throws Retorna erro quando a vistoria não for encontrada ou a gravação falhar.
 */
export async function concluirVistoriaOffline({
  fotoNome,
  fotoUri,
  id,
  latitude,
  longitude,
  fotoMimeType,
}: IDadosConclusaoVistoriaOffline) {
  const conclusoesPendentes = database.get<ConclusaoPendenteModel>(
    "conclusoes_pendentes",
  );
  const vistorias = database.get<VistoriaModel>("vistorias");
  const vistoria = await vistorias.find(id);

  await database.write(async () => {
    await database.batch(
      conclusoesPendentes.prepareCreate((conclusao) => {
        conclusao.vistoriaId = id;
        conclusao.latitude = latitude;
        conclusao.longitude = longitude;
        conclusao.fotoUri = fotoUri;
        conclusao.fotoMimeType = fotoMimeType;
        conclusao.fotoNome = fotoNome;
        conclusao.criadaEm = new Date();
      }),
      vistoria.prepareUpdate((registro) => {
        preencherConclusaoVistoriaLocal(registro, {
          id,
          latitude,
          longitude,
          photoMimeType: fotoMimeType,
        });
      }),
    );
  });
}

/**
 * Lista as conclusões aguardando envio à API em ordem de criação.
 * @returns Retorna as conclusões pendentes armazenadas localmente.
 * @throws Retorna erro quando a consulta ao banco local falhar.
 */
export async function listarConclusoesPendentes() {
  return database
    .get<ConclusaoPendenteModel>("conclusoes_pendentes")
    .query(Q.sortBy("criada_em", Q.asc))
    .fetch();
}

/**
 * Remove uma conclusão já sincronizada da fila local.
 * @param id - Identificador do registro de conclusão pendente.
 * @returns Conclui após excluir o registro do banco local.
 * @throws Retorna erro quando o registro não for encontrado ou a exclusão falhar.
 */
export async function removerConclusaoPendente(id: string) {
  const conclusoesPendentes = database.get<ConclusaoPendenteModel>(
    "conclusoes_pendentes",
  );
  const conclusao = await conclusoesPendentes.find(id);

  await database.write(async () => {
    await conclusao.destroyPermanently();
  });
}
