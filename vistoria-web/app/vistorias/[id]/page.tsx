"use client"

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import VistoriaLocationMap from '@/components/Maps/VistoriaLocationMap'
import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import { type Vistoria } from '@/components/Tables/VistoriasTable'

const formatarData = (valor: string) => {
  const data = new Date(valor)

  if (Number.isNaN(data.getTime())) {
    return 'Data indisponível'
  }

  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatarCoordenada = (valor: number | null) => (typeof valor === 'number' ? valor.toFixed(6) : 'Não registrada')

const buscarVistoria = async (id: string, token: string) => {
  const response = await fetch('/api/vistorias', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Não foi possível recuperar os dados da vistoria.')
  }

  const vistorias = await response.json() as Vistoria[]
  return vistorias.find((vistoria) => vistoria.id === id) ?? null
}

export default function DetalhesVistoria() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [vistoria, setVistoria] = useState<Vistoria | null>(null)
  const [carregando, setCarregando] = useState<boolean>(true)
  const [mensagemErro, setMensagemErro] = useState<string>('')
  const [urlFoto, setUrlFoto] = useState<string>('')
  const [mensagemFoto, setMensagemFoto] = useState<string>('')
  const [sidebarRecolhida, setSidebarRecolhida] = useState<boolean>(false)

  useEffect(() => {
    let ativo = true
    let urlTemporaria = ''

    const carregarVistoria = async () => {
      const token = sessionStorage.getItem('accessToken')

      if (!token) {
        throw new Error('Sua sessão não foi encontrada. Entre novamente para acessar a vistoria.')
      }

      const dados = await buscarVistoria(id, token)

      if (!dados) {
        throw new Error('A vistoria solicitada não foi encontrada.')
      }

      if (dados.pendente) {
        router.replace('/vistorias')
        return
      }

      if (!ativo) {
        return
      }

      setVistoria(dados)

      if (!dados.photoMimeType) {
        setMensagemFoto('Nenhuma foto foi enviada para esta vistoria.')
        return
      }

      try {
        const response = await fetch(`/api/vistorias/${dados.id}/foto`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Não foi possível carregar a foto enviada.')
        }

        urlTemporaria = URL.createObjectURL(await response.blob())

        if (ativo) {
          setUrlFoto(urlTemporaria)
        } else {
          URL.revokeObjectURL(urlTemporaria)
        }
      } catch (error) {
        if (ativo) {
          setMensagemFoto(error instanceof Error ? error.message : 'Não foi possível carregar a foto enviada.')
        }
      }
    }

    void carregarVistoria()
      .catch((error: unknown) => {
        if (ativo) {
          setMensagemErro(error instanceof Error ? error.message : 'Não foi possível recuperar os dados da vistoria.')
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false)
        }
      })

    return () => {
      ativo = false
      if (urlTemporaria) {
        URL.revokeObjectURL(urlTemporaria)
      }
    }
  }, [id, router])

  const latitude = vistoria?.latitude
  const longitude = vistoria?.longitude
  const possuiCoordenadas = typeof latitude === 'number' && typeof longitude === 'number'

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
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Detalhes da vistoria</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 border-b border-[#DDE3ED] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#1E274A]">Vistoria concluída</h2>
                <p className="mt-2 text-base leading-6 text-[#687076]">Consulte os dados registrados, a localização e a evidência enviada.</p>
              </div>
              <button
                className="min-h-11 rounded-lg border border-[#BCC7D8] px-4 text-sm font-semibold text-[#1E274A] transition-colors hover:cursor-pointer hover:border-[#1E5BA8] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                onClick={() => router.push('/vistorias')}
                type="button"
              >
                Voltar para vistorias
              </button>
            </div>

            {carregando ? (
              <section className="mt-8 rounded-xl border border-[#DDE3ED] bg-white px-6 py-12 shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
                <p className="text-base text-[#687076]" role="status">Carregando dados da vistoria...</p>
              </section>
            ) : null}

            {mensagemErro ? (
              <section className="mt-8 rounded-xl border border-[#F5B7B7] bg-[#FFF5F5] px-6 py-5 text-[#7C252D]" role="alert">
                <p className="font-semibold">Não foi possível abrir a vistoria</p>
                <p className="mt-1 text-sm leading-6">{mensagemErro}</p>
              </section>
            ) : null}

            {vistoria && !carregando && !mensagemErro ? (
              <div className="mt-8 space-y-8">
                <section className="rounded-xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-[#1E274A]">Dados registrados</h3>
                  <dl className="mt-6 divide-y divide-[#DDE3ED] border-y border-[#DDE3ED] text-sm">
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Identificador</dt>
                      <dd className="break-all font-mono text-[#40516C]">{vistoria.id}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Usuário responsável</dt>
                      <dd className="break-all font-mono text-[#40516C]">{vistoria.userId}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Descrição</dt>
                      <dd className="whitespace-pre-wrap text-[#40516C]">{vistoria.description}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Status</dt>
                      <dd className="font-semibold text-[#16803A]">Concluída</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Latitude</dt>
                      <dd className="font-mono text-[#40516C]">{formatarCoordenada(vistoria.latitude)}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Longitude</dt>
                      <dd className="font-mono text-[#40516C]">{formatarCoordenada(vistoria.longitude)}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Criada em</dt>
                      <dd className="font-mono text-[#40516C]">{formatarData(vistoria.createdAt)}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Finalizado em</dt>
                      <dd className="font-mono text-[#40516C]">{vistoria.completedAt ? formatarData(vistoria.completedAt) : 'Data indisponível'}</dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-[#1E274A]">Foto enviada</h3>
                  {urlFoto ? (
                    <img alt={`Foto registrada na vistoria ${vistoria.id}`} className="mt-6 max-h-[34rem] w-full rounded-lg border border-[#DDE3ED] object-contain" src={urlFoto} />
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-[#687076]">{mensagemFoto || 'Carregando foto...'}</p>
                  )}
                </section>

                <section className="overflow-hidden rounded-xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
                  <div className="border-b border-[#DDE3ED] px-6 py-5 sm:px-8">
                    <h3 className="text-xl font-bold tracking-tight text-[#1E274A]">Localização registrada</h3>
                    <p className="mt-2 text-sm leading-6 text-[#687076]">
                      Latitude {formatarCoordenada(vistoria.latitude)} · Longitude {formatarCoordenada(vistoria.longitude)}
                    </p>
                  </div>
                  {possuiCoordenadas ? (
                    <VistoriaLocationMap latitude={latitude} longitude={longitude} />
                  ) : (
                    <p className="px-6 py-12 text-sm leading-6 text-[#687076] sm:px-8">Esta vistoria não possui coordenadas registradas.</p>
                  )}
                </section>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
