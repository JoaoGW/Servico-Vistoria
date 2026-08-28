import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from '../../services/usuarios/usuarios.service.js';
import type { CreateUsuarioDto } from '../../services/usuarios/usuarios.service.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  find() {
    return this.usuariosService.find();
  }

  @Post()
  create(@Body() body: CreateUsuarioDto) {
    return this.usuariosService.create(body);
  }
}
