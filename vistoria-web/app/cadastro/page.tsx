'use client'
import { type FormEvent, useState } from 'react'

import ErrorModal from '@/components/Modals/ErrorModal'
import PagesCommomSidebar from '@/components/PagesCommomSidebar'
import SuccessModal from '@/components/Modals/SuccessModal'

interface DadosCadastroUsuario {
  email: string
  senha: string
}

/**
 * Cadastra um usuário com o e-mail e a senha preenchidos no formulário.
 *
 * @param dados - E-mail e senha obrigatórios para o cadastro.
 * @returns Retorna o usuário criado pela API.
 * @throws Will throw an error if the request fails or the response is not successful.
 */
const cadastrarUsuario = async ({ email, senha }: DadosCadastroUsuario) => {
  const response = await fetch('/api/auth/cadastrarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: senha }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível cadastrar o usuário. Verifique os dados e tente novamente.')
  }

  return response.json()
}

export default function Cadastro() {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)
  const [modalErro, setModalErro] = useState<boolean>(false)
  const [modalSucesso, setModalSucesso] = useState<boolean>(false)
  const [mensagemErro, setMensagemErro] = useState<string>('')
  const [sidebarRecolhida, setSidebarRecolhida] = useState<boolean>(false)

  const confirmacaoInvalida = Boolean(confirmacaoSenha) && senha !== confirmacaoSenha

  const limparCampos = () => {
    setEmail('')
    setSenha('')
    setConfirmacaoSenha('')
  }

  const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (senha !== confirmacaoSenha) {
      setMensagemErro('As senhas devem ser iguais.')
      setModalErro(true)
      return
    }

    setEnviando(true)

    try {
      await cadastrarUsuario({ email, senha })
      setModalSucesso(true)
    } catch (error) {
      setMensagemErro(error instanceof Error ? error.message : 'Não foi possível cadastrar o usuário.')
      setModalErro(true)
    } finally {
      setEnviando(false)
    }
  }

  const fecharSucesso = () => {
    setModalSucesso(false)
    limparCampos()
  }

  return (
    <div className="min-h-dvh bg-[#F2F4F8] text-[#11181C] lg:grid lg:grid-cols-[21rem_minmax(0,1fr)]">
      <PagesCommomSidebar activeItem="novo_tecnico" collapsed={sidebarRecolhida} onToggle={() => setSidebarRecolhida((recolhida) => !recolhida)} />

      <main className="min-w-0">
        <header className="flex min-h-20 items-center border-b border-[#DDE3ED] bg-white px-6 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-[#1E5BA8]">PEACORE</p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#1E274A]">Cadastro de Técnico</h1>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <div className="border-b border-[#DDE3ED] pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-[#1E274A]">Cadastro de Técnico</h1>
              <p className="mt-2 text-base leading-6 text-[#687076]">Crie um novo acesso ao sistema</p>
            </div>

            <form
              aria-labelledby="credenciais-title"
              className="mt-6 rounded-2xl border border-[#DDE3ED] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-8 sm:py-8"
              onSubmit={enviarFormulario}
            >
              <div className="border-b border-[#DDE3ED] pb-5">
                <h2 className="text-xl font-bold tracking-tight text-[#1E274A]" id="credenciais-title">
                  Credenciais de acesso
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#687076]">Informe os dados que serão utilizados para acessar a plataforma.</p>
              </div>

              <div className="mt-6 space-y-5">
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
                    autoComplete="new-password"
                    className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                    id="senha"
                    minLength={8}
                    name="senha"
                    onChange={(event) => setSenha(event.target.value)}
                    placeholder="Crie uma senha"
                    required
                    type="password"
                    value={senha}
                  />
                  <p className="mt-2 text-sm text-[#687076]">A senha deve ter pelo menos 8 caracteres.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E274A]" htmlFor="confirmacao-senha">
                    Confirmar senha
                  </label>
                  <input
                    aria-describedby={confirmacaoInvalida ? 'confirmacao-senha-erro' : undefined}
                    aria-invalid={confirmacaoInvalida}
                    autoComplete="new-password"
                    className="mt-2 h-12 w-full rounded-lg border border-[#BCC7D8] bg-white px-3 text-base text-[#11181C] outline-none transition-colors placeholder:text-[#687076] focus:border-[#1E5BA8] focus:ring-2 focus:ring-[#1E5BA8]/20"
                    id="confirmacao-senha"
                    minLength={8}
                    name="confirmacao-senha"
                    onChange={(event) => setConfirmacaoSenha(event.target.value)}
                    placeholder="Digite novamente a senha"
                    required
                    type="password"
                    value={confirmacaoSenha}
                  />
                  {confirmacaoInvalida ? (
                    <p className="mt-2 text-sm text-[#C8353F]" id="confirmacao-senha-erro" role="alert">
                      As senhas devem ser iguais.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE3ED] pt-6 sm:flex-row sm:justify-end">
                <button
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1E274A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#151C36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C] disabled:cursor-not-allowed disabled:bg-[#AEBBD2] hover:cursor-pointer"
                  disabled={enviando}
                  type="submit"
                >
                  {enviando ? 'Cadastrando usuário...' : 'Cadastrar Técnico'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {modalErro ? <ErrorModal message={mensagemErro} onClose={() => setModalErro(false)} title="Não foi possível cadastrar o usuário" /> : null}
      {modalSucesso ? <SuccessModal actionLabel="Cadastrar outro usuário" message="O usuário foi cadastrado com sucesso." onClose={fecharSucesso} title="Usuário cadastrado" /> : null}
    </div>
  )
}
