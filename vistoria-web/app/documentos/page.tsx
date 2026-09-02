'use client'
import { useEffect, useState } from 'react'

import { NovoDocumentoButton } from '@/components/Buttons/NovoDocumentoButton'
import DocumentosTable, { type Documento } from '@/components/Tables/DocumentosTable'
import PagesCommomSidebar from '@/components/PagesCommomSidebar'

/**
 * Busca todos os documentos disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de documentos cadastrados.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarDocumentos = async (token: string) => {
  const response = await fetch('/api/documentos', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Não foi possível recuperar os documentos.')
  }

  return response.json() as Promise<Documento[]>
}

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [sidebarRecolhida, setSidebarRecolhida] = useState<boolean>(false)
  const [carregando, setCarregando] = useState<boolean>(true)
  const [mensagemErro, setMensagemErro] = useState<string>('')

  useEffect(() => {
      const token = sessionStorage.getItem('accessToken')
      const requisicao = token
        ? visualizarDocumentos(token)
        : Promise.reject(new Error('Sua sessão não foi encontrada. Entre novamente para acessar os documentos.'))
  
      void requisicao
        .then((dados) => setDocumentos(dados))
        .catch((error: unknown) => setMensagemErro(error instanceof Error ? error.message : 'Não foi possível recuperar as vistorias.'))
        .finally(() => setCarregando(false))
    }, [])

  return (
    <div
      className={`min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid ${
        sidebarRecolhida ? 'lg:grid-cols-[5.5rem_minmax(0,1fr)]' : 'lg:grid-cols-[21rem_minmax(0,1fr)]'
      }`}
    >
      <PagesCommomSidebar
        activeItem="documents"
        collapsed={sidebarRecolhida}
        onToggle={() => setSidebarRecolhida((recolhida) => !recolhida)}
      />

      <main className="min-w-0">
        <header className="flex min-h-20 items-center border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-[#1E5BA8]">PEACORE</p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Documentos</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 border-b border-[#DDE3ED] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#1E274A]">Documentos</h2>
                <p className="mt-2 text-base leading-6 text-[#687076]">Consulte os arquivos cadastrados na plataforma.</p>
              </div>
              <NovoDocumentoButton />
            </div>

            <DocumentosTable documentos={documentos} />
          </div>
        </section>
      </main>
    </div>
  )
}
