'use client'

import CadastroUsuarioForm from '@/components/Cadastro/CadastroUsuarioForm'
import PagesCommomSidebar from '@/components/PagesCommomSidebar'

export default function Cadastro() {
  return (
    <div className="min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid lg:grid-cols-[21rem_minmax(0,1fr)]">
      <PagesCommomSidebar activeNavigation="cadastro" collapsed={false} onLogout={() => {}} onToggle={() => {}} />

      <main className="min-w-0">
        <header className="flex min-h-20 items-center justify-between border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold tracking-tight text-[#1E274A]">PEACORE</p>
            <span aria-hidden="true" className="text-[#AEBBD2]">
              ·
            </span>
            <p className="text-base font-medium text-[#687076]">Cadastro de Usuário</p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#687076]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
              Ambiente conectado
            </span>
            <span aria-label="Perfil do usuário" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E5BA8] text-sm font-bold text-white">
              U
            </span>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <div className="border-b border-[#DDE3ED] pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-[#1E274A]">Cadastro de Usuário</h1>
              <p className="mt-2 text-base leading-6 text-[#687076]">Criar novo acesso ao sistema · [POST] /usuarios</p>
            </div>

            <div className="mt-6">
              <CadastroUsuarioForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
