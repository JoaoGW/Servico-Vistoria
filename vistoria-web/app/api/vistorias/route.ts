import { NextRequest } from "next/server"

/**
 * Cria uma vistoria com a descrição enviada pelo cliente web.
 *
 * @param request - Requisição JSON contendo a descrição da vistoria.
 * @returns Retorna a vistoria criada ou o erro retornado pela API.
 * @throws Retorna erro quando a requisição ou a API externa falhar.
 */
export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const authorization = request.headers.get("Authorization")

        if (!authorization?.startsWith("Bearer ")) {
            return Response.json(
                { error: "Token Bearer não informado" },
                { status: 401 },
            )
        }

        const token = authorization.replace("Bearer ", "")
        const payload = token.split(".")[1]

        if (!payload) {
            return Response.json(
                { error: "Token Bearer inválido" },
                { status: 401 },
            )
        }

        let userId: string | undefined

        try {
            const data: { sub?: string } = JSON.parse(Buffer.from(payload, "base64url").toString())
            if (typeof data.sub === "string") {
                userId = data.sub
            }
        } catch {
            return Response.json(
                { error: "Token Bearer inválido" },
                { status: 401 },
            )
        }

        if (!userId) {
            return Response.json(
                { error: "Token Bearer não possui identificador de usuário" },
                { status: 401 },
            )
        }

        const data: { description?: unknown } = await request.json()
        const description = typeof data.description === "string" ? data.description.trim() : ""

        if (!description) {
            return Response.json(
                { error: "A descrição não foi disponibilizada no envio da requisição" },
                { status: 400 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        headers.set("Authorization", authorization)

        const apiUrl = process.env.APIS_URL + "/vistorias"

        const response = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({ description, userId }),
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Criar Vistoria",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Criar Vistoria: " + error,
            },
            { status: 500 },
        )
    }
}

/**
 * Busca todas as vistorias cadastradas na API.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @returns Retorna a lista de vistorias ou o erro retornado pela API.
 * @throws Retorna erro quando a API externa falhar.
 */
export async function GET(request: NextRequest) {
    try {
        if (request.method !== "GET") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/vistorias"

        const response = await fetch(apiUrl, {
            method: "GET",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Read das Vistorias",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Read das Vistorias: " + error,
            },
            { status: 500 },
        )
    }
}
