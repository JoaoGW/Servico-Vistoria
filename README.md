# Serviço de Vistoria

Aplicação para cadastro, autenticação e gestão de vistorias e documentos. O
repositório é um monorepo simples, composto por uma API REST em NestJS e uma
aplicação web em Next.js.

## Arquitetura

| Diretório | Responsabilidade | Stack principal |
| --- | --- | --- |
| `vistoria-back/` | API REST, autenticação, persistência e upload de arquivos | NestJS, Drizzle ORM e PostgreSQL |
| `vistoria-web/` | Interface web e rotas de proxy para autenticação | Next.js, React e Tailwind CSS |

O backend armazena imagens de vistorias e arquivos de documentos diretamente
no PostgreSQL. A interface web chama as rotas internas do Next.js, que por sua
vez se comunicam com a API configurada pela variável `APIS_URL`.

## Pré-requisitos

- Git 2.30 ou superior;
- Node.js 20 LTS ou superior (Node 22+ é recomendado);
- npm 10 ou superior;
- PostgreSQL 14 ou superior, em execução e acessível localmente ou pela rede;
- acesso à internet para instalar dependências e para gerar o build do
  frontend, que utiliza fontes hospedadas no Google Fonts.

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

## Instalação e primeira execução

Abra dois terminais na raiz do projeto.

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
| `POST` | `/vistorias` | JWT | Cria vistoria com imagem no campo `photo` |
| `GET` | `/vistorias/:id/foto` | JWT | Exibe a imagem de uma vistoria |
| `DELETE` | `/vistorias/:id` | JWT | Remove uma vistoria |
| `GET` | `/documentos` | JWT | Lista documentos |
| `POST` | `/documentos` | JWT | Envia documento no campo `file` |
| `PUT` | `/documentos` | JWT | Atualiza documento |
| `GET` | `/documentos/:id/arquivo` | JWT | Baixa o arquivo do documento |
| `DELETE` | `/documentos/:id` | JWT | Remove um documento |

O envio de vistoria deve usar `multipart/form-data`, aceitar um arquivo de
imagem e respeitar o limite de 10 MB. Documentos devem ser PDF ou DOCX, no
campo `file`, com limite de 25 MB.

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

## Estrutura de dados e arquivos

- `usuarios`: endereço de e-mail, hash de senha e datas de auditoria;
- `vistorias`: usuário responsável, descrição, coordenadas, status pendente e
  imagem da vistoria;
- `documentos`: título, nome, tipo MIME e conteúdo binário de arquivos PDF ou
  DOCX.

Arquivos enviados são persistidos no banco em colunas binárias. Por isso, o
tamanho do banco e os backups devem ser planejados considerando os anexos.

## Boas práticas para colaboração

- Use `npm ci` em uma instalação nova ou em ambientes de CI, para respeitar os
  `package-lock.json` versionados.
- Não versione `node_modules/`, `dist/`, `.next/` nem arquivos `.env.local`.
- Execute as verificações de build e lint do componente alterado antes de abrir
  um pull request.
- Não aplique `drizzle-kit push` sem revisão em banco compartilhado ou de
  produção.
- Mantenha backend e frontend em processos separados durante o desenvolvimento.

## Estado atual validado

Na revisão desta documentação, o build, os testes e o lint do backend foram
executados com sucesso. A suíte não contém arquivos de teste no momento. O
build do frontend depende de conectividade com Google Fonts; em ambiente sem
internet ou bloqueado por proxy, ele falhará até que as fontes sejam
auto-hospedadas ou a conectividade seja liberada.

O lint do frontend atualmente falha em arquivos do diretório
`vistoria-web/Design/GlueStackUI Pro/`, que reúne um kit de componentes e
templates. Há erros preexistentes de tipagem, imports com `require`, regras de
hooks e variáveis não usadas nesse material. Esse resultado deve ser tratado
antes de tornar o lint uma etapa obrigatória de CI.
