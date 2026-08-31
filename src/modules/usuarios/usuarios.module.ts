import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module.js';
import { UsuariosController } from '../../controllers/usuarios/usuarios.controller.js';
import { UsuariosService } from '../../services/usuarios/usuarios.service.js';

@Module({
  imports: [AuthModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
