import type { RequestHandler } from "expo-router/server";

/**
 * Busca o arquivo vinculado a um documento.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @param params - Parâmetros dinâmicos da rota, incluindo o identificador do documento.
 * @returns Retorna o arquivo do documento ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export const GET: RequestHandler = async (request, { id }) => {
  try {
    if (request.method !== "GET") {
      return Response.json(
        {
          error:
            "O método " +
            request.method +
            " na requisição não é um método válido",
        },
        { status: 405 },
      );
    }

    const headers = new Headers({ Accept: "*/*" });
    const authorization = request.headers.get("Authorization");

    if (authorization) {
      headers.set("Authorization", authorization);
    }

    const response = await fetch(`${process.env.APIS_URL}/documentos/${id}/arquivo`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const detalhe = await response.text();

      return Response.json(
        {
          error:
            detalhe || "Erro ao recuperar o arquivo do documento.",
        },
        { status: response.status },
      );
    }

    const arquivo = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") ?? "application/octet-stream";
    const contentDisposition = response.headers.get("content-disposition");
    const cabecalhosDaResposta = new Headers({
      "Content-Type": contentType,
    });

    if (contentDisposition) {
      cabecalhosDaResposta.set("Content-Disposition", contentDisposition);
    }

    return new Response(arquivo, { headers: cabecalhosDaResposta });
  } catch (error) {
    return Response.json(
      { error: "Erro encontrado ao recuperar o arquivo do documento: " + error },
      { status: 500 },
    );
  }
};
