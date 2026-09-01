import { NextRequest } from "next/server"

//
// Rotas de Create - Crud
//

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const userId = crypto.randomUUID()
        const { description, latitude, longitude, pendente } = await request.json()

        if (!description || !latitude || !longitude) {
            return Response.json(
                { error: "Algumas informações não foram disponibilizadas no envio da requisição" },
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
            body: JSON.stringify({ userId, description, latitude, longitude, pendente }),
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

//
// Rotas de Read - cRud
//

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
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/vistorias"

        const response = await fetch(apiUrl, {
            method: "GET",
            headers
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

//
// Rotas de Update - crUd
//

export async function PUT(request: NextRequest) {
    try {
        if (request.method !== "PUT") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const url = new URL(request.url)
        const id = url.searchParams.get("id")

		if (id) {
			return Response.json(
				{
					error: "Não foi disponibilizado um id da vistoria no envio da requisição",
				},
				{ status: 404 },
			)
		}

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/vistorias" + `/${id}`

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers
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

//
// Rotas de Update - cruD
//

export async function DELETE(request: NextRequest) {
    try {
        if (request.method !== "DELETE") {
            return Response.json(
                { error: "O método " + request.method + " na requisição não é um método válido" },
                { status: 405 },
            )
        }

        const headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        })

        const apiUrl = process.env.APIS_URL + "/vistorias"

        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers
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