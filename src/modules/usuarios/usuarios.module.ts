import { Module } from '@nestjs/common';
import { UsuariosController } from '../../controllers/usuarios/usuarios.controller.js';
import { UsuariosService } from '../../services/usuarios/usuarios.service.js';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}