import { NextRequest } from "next/server"

/**
 * Cria um documento com título e arquivo enviados pelo cliente.
 *
 * @param request - Requisição multipart contendo o título e o arquivo do documento.
 * @returns Retorna o documento criado ou o erro retornado pela API.
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

        const formData = await request.formData()
        const title = formData.get("title")
        const file = formData.get("file")

        if (!title || !file) {
            return Response.json(
                { error: "Algumas informações não foram disponibilizadas no envio da requisição" },
                { status: 400 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
        })

        const authorization = request.headers.get("Authorization")
        if (authorization) {
            headers.set("Authorization", authorization)
        }

        const apiUrl = process.env.APIS_URL + "/documentos"

        const response = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: formData,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Criar Documento",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Criar Documento: " + error,
            },
            { status: 500 },
        )
    }
}

/**
 * Busca todos os documentos cadastrados na API.
 *
 * @param request - Requisição usada para encaminhar a autorização do usuário.
 * @returns Retorna a lista de documentos ou o erro retornado pela API.
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

        const apiUrl = process.env.APIS_URL + "/documentos"

        const response = await fetch(apiUrl, {
            method: "GET",
            headers,
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Read dos Documentos",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Read dos Documentos: " + error,
            },
            { status: 500 },
        )
    }
}
