'use client'

import { useState } from 'react'

export interface Documento {
  createdAt: string
  fileMimeType: 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  fileName: string
  id: string
  title: string
}

interface DocumentoTableProps {
  documentos: Documento[]
  documentoEmExclusao?: string
  onDelete?: (id: string) => void
}

const formatarTipoArquivo = (fileMimeType: Documento['fileMimeType']) => (fileMimeType === 'application/pdf' ? 'PDF' : 'DOCX')

const formatarData = (valor: string) => {
  const data = new Date(valor)

  if (Number.isNaN(data.getTime())) {
    return 'Data indisponível'
  }

  const dataFormatada = data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const horarioFormatado = data.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${dataFormatada} ${horarioFormatado}`
}

function FileTypeBadge({ fileMimeType }: Pick<Documento, 'fileMimeType'>) {
  const isPdf = fileMimeType === 'application/pdf'

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold tracking-wide ${
        isPdf ? 'border-[#F5B7B7] text-[#C9353D]' : 'border-[#B7D4F7] text-[#1E5BA8]'
      }`}
    >
      {formatarTipoArquivo(fileMimeType)}
    </span>
  )
}

/**
 * Apresenta uma lista estática de documentos para a composição visual da tela.
 */
export default function DocumentosTable({ documentos, documentoEmExclusao, onDelete }: DocumentoTableProps) {
  const [documentoEmVisualizacao, setDocumentoEmVisualizacao] = useState<string>('')
  const [mensagemErro, setMensagemErro] = useState<string>('')

  const visualizarDocumento = async (id: string) => {
    const novaAba = window.open('', '_blank')

    if (!novaAba) {
      setMensagemErro('Não foi possível abrir uma nova aba para visualizar o documento.')
      return
    }

    novaAba.opener = null
    setDocumentoEmVisualizacao(id)
    setMensagemErro('')

    try {
      const token = sessionStorage.getItem('accessToken')

      if (!token) {
        throw new Error('Sua sessão não foi encontrada. Entre novamente para visualizar o documento.')
      }

      const response = await fetch(`/api/documentos/${id}/arquivo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Não foi possível abrir o documento.')
      }

      const urlArquivo = URL.createObjectURL(await response.blob())
      novaAba.location.replace(urlArquivo)
      window.setTimeout(() => URL.revokeObjectURL(urlArquivo), 60000)
    } catch (error) {
      novaAba.close()
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível abrir o documento.')
    } finally {
      setDocumentoEmVisualizacao('')
    }
  }

  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
      <div className="border-b border-[#DDE3ED] px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-[#71819C]">Documentos cadastrados</p>
      </div>

      {mensagemErro ? (
        <div className="border-b border-[#F5B7B7] bg-[#FFF5F5] px-5 py-4 text-sm text-[#7C252D] sm:px-6" role="alert">
          {mensagemErro}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-[48rem] w-full border-collapse text-left">
          <thead className="bg-[#142B59] text-sm font-bold uppercase tracking-[0.04em] text-white">
            <tr>
              <th className="px-5 py-4 sm:px-6" scope="col">Título</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Nome do arquivo</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Formato</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Data</th>
              <th className="px-5 py-4 text-right sm:px-6" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE3ED] text-sm text-[#40516C]">
            {documentos.map((documento) => (
              <tr className="transition-colors hover:bg-[#F8FAFD]" key={documento.id}>
                <td className="min-w-64 px-5 py-5 text-base font-semibold text-[#30405B] sm:px-6">{documento.title}</td>
                <td className="max-w-64 truncate px-5 py-5 text-[#71819C] sm:px-6" title={documento.fileName}>{documento.fileName}</td>
                <td className="px-5 py-5 sm:px-6"><FileTypeBadge fileMimeType={documento.fileMimeType} /></td>
                <td className="whitespace-nowrap px-5 py-5 font-mono text-[#4B5C76] sm:px-6">{formatarData(documento.createdAt)}</td>
                <td className="px-5 py-5 text-right sm:px-6">
                  <button
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-[#1E5BA8] transition-colors hover:cursor-pointer hover:bg-[#EAF3FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] disabled:cursor-wait disabled:opacity-60"
                    disabled={documentoEmVisualizacao === documento.id || documentoEmExclusao === documento.id}
                    onClick={() => void visualizarDocumento(documento.id)}
                    type="button"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
                      <path d="M10 4.25C5.65 4.25 3.1 8.15 2.5 10c.6 1.85 3.15 5.75 7.5 5.75s6.9-3.9 7.5-5.75c-.6-1.85-3.15-5.75-7.5-5.75Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    {documentoEmVisualizacao === documento.id ? 'Abrindo...' : 'Visualizar'}
                  </button>
                  {onDelete ? (
                    <button
                      className="ml-2 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-bold text-[#C8353F] transition-colors hover:cursor-pointer hover:bg-[#FFF5F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8353F] disabled:cursor-wait disabled:opacity-60"
                      disabled={documentoEmExclusao === documento.id || documentoEmVisualizacao === documento.id}
                      onClick={() => onDelete(documento.id)}
                      type="button"
                    >
                      {documentoEmExclusao === documento.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-[#DDE3ED] px-5 py-4 text-sm text-[#8A99AF] sm:px-6">{documentos.length} documentos exibidos</p>
    </section>
  )
}
