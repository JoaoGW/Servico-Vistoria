import { database } from "./index";
import { DocumentoModel } from "./models/Documento";
import { VistoriaModel } from "./models/Vistoria";
import type { DocumentoApi, VistoriaApi } from "./types";

function preencherDocumento(documento: DocumentoModel, dados: DocumentoApi) {
  documento.title = dados.title;
  documento.fileMimeType = dados.fileMimeType;
  documento.fileName = dados.fileName;
  documento.createdAt = new Date(dados.createdAt);
  documento.updatedAt = new Date(dados.updatedAt);
}

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
