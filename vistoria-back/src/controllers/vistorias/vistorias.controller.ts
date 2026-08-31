import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VistoriasService } from '../../services/vistorias/vistorias.service.js';
import type {
  CreateVistoriaDto,
  ImagemVistoria,
} from '../../services/vistorias/vistorias.service.js';

@Controller('vistorias')
export class VistoriasController {
  constructor(private readonly vistoriasService: VistoriasService) {}

  @Get()
  findAll() {
    return this.vistoriasService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_request, file, callback) =>
        callback(null, file.mimetype.startsWith('image/')),
    }),
  )
  create(
    @Body() body: CreateVistoriaDto,
    @UploadedFile() photo?: ImagemVistoria,
  ) {
    if (!photo) {
      throw new BadRequestException('Uma imagem é obrigatória no campo photo.');
    }

    return this.vistoriasService.create(body, photo);
  }

  @Get(':id/foto')
  async getPhoto(@Param('id') id: string) {
    const vistoria = await this.vistoriasService.findPhoto(id);

    if (!vistoria) {
      throw new NotFoundException('Vistoria não encontrada.');
    }

    return new StreamableFile(vistoria.photo, {
      type: vistoria.photoMimeType,
      disposition: 'inline',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vistoriasService.remove(id);
  }
}
