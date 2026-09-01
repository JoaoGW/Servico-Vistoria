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
import { VistoriasService } from '../../services/vistorias/vistorias.service.js';
import type {
  CreateVistoriaDto,
  ImagemVistoria,
  UpdateVistoriaDto,
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

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_request, file, callback) =>
        callback(null, file.mimetype.startsWith('image/')),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() body: { pendente?: string | boolean },
    @UploadedFile() photo?: ImagemVistoria,
  ) {
    const pendente = this.parsePendente(body.pendente);

    if (pendente === undefined && !photo) {
      throw new BadRequestException(
        'Informe o campo pendente, uma imagem no campo photo, ou ambos.',
      );
    }

    const data: UpdateVistoriaDto = { pendente };
    const vistoria = await this.vistoriasService.update(id, data, photo);

    if (!vistoria) {
      throw new NotFoundException('Vistoria não encontrada.');
    }

    return vistoria;
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

  private parsePendente(value: string | boolean | undefined) {
    if (value === undefined) {
      return undefined;
    }

    if (value === true || value === 'true') {
      return true;
    }

    if (value === false || value === 'false') {
      return false;
    }

    throw new BadRequestException('O campo pendente deve ser true ou false.');
  }
}
