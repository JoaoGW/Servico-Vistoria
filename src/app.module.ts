import { Module } from '@nestjs/common';
import { VistoriasModule } from './modules/vistorias/vistorias.module.js';

@Module({
  imports: [VistoriasModule],
})
export class AppModule {}