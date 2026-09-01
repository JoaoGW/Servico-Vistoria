import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Vistoria | Desafio Peacore",
  description: "Tela de cadastro de vistoria da aplicação web | Desafio Técnico da Peacore",
};

export default function VistoriasLayout({ children }: LayoutProps<"/vistorias">) {
  return children;
}
