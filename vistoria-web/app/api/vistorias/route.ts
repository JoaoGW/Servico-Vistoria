import { NextRequest } from "next/server"

/**
 * Cria uma vistoria com os dados e a foto enviados pelo cliente.
 *
 * @param request - Requisição multipart contendo os dados da vistoria e a foto.
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

        const userId = crypto.randomUUID()
        const formData = await request.formData()
        const description = formData.get("description")
        const latitude = formData.get("latitude")
        const longitude = formData.get("longitude")

        if (!description || !latitude || !longitude) {
            return Response.json(
                { error: "Algumas informações não foram disponibilizadas no envio da requisição" },
                { status: 400 },
            )
        }

        formData.set("userId", userId)

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/vistorias"

        const response = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: formData,
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
