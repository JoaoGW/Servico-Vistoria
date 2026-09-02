'use client'

import DocumentosPageShell from '@/components/Documentos/DocumentosPageShell'

function FieldLabel({ children, htmlFor }: { children: string; htmlFor: string }) {
  return (
    <label className="block text-sm font-bold uppercase tracking-[0.02em] text-[#50617B]" htmlFor={htmlFor}>
      {children} <span className="text-[#C9353D]">*</span>
    </label>
  )
}

export default function NovoDocumentoPage() {
  return (
    <DocumentosPageShell
      description="Envie um novo arquivo para manter a documentação da operação organizada."
      title="Novo documento"
    >
      <form className="mt-10 max-w-4xl rounded-xl border border-[#DDE3ED] bg-white p-6 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:p-9">
        <div className="border-b border-[#DDE3ED] pb-6">
          <h2 className="text-xl font-bold tracking-tight text-[#142B59]">Informações do documento</h2>
          <p className="mt-2 text-sm leading-6 text-[#71819C]">Preencha os dados abaixo e selecione o arquivo que será anexado.</p>
        </div>

        <div className="mt-7">
          <FieldLabel htmlFor="titulo">Título do documento</FieldLabel>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-[#C9D4E4] bg-white px-4 text-base text-[#1E2F4D] outline-none transition-colors placeholder:text-[#A3AFBF] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
            id="titulo"
            name="titulo"
            placeholder="Informe um título"
            required
            type="text"
          />
        </div>

        <div className="mt-7">
          <FieldLabel htmlFor="arquivo">Arquivo</FieldLabel>
          <label
            className="mt-2 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#B9CCE6] bg-[#F8FBFF] px-6 py-8 text-center transition-colors hover:border-[#5D98DB] hover:bg-[#F2F8FF]"
            htmlFor="arquivo"
          >
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E1EFFF] text-[#1E5BA8]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5v3.25A2.25 2.25 0 0 0 7.25 20h9.5A2.25 2.25 0 0 0 19 17.75V14.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="mt-4 text-base font-bold text-[#244579]">Selecione um arquivo ou arraste-o até aqui</span>
            <span className="mt-2 text-sm text-[#71819C]">Formatos permitidos: PDF e DOCX · tamanho máximo de 25 MB</span>
          </label>
          <input
            accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            id="arquivo"
            name="arquivo"
            required
            type="file"
          />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE3ED] pt-6 sm:flex-row sm:justify-end">
          <button
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#B9C7DA] bg-white px-5 text-sm font-bold text-[#40516C] transition-colors hover:bg-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
            onClick={() => {}}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#163A7B] px-5 text-sm font-bold text-white transition-colors hover:bg-[#112F66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
            onClick={() => {}}
            type="button"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
              <path d="M10 14V3m0 0L6 7m4-4 4 4M4 11.5v2A2.5 2.5 0 0 0 6.5 16h7a2.5 2.5 0 0 0 2.5-2.5v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
            Enviar documento
          </button>
        </div>
      </form>
    </DocumentosPageShell>
  )
}
