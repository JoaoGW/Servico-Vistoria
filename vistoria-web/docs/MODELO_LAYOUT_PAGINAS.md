# Convenções de páginas e layouts

## Organização no App Router

O portal usa o App Router do Next.js. Cada área fica em uma pasta de `app/` e, quando a página precisa de título e descrição próprios, possui um `layout.tsx` próximo ao `page.tsx`.

```text
app/
├── layout.tsx                 # Documento HTML, fontes e estilos globais
├── page.tsx                   # Login
├── dashboard/
│   ├── layout.tsx             # Metadados do painel
│   └── page.tsx
├── vistorias/
│   ├── layout.tsx
│   ├── page.tsx
│   └── nova/
│       ├── layout.tsx
│       └── page.tsx
└── documentos/
    ├── layout.tsx
    ├── page.tsx
    └── novo/
        ├── layout.tsx
        └── page.tsx
```

## Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
| --- | --- |
| `app/layout.tsx` | Define a estrutura raiz, fontes, idioma do documento e estilos globais. |
| `app/<rota>/layout.tsx` | Define metadados específicos da rota, sem repetir a estrutura HTML raiz. |
| `app/<rota>/page.tsx` | Coordena o fluxo da tela, estado local, carregamento e composição dos componentes. |
| `components/` | Mantém elementos reutilizados por mais de uma página: navegação, botões, modais, tabelas e cards. |
| `app/api/**/route.ts` | Implementa os adaptadores HTTP entre as páginas e a API de domínio externa. |

## Limite cliente e servidor

As páginas que usam eventos, hooks, `sessionStorage`, `window` ou `useRouter` precisam da diretiva `'use client'`. É o caso das telas existentes, pois elas fazem requisições no navegador e mantêm estado de formulário.

Layouts e Route Handlers permanecem no servidor por padrão. Essa divisão é importante porque `APIS_URL` não deve ser publicada no JavaScript enviado ao navegador.

## Padrão de metadados

Cada nova área deve informar um título que descreva a tarefa e uma descrição curta que faça sentido fora do contexto visual. Exemplo usado pelas páginas atuais:

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vistorias | Desafio Peacore',
  description: 'Lista de vistorias da aplicação web.',
}
```

O layout raiz é o local correto para alterar idioma, fontes ou o elemento `<body>`. Layouts aninhados não devem recriar `<html>` nem `<body>`.

## Composição da área autenticada

Dashboard, vistorias, documentos e cadastro seguem a mesma composição: `PagesCommomSidebar`, cabeçalho de contexto e conteúdo principal responsivo. A navegação lateral recebe a seção ativa, o estado recolhido e a função de alternância; cada página continua dona do seu próprio estado visual.

Essa repetição é intencional no estado atual do projeto. Se a área autenticada ganhar proteção de rota e estado compartilhado de sessão, a extração de um layout comum passa a reduzir duplicação sem esconder responsabilidades da página.

## Estados de interface esperados

Para operações assíncronas, as páginas existentes já usam estados explícitos de carregamento, erro, vazio e sucesso. Ao criar uma tela nova, mantenha esse comportamento:

- informe carregamento enquanto a resposta ainda não chegou;
- explique o erro e ofereça uma saída clara quando a recuperação depender de ação da pessoa usuária;
- descreva o próximo passo quando a coleção estiver vazia;
- confirme sucesso somente depois da resposta positiva da API;
- desabilite a ação de envio enquanto a requisição estiver em andamento.

Modais de sucesso e erro centralizam o feedback das operações de formulário. Tabelas e cards devem permanecer componentes de apresentação, recebendo dados tipados pela página.

## Estilos e acessibilidade

Tailwind CSS é aplicado diretamente nos componentes. O projeto já usa foco visível, rótulos associados aos campos, `role="alert"` em mensagens críticas, `aria-live` na contagem de busca e elementos semânticos de formulário/tabela. Novas páginas devem conservar essas práticas e evitar substituir rótulos por placeholders.

As cores da interface estão hoje definidas nas classes dos componentes. Quando o sistema visual crescer, tokens em `app/globals.css` devem se tornar a fonte única para cores, espaçamentos e raios repetidos, sem alterar o comportamento das telas existentes.
