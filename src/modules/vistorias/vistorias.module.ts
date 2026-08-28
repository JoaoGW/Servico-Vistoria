// src/vistorias/vistorias.module.ts
import { Module } from '@nestjs/common';
import { VistoriasController } from '../../controllers/vistorias/vistorias.controller.js';
import { VistoriasService } from '../../services/vistorias/vistorias.service.js';

@Module({
  controllers: [VistoriasController],
  providers: [VistoriasService],
})
export class VistoriasModule {}