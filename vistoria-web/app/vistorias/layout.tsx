import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vistorias | Desafio Peacore",
  description: "Lista de vistorias da aplicação web | Desafio Técnico da Peacore",
};

export default function VistoriasLayout({ children }: LayoutProps<"/vistorias">) {
  return children;
}
