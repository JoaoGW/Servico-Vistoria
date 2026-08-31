import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../auth/public.decorator.js';
import { UsuariosService } from '../../services/usuarios/usuarios.service.js';
import type {
  CadastroUsuarioDto,
  LoginUsuarioDto,
} from '../../services/usuarios/usuarios.service.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  find() {
    return this.usuariosService.find();
  }

  @Post()
  @Public()
  create(@Body() body: CadastroUsuarioDto) {
    return this.usuariosService.create(body);
  }

  @Post('login')
  @Public()
  login(@Body() body: LoginUsuarioDto) {
    return this.usuariosService.login(body);
  }
}
