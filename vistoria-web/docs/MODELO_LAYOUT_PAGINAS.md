# Arquivos de Layout
### Todas as telas devem seguir o seguinte padrão de arquivo para configuração dos metadados e layout no geral

````
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de desenvolvimento Full-Stack e Mobile com tecnologias como React, Next.js, TypeScript, Python e Node.js.",
  alternates: {
    canonical: "/projetos",
  },
  openGraph: {
    title: "Projetos | João Pedro Ribeiro",
    description:
      "Projetos de desenvolvimento Full-Stack e Mobile com tecnologias como React, Next.js, TypeScript, Python e Node.js.",
    url: "/projetos",
    images: ["/profile.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos | João Pedro Ribeiro",
    description:
      "Projetos de desenvolvimento Full-Stack e Mobile com tecnologias como React, Next.js, TypeScript, Python e Node.js.",
    images: ["/profile.webp"],
  },
};

export default function ProjetosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
````