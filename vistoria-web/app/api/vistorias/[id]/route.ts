import { NextRequest } from "next/server"

/**
 * Atualiza o status pendente ou a foto de uma vistoria.
 *
 * @param request - Requisição contendo o status pendente ou a foto.
 * @param context - Contexto com o identificador da vistoria.
 * @returns Retorna a vistoria atualizada ou o erro retornado pela API.
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

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/vistorias" + `/${id}`

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers,
            body: formData,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Atualização de Vistoria",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Atualização de Vistoria: " + error,
            },
            { status: 500 },
        )
    }
}

/**
 * Remove uma vistoria pelo seu identificador.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @param context - Contexto com o identificador da vistoria.
 * @returns Retorna a vistoria removida ou o erro retornado pela API.
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

        const apiUrl = process.env.APIS_URL + "/vistorias" + `/${id}`

        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Deleção de Vistoria",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Deleção de Vistoria: " + error,
            },
            { status: 500 },
        )
    }
}
