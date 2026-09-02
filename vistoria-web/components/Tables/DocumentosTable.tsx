'use client'

export interface Documento {
  createdAt: string
  fileMimeType: 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  fileName: string
  id: string
  title: string
}

interface DocumentoTableProps {
  documentos: Documento[]
}

const formatarTipoArquivo = (fileMimeType: Documento['fileMimeType']) => (fileMimeType === 'application/pdf' ? 'PDF' : 'DOCX')

function FileTypeBadge({ fileMimeType }: Pick<Documento, 'fileMimeType'>) {
  const isPdf = fileMimeType === 'application/pdf'

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold tracking-wide ${
        isPdf ? 'border-[#F5B7B7] bg-[#FFF5F5] text-[#C9353D]' : 'border-[#B7D4F7] bg-[#F2F8FF] text-[#1E5BA8]'
      }`}
    >
      {formatarTipoArquivo(fileMimeType)}
    </span>
  )
}

/**
 * Apresenta uma lista estática de documentos para a composição visual da tela.
 */
export default function DocumentosTable({ documentos }: DocumentoTableProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
      <div className="border-b border-[#DDE3ED] px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-[#71819C]">Documentos cadastrados</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[56rem] w-full border-collapse text-left">
          <thead className="bg-[#142B59] text-sm font-bold uppercase tracking-[0.04em] text-white">
            <tr>
              <th className="px-5 py-4 sm:px-6" scope="col">ID</th>
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
                <td className="whitespace-nowrap px-5 py-5 font-mono font-bold text-[#1D417D] sm:px-6">{documento.id}</td>
                <td className="min-w-64 px-5 py-5 text-base font-semibold text-[#30405B] sm:px-6">{documento.title}</td>
                <td className="max-w-64 truncate px-5 py-5 text-[#71819C] sm:px-6" title={documento.fileName}>{documento.fileName}</td>
                <td className="px-5 py-5 sm:px-6"><FileTypeBadge fileMimeType={documento.fileMimeType} /></td>
                <td className="whitespace-nowrap px-5 py-5 font-mono text-[#4B5C76] sm:px-6">{documento.createdAt}</td>
                <td className="px-5 py-5 text-right sm:px-6">
                  <button
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-[#1E5BA8] transition-colors hover:bg-[#EAF3FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
                    onClick={() => {}}
                    type="button"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
                      <path d="M10 4.25C5.65 4.25 3.1 8.15 2.5 10c.6 1.85 3.15 5.75 7.5 5.75s6.9-3.9 7.5-5.75c-.6-1.85-3.15-5.75-7.5-5.75Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    Visualizar
                  </button>
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
