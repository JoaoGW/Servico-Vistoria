import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const sair = (router: AppRouterInstance) => {
    sessionStorage.removeItem('accessToken')
    router.replace('/')
}
