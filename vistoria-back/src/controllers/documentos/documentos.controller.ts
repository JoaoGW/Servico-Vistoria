import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentosService } from '../../services/documentos/documentos.service.js';
import type {
  CreateDocumentoDto,
  ArquivoDocumento,
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
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_request, file, callback) =>
        callback(
          null,
          [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ].includes(file.mimetype),
        ),
    }),
  )
  create(
    @Body() body: CreateDocumentoDto,
    @UploadedFile() file?: ArquivoDocumento,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Um arquivo PDF ou DOCX é obrigatório no campo file.',
      );
    }

    return this.documentosService.create(body, file);
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_request, file, callback) =>
        callback(
          null,
          [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ].includes(file.mimetype),
        ),
    }),
  )
  update(
    @Body() body: UpdateDocumentoDto,
    @UploadedFile() file?: ArquivoDocumento,
  ) {
    return this.documentosService.update(body, file);
  }

  @Get(':id/arquivo')
  async getFile(@Param('id') id: string) {
    const documento = await this.documentosService.findFile(id);

    if (!documento) {
      throw new NotFoundException('Documento não encontrado.');
    }

    return new StreamableFile(documento.file, {
      type: documento.fileMimeType,
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(documento.fileName)}`,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(id);
  }
}
