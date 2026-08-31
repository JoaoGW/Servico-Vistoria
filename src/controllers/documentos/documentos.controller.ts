import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentosService } from '../../services/documentos/documentos.service.js';
import type {
  CreateDocumentoDto,
  UpdateDocumentoDto,
} from '../../services/documentos/documentos.service.js';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Post()
  create(@Body() body: CreateDocumentoDto) {
    return this.documentosService.create(body);
  }

  @Put()
  update(@Body() body: UpdateDocumentoDto) {
    return this.documentosService.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(id);
  }
}
