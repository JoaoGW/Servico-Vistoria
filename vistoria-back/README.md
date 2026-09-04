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

Para aplicar a migração versionada de `concluido_em` em um banco já existente,
use `npx drizzle-kit migrate`. Ela preenche vistorias históricas concluídas com
o valor de `atualizado_em`.

O cliente do banco está em `src/db/index.ts`; importe `db` e as tabelas de
`src/db/schema.ts` nos services que implementar.

## Vistorias

O cadastro web envia `POST /vistorias` em JSON com `userId` e `description`.
Toda vistoria é criada com `pendente: true`.

O aplicativo mobile deve usar `PUT /vistorias/:id` em `multipart/form-data`
para registrar `pendente: false`, `completedAt` ISO-8601, `latitude`,
`longitude` e a imagem no campo `photo`. Latitude e longitude devem ser
enviadas juntas; a imagem aceita apenas arquivos de imagem de até 10 MB.

`completedAt` é persistido em `concluido_em` e decide a conclusão: a menor
data vence, mesmo que seja recebida depois. Em empate, vence a primeira linha
persistida. A conclusão é terminal; reabertura e alterações isoladas de uma
vistoria concluída são recusadas. Uma marcação igual ou posterior retorna
`409 INSPECTION_COMPLETION_CONFLICT` com os dados vencedores. Use
`GET /vistorias/:id/foto` para visualizar uma foto já cadastrada.

As listagens de vistorias retornam `completedAt` e os metadados das imagens,
mas não o conteúdo binário.

## Documentos

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
