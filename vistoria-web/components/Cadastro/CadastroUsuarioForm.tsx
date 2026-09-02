'use client'

export default function CadastroUsuarioForm() {
  return (
    <section
      aria-labelledby="credenciais-title"
      className="rounded-2xl border border-[#DDE3ED] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-8 sm:py-8"
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
            placeholder="nome@empresa.com.br"
            type="email"
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
            placeholder="Crie uma senha"
            type="password"
          />
          <p className="mt-2 text-sm text-[#687076]">A senha deve ter pelo menos 8 caracteres.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE3ED] pt-6 sm:flex-row sm:justify-end">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#8FC2FF] bg-white px-5 text-sm font-bold text-[#1E274A] transition-colors hover:border-[#1E5BA8] hover:bg-[#EFF6FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#E3EFFD]"
          onClick={() => {}}
          type="button"
        >
          Limpar campos
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1E274A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#151C36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C]"
          onClick={() => {}}
          type="button"
        >
          Cadastrar usuário
        </button>
      </div>
    </section>
  )
}
