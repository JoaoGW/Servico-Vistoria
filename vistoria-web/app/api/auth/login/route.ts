import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const { email, senha } = await request.json()

        if (!email || !senha) {
            return Response.json(
                { error: "Não foram disponibilizados e-mail e senha no envio da requisição" },
                { status: 400 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/usuarios/login"

        const response = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({ email, senha }),
        })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Login de Usuário",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Login de Usuário: " + error,
            },
            { status: 500 },
        )
    }
}
