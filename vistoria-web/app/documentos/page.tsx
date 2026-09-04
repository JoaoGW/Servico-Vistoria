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
  const [mensagemAcao, setMensagemAcao] = useState<string>('')
  const [documentoEmExclusao, setDocumentoEmExclusao] = useState<string>('')

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const requisicao = token
      ? visualizarDocumentos(token)
      : Promise.reject(new Error('Sua sessão não foi encontrada. Entre novamente para acessar os documentos.'))

    void requisicao
      .then((dados) => setDocumentos(dados))
      .catch((error: unknown) => setMensagemErro(error instanceof Error ? error.message : 'Não foi possível recuperar os documentos.'))
      .finally(() => setCarregando(false))
  }, [])

  const excluirDocumento = async (id: string) => {
    const token = sessionStorage.getItem('accessToken')

    if (!token) {
      setMensagemAcao('Sua sessão não foi encontrada. Entre novamente para excluir o documento.')
      return
    }

    setDocumentoEmExclusao(id)
    setMensagemAcao('')

    try {
      const response = await fetch(`/api/documentos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Não foi possível excluir o documento.')
      }

      setDocumentos((itens) => itens.filter((documento) => documento.id !== id))
    } catch (error) {
      setMensagemAcao(error instanceof Error ? error.message : 'Não foi possível excluir o documento.')
    } finally {
      setDocumentoEmExclusao('')
    }
  }

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
                <p className="mt-2 text-base leading-6 text-[#687076]">
                  {carregando
                    ? 'Carregando documentos...'
                    : `${documentos.length} ${documentos.length === 1 ? 'documento cadastrado' : 'documentos cadastrados'}`}
                </p>
              </div>
              <NovoDocumentoButton />
            </div>

            {carregando ? (
              <section className="mt-10 rounded-xl border border-[#DDE3ED] bg-white px-5 py-12 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-6">
                <p className="text-base text-[#687076]" role="status">Carregando documentos...</p>
              </section>
            ) : null}

            {mensagemErro ? (
              <section className="mt-10 border-l-4 border-[#C8353F] bg-white px-6 py-5 text-[#7C252D] shadow-[0_8px_24px_rgba(30,39,74,0.06)]" role="alert">
                <p className="font-semibold">Não foi possível carregar os documentos</p>
                <p className="mt-1 text-sm leading-6">{mensagemErro}</p>
              </section>
            ) : null}

            {mensagemAcao ? (
              <section className="mt-6 rounded-xl border border-[#F5B7B7] bg-[#FFF5F5] px-6 py-5 text-[#7C252D]" role="alert">
                <p className="font-semibold">Não foi possível excluir o documento</p>
                <p className="mt-1 text-sm leading-6">{mensagemAcao}</p>
              </section>
            ) : null}

            {!carregando && !mensagemErro && documentos.length ? (
              <DocumentosTable documentoEmExclusao={documentoEmExclusao} documentos={documentos} onDelete={excluirDocumento} />
            ) : null}

            {!carregando && !mensagemErro && !documentos.length ? (
              <section className="mt-10 rounded-xl border border-[#DDE3ED] bg-white px-5 py-12 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-6">
                <p className="font-semibold text-[#1E274A]">Nenhum documento cadastrado</p>
                <p className="mt-2 text-sm leading-6 text-[#687076]">Adicione um documento para que ele apareça nesta lista.</p>
              </section>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
