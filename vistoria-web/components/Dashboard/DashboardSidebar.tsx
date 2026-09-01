export default function DashboardSidebar() {
  return (
    <aside className="hidden min-h-dvh flex-col bg-[#1E274A] text-[#ECEDEE] lg:flex">
      <div className="flex items-center gap-3 border-b border-white/10 px-8 py-8">
        <svg aria-hidden="true" className="h-11 w-11 shrink-0" fill="none" viewBox="0 0 44 44">
          <rect x="5" y="4" width="24" height="32" rx="3" stroke="#69B3FF" strokeWidth="2.5" />
          <path d="M11 12h12M11 18h12M11 24h7" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
          <circle cx="30.5" cy="30.5" r="7" fill="#1E274A" stroke="#69B3FF" strokeWidth="2.5" />
          <path d="m35.5 35.5 4 4" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
        <div className="leading-none">
          <p className="text-xl font-bold tracking-tight text-white">Peacore</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[#69B3FF]">VISTORIAS</p>
        </div>
      </div>

      <nav aria-label="Navegação principal" className="px-4 py-7">
        <p className="px-4 text-xs font-semibold tracking-[0.12em] text-[#69B3FF]">MENU</p>
        <div className="mt-3 rounded-lg bg-[#29477E] px-4 py-3 text-base font-semibold text-white">
          Painel geral
        </div>
      </nav>

      <div className="mt-auto border-t border-white/10 px-8 py-6 text-sm leading-6 text-[#AEBBD2]">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          Ambiente conectado
        </div>
        <p className="mt-2">Peacore Vistorias</p>
      </div>
    </aside>
  )
}
