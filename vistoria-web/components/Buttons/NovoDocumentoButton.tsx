'use client'

import { useRouter } from "next/navigation"

export function NovoDocumentoButton () {
    const router = useRouter()

    return (
        <button
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#8FC2FF] bg-white px-5 text-sm font-bold text-[#1E274A] transition-colors hover:border-[#1E5BA8] hover:cursor-pointer hover:bg-[#EFF6FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#E3EFFD]"
            type="button"
            onClick={() => router.push("/documentos/novo")}
        >
            + Novo documento
        </button>
    )
}
