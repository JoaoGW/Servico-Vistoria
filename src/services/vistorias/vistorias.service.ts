import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { vistorias } from '../../db/schema.js';

export type CreateVistoriaDto = {
  userId: string;
  description: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
  pendente: boolean;
};

@Injectable()
export class VistoriasService {
  findAll() {
    return db.select().from(vistorias);
  }

  async create(data: CreateVistoriaDto) {
    const [vistoria] = await db
      .insert(vistorias)
      .values(data)
      .returning();

    return vistoria;
  }

  async remove(id: string) {
    const [vistoria] = await db
      .delete(vistorias)
      .where(eq(vistorias.id, id))
      .returning();

    return vistoria;
  }
}
