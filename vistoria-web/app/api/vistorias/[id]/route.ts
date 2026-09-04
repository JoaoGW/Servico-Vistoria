import { NextRequest } from "next/server"

/**
 * Remove uma vistoria pelo seu identificador.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @param context - Contexto com o identificador da vistoria.
 * @returns Retorna a vistoria removida ou o erro retornado pela API.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params
        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const response = await fetch(process.env.APIS_URL + `/vistorias/${id}`, {
            method: "DELETE",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                { error: "Erro no processo de response da API - Deleção de Vistoria" },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            { error: "Erro encontrado na API - Deleção de Vistoria: " + error },
            { status: 500 },
        )
    }
}
