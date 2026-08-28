// Foi automaticamente gerado para resolver uma restrição no mac da empresa
// Não é relevante


import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL não está definida em .env.local.');
}

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT não tem um valor válido');
}

export const env = {
  DATABASE_URL: databaseUrl,
  PORT: port,
};
