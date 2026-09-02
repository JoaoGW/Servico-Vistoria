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
      latitude?: string | number;
      longitude?: string | number;
    },
    @UploadedFile() photo?: ImagemVistoria,
  ) {
    const pendente = this.parsePendente(body.pendente);
    const latitude = this.parseCoordenada(body.latitude, 'latitude', -90, 90);
    const longitude = this.parseCoordenada(
      body.longitude,
      'longitude',
      -180,
      180,
    );
    const recebeuLocalizacao = latitude !== undefined || longitude !== undefined;

    if (latitude === undefined && longitude !== undefined) {
      throw new BadRequestException('Informe a latitude junto com a longitude.');
    }

    if (latitude !== undefined && longitude === undefined) {
      throw new BadRequestException('Informe a longitude junto com a latitude.');
    }

    if (pendente === undefined && !recebeuLocalizacao && !photo) {
      throw new BadRequestException(
        'Informe pendente, latitude e longitude, uma imagem no campo photo, ou uma combinação desses campos.',
      );
    }

    const data: UpdateVistoriaDto = { pendente, latitude, longitude };
    const vistoria = await this.vistoriasService.update(id, data, photo);

    if (!vistoria) {
      throw new NotFoundException('Vistoria não encontrada.');
    }

    return vistoria;
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
