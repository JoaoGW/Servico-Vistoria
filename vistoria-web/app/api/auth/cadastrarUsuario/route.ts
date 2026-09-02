import { NextRequest } from "next/server"

/**
 * Cria um usuário com o e-mail e a senha enviados pelo cliente.
 *
 * @param request - Requisição JSON contendo o e-mail e a senha do usuário.
 * @returns Retorna o usuário criado ou o erro retornado pela API.
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

        const { email, password } = await request.json()

        if (!email || !password) {
            return Response.json(
                { error: "Não foram disponibilizados e-mail e senha no envio da requisição" },
                { status: 400 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/usuarios"

        const response = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Cadastro de Técnico",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Cadastro de Técnico: " + error,
            },
            { status: 500 },
        )
    }
}
