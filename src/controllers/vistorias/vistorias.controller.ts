// src/vistorias/vistorias.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import * as vistoriasService_1 from './vistorias.service.js';

@Controller('vistorias')
export class VistoriasController {
  constructor(private readonly vistoriasService: vistoriasService_1.VistoriasService) {}

  @Get()
  findAll() {
    return this.vistoriasService.findAll();
  }

  @Post()
  create(@Body() body: vistoriasService_1.CreateVistoriaDto) {
    return this.vistoriasService.create(body);
  }
}