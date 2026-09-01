'use client'

import { useEffect, useState } from 'react'

import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'
import OverviewCard from '@/components/Dashboard/OverviewCard'

interface Vistoria {
  id: string
  description: string
  latitude: number
  longitude: number
  pendente: boolean
  createdAt: string
  updatedAt: string
}

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
 * Busca as vistorias disponíveis para o usuário autenticado.
 *
 * @param token - Token JWT usado na autorização da requisição.
 * @returns Retorna a lista de vistorias cadastradas.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const visualizarVistorias = async (token: string) => {
  try {
    const response = await fetch('/api/vistorias', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 429) {
        console.log('Limite de requisições para vistorias atingido. Aguarde e tente novamente mais tarde!')
      }

      console.log('Status da Resposta de Vistorias: ', response)
      throw new Error('Não foi possível recuperar as vistorias.')
    }

    const data: Vistoria[] = await response.json()
    return data
  } catch (error) {
    console.error('O seguinte erro foi encontrado ao resgatar as vistorias: ', error)
    throw error
  }
}

export default function Dashboard() {
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [mensagemErro, setMensagemErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const requisicao = token
      ? visualizarVistorias(token)
      : Promise.reject(new Error('Sua sessão não foi encontrada. Entre novamente para acessar as vistorias.'))

    void requisicao
      .then((dados) => setVistorias(dados))
      .catch((error: Error) => setMensagemErro(error.message))
      .finally(() => setCarregando(false))
  }, [])

  const vistoriasRecentes = [...vistorias].sort(
    (primeira, segunda) => new Date(segunda.updatedAt).getTime() - new Date(primeira.updatedAt).getTime(),
  )
  const pendentes = vistorias.filter((vistoria) => vistoria.pendente)
  const concluidas = vistorias.filter((vistoria) => !vistoria.pendente)

  return (
    <div className="min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid lg:grid-cols-[21rem_minmax(0,1fr)]">
      <DashboardSidebar />

      <main className="min-w-0">
        <header className="flex min-h-20 items-center justify-between border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-[#1E5BA8]">PEACORE</p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Painel Geral</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-7xl">
            <div className="border-b border-[#DDE3ED] pb-6">
              <p className="text-sm font-semibold text-[#1E5BA8]">VISÃO OPERACIONAL</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1E274A]">Vistorias</h2>
              <p className="mt-2 text-base leading-6 text-[#687076]">
                Acompanhe o volume, as pendências e as vistorias concluídas pela equipe.
              </p>
            </div>

            {carregando ? (
              <div aria-busy="true" className="py-16 text-base text-[#687076]" role="status">
                Carregando vistorias...
              </div>
            ) : null}

            {mensagemErro ? (
              <div className="mt-6 border border-[#EAB7BC] bg-white px-5 py-4 text-[#7C252D]" role="alert">
                <p className="font-semibold">Não foi possível carregar o painel</p>
                <p className="mt-1 text-sm leading-6">{mensagemErro}</p>
              </div>
            ) : null}

            {!carregando && !mensagemErro ? (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <OverviewCard description="vistorias cadastradas" label="Total" tone="default" value={vistorias.length} />
                  <OverviewCard description="aguardando conclusão" label="Pendentes" tone="warning" value={pendentes.length} />
                  <OverviewCard description="vistorias finalizadas" label="Concluídas" tone="success" value={concluidas.length} />
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.85fr)]">
                  <section className="overflow-hidden rounded-2xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
                    <div className="border-b border-[#DDE3ED] px-5 py-5 sm:px-6">
                      <h3 className="text-xl font-bold tracking-tight text-[#1E274A]">Vistorias recentes</h3>
                    </div>

                    {vistoriasRecentes.length ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-left">
                          <thead className="bg-[#1E274A] text-sm font-semibold text-white">
                            <tr>
                              <th className="px-5 py-4 sm:px-6">Identificador</th>
                              <th className="px-5 py-4 sm:px-6">Descrição</th>
                              <th className="px-5 py-4 sm:px-6">Status</th>
                              <th className="px-5 py-4 sm:px-6">Atualizada em</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#DDE3ED] text-sm text-[#11181C]">
                            {vistoriasRecentes.map((vistoria) => (
                              <tr key={vistoria.id}>
                                <td className="whitespace-nowrap px-5 py-4 font-mono font-semibold text-[#1E274A] sm:px-6">
                                  {vistoria.id}
                                </td>
                                <td className="min-w-56 px-5 py-4 sm:px-6">{vistoria.description}</td>
                                <td className="px-5 py-4 sm:px-6">
                                  <span className={vistoria.pendente ? 'font-semibold text-[#C8353F]' : 'font-semibold text-[#16803A]'}>
                                    {vistoria.pendente ? 'Pendente' : 'Concluída'}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-5 py-4 text-[#687076] sm:px-6">
                                  {formatarData(vistoria.updatedAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="px-6 py-12 text-base leading-6 text-[#687076]">
                        Nenhuma vistoria cadastrada até o momento.
                      </p>
                    )}
                  </section>

                  <section className="overflow-hidden rounded-2xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
                    <div className="border-b border-[#DDE3ED] px-5 py-5 sm:px-6">
                      <h3 className="text-xl font-bold tracking-tight text-[#1E274A]">Vistorias pendentes</h3>
                    </div>

                    {pendentes.length ? (
                      <ul className="divide-y divide-[#DDE3ED]">
                        {pendentes.map((vistoria) => (
                          <li className="px-5 py-5 sm:px-6" key={vistoria.id}>
                            <div className="flex items-start justify-between gap-4">
                              <p className="font-semibold text-[#1E274A]">{vistoria.description}</p>
                              <span className="shrink-0 text-sm font-semibold text-[#C8353F]">Pendente</span>
                            </div>
                            <p className="mt-2 text-sm text-[#687076]">Atualizada em {formatarData(vistoria.updatedAt)}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-6 py-12 text-base leading-6 text-[#687076]">
                        Não há vistorias pendentes.
                      </p>
                    )}
                  </section>
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
