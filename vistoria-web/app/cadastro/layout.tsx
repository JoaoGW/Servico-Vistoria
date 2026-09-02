import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastro de Usuário | Desafio Peacore',
  description: 'Tela para criação de acesso de usuário na aplicação Peacore Vistorias.',
}

export default function CadastroLayout({ children }: LayoutProps<'/cadastro'>) {
  return children
}
