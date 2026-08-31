# Vistoria Back

API em NestJS com PostgreSQL e Drizzle ORM.

## Configuração

Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env.local
```

Preencha `DATABASE_URL` com a conexão do seu PostgreSQL local.
Defina também um segredo seguro para a assinatura dos tokens JWT:

```env
JWT_SECRET=gere-um-segredo-com-pelo-menos-32-caracteres
```

## Desenvolvimento

```bash
npm install
npm run start:dev
```

## Banco de dados

Para aplicar o schema definido em `src/db/schema.ts`:

```bash
npx drizzle-kit push
```

O cliente do banco está em `src/db/index.ts`; importe `db` e as tabelas de
`src/db/schema.ts` nos services que implementar.

## Upload e acesso a arquivos

As vistorias recebem uma imagem no campo `photo` em `multipart/form-data`.
Use `GET /vistorias/:id/foto` para visualizá-la.

Documentos recebem um arquivo PDF ou DOCX no campo `file`, também em
`multipart/form-data`. Use `GET /documentos/:id/arquivo` para baixá-lo.
As listagens retornam apenas os metadados dos arquivos, não o conteúdo binário.

## Autenticação

Cadastro (`POST /usuarios`) e login (`POST /usuarios/login`) são públicos. O
login retorna um `accessToken` JWT válido por uma hora. Todas as outras rotas
exigem o cabeçalho:

```http
Authorization: Bearer <accessToken>
```

## Verificações

```bash
npm run build
npm test
npm run test:e2e
```
