import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Novo documento | Desafio Peacore',
  description: 'Envio de um novo documento na plataforma Peacore Vistorias.',
}

export default function NovoDocumentoLayout({ children }: { children: ReactNode }) {
  return children
}
