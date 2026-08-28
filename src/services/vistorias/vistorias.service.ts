// src/vistorias/vistorias.service.ts
import { Injectable } from '@nestjs/common';
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
}