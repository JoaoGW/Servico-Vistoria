import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

const db = drizzle(process.env.DATABASE_URL!);