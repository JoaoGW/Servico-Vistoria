'use client'
import { useEffect, useMemo, useState } from 'react'

import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import { NovaVistoriaButton } from '@/components/Buttons/NovaVistoriaButton'
import VistoriasTable, { type Vistoria } from '@/components/Tables/VistoriasTable'

type FiltroStatus = 'todas' | 'pendentes' | 'concluidas'

const filtros: { label: string; value: FiltroStatus }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Pendentes', value: 'pendentes' },
  { label: 'Concluídas', value: 'concluidas' },
]

/**
 * Busca todas as vistorias disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de vistorias cadastradas.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarVistorias = async (token: string) => {
  const response = await fetch('/api/vistorias', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Não foi possível recuperar as vistorias.')
  }

  return response.json() as Promise<Vistoria[]>
}

export default function Vistorias() {
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erroCarregamento, setErroCarregamento] = useState<string>('')
  const [mensagemAcao, setMensagemAcao] = useState<string>('')
  const [vistoriaEmExclusao, setVistoriaEmExclusao] = useState<string>('')
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroStatus>('todas')
  const [busca, setBusca] = useState<string>('')
  const [sidebarRecolhida, setSidebarRecolhida] = useState<boolean>(false)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const requisicao = token
      ? visualizarVistorias(token)
      : Promise.reject(new Error('Sua sessão não foi encontrada. Entre novamente para acessar as vistorias.'))

    void requisicao
      .then((dados) => setVistorias(dados))
      .catch((error: unknown) => setErroCarregamento(error instanceof Error ? error.message : 'Não foi possível recuperar as vistorias.'))
      .finally(() => setCarregando(false))
  }, [])

  const excluirVistoria = async (id: string) => {
    const token = sessionStorage.getItem('accessToken')

    if (!token) {
      setMensagemAcao('Sua sessão não foi encontrada. Entre novamente para excluir a vistoria.')
      return
    }

    setVistoriaEmExclusao(id)
    setMensagemAcao('')

    try {
      const response = await fetch(`/api/vistorias/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Não foi possível excluir a vistoria.')
      }

      setVistorias((itens) => itens.filter((vistoria) => vistoria.id !== id))
    } catch (error) {
      setMensagemAcao(error instanceof Error ? error.message : 'Não foi possível excluir a vistoria.')
    } finally {
      setVistoriaEmExclusao('')
    }
  }

  const vistoriasFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR')

    return [...vistorias]
      .filter((vistoria) => {
        if (filtroAtivo === 'pendentes') return vistoria.pendente
        if (filtroAtivo === 'concluidas') return !vistoria.pendente
        return true
      })
      .filter((vistoria) => !termo || vistoria.id.toLocaleLowerCase('pt-BR').includes(termo) || vistoria.description.toLocaleLowerCase('pt-BR').includes(termo))
      .sort((primeira, segunda) => new Date(segunda.createdAt).getTime() - new Date(primeira.createdAt).getTime())
  }, [busca, filtroAtivo, vistorias])

  return (
    <div
      className={`min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid ${
        sidebarRecolhida ? 'lg:grid-cols-[5.5rem_minmax(0,1fr)]' : 'lg:grid-cols-[21rem_minmax(0,1fr)]'
      }`}
    >
      <PagesCommomSidebar
        activeItem="vistorias"
        collapsed={sidebarRecolhida}
        onToggle={() => setSidebarRecolhida((recolhida) => !recolhida)}
      />

      <main className="min-w-0">
        <header className="flex min-h-20 items-center border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-[#1E5BA8]">PEACORE</p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Vistorias</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 border-b border-[#DDE3ED] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#1E274A]">Todas as vistorias</h2>
                <p className="mt-2 text-base leading-6 text-[#687076]">
                  {carregando
                    ? 'Carregando ordens de serviço...'
                    : `${vistorias.length} ${vistorias.length === 1 ? 'ordem de serviço cadastrada' : 'ordens de serviço cadastradas'}`}
                </p>
              </div>
              <NovaVistoriaButton />
            </div>

            <section aria-label="Filtros de vistorias" className="mt-6 rounded-2xl border border-[#DDE3ED] bg-white p-4 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div aria-label="Filtrar por status" className="flex flex-wrap gap-2" role="group">
                  {filtros.map((filtro) => {
                    const ativo = filtro.value === filtroAtivo

                    return (
                      <button
                        aria-pressed={ativo}
                        className={`min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] ${
                          ativo ? 'bg-[#1E274A] text-white' : 'bg-[#F2F4F8] text-[#52606D] hover:bg-[#E2EAF5]'
                        }`}
                        key={filtro.value}
                        onClick={() => setFiltroAtivo(filtro.value)}
                        type="button"
                      >
                        {filtro.label}
                      </button>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 sm:w-80">
                    <label className="sr-only" htmlFor="buscar-vistorias">Buscar vistoria</label>
                    <input
                      className="h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                      id="buscar-vistorias"
                      name="buscar-vistorias"
                      onChange={(event) => setBusca(event.target.value)}
                      placeholder="Buscar por identificador ou descrição"
                      type="search"
                      value={busca}
                    />
                  </div>
                  <p aria-live="polite" className="whitespace-nowrap text-sm text-[#687076]">
                    {vistoriasFiltradas.length} {vistoriasFiltradas.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                </div>
              </div>
            </section>

            {carregando ? (
              <section className="mt-10 rounded-xl border border-[#DDE3ED] bg-white px-5 py-12 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-6">
                <p className="text-base text-[#687076]" role="status">Carregando vistorias...</p>
              </section>
            ) : null}

            {erroCarregamento ? (
              <section className="mt-10 rounded-xl border border-[#F5B7B7] bg-[#FFF5F5] px-6 py-5 text-[#7C252D]" role="alert">
                <p className="font-semibold">Não foi possível carregar as vistorias</p>
                <p className="mt-1 text-sm leading-6">{erroCarregamento}</p>
              </section>
            ) : null}

            {mensagemAcao ? (
              <section className="mt-6 rounded-xl border border-[#F5B7B7] bg-[#FFF5F5] px-6 py-5 text-[#7C252D]" role="alert">
                <p className="font-semibold">Não foi possível excluir a vistoria</p>
                <p className="mt-1 text-sm leading-6">{mensagemAcao}</p>
              </section>
            ) : null}

            {!carregando && !erroCarregamento && vistoriasFiltradas.length ? (
              <VistoriasTable onDelete={excluirVistoria} vistoriaEmExclusao={vistoriaEmExclusao} vistorias={vistoriasFiltradas} />
            ) : null}

            {!carregando && !erroCarregamento && !vistoriasFiltradas.length ? (
              <section className="mt-10 rounded-xl border border-[#DDE3ED] bg-white px-5 py-12 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-6">
                <p className="font-semibold text-[#1E274A]">Nenhuma vistoria encontrada</p>
                <p className="mt-2 text-sm leading-6 text-[#687076]">
                  Ajuste os filtros ou cadastre uma nova vistoria para iniciar o acompanhamento.
                </p>
              </section>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
