'use client'

import { useRouter } from "next/navigation"

export function NovaVistoriaButton () {
    const router = useRouter()

    return (
        <button
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1E274A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#151C36] hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5BA8] active:bg-[#11172C]"
            type="button"
            onClick={() => router.push("/vistorias/nova")}
        >
            + Nova vistoria
        </button>
    )
}