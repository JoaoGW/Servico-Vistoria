import { Module } from '@nestjs/common';
import { VistoriasModule } from './modules/vistorias/vistorias.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';
import { DocumentosModule } from './modules/documentos/documentos.module.js';

@Module({
  imports: [VistoriasModule, UsuariosModule, DocumentosModule],
})
export class AppModule {}