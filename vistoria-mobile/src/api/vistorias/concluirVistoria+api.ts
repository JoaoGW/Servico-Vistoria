/**
 * Conclui uma vistoria enviando foto e localização para a API.
 *
 * @param request - Requisição usada para encaminhar os dados e a autorização do usuário.
 * @returns Retorna a vistoria concluída ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export async function PUT(request: Request) {
  try {
    if (request.method !== "PUT") {
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

    const formData = await request.formData();
    const [id] = formData.getAll("id");
    const [photo] = formData.getAll("photo");
    const [latitude] = formData.getAll("latitude");
    const [longitude] = formData.getAll("longitude");

    if (
      typeof id !== "string" ||
      !photo ||
      typeof latitude !== "string" ||
      typeof longitude !== "string"
    ) {
      return Response.json(
        {
          error:
            "Não foram disponibilizados identificação, foto e localização no envio da requisição",
        },
        { status: 400 },
      );
    }

    formData.append("pendente", "false");

    const headers = new Headers({
      Accept: "application/json",
    });

    const authorization = request.headers.get("Authorization");
    if (authorization) {
      headers.set("Authorization", authorization);
    }

    const apiUrl = process.env.APIS_URL + "/vistorias/" + id;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: formData as unknown as Blob,
    });

    if (!response.ok) {
      return Response.json(
        {
          error: "Erro no processo de response da API - Concluir Vistoria",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        error: "Erro encontrado na API - Concluir Vistoria: " + error,
      },
      { status: 500 },
    );
  }
}
