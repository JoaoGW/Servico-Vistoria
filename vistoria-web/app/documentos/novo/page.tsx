'use client'
import { type ChangeEvent, type FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import FieldLabel from '@/components/FieldLabel'
import ErrorModal from '@/components/Modals/ErrorModal'
import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import SuccessModal from '@/components/Modals/SuccessModal'

interface DadosDocumento {
  file: File
  title: string
}

const tamanhoMaximoArquivo = 10 * 1024 * 1024
const tiposArquivoPermitidos = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const formatarTamanhoArquivo = (tamanho: number) => `${(tamanho / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`

/**
 * Adiciona um documento com o título e o arquivo escolhidos pelo usuário.
 *
 * @param dados - Título e arquivo obrigatórios para o cadastro do documento.
 * @returns Retorna o documento criado pela API.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const adicionarDocumento = async ({ file, title }: DadosDocumento) => {
  const token = sessionStorage.getItem('accessToken')

  if (!token) {
    throw new Error('Sua sessão não foi encontrada. Entre novamente para enviar um documento.')
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('file', file)

  const response = await fetch('/api/documentos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Não foi possível enviar o documento. Verifique os dados e tente novamente.')
  }

  return response.json()
}

export default function NovoDocumentoPage() {
  const [sidebarRecolhida, setSidebarRecolhida] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [modalErro, setModalErro] = useState(false)
  const [modalSucesso, setModalSucesso] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const router = useRouter()

  const selecionarArquivo = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0]

    if (!arquivo) {
      setFile(null)
      return
    }

    if (!tiposArquivoPermitidos.includes(arquivo.type) || arquivo.size > tamanhoMaximoArquivo) {
      setFile(null)
      event.target.value = ''
      setMensagemErro('Selecione um arquivo PDF ou DOCX de até 10 MB.')
      setModalErro(true)
      return
    }

    setFile(arquivo)
  }

  const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      setMensagemErro('Selecione um arquivo PDF ou DOCX para enviar.')
      setModalErro(true)
      return
    }

    setEnviando(true)

    try {
      await adicionarDocumento({ file, title })
      setModalSucesso(true)
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível enviar o documento.')
      setModalErro(true)
    } finally {
      setEnviando(false)
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
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Novo documento</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="border-b border-[#DDE3ED] pb-6">
              <h2 className="text-3xl font-bold tracking-tight text-[#1E274A]">Cadastrar documento</h2>
              <p className="mt-2 text-base leading-6 text-[#687076]">Preencha os dados abaixo e selecione o arquivo que será anexado.</p>
            </div>

            <form className="mt-6 max-w-4xl rounded-xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-9" onSubmit={enviarFormulario}>
              <div className="border-b border-[#DDE3ED] pb-6">
                <h3 className="text-xl font-bold tracking-tight text-[#142B59]">Informações do documento</h3>
                <p className="mt-2 text-sm leading-6 text-[#71819C]">Preencha os dados abaixo e selecione o arquivo que será anexado.</p>
              </div>

              <div className="mt-7">
                <FieldLabel htmlFor="title" required>Título do documento</FieldLabel>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-[#C9D4E4] bg-white px-4 text-base text-[#1E2F4D] outline-none transition-colors placeholder:text-[#A3AFBF] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                  id="title"
                  name="title"
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Informe um título"
                  required
                  type="text"
                  value={title}
                />
              </div>

              <div className="mt-7">
                <FieldLabel htmlFor="file" required>Arquivo</FieldLabel>
                <label
                  className="mt-2 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#B9CCE6] bg-[#F8FBFF] px-6 py-8 text-center transition-colors hover:border-[#5D98DB] hover:bg-[#F2F8FF]"
                  htmlFor="file"
                >
                  <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E1EFFF] text-[#1E5BA8]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5v3.25A2.25 2.25 0 0 0 7.25 20h9.5A2.25 2.25 0 0 0 19 17.75V14.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <span className="mt-4 text-base font-bold text-[#244579]">Selecione um arquivo ou arraste-o até aqui</span>
                  <span className="mt-2 text-sm text-[#71819C]">Formatos permitidos: PDF e DOCX - Tamanho máximo do arquivo: 10 MB</span>
                </label>
                <input
                  accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="sr-only"
                  id="file"
                  name="file"
                  onChange={selecionarArquivo}
                  required
                  type="file"
                />
                {file ? (
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#B9CCE6] bg-white px-4 py-3 text-sm" role="status">
                    <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#1E5BA8]" fill="none" viewBox="0 0 20 20">
                      <path d="M6 3.5h5l3 3V16.5H6v-13Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
                      <path d="M11 3.5v3h3M8.5 11h3M8.5 14h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                    </svg>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1E2F4D]">Arquivo selecionado</p>
                      <p className="truncate text-[#71819C]" title={file.name}>{file.name} - {formatarTamanhoArquivo(file.size)}</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE3ED] pt-6 sm:flex-row sm:justify-end">
                <button
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-[#B9C7DA] bg-white px-5 text-sm font-bold text-[#40516C] transition-colors hover:bg-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                  onClick={() => router.back()}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#163A7B] px-5 text-sm font-bold text-white transition-colors hover:bg-[#112F66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                  disabled={enviando}
                  type="submit"
                >
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
                    <path d="M10 14V3m0 0L6 7m4-4 4 4M4 11.5v2A2.5 2.5 0 0 0 6.5 16h7a2.5 2.5 0 0 0 2.5-2.5v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  </svg>
                  {enviando ? 'Enviando documento...' : 'Enviar documento'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {modalErro ? <ErrorModal message={mensagemErro} onClose={() => setModalErro(false)} title="Não foi possível enviar o documento" /> : null}
      {modalSucesso ? <SuccessModal actionLabel="Voltar aos documentos" message="O documento foi enviado com sucesso." onClose={() => router.push('/documentos')} title="Documento enviado" /> : null}
    </div>
  )
}
