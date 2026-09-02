import type { ReactNode } from 'react'

interface PagesCommomSidebarProps {
  activeNavigation?: 'cadastro' | 'dashboard'
  collapsed: boolean
  onLogout: () => void
  onToggle: () => void
}

interface NavigationItemProps {
  active?: boolean
  collapsed: boolean
  href: string
  icon: ReactNode
  label: string
}

function NavigationItem({ active = false, collapsed, href, icon, label }: NavigationItemProps) {
  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={`flex min-h-11 items-center gap-3 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#69B3FF] ${
        collapsed ? 'justify-center px-3' : 'px-4'
      } ${active ? 'bg-[#29477E] text-white' : 'text-[#C6D0E5] hover:bg-white/10 hover:text-white'}`}
      href={href}
      title={collapsed ? label : undefined}
    >
      <span aria-hidden="true" className="shrink-0 text-[#8FC2FF]">
        {icon}
      </span>
      <span className={collapsed ? 'sr-only' : undefined}>{label}</span>
    </a>
  )
}

export default function PagesCommomSidebar({
  activeNavigation = 'dashboard',
  collapsed,
  onLogout,
  onToggle,
}: PagesCommomSidebarProps) {
  return (
    <aside
      className={`hidden min-h-dvh flex-col bg-[#1E274A] text-[#ECEDEE] transition-[width] duration-200 lg:flex ${
        collapsed ? 'w-[5.5rem]' : 'w-84'
      }`}
    >
      <div className={`flex items-center border-b border-white/10 py-7 ${collapsed ? 'justify-center px-3' : 'gap-3 px-6'}`}>
        <svg aria-hidden="true" className="h-10 w-10 shrink-0" fill="none" viewBox="0 0 44 44">
          <rect x="5" y="4" width="24" height="32" rx="3" stroke="#69B3FF" strokeWidth="2.5" />
          <path d="M11 12h12M11 18h12M11 24h7" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
          <circle cx="30.5" cy="30.5" r="7" fill="#1E274A" stroke="#69B3FF" strokeWidth="2.5" />
          <path d="m35.5 35.5 4 4" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
        <div className={collapsed ? 'sr-only' : 'leading-none'}>
          <p className="text-lg font-bold tracking-tight text-white">Peacore</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[#69B3FF]">VISTORIAS</p>
        </div>
      </div>

      <nav aria-label="Navegação principal" className={`flex-1 py-6 ${collapsed ? 'px-3' : 'px-4'}`}>
        <div className={`mb-3 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-3'}`}>
          <p className={collapsed ? 'sr-only' : 'text-xs font-semibold tracking-[0.12em] text-[#69B3FF]'}>MENU</p>
          <button
            aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#A9CCFF] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#69B3FF]"
            onClick={onToggle}
            type="button"
          >
            <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 16 16">
              <path d="m6 3 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        <div className="space-y-1">
          <NavigationItem
            active={activeNavigation === 'dashboard'}
            collapsed={collapsed}
            href="/dashboard"
            label="Painel geral"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20">
                <path d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            }
          />
          <NavigationItem
            collapsed={collapsed}
            href="#vistorias"
            label="Vistorias"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20">
                <path d="M5 4h10M5 8h10M5 12h6M5 16h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            }
          />
          <NavigationItem
            collapsed={collapsed}
            href="#documentos"
            label="Documentos"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20">
                <path d="M6 3.5h5l3 3V16.5H6v-13Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
                <path d="M11 3.5v3h3M8.5 11h3M8.5 14h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            }
          />
          <NavigationItem
            active={activeNavigation === 'cadastro'}
            collapsed={collapsed}
            href="/cadastro"
            label="Cadastro de usuário"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20">
                <circle cx="7.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3.5 16c0-2.5 1.8-4.25 4-4.25s4 1.75 4 4.25M15.5 8v5M13 10.5h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
              </svg>
            }
          />
        </div>
      </nav>

      <div className={`border-t border-white/10 py-5 ${collapsed ? 'px-3' : 'px-6'}`}>
        <div className={`text-sm leading-6 text-[#AEBBD2] ${collapsed ? 'sr-only' : ''}`}>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            Ambiente conectado
          </div>
          <p className="mt-2">Peacore Vistorias</p>
        </div>

        <button
          className={`mt-4 flex min-h-11 items-center gap-3 rounded-lg text-sm font-semibold text-[#C6D0E5] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#69B3FF] ${
            collapsed ? 'w-full justify-center px-3' : 'w-full px-3'
          }`}
          onClick={onLogout}
          title={collapsed ? 'Sair' : undefined}
          type="button"
        >
          <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#8FC2FF]" fill="none" viewBox="0 0 20 20">
            <path d="M8 4H5v12h3M11 7l3 3-3 3M14 10H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
          </svg>
          <span className={collapsed ? 'sr-only' : undefined}>Sair</span>
        </button>
      </div>
    </aside>
  )
}
