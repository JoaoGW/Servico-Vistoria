/**
 * Busca todas as vistorias cadastradas na API.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @returns Retorna a lista de vistorias ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export async function GET(request: Request) {
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

    const headers = new Headers({
      Accept: "application/json",
    });

    const authorization = request.headers.get("Authorization");
    if (authorization) {
      headers.set("Authorization", authorization);
    }

    const apiUrl = process.env.APIS_URL + "/vistorias";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return Response.json(
        {
          error: "Erro no processo de response da API - Read das Vistorias",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        error: "Erro encontrado na API - Read das Vistorias: " + error,
      },
      { status: 500 },
    );
  }
}
