import {
  BadRequestException,
  ConflictException,
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
  create(@Body() body: CreateVistoriaDto) {
    return this.vistoriasService.create(body);
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
    @Body()
    body: {
      pendente?: string | boolean;
      completedAt?: string;
      latitude?: string | number;
      longitude?: string | number;
    },
    @UploadedFile() photo?: ImagemVistoria,
  ) {
    const pendente = this.parsePendente(body.pendente);
    const completedAt = this.parseCompletedAt(body.completedAt);
    const latitude = this.parseCoordenada(body.latitude, 'latitude', -90, 90);
    const longitude = this.parseCoordenada(
      body.longitude,
      'longitude',
      -180,
      180,
    );
    const recebeuLocalizacao =
      latitude !== undefined || longitude !== undefined;

    if (latitude === undefined && longitude !== undefined) {
      throw new BadRequestException(
        'Informe a latitude junto com a longitude.',
      );
    }

    if (latitude !== undefined && longitude === undefined) {
      throw new BadRequestException(
        'Informe a longitude junto com a latitude.',
      );
    }

    if (pendente === undefined && !recebeuLocalizacao && !photo) {
      throw new BadRequestException(
        'Informe pendente, latitude e longitude, uma imagem no campo photo, ou uma combinação desses campos.',
      );
    }

    if (pendente === false && !completedAt) {
      throw new BadRequestException(
        'Informe a data de conclusão ao concluir uma vistoria.',
      );
    }

    if (pendente !== false && completedAt) {
      throw new BadRequestException(
        'A data de conclusão só pode ser enviada ao concluir uma vistoria.',
      );
    }

    const data: UpdateVistoriaDto = {
      pendente,
      completedAt,
      latitude,
      longitude,
    };
    const resultado = await this.vistoriasService.update(id, data, photo);

    if (resultado.tipo === 'nao_encontrada') {
      throw new NotFoundException('Vistoria não encontrada.');
    }

    if (resultado.tipo === 'conflito') {
      throw new ConflictException({
        code: 'INSPECTION_COMPLETION_CONFLICT',
        message:
          'A vistoria já possui uma conclusão anterior. Os dados da conclusão atual foram preservados.',
        completedAt: resultado.vistoria.completedAt,
        vistoria: resultado.vistoria,
      });
    }

    return resultado.vistoria;
  }

  @Get(':id/foto')
  async getPhoto(@Param('id') id: string) {
    const vistoria = await this.vistoriasService.findPhoto(id);

    if (!vistoria || !vistoria.photo || !vistoria.photoMimeType) {
      throw new NotFoundException('A foto da vistoria não foi cadastrada.');
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

  private parseCompletedAt(value: string | undefined) {
    if (value === undefined) {
      return undefined;
    }

    const iso8601ComFuso =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:?\d{2})$/;

    if (
      !value ||
      !iso8601ComFuso.test(value) ||
      Number.isNaN(Date.parse(value))
    ) {
      throw new BadRequestException(
        'A data de conclusão deve estar no formato ISO-8601.',
      );
    }

    return new Date(value);
  }

  private parseCoordenada(
    value: string | number | undefined,
    campo: 'latitude' | 'longitude',
    minimo: number,
    maximo: number,
  ) {
    if (value === undefined) {
      return undefined;
    }

    const coordenada = typeof value === 'number' ? value : Number(value);

    if (
      value === '' ||
      !Number.isFinite(coordenada) ||
      coordenada < minimo ||
      coordenada > maximo
    ) {
      throw new BadRequestException(
        `O campo ${campo} deve estar entre ${minimo} e ${maximo}.`,
      );
    }

    return coordenada;
  }
}
