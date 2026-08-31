import { Module } from '@nestjs/common';
import { DocumentosController } from '../../controllers/documentos/documentos.controller.js';
import { DocumentosService } from '../../services/documentos/documentos.service.js';

@Module({
  controllers: [DocumentosController],
  providers: [DocumentosService],
})
export class DocumentosModule {}