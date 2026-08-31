import { NextRequest } from "next/server"

// Autenticar um usuário
export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/usuarios/login"

        const response = await fetch(apiUrl, { headers })

        if (!response.ok) {
            return Response.json(
                {
                    error: "Erro no processo de response da API - Cadastro de Usuário",
                },
                { status: response.status },
            )
        }

        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        return Response.json(
            {
                error: "Erro encontrado na API - Cadastro de Usuário: " + error,
            },
            { status: 500 },
        )
    }
}