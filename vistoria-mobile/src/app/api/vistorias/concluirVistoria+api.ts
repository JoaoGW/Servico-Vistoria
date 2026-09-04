/**
 * Conclui uma vistoria enviando foto e localização para a API.
 *
 * @param request - Requisição usada para encaminhar os dados e a autorização do usuário.
 * @returns Retorna a vistoria concluída ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
function anexarCampoMultipart(
  corpo: Uint8Array,
  boundary: string,
  nome: string,
  valor: string,
) {
  const codificador = new TextEncoder();
  const encerramento = codificador.encode(`--${boundary}--\r\n`);
  const inicioDoEncerramento = corpo.length - encerramento.length;

  if (
    inicioDoEncerramento < 0 ||
    !encerramento.every(
      (byte, indice) => corpo[inicioDoEncerramento + indice] === byte,
    )
  ) {
    throw new Error("O corpo multipart recebido não possui um encerramento válido.");
  }

  const novoCampo = codificador.encode(
    `--${boundary}\r\nContent-Disposition: form-data; name="${nome}"\r\n\r\n${valor}\r\n--${boundary}--\r\n`,
  );
  const resultado = new Uint8Array(inicioDoEncerramento + novoCampo.length);

  resultado.set(corpo.slice(0, inicioDoEncerramento));
  resultado.set(novoCampo, inicioDoEncerramento);

  return resultado;
}

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

    const requisicaoParaFormulario = request.clone();
    const formData = await requisicaoParaFormulario.formData();
    const [id] = formData.getAll("id");
    const [completedAt] = formData.getAll("completedAt");
    const [photo] = formData.getAll("photo");
    const [latitude] = formData.getAll("latitude");
    const [longitude] = formData.getAll("longitude");

    if (
      typeof id !== "string" ||
      typeof completedAt !== "string" ||
      Number.isNaN(Date.parse(completedAt)) ||
      !photo ||
      typeof latitude !== "string" ||
      typeof longitude !== "string"
    ) {
      return Response.json(
        {
          error:
            "Não foram disponibilizados identificação, data de conclusão, foto e localização no envio da requisição",
        },
        { status: 400 },
      );
    }

    const contentType = request.headers.get("Content-Type");
    const boundary = contentType?.match(/boundary=([^;]+)/i)?.[1];

    if (!boundary) {
      return Response.json(
        { error: "O envio da vistoria não possui um boundary multipart válido." },
        { status: 400 },
      );
    }

    const corpo = anexarCampoMultipart(
      new Uint8Array(await request.arrayBuffer()),
      boundary.replace(/^"|"$/g, ""),
      "pendente",
      "false",
    );

    const headers = new Headers({
      Accept: "application/json",
    });

    const authorization = request.headers.get("Authorization");
    if (authorization) {
      headers.set("Authorization", authorization);
    }
    headers.set("Content-Type", contentType);

    const apiUrl = process.env.APIS_URL + "/vistorias/" + id;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: corpo,
    });

    if (!response.ok) {
      const detalhe = (await response.json().catch(() => null)) as {
        code?: string;
        message?: string;
        vistoria?: unknown;
      } | null;

      return Response.json(
        {
          code: detalhe?.code,
          error: detalhe?.message ?? "Não foi possível concluir a vistoria na API.",
          vistoria: detalhe?.vistoria,
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
