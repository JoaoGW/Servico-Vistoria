import { Body, Controller, Get, Post } from '@nestjs/common';
import { VistoriasService } from '../../services/vistorias/vistorias.service.js';
import type { CreateVistoriaDto } from '../../services/vistorias/vistorias.service.js';

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
}
