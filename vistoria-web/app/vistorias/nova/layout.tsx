import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Vistoria | Desafio Peacore",
  description: "Adiciona uma nova vistoria ao DB | Desafio Técnico da Peacore",
};

export default function VistoriasLayout({ children }: LayoutProps<"/vistorias">) {
  return children;
}