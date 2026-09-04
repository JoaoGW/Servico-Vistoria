# Serviço de Vistoria

Monorepo para gestão de vistorias em campo. O sistema reúne uma API de domínio,
um portal administrativo web e um aplicativo mobile: o portal cria e acompanha
vistorias, o aplicativo registra a conclusão com foto e localização, e a API
centraliza autenticação, dados e arquivos.

## Sumário

- [Arquitetura](#arquitetura)
- [Fluxo de vistoria](#fluxo-de-vistoria)
- [Pré-requisitos](#pré-requisitos)
- [Configuração de ambiente](#configuração-de-ambiente)
- [Instalação e primeira execução](#instalação-e-primeira-execução)
- [Rotas principais da API](#rotas-principais-da-api)
- [Comandos de desenvolvimento](#comandos-de-desenvolvimento)
- [Estrutura de dados e arquivos](#estrutura-de-dados-e-arquivos)
- [Segurança e limites conhecidos](#segurança-e-limites-conhecidos)

## Arquitetura

| Diretório | Responsabilidade | Stack principal |
| --- | --- | --- |
| `vistoria-back/` | API REST, autenticação, persistência e upload de arquivos | NestJS, Drizzle ORM e PostgreSQL |
| `vistoria-web/` | Portal administrativo e rotas BFF para a API | Next.js, React, Tailwind CSS e Leaflet |
| `vistoria-mobile/` | Operação em campo, captura e sincronização local | Expo, React Native e WatermelonDB/SQLite |

O backend armazena imagens de vistorias e arquivos de documentos diretamente
no PostgreSQL. A interface web chama as rotas internas do Next.js, que por sua
vez se comunicam com a API configurada pela variável `APIS_URL`. O aplicativo
mobile mantém uma cópia de trabalho local, com fila para conclusões feitas sem
conexão, e encaminha chamadas por API Routes do Expo Router.

## Fluxo de vistoria

1. O portal web cria uma vistoria com descrição e status `pendente: true`.
2. O aplicativo mobile sincroniza as vistorias pendentes para o banco local.
3. Em campo, o técnico seleciona a vistoria, captura uma foto e registra a
   localização atual.
4. No clique de confirmação, o aplicativo captura `completedAt` e envia
   `pendente: false`, a data, latitude, longitude e a foto no campo `photo`;
   sem rede, os dados e o binário permanecem na fila local até a sincronização.
   A menor `completedAt` vence mesmo que chegue posteriormente. A conclusão é
   terminal: uma vistoria não volta a pendente.
5. No portal, somente vistorias concluídas podem ser abertas em detalhes, com
   dados registrados, foto autenticada e mapa Leaflet/OpenStreetMap.
6. Vistorias e documentos podem ser excluídos pelo portal após resposta
   positiva da API.

## Pré-requisitos

- Git 2.30 ou superior;
- Node.js 20 LTS ou superior (Node 22+ é recomendado);
- npm 10 ou superior;
- PostgreSQL 14 ou superior, em execução e acessível localmente ou pela rede;
- Android Studio/emulador Android ou Xcode/dispositivo iOS para o aplicativo
  mobile;
- acesso à internet para instalar dependências e para gerar o build do
  frontend, que utiliza fontes hospedadas no Google Fonts e tiles do mapa pelo
  OpenStreetMap.

Confirme as versões instaladas:

```bash
git --version
node --version
npm --version
psql --version
```

## Obter o projeto

Clone o repositório e entre na pasta raiz:

```bash
git clone https://github.com/JoaoGW/Servico-Vistoria.git
cd Servico-Vistoria
```

> Execute os comandos deste documento a partir da raiz, salvo quando o comando
> indicar outra pasta. Cada aplicação possui seu próprio `package.json` e seu
> próprio arquivo de dependências.

## Banco de dados

Crie um banco PostgreSQL vazio. O nome abaixo é apenas uma sugestão:

```bash
createdb vistoria
```

Se o banco estiver em outro servidor, ele não precisa ser criado localmente;
basta que a conta usada na URL de conexão tenha permissão para criar e alterar
as tabelas do projeto.

## Configuração de ambiente

Os arquivos `.env.local` não são versionados. Crie-os manualmente em cada
aplicação. Nunca publique tokens, senhas ou URLs com credenciais no Git.

### Backend

Crie `vistoria-back/.env.local` com o conteúdo abaixo e ajuste a URL para o
seu PostgreSQL:

```env
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/vistoria
JWT_SECRET=substitua-por-um-segredo-aleatorio-com-no-minimo-32-caracteres
PORT=3001
```

`DATABASE_URL` e `JWT_SECRET` são obrigatórias. O `JWT_SECRET` deve ter ao
menos 32 caracteres. A porta padrão do backend é `3000`, mas este guia utiliza
`3001` para não conflitar com o servidor de desenvolvimento do Next.js.

Uma forma simples de gerar um segredo no macOS, Linux ou Git Bash é:

```bash
openssl rand -hex 32
```

### Frontend

Crie `vistoria-web/.env.local` apontando para a API:

```env
APIS_URL=http://localhost:3001
```

Não acrescente uma barra (`/`) ao final da URL. Em desenvolvimento local, a
porta deve ser a mesma definida por `PORT` no backend.

### Aplicativo mobile

Crie `vistoria-mobile/.env.local` apontando para a API:

```env
APIS_URL=http://SEU_HOST_ACESSIVEL:3001
```

Em um dispositivo físico, `localhost` aponta para o próprio dispositivo. Use
um host acessível pela rede do aparelho. Em builds nativos, as API Routes do
Expo Router também precisam estar implantadas em uma origem configurada para o
aplicativo.

## Instalação e primeira execução

Abra três terminais na raiz do projeto.

### Terminal 1 — API

Instale as dependências e aplique o schema ao banco:

```bash
cd vistoria-back
npm ci
npx drizzle-kit push
npm run start:dev
```

O comando `drizzle-kit push` cria ou sincroniza as tabelas `usuarios`,
`vistorias` e `documentos` conforme `src/db/schema.ts`. Ele deve ser executado
apenas contra o banco de desenvolvimento local, ou com revisão prévia quando
for apontar para um ambiente compartilhado.

A API ficará disponível em `http://localhost:3001` com a configuração proposta
neste documento.

### Terminal 2 — interface web

Instale as dependências e inicie o Next.js:

```bash
cd vistoria-web
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. O Next.js
recarrega a página automaticamente quando os arquivos do frontend são alterados.

### Terminal 3 — aplicativo mobile

Instale as dependências e inicie o Expo:

```bash
cd vistoria-mobile
npm ci
npm run start
```

Use o Expo CLI para abrir o aplicativo no emulador, simulador ou development
build. Os atalhos `npm run android` e `npm run ios` iniciam os fluxos nativos.

## Verificação da instalação

Com a API em execução, crie um usuário por meio do endpoint público:

```bash
curl --request POST http://localhost:3001/usuarios \
  --header 'Content-Type: application/json' \
  --data '{"email":"dev@example.com","password":"uma-senha-segura"}'
```

Em seguida, faça login:

```bash
curl --request POST http://localhost:3001/usuarios/login \
  --header 'Content-Type: application/json' \
  --data '{"email":"dev@example.com","password":"uma-senha-segura"}'
```

A resposta de login contém um `accessToken`. Use-o no cabeçalho `Authorization`
para acessar as rotas protegidas, por exemplo:

```bash
curl http://localhost:3001/vistorias \
  --header 'Authorization: Bearer SEU_ACCESS_TOKEN'
```

As coleções de requisições para Postman estão em
`vistoria-back/postman/collections/`, com ambiente em
`vistoria-back/postman/environments/`.

## Rotas principais da API

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `POST` | `/usuarios` | Pública | Cadastra usuário |
| `POST` | `/usuarios/login` | Pública | Autentica usuário e retorna JWT |
| `GET` | `/usuarios` | JWT | Lista usuários |
| `GET` | `/vistorias` | JWT | Lista vistorias |
| `POST` | `/vistorias` | JWT | Cria vistoria pendente com `userId` e `description` |
| `PUT` | `/vistorias/:id` | JWT | Conclui vistoria com foto, coordenadas e `completedAt` ISO-8601 |
| `GET` | `/vistorias/:id/foto` | JWT | Exibe a imagem de uma vistoria |
| `DELETE` | `/vistorias/:id` | JWT | Remove uma vistoria |
| `GET` | `/documentos` | JWT | Lista documentos |
| `POST` | `/documentos` | JWT | Envia documento no campo `file` |
| `PUT` | `/documentos` | JWT | Atualiza documento |
| `GET` | `/documentos/:id/arquivo` | JWT | Baixa o arquivo do documento |
| `DELETE` | `/documentos/:id` | JWT | Remove um documento |

O cadastro de vistoria usa JSON; sua conclusão usa `multipart/form-data` e
exige `pendente: false`, `completedAt` em ISO-8601, latitude, longitude e uma
imagem no campo `photo`. Latitude e longitude devem ser enviadas juntas, e a
imagem tem limite de 10 MB. A API persiste `completedAt` em `concluido_em` e o
retorna em todas as leituras. Em conflito, devolve `409` com o código
`INSPECTION_COMPLETION_CONFLICT` e os dados vencedores. A listagem devolve os
metadados, inclusive `photoMimeType`, mas não o binário da foto; ele é
recuperado por `GET /vistorias/:id/foto`.

Documentos devem ser PDF ou DOCX, enviados no campo `file`, com limite de
10 MB. A atualização usa `PUT /documentos` com o identificador no corpo
multipart.

### Rotas internas do portal web

O portal web usa rotas internas como BFF e encaminha o cabeçalho Bearer para a
API de domínio. Além das rotas de login, listagem e upload, os fluxos de
detalhes e exclusão usam:

| Método | Rota do portal | Destino na API |
| --- | --- | --- |
| `GET` | `/api/vistorias/:id/foto` | `/vistorias/:id/foto` |
| `DELETE` | `/api/vistorias/:id` | `/vistorias/:id` |
| `DELETE` | `/api/documentos/:id` | `/documentos/:id` |

O endpoint de foto preserva o fluxo de bytes e os cabeçalhos retornados pela
API externa, permitindo a exibição autenticada da evidência no navegador.

## Comandos de desenvolvimento

### Backend

```bash
cd vistoria-back
npm run start:dev  # servidor com recarga automática
npm run build      # compila para dist/
npm test           # executa os testes Vitest
npm run test:e2e   # executa os testes de integração
npm run lint       # executa o oxlint
```

### Frontend

```bash
cd vistoria-web
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run start      # inicia o build de produção
npm run lint       # executa o ESLint
```

Para testar o frontend em modo de produção, execute `npm run build` antes de
`npm run start`. O build depende de acesso a `fonts.googleapis.com`, pois o
layout atual usa as fontes Geist por meio de `next/font/google`.

### Aplicativo mobile

```bash
cd vistoria-mobile
npm run start        # inicia o Expo
npm run android      # abre no Android
npm run ios          # abre no iOS
npm run lint         # executa o Expo lint
```

Para gerar builds locais ou em nuvem, consulte os scripts `build:android:*` e
`build:ios:*` em `vistoria-mobile/package.json`.

## Estrutura de dados e arquivos

- `usuarios`: endereço de e-mail, hash de senha e datas de auditoria;
- `vistorias`: usuário responsável, descrição, coordenadas, status pendente,
  `concluido_em`, tipo MIME e imagem da vistoria;
- `documentos`: título, nome, tipo MIME e conteúdo binário de arquivos PDF ou
  DOCX.

Arquivos enviados são persistidos no banco em colunas binárias. Por isso, o
tamanho do banco e os backups devem ser planejados considerando os anexos.

No aplicativo mobile, vistorias, documentos e conclusões pendentes também são
mantidos no WatermelonDB/SQLite. Fotos aguardando sincronização são copiadas
para armazenamento persistente do dispositivo antes do reenvio.

## Boas práticas para colaboração

- Use `npm ci` em uma instalação nova ou em ambientes de CI, para respeitar os
  `package-lock.json` versionados.
- Não versione `node_modules/`, `dist/`, `.next/` nem arquivos `.env.local`.
- Execute as verificações de build e lint do componente alterado antes de abrir
  um pull request.
- Não aplique `drizzle-kit push` sem revisão em banco compartilhado ou de
  produção.
- Mantenha backend e frontend em processos separados durante o desenvolvimento.
- Valide no mobile as permissões de câmera e localização, a conclusão online e
  a retomada da fila após recuperar a conexão.

## Estado atual validado

O backend possui comandos de build, lint e Vitest; os clientes ainda dependem
principalmente de validação manual dos fluxos de autenticação, sincronização e
arquivos. O build do frontend depende de conectividade com Google Fonts; em
ambiente sem internet ou bloqueado por proxy, ele falhará até que as fontes
sejam auto-hospedadas ou a conectividade seja liberada.

O lint do frontend atualmente falha em arquivos do diretório
`vistoria-web/Design/GlueStackUI Pro/`, que reúne um kit de componentes e
templates. Há erros preexistentes de tipagem, imports com `require`, regras de
hooks e variáveis não usadas nesse material. Esse resultado deve ser tratado
antes de tornar o lint uma etapa obrigatória de CI. Para validar apenas o
portal mantido, execute `npx eslint app components utils` em `vistoria-web/`.

## Segurança e limites conhecidos

- O portal usa `sessionStorage` e o aplicativo usa `AsyncStorage` para o token.
  Para produção, use cookie `HttpOnly` no web e armazenamento seguro no mobile.
- A autorização por recurso deve continuar sendo validada pela API. As regras
  de interface, como bloquear detalhes de vistorias pendentes, não substituem
  essa verificação no servidor.
- Foto, localização e documentos podem conter dados pessoais. Defina retenção,
  acesso mínimo, auditoria, backup e exclusão conforme a política aplicável.
- A fila offline mobile ainda não possui identificador idempotente,
  versionamento, cursor incremental ou resolução explícita de conflitos.
- O mapa do portal usa tiles públicos do OpenStreetMap; respeite a política do
  provedor e avalie um provedor próprio para produção em maior escala.

## Documentação complementar

- [API de domínio](vistoria-back/README.md)
- [Portal web](vistoria-web/README.md)
- [Contratos de integração web](vistoria-web/docs/REQUISICOES_API.md)
- [Arquitetura offline-first do portal](vistoria-web/docs/ARQUITETURA.md)
- [Aplicativo mobile](vistoria-mobile/README.md)
- [Arquitetura e API Routes mobile](vistoria-mobile/docs/ARQUITETURA.md)
