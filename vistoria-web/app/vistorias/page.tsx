'use client'

import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import ErrorModal from '@/components/Modals/ErrorModal'
import SuccessModal from '@/components/Modals/SuccessModal'

interface DadosVistoria {
  description: string
  latitude: string
  longitude: string
  photo: File
}

const etapas = ['Dados da vistoria', 'Localização', 'Evidência', 'Revisão']
const tamanhoMaximoFoto = 10 * 1024 * 1024

/**
 * Cria uma vistoria com os dados preenchidos pelo usuário.
 *
 * @param dados - Dados obrigatórios para o cadastro da vistoria.
 * @returns Retorna a vistoria criada pela API.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const criarVistoria = async ({ description, latitude, longitude, photo }: DadosVistoria) => {
  const token = sessionStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Sua sessão não foi encontrada. Entre novamente para cadastrar uma vistoria.')
  }

  const formData = new FormData()
  formData.append('description', description)
  formData.append('latitude', latitude)
  formData.append('longitude', longitude)
  formData.append('photo', photo)
  formData.append('pendente', 'true')

  const response = await fetch('/api/vistorias', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [erroFoto, setErroFoto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [modalErro, setModalErro] = useState(false)
  const [modalSucesso, setModalSucesso] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const possuiDadosPreenchidos = Boolean(description || latitude || longitude || photo)

  const limparCadastro = () => {
    setEtapaAtual(1)
    setDescription('')
    setLatitude('')
    setLongitude('')
    setPhoto(null)
    setErroFoto('')
  }

  const sair = () => {
    sessionStorage.removeItem('accessToken')
    router.replace('/')
  }

  const cancelar = () => {
    if (possuiDadosPreenchidos && !window.confirm('Os dados preenchidos serão descartados. Deseja cancelar o cadastro?')) {
      return
    }

    router.push('/dashboard')
  }

  const selecionarFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0]

    if (!arquivo) {
      setPhoto(null)
      setErroFoto('')
      return
    }

    if (!arquivo.type.startsWith('image/')) {
      setPhoto(null)
      setErroFoto('Selecione um arquivo de imagem válido.')
      event.target.value = ''
      return
    }

    if (arquivo.size > tamanhoMaximoFoto) {
      setPhoto(null)
      setErroFoto('A imagem deve ter no máximo 10 MB.')
      event.target.value = ''
      return
    }

    setPhoto(arquivo)
    setErroFoto('')
  }

  const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (etapaAtual < etapas.length) {
      setEtapaAtual((etapa) => etapa + 1)
      return
    }

    if (!photo) {
      setEtapaAtual(3)
      setErroFoto('Selecione a foto obrigatória da vistoria.')
      return
    }

    setEnviando(true)

    try {
      await criarVistoria({ description, latitude, longitude, photo })
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
                Informe os dados operacionais, a localização e a evidência do atendimento.
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
                      {numeroEtapa < etapas.length ? <span aria-hidden="true" className="mx-4 h-px w-12 bg-[#DDE3ED] sm:w-20" /> : null}
                    </li>
                  )
                })}
              </ol>
            </div>

            <form className="mt-6 rounded-2xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-8" onSubmit={enviarFormulario}>
              {etapaAtual === 1 ? (
                <fieldset>
                  <legend className="text-xl font-bold tracking-tight text-[#1E274A]">Dados da vistoria</legend>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Descreva objetivamente o atendimento a ser realizado.</p>

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
                <fieldset>
                  <legend className="text-xl font-bold tracking-tight text-[#1E274A]">Localização</legend>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Use coordenadas em graus decimais para identificar o local da vistoria.</p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="latitude">
                        Latitude
                      </label>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                        id="latitude"
                        inputMode="decimal"
                        max="90"
                        min="-90"
                        name="latitude"
                        onChange={(event) => setLatitude(event.target.value)}
                        placeholder="Ex.: -23.5505"
                        required
                        step="any"
                        type="number"
                        value={latitude}
                      />
                      <p className="mt-2 text-sm text-[#687076]">Valor entre -90 e 90.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="longitude">
                        Longitude
                      </label>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                        id="longitude"
                        inputMode="decimal"
                        max="180"
                        min="-180"
                        name="longitude"
                        onChange={(event) => setLongitude(event.target.value)}
                        placeholder="Ex.: -46.6333"
                        required
                        step="any"
                        type="number"
                        value={longitude}
                      />
                      <p className="mt-2 text-sm text-[#687076]">Valor entre -180 e 180.</p>
                    </div>
                  </div>
                </fieldset>
              ) : null}

              {etapaAtual === 3 ? (
                <fieldset>
                  <legend className="text-xl font-bold tracking-tight text-[#1E274A]">Evidência</legend>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Envie uma imagem do local ou do serviço. O arquivo é obrigatório para concluir o cadastro.</p>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="photo">
                      Foto da vistoria
                    </label>
                    <input
                      accept="image/*"
                      className="mt-2 block w-full rounded-lg border border-[#BCC7D8] bg-white px-3 py-2 text-base text-[#11181C] file:mr-4 file:rounded-md file:border-0 file:bg-[#E3EFFD] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#1E274A] hover:file:bg-[#D6E7FC] focus:border-[#1E5BA8] focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20"
                      id="photo"
                      name="photo"
                      onChange={selecionarFoto}
                      required={!photo}
                      type="file"
                    />
                    <p className="mt-2 text-sm text-[#687076]">Formatos de imagem aceitos. Tamanho máximo de 10 MB.</p>
                    {photo ? <p className="mt-3 text-sm font-semibold text-[#16803A]">Arquivo selecionado: {photo.name}</p> : null}
                    {erroFoto ? <p className="mt-3 text-sm font-semibold text-[#C8353F]" role="alert">{erroFoto}</p> : null}
                  </div>
                </fieldset>
              ) : null}

              {etapaAtual === 4 ? (
                <section aria-labelledby="revisao-title">
                  <h3 className="text-xl font-bold tracking-tight text-[#1E274A]" id="revisao-title">Revisão do cadastro</h3>
                  <p className="mt-2 text-sm leading-6 text-[#687076]">Confira os dados antes de cadastrar a vistoria.</p>

                  <dl className="mt-6 divide-y divide-[#DDE3ED] border-y border-[#DDE3ED] text-sm">
                    <div className="grid gap-2 py-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Descrição</dt>
                      <dd className="whitespace-pre-wrap text-[#687076]">{description}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Localização</dt>
                      <dd className="text-[#687076]">{latitude}, {longitude}</dd>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="font-semibold text-[#1E274A]">Foto</dt>
                      <dd className="break-all text-[#687076]">{photo?.name}</dd>
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
