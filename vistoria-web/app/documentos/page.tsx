'use client'

import DocumentosPageShell from '@/components/Documentos/DocumentosPageShell'
import DocumentosTable from '@/components/Documentos/DocumentosTable'

export default function DocumentosPage() {
  return (
    <DocumentosPageShell
      action={
        <button
          className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#163A7B] px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#112F66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
          onClick={() => {}}
          type="button"
        >
          <span aria-hidden="true" className="text-xl leading-none">+</span>
          Novo documento
        </button>
      }
      description="Consulte os arquivos cadastrados na plataforma."
      title="Documentos"
    >
      <DocumentosTable />
    </DocumentosPageShell>
  )
}
