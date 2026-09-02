# Vistorias

Portal web para a gestão de vistorias, documentos e acessos técnicos. A aplicação oferece a camada de operação administrativa e encaminha as chamadas para a API de domínio configurada no ambiente.

> Este repositório contém o cliente web em Next.js e suas rotas de integração. O aplicativo mobile, a API de domínio, o banco PostgreSQL, a sincronização offline e a infraestrutura em contêiner não fazem parte do código versionado aqui. Essa separação deixa claros os limites da implementação atual.

## Sumário

- [Visão geral](#visão-geral)
- [Estado atual e cobertura funcional](#estado-atual-e-cobertura-funcional)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos e configuração](#pré-requisitos-e-configuração)
- [Execução e verificações](#execução-e-verificações)
- [Rotas e fluxos disponíveis](#rotas-e-fluxos-disponíveis)
- [Decisões técnicas](#decisões-técnicas)
- [Segurança e limites conhecidos](#segurança-e-limites-conhecidos)
- [Próximos incrementos de maior impacto](#próximos-incrementos-de-maior-impacto)
- [Documentação complementar](#documentação-complementar)

## Visão geral

O portal concentra quatro fluxos administrativos: autenticação, cadastro de técnicos, consulta e abertura de vistorias e gestão de documentos. As páginas são renderizadas pelo App Router do Next.js. As interações no navegador chamam rotas internas em `/api`, que atuam como uma camada Backend for Frontend (BFF) leve: recebem a sessão enviada pelo cliente, encaminham a requisição para a API de domínio indicada por `APIS_URL` e devolvem a resposta ao navegador.

Esse desenho evita expor a URL da API de domínio no bundle do cliente e mantém as regras de transformação já existentes em um único ponto. Ele não substitui a autenticação e a autorização que devem ser garantidas pela API de domínio.

## Estado atual e cobertura funcional

| Funcionalidade | Situação neste repositório | Observação |
| --- | --- | --- |
| Login e controle de acesso web | Parcial | Há formulário de login, token armazenado na sessão do navegador e repasse do cabeçalho `Bearer`; ainda não há proteção de rotas no servidor. |
| Dashboard web | Parcial | Lista vistorias e documentos retornados pela API. Os campos de latitude e longitude são recebidos no dashboard, mas não são exibidos; fotos não fazem parte do contrato atual da interface. |
| Cadastro de vistoria | Disponível | Cria uma vistoria com descrição e estado inicial pendente, por meio da API de domínio. |
| Cadastro e visualização de documentos | Disponível | Envia PDF ou DOCX de até 10 MB e abre o arquivo retornado pela API. |
| Backend compartilhado e PostgreSQL | Externo ao repositório | A aplicação depende de uma API configurada em `APIS_URL`. Não há esquema Prisma, migrações nem conexão direta com PostgreSQL neste código. |
| Aplicativo Android/iOS | Não incluído | Não há cliente React Native, permissões nativas, captura de foto ou geolocalização. |
| Uso offline, fila e sincronização | Não incluído | Não há banco local, cache de documentos, service worker ou protocolo de sincronização. A estratégia recomendada está em [Arquitetura](docs/ARQUITETURA.md#sincronização-offline-e-conflitos). |
| Docker e CI | Não incluídos | Não há `Dockerfile`, Compose ou pipeline versionados. |

## Arquitetura

```mermaid
flowchart LR
    U[Usuário no navegador] --> W[Next.js App Router]
    W --> P[Páginas e componentes React]
    P --> S[sessionStorage\naccessToken]
    P --> B[Rotas Backend for Frontend (BFF) /api]
    B -->|APIS_URL + Bearer quando informado| A[API de domínio externa]
    A --> D[(Persistência e arquivos\nfora deste repositório)]
```

As rotas Backend for Frontend (BFF) não persistem dados. Elas transformam algumas requisições — por exemplo, convertem `senha` recebida no login para `password` no serviço de domínio e extraem o `sub` do JWT ao criar uma vistoria — e encaminham o restante da operação. O detalhamento dos limites, contratos e responsabilidades está em [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Tecnologias

| Camada | Tecnologia | Uso atual |
| --- | --- | --- |
| Interface web | Next.js 16, React 19 e TypeScript | Páginas, layouts, componentes e handlers da aplicação. |
| Estilos | Tailwind CSS 4 | Estilização responsiva diretamente nos componentes. |
| Integração | Route Handlers do Next.js e `fetch` | Backend for Frontend (BFF) leve para a API de domínio externa. |
| Mapas | Leaflet | Dependência disponível, ainda sem mapa implementado. |
| Banco | `@prisma/client` | Dependência instalada, sem uso no código e sem schema no repositório. |

## Pré-requisitos e configuração

- Node.js 20.9 ou superior.
- npm 10 ou superior.
- Uma API de domínio acessível, com os endpoints descritos em [docs/REQUISICOES_API.md](docs/REQUISICOES_API.md).

Instale as dependências e crie o arquivo local de ambiente:

```bash
npm install
cp .env.example .env.local
```

Configure `APIS_URL` com a URL base da API, sem barra ao final:

```dotenv
APIS_URL=http://localhost:3001
```

`APIS_URL` é lida apenas no servidor pelos Route Handlers. Não use o prefixo `NEXT_PUBLIC_`, pois a URL da API de domínio não precisa ser exposta ao navegador. Arquivos `.env*` são ignorados pelo Git.

## Execução e verificações

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Os comandos disponíveis são:

```bash
npm run lint
npm run build
npm run start
```

O repositório ainda não possui testes automatizados. Antes de integrar uma nova API, valide manualmente login, consulta/criação de vistoria, envio de PDF e DOCX dentro do limite de 10 MB e abertura de documento autenticado.

No estado atual, `npm run lint` também percorre o material de referência React Native em `Design/GlueStackUI Pro`, que possui dependências e erros próprios. Para validar somente o portal mantido neste repositório, use `npx eslint app components utils`.

## Rotas e fluxos disponíveis

| Rota de interface | Finalidade |
| --- | --- |
| `/` | Login; armazena o `accessToken` devolvido pela API na sessão do navegador. |
| `/dashboard` | Visão resumida de vistorias e documentos. |
| `/vistorias` | Consulta, busca textual e filtro por status. |
| `/vistorias/nova` | Cadastro de uma vistoria com descrição. |
| `/documentos` | Consulta e abertura de documentos. |
| `/documentos/novo` | Envio de PDF ou DOCX com até 10 MB. |
| `/cadastro` | Criação de um acesso técnico. |

As rotas internas e o contrato esperado da API externa estão em [docs/REQUISICOES_API.md](docs/REQUISICOES_API.md).

## Decisões técnicas

- **App Router para organizar a interface por rota.** Cada área possui `page.tsx` e metadados no seu `layout.tsx`, o que mantém a navegação e o contexto da página próximos.
- **Backend for Frontend (BFF) dentro do Next.js.** O navegador conversa somente com `/api`; os Route Handlers centralizam a URL de destino, o repasse de `Authorization` e a normalização básica de erros.
- **Componentes por responsabilidade de interface.** Navegação lateral, modais, botões, tabelas e cards ficam em `components/`; páginas coordenam estado local e chamadas da própria tela.
- **Token de curta duração mantido na sessão atual.** O token é removido ao sair e não persiste entre sessões do navegador. Isso é coerente com a implementação presente, mas não é o modelo final recomendado para produção.
- **Upload multipart sem serialização manual.** O browser monta `FormData` e o Backend for Frontend (BFF) o encaminha à API, preservando arquivo e metadados.

## Segurança e limites conhecidos

O projeto é um ponto de partida funcional para a camada web, não uma implementação completa de segurança ou operação offline. Os pontos abaixo devem ser considerados antes de uma publicação:

- `sessionStorage` é acessível a código executado no navegador. Para uma aplicação de produção, prefira sessão em cookie `HttpOnly`, `Secure` e `SameSite`, com renovação e expiração controladas pelo servidor.
- Não há `middleware` nem verificação de autorização nas páginas. A ausência de token hoje é percebida quando a tela já tenta buscar dados.
- A rota de criação de vistoria lê o campo `sub` do payload do JWT, mas não verifica a assinatura. A API de domínio deve validar o token; idealmente o Backend for Frontend (BFF) também delega essa validação a uma biblioteca ou a um provedor de identidade confiável.
- A autorização sobre vistorias e documentos precisa ser aplicada pela API de domínio, inclusive no download de arquivos. A interface não deve ser a única barreira de acesso.
- Não há limite, varredura antimalware, armazenamento de objetos nem observabilidade implementados no Backend for Frontend (BFF). O limite de 10 MB e os tipos PDF/DOCX são apenas uma validação inicial no cliente.

## Próximos incrementos de maior impacto

Para concluir a evolução completa do produto, o caminho mais consistente é implementar a API de domínio com PostgreSQL e armazenamento de objetos, criar o aplicativo mobile com SQLite e fila transacional, e então conectar os dois por um endpoint idempotente de sincronização. A arquitetura, o modelo de dados, a estratégia de conflito e os critérios de aceite dessa etapa estão documentados em [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

Na camada web, os ganhos imediatos são: proteger rotas no servidor, retirar o token do `sessionStorage`, exibir foto e coordenadas da vistoria, acrescentar estados de carregamento independentes para cada recurso e cobrir os fluxos críticos com testes.

## Documentação complementar

- [Arquitetura e estratégia offline-first](docs/ARQUITETURA.md)
- [Contrato das rotas de integração](docs/REQUISICOES_API.md)
- [Convenções de estrutura para páginas](docs/MODELO_LAYOUT_PAGINAS.md)
