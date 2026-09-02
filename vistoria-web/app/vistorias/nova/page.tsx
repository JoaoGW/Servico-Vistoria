'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import ErrorModal from '@/components/Modals/ErrorModal'
import SuccessModal from '@/components/Modals/SuccessModal'

interface DadosVistoria {
  description: string
}

const etapas = ['Dados da vistoria', 'Revisão']

/**
 * Cria uma vistoria com a descrição preenchida pelo usuário.
 *
 * @param dados - Dados obrigatórios para o cadastro da vistoria.
 * @returns Retorna a vistoria criada pela API.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const criarVistoria = async ({ description }: DadosVistoria) => {
  const token = sessionStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Sua sessão não foi encontrada. Entre novamente para cadastrar uma vistoria.')
  }

  const response = await fetch('/api/vistorias', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível cadastrar a vistoria. Verifique os dados e tente novamente.')
  }

  return response.json()
}

export default function NovaVistoria() {
  const router = useRouter()
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [sidebarRecolhida, setSidebarRecolhida] = useState(false)
  const [description, setDescription] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [modalErro, setModalErro] = useState(false)
  const [modalSucesso, setModalSucesso] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const limparCadastro = () => {
    setEtapaAtual(1)
    setDescription('')
  }

  const sair = () => {
    sessionStorage.removeItem('accessToken')
    router.replace('/')
  }

  const cancelar = () => {
    if (description && !window.confirm('Os dados preenchidos serão descartados. Deseja cancelar o cadastro?')) {
      return
    }

    router.push('/vistorias')
  }

  const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (etapaAtual < etapas.length) {
      setEtapaAtual((etapa) => etapa + 1)
      return
    }

    setEnviando(true)

    try {
      await criarVistoria({ description })
      setModalSucesso(true)
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível cadastrar a vistoria.')
      setModalErro(true)
    } finally {
      setEnviando(false)
    }
  }

  const fecharSucesso = () => {
    setModalSucesso(false)
    limparCadastro()
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
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Nova vistoria</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="border-b border-[#DDE3ED] pb-6">
              <h2 className="text-3xl font-bold tracking-tight text-[#1E274A]">Cadastrar vistoria</h2>
              <p className="mt-2 text-base leading-6 text-[#687076]">
                Registre a solicitação inicial. A localização e a evidência serão adicionadas pelo aplicativo mobile.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <ol aria-label="Etapas do cadastro" className="flex min-w-max items-center">
                {etapas.map((etapa, indice) => {
                  const numeroEtapa = indice + 1
                  const ativa = numeroEtapa === etapaAtual
                  const concluida = numeroEtapa < etapaAtual

                  return (
                    <li className="flex items-center" key={etapa}>
                      <div className="flex items-center gap-3">
                        <span
                          aria-current={ativa ? 'step' : undefined}
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                            ativa || concluida ? 'bg-[#1E5BA8] text-white' : 'bg-[#E2EAF5] text-[#687076]'
                          }`}
                        >
                          {numeroEtapa}
                        </span>
                        <span className={`text-sm font-semibold ${ativa ? 'text-[#1E274A]' : 'text-[#687076]'}`}>{etapa}</span>
                      </div>
                      {numeroEtapa < etapas.length ? <span aria-hidden="true" className="mx-4 h-px w-16 bg-[#DDE3ED] sm:w-24" /> : null}
                    </li>
                  )
                })}
              </ol>
            </div>

            <form className="mt-6 rounded-2xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-8" onSubmit={enviarFormulario}>
              {etapaAtual === 1 ? (
                <fieldset>
                  <legend className="text-xl font-bold tracking-tight text-[#1E274A]">Dados da vistoria</legend>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Descreva objetivamente o atendimento que deverá ser realizado.</p>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="description">
                      Descrição da vistoria
                    </label>
                    <textarea
                      className="mt-2 min-h-32 w-full resize-y rounded-lg border border-[#BCC7D8] bg-white px-3 py-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                      id="description"
                      name="description"
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Ex.: Instalação de equipamento no local informado."
                      required
                      value={description}
                    />
                  </div>
                </fieldset>
              ) : null}

              {etapaAtual === 2 ? (
                <section aria-labelledby="revisao-title">
                  <h3 className="text-xl font-bold tracking-tight text-[#1E274A]" id="revisao-title">Revisão do cadastro</h3>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Confira a solicitação antes de cadastrar a vistoria.</p>

                  <dl className="mt-6 divide-y divide-[#DDE3ED] border-y border-[#DDE3ED] text-sm">
                    <div className="grid gap-2 py-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Descrição</dt>
                      <dd className="whitespace-pre-wrap text-[#687076]">{description}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Status inicial</dt>
                      <dd className="font-semibold text-[#C8353F]">Pendente</dd>
                    </div>
                  </dl>
                </section>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE3ED] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    className="h-12 rounded-lg border border-[#BCC7D8] px-5 text-base font-semibold text-[#1E274A] transition-colors hover:border-[#1E5BA8] hover:bg-[#F2F4F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                    onClick={cancelar}
                    type="button"
                  >
                    Cancelar
                  </button>
                  {etapaAtual > 1 ? (
                    <button
                      className="h-12 rounded-lg px-5 text-base font-semibold text-[#1E274A] transition-colors hover:bg-[#F2F4F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                      disabled={enviando}
                      onClick={() => setEtapaAtual((etapa) => etapa - 1)}
                      type="button"
                    >
                      Anterior
                    </button>
                  ) : null}
                </div>

                <button
                  className="h-12 rounded-lg bg-[#1E274A] px-5 text-base font-bold text-white transition-colors hover:bg-[#151C36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C] disabled:cursor-not-allowed disabled:bg-[#AEBBD2]"
                  disabled={enviando}
                  type="submit"
                >
                  {enviando ? 'Cadastrando vistoria...' : etapaAtual === etapas.length ? 'Cadastrar vistoria' : 'Continuar'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {modalErro ? <ErrorModal message={mensagemErro} onClose={() => setModalErro(false)} title="Não foi possível cadastrar a vistoria" /> : null}
      {modalSucesso ? <SuccessModal actionLabel="Cadastrar outra vistoria" message="A vistoria foi cadastrada e está disponível como pendente." onClose={fecharSucesso} title="Vistoria cadastrada" /> : null}
    </div>
  )
}
