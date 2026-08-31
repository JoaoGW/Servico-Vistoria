# Modelo para Requisições de API

- Usando NextResponse e NextRequest:

````
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	try {
		if (request.method !== "GET") {
			return Response.json(
				{ error: "O método " + request.method + " na requisição não é um método válido" },
				{ status: 405 },
			)
		}

		const url = new URL(request.url)
		const cep = url.searchParams.get("cep")

		if (cep === null) {
			return Response.json(
				{
					error: "Não foi disponibilizado um CEP no envio da requisição",
				},
				{ status: 404 },
			)
		}

		const headers = new Headers({
			Accept: "application/json",
			"Content-Type": "application/json",
		})

		const apiUrl = `viacep.com.br/ws/${cep}/json/`

		const response = await fetch(apiUrl, { headers })

		if (!response.ok) {
			return Response.json(
				{
					error: "Erro no processo de response da API de CEP",
				},
				{ status: response.status },
			)
		}

		const data = await response.json()
		return Response.json(data)
	} catch (error) {
		return Response.json(
			{
				error: "Erro na API (Busca de CEP): " + error,
			},
			{ status: 500 },
		)
	}
}
````

---

- No Componente ou Tela:

````
/**
 * Descreva o method
 *
 * @param xxx - Descreva todos os parâmetros
 * @returns Descreva o retorno
 * @throws Will throw an error if the request fails or the response is not successful.
 *
 * @remarks
 * - Ensure that the API endpoint is accessible.
 * - If the response status is 429, then xxx
 * - Logs relevant information to the console in case of errors or specific response statuses.
 */
export const generateItinerary = async (prompt: string) => {
  try {
    const response = await fetch(`/generateItinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      if(response?.status === 429){
        console.log("O limite da cota foi atingido. Verifique o saldo disponível na OpenAI.");
      }
      console.log("Status da Resposta da OpenAI: ", response);
      throw new Error('Falha ao gerar o itinerário');
    }

    const data = await response.json();

    return data.message;
  } catch (error) {
    console.error('O seguinte erro foi encontrado ao gerar o itinerário: ', error);
    throw error;
  }
}
````