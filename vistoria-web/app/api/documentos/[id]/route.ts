import { NextRequest } from "next/server"

/**
 * Atualiza o título ou o arquivo de um documento.
 *
 * @param request - Requisição multipart contendo o título ou o arquivo do documento.
 * @param context - Contexto com o identificador do documento.
 * @returns Retorna o documento atualizado ou o erro retornado pela API.
 * @throws Retorna erro quando a requisição ou a API externa falhar.
 */
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        if (request.method !== "PUT") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const { id } = await context.params
        const formData = await request.formData()
        formData.set("id", id)

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/documentos"

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers,
            body: formData,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Atualização de Documento",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Atualização de Documento: " + error,
            },
            { status: 500 },
        )
    }
}

/**
 * Remove um documento pelo seu identificador.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @param context - Contexto com o identificador do documento.
 * @returns Retorna o documento removido ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        if (request.method !== "DELETE") {
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

        const apiUrl = process.env.APIS_URL + "/documentos" + `/${id}`

        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Deleção de Documento",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Deleção de Documento: " + error,
            },
            { status: 500 },
        )
    }
}
