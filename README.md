# Vistoria Back

API em NestJS com PostgreSQL e Drizzle ORM.

## Configuração

Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env.local
```

Preencha `DATABASE_URL` com a conexão do seu PostgreSQL local.

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

## Verificações

```bash
npm run build
npm test
npm run test:e2e
```
