'use client'
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ErrorLoginModal from '@/components/Modals/ErrorLoginModal';

interface Autenticacao {
  email: string,
  senha: string,
  setModalErro: (ativo: boolean) => void
}

/**
 * Responsável por fazer a chamada ao route e conectar a rota de API para realizar a autenticação do usuário ao portal
 *
 * @param email - O email o qual o usuário está usando para fazer login
 * @param senha - A senha a qual o usuário está usando para fazer login
 * @param setModalErro - Switcher de ativação do Modal para quando der erro no login
 * @returns Será o retorno da API com as informações definidas
 * @throws Will throw an error if the request fails or the response is not successful.
 *
 */
export const login = async ({ email, senha, setModalErro }: Autenticacao) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      if(response?.status === 429){
        console.log("Muitas requisições enviadas esgotaram o limite do servidor");
      }
      console.log("Respoonse de login: ", response);
      setModalErro(true)
    }

    const data = await response.json();

    return data.message;
  } catch (error) {
    console.error('O seguinte erro foi encontrado ao tentar fazer login: ', error);
    throw error;
  }
}

export default function Login() {
  const [email, setEmail] = useState<Autenticacao["email"]>("")
  const [senha, setSenha] = useState<Autenticacao["senha"]>("")
  const [modalErro, setModalErro] = useState<boolean>(false)

  // Instanciação de encaminhamento para outras telas
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid lg:grid-cols-[minmax(21rem,0.88fr)_minmax(32rem,1.12fr)]">
      <aside className="hidden bg-[#1E274A] px-10 py-12 text-[#ECEDEE] lg:flex lg:flex-col xl:px-16">
        <div className="flex items-center gap-3">
          <svg
            aria-hidden="true"
            className="h-11 w-11 shrink-0"
            fill="none"
            viewBox="0 0 44 44"
          >
            <rect x="5" y="4" width="24" height="32" rx="3" stroke="#69B3FF" strokeWidth="2.5" />
            <path d="M11 12h12M11 18h12M11 24h7" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
            <circle cx="30.5" cy="30.5" r="7" fill="#1E274A" stroke="#69B3FF" strokeWidth="2.5" />
            <path d="m35.5 35.5 4 4" stroke="#69B3FF" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
          <div className="leading-none">
            <p className="text-xl font-bold tracking-tight">Peacore</p>
            <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[#69B3FF]">VISTORIAS</p>
          </div>
        </div>

        <div className="my-auto max-w-sm border-l border-[#69B3FF] pl-6">
          <p className="text-sm font-semibold text-[#A9CCFF]">ACESSO RESTRITO</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white">
            Gestão de vistorias com informações claras.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#C6D0E5]">
            Acesse a plataforma para acompanhar ordens de serviço, pendências e a operação da sua filial.
          </p>
        </div>

        <div className="border-t border-white/15 pt-6 text-sm leading-6 text-[#AEBBD2]">
          <p>Ambiente seguro para usuários autorizados.</p>
          <p className="mt-1">Peacore Vistorias</p>
        </div>
      </aside>

      <main className="flex min-h-dvh flex-col bg-white">
        <header className="flex items-center border-b border-[#DDE3ED] px-6 py-5 sm:px-10 lg:hidden">
          <svg
            aria-hidden="true"
            className="h-9 w-9 shrink-0"
            fill="none"
            viewBox="0 0 44 44"
          >
            <rect x="5" y="4" width="24" height="32" rx="3" stroke="#1E5BA8" strokeWidth="2.5" />
            <path d="M11 12h12M11 18h12M11 24h7" stroke="#1E5BA8" strokeLinecap="round" strokeWidth="2.5" />
            <circle cx="30.5" cy="30.5" r="7" fill="white" stroke="#1E5BA8" strokeWidth="2.5" />
            <path d="m35.5 35.5 4 4" stroke="#1E5BA8" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
          <div className="ml-3 leading-none">
            <p className="text-lg font-bold tracking-tight text-[#1E274A]">Peacore</p>
            <p className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-[#1E5BA8]">VISTORIAS</p>
          </div>
        </header>

        <section className="flex flex-1 items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            <div className="border-b border-[#DDE3ED] pb-6">
              <p className="text-sm font-semibold text-[#1E5BA8]">PORTAL DE ACESSO</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E274A]">Entre na sua conta</h2>
              <p className="mt-3 text-base leading-6 text-[#687076]">
                Informe suas credenciais para continuar na plataforma Peacore Vistorias.
              </p>
            </div>

            <form
              className="mt-8 space-y-6"
              onSubmit={async (event) => {
                event.preventDefault()

                try {
                  await login({ email, senha, setModalErro })
                  router.push('/dashboard')
                } catch {
                  return
                }
              }}
            >
              <div>
                <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="email">
                  E-mail
                </label>
                <input
                  autoComplete="email"
                  className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                  id="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nome@empresa.com.br"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="senha">
                  Senha
                </label>
                <input
                  autoComplete="current-password"
                  className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                  id="senha"
                  name="senha"
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Digite sua senha"
                  required
                  type="password"
                  value={senha}
                />
              </div>

              <button
                className="flex h-12 w-full items-center justify-center rounded-lg bg-[#1E274A] px-5 text-base font-bold text-white transition-colors hover:bg-[#151C36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C] disabled:cursor-not-allowed disabled:bg-[#AEBBD2] hover:cursor-pointer"
                disabled={!email || !senha}
                type="submit"
              >
                Entrar
              </button>
            </form>

            <p className="mt-8 border-t border-[#DDE3ED] pt-5 text-sm leading-6 text-[#687076]">
              Não compartilhe suas credenciais. Em caso de dificuldade de acesso, procure o administrador da sua filial.
            </p>
          </div>
        </section>

        {modalErro ? <ErrorLoginModal onClose={() => setModalErro(false)} errTitle="Erro ao Fazer Login" errMessage='Não foi possível fazer login. Confire seus dados inseridos e se ainda não tiver um cadastro, cadastre-se!' /> : null}
      </main>
    </div>
  );
}
