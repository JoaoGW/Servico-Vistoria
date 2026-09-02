import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Documentos | Desafio Peacore',
  description: 'Consulta e envio de documentos da plataforma Peacore Vistorias.',
}

export default function DocumentosLayout({ children }: { children: ReactNode }) {
  return children
}
