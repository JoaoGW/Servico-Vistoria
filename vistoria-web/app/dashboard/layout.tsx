import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Desafio Peacore",
  description: "Tela de Dashboard (Home Page) da aplicação web | Desafio Técnico da Peacore",
};

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return children;
}
