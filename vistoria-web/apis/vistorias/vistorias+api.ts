import { NextRequest } from "next/server"

// Para visualizar as vistorias
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

		const response = await fetch(apiUrl, { headers })

		if (!response.ok) {
			return Response.json(
				{
					error: "Erro no processo de response da API - Vistorias",
				},
				{ status: response.status },
			)
		}

		const data = await response.json()
		return Response.json(data)
	} catch (error) {
		return Response.json(
			{
				error: "Erro encontrado na API - Vistorias: " + error,
			},
			{ status: 500 },
		)
	}
}