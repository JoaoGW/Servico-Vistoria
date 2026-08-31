import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { VistoriasModule } from './modules/vistorias/vistorias.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';
import { DocumentosModule } from './modules/documentos/documentos.module.js';

@Module({
  imports: [AuthModule, VistoriasModule, UsuariosModule, DocumentosModule],
})
export class AppModule {}
