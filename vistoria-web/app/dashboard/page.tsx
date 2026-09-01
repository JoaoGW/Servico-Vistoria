import { useEffect, useState } from "react";

export default function Dashboard() {
  const [vistorias, setVistorias] = useState()
  const [mensagemErro, setMensagemErro] = useState<string>("")

  /**
   * Descreva o method
   *
   * @param xxx - Descreva todos os parâmetros
   * @returns Descreva o retorno
   * @throws Will throw an error if the request fails or the response is not successful.
   *
   */
  const visualizarVistorias = async () => {
    try {
      const response = await fetch(`/vistorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response?.status === 429) {
          console.log(
            'Limite de requisições para vistorias atingido. Aguarde e tente novamente mais tarde!',
          );
        }
        console.log('Status da Resposta de Vistorias: ', response);
        setMensagemErro('Falha ao recuperar as vistorias')
        throw new Error('Falha ao recuperar as vistorias');
      }

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(
        'O seguinte erro foi encontrado ao resgatar as vistorias: ',
        error,
      );
      throw error;
    }
  };

    /**
   * Descreva o method
   *
   * @param xxx - Descreva todos os parâmetros
   * @returns Descreva o retorno
   * @throws Will throw an error if the request fails or the response is not successful.
   *
   */
  const visualizarDocumentos = async () => {
    try {
      const response = await fetch(`/documentos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response?.status === 429) {
          console.log(
            'Limite de requisições para documentos atingido. Aguarde e tente novamente mais tarde!',
          );
        }
        console.log('Status da Resposta de Documentos: ', response);
        setMensagemErro('Falha ao recuperar as documentos')
        throw new Error('Falha ao recuperar as documentos');
      }

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error(
        'O seguinte erro foi encontrado ao resgatar os documentos: ',
        error,
      );
      throw error;
    }
  };

  // Recebe a lista de vistorias e documentos ao abrir e/ou instanciar a tela atual
  useEffect(() => {
    visualizarVistorias()
    visualizarDocumentos()
  }, [])

  return <div></div>;
}
