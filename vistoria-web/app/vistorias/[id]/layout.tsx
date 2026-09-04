import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Detalhes da vistoria | Desafio Peacore',
  description: 'Dados, localização e foto de uma vistoria concluída.',
}

export default function DetalhesVistoriaLayout({ children }: { children: ReactNode }) {
  return children
}
