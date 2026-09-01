interface ErrorLoginModalProps {
  onClose?: () => void
  onRetry?: () => void
  errTitle: string
  errMessage: string
}

export default function ErrorLoginModal({ errTitle, errMessage, onClose, onRetry }: ErrorLoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090D14]/65 px-4 py-6">
      <section
        aria-describedby="login-error-description"
        aria-labelledby="login-error-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_20px_48px_rgba(9,13,20,0.28)] sm:p-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <svg
              aria-hidden="true"
              className="mt-0.5 h-8 w-8 shrink-0"
              fill="none"
              viewBox="0 0 32 32"
            >
              <circle cx="16" cy="16" r="13" stroke="#C8353F" strokeWidth="2.5" />
              <path d="M16 9v8M16 22v1" stroke="#C8353F" strokeLinecap="round" strokeWidth="2.5" />
            </svg>

            <div>
              <p className="text-sm font-semibold text-[#C8353F]">Erro de autenticação</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1E274A]" id="login-error-title">
                { errTitle }
              </h2>
            </div>
          </div>

          <button
            aria-label="Fechar aviso de erro"
            className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#687076] transition-colors hover:bg-[#F2F4F8] hover:text-[#1E274A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
            onClick={onClose}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <p className="mt-6 border-y border-[#DDE3ED] py-5 text-base leading-6 text-[#687076]" id="login-error-description">
          { errMessage }
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="h-12 rounded-lg border border-[#BCC7D8] px-5 text-base font-semibold text-[#1E274A] transition-colors hover:border-[#1E5BA8] hover:bg-[#F2F4F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8]"
            onClick={onClose}
            type="button"
          >
            Fechar
          </button>
          <button
            className="h-12 rounded-lg bg-[#1E274A] px-5 text-base font-bold text-white transition-colors hover:bg-[#151C36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C]"
            onClick={onRetry}
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    </div>
  )
}
