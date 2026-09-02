'use client'
import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import { NovaVistoriaButton } from '@/components/Buttons/NovaVistoriaButton'

interface Vistoria {
  id: string
  description: string
  pendente: boolean
  createdAt: string
  updatedAt: string
}

type FiltroStatus = 'todas' | 'pendentes' | 'concluidas'

const filtros: { label: string; value: FiltroStatus }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Pendentes', value: 'pendentes' },
  { label: 'Concluídas', value: 'concluidas' },
]

const formatarData = (valor: string) => {
  const data = new Date(valor)

  if (Number.isNaN(data.getTime())) {
    return 'Data indisponível'
  }

  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

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
  const router = useRouter()
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [mensagemErro, setMensagemErro] = useState('')
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroStatus>('todas')
  const [busca, setBusca] = useState('')
  const [sidebarRecolhida, setSidebarRecolhida] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const requisicao = token
      ? visualizarVistorias(token)
      : Promise.reject(new Error('Sua sessão não foi encontrada. Entre novamente para acessar as vistorias.'))

    void requisicao
      .then((dados) => setVistorias(dados))
      .catch((error: unknown) => setMensagemErro(error instanceof Error ? error.message : 'Não foi possível recuperar as vistorias.'))
      .finally(() => setCarregando(false))
  }, [])

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

  const sair = () => {
    sessionStorage.removeItem('accessToken')
    router.replace('/')
  }

  return (
    <div
      className={`min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid ${
        sidebarRecolhida ? 'lg:grid-cols-[5.5rem_minmax(0,1fr)]' : 'lg:grid-cols-[21rem_minmax(0,1fr)]'
      }`}
    >
      <PagesCommomSidebar
        activeItem="vistorias"
        collapsed={sidebarRecolhida}
        onLogout={sair}
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

            <section aria-labelledby="lista-vistorias-title" className="mt-6 overflow-hidden rounded-2xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
              <div className="border-b border-[#DDE3ED] px-5 py-5 sm:px-6">
                <h3 className="text-xl font-bold tracking-tight text-[#1E274A]" id="lista-vistorias-title">Lista de vistorias</h3>
              </div>

              {carregando ? (
                <p className="px-6 py-12 text-base text-[#687076]" role="status">Carregando vistorias...</p>
              ) : null}

              {mensagemErro ? (
                <div className="border-l-4 border-[#C8353F] px-6 py-5 text-[#7C252D]" role="alert">
                  <p className="font-semibold">Não foi possível carregar as vistorias</p>
                  <p className="mt-1 text-sm leading-6">{mensagemErro}</p>
                </div>
              ) : null}

              {!carregando && !mensagemErro && vistoriasFiltradas.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-[52rem] w-full border-collapse text-left">
                    <thead className="bg-[#1E274A] text-sm font-semibold text-white">
                      <tr>
                        <th className="px-5 py-4 sm:px-6" scope="col">Identificador</th>
                        <th className="px-5 py-4 sm:px-6" scope="col">Descrição</th>
                        <th className="px-5 py-4 sm:px-6" scope="col">Status</th>
                        <th className="px-5 py-4 sm:px-6" scope="col">Criada em</th>
                        <th className="px-5 py-4 sm:px-6" scope="col">Atualizada em</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE3ED] text-sm text-[#11181C]">
                      {vistoriasFiltradas.map((vistoria) => (
                        <tr className="hover:bg-[#F8FAFC]" key={vistoria.id}>
                          <td className="whitespace-nowrap px-5 py-4 font-mono font-semibold text-[#1E274A] sm:px-6">{vistoria.id}</td>
                          <td className="min-w-80 px-5 py-4 leading-6 sm:px-6">{vistoria.description}</td>
                          <td className="px-5 py-4 sm:px-6">
                            <span className={vistoria.pendente ? 'font-semibold text-[#C8353F]' : 'font-semibold text-[#16803A]'}>
                              {vistoria.pendente ? 'Pendente' : 'Concluída'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-[#687076] sm:px-6">{formatarData(vistoria.createdAt)}</td>
                          <td className="whitespace-nowrap px-5 py-4 text-[#687076] sm:px-6">{formatarData(vistoria.updatedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {!carregando && !mensagemErro && !vistoriasFiltradas.length ? (
                <div className="px-6 py-12">
                  <p className="font-semibold text-[#1E274A]">Nenhuma vistoria encontrada</p>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">
                    Ajuste os filtros ou cadastre uma nova vistoria para iniciar o acompanhamento.
                  </p>
                </div>
              ) : null}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
