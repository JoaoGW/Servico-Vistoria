import { NextRequest } from "next/server"

/**
 * Busca o arquivo vinculado a um documento.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @param context - Contexto com o identificador do documento.
 * @returns Retorna o arquivo do documento ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        if (request.method !== "GET") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const { id } = await context.params

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/documentos" + `/${id}/arquivo`

        const response = await fetch(apiUrl, {
            method: "GET",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Arquivo do Documento",
                },
                { status: response.status },
            )
        }

        return new Response(response.body, {
            headers: response.headers,
        })
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Arquivo do Documento: " + error,
            },
            { status: 500 },
        )
    }
}
