import { Injectable } from '@nestjs/common';
import { db } from '../../db/index.js';
import { usuarios } from '../../db/schema.js';

export type CreateUsuarioDto = {
  id: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class UsuariosService {
  find() {
    return db.select().from(usuarios);
  }

  async create(data: CreateUsuarioDto) {
    const [usario] = await db
      .insert(usuarios)
      .values(data)
      .returning();

    return usuarios;
  }
}