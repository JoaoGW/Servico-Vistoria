// Foi automaticamente gerado para resolver uma restrição no mac da empresa
// Não é relevante


import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

if (!databaseUrl) {
  throw new Error('DATABASE_URL não está definida em .env.local.');
}

if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET deve ter pelo menos 32 caracteres em .env.local.');
}

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT não tem um valor válido');
}

export const env = {
  DATABASE_URL: databaseUrl,
  JWT_SECRET: jwtSecret,
  PORT: port,
};
