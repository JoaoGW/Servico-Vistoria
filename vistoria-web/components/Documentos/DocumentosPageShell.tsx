'use client'

import type { ReactNode } from 'react'

import PagesCommomSidebar from '@/components/PagesCommomSidebar'

interface DocumentosPageShellProps {
  action?: ReactNode
  children: ReactNode
  description: string
  title: string
}

/**
 * Mantém a estrutura visual compartilhada pelas páginas de consulta e envio de documentos.
 */
export default function DocumentosPageShell({ action, children, description, title }: DocumentosPageShellProps) {
  return (
    <div className="min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid lg:grid-cols-[21rem_minmax(0,1fr)]">
      <PagesCommomSidebar activeItem="documents" collapsed={false} onLogout={() => {}} onToggle={() => {}} />

      <main className="min-w-0">
        <header className="flex min-h-21 items-center justify-between border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2 text-lg sm:text-xl">
            <span className="font-bold tracking-tight text-[#1E3F7A]">SGV</span>
            <span aria-hidden="true" className="text-[#AEBBD2]">·</span>
            <span className="font-medium text-[#6E7F9D]">{title}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <p className="hidden items-center gap-2 text-sm font-semibold text-[#394964] sm:flex">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-4 ring-[#DCFCE7]" />
              João Silva <span className="font-normal text-[#9AA8BF]">· Filial SP-01</span>
            </p>
            <div aria-label="João Silva" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2456A6] text-sm font-bold text-white">
              JS
            </div>
          </div>
        </header>

        <section className="px-6 py-9 sm:px-8 lg:px-10 lg:py-11">
          <div className="mx-auto max-w-[74rem]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#142B59]">{title}</h1>
                <p className="mt-2 text-base leading-6 text-[#71819C]">{description}</p>
              </div>
              {action ? <div className="shrink-0">{action}</div> : null}
            </div>

            {children}
          </div>
        </section>
      </main>
    </div>
  )
}
