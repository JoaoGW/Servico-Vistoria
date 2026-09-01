import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { vistorias } from '../../db/schema.js';

export type CreateVistoriaDto = {
  userId: string;
  description: string;
  latitude: number;
  longitude: number;
  pendente: boolean;
};

export type ImagemVistoria = {
  buffer: Buffer;
  mimetype: string;
};

export type UpdateVistoriaDto = {
  pendente?: boolean;
};

@Injectable()
export class VistoriasService {
  findAll() {
    return db
      .select({
        id: vistorias.id,
        userId: vistorias.userId,
        description: vistorias.description,
        photoMimeType: vistorias.photoMimeType,
        latitude: vistorias.latitude,
        longitude: vistorias.longitude,
        pendente: vistorias.pendente,
        createdAt: vistorias.createdAt,
        updatedAt: vistorias.updatedAt,
      })
      .from(vistorias);
  }

  async create(data: CreateVistoriaDto, photo: ImagemVistoria) {
    const [vistoria] = await db
      .insert(vistorias)
      .values({
        ...data,
        photo: photo.buffer,
        photoMimeType: photo.mimetype,
      })
      .returning({
        id: vistorias.id,
        userId: vistorias.userId,
        description: vistorias.description,
        photoMimeType: vistorias.photoMimeType,
        latitude: vistorias.latitude,
        longitude: vistorias.longitude,
        pendente: vistorias.pendente,
        createdAt: vistorias.createdAt,
        updatedAt: vistorias.updatedAt,
      });

    return vistoria;
  }

  async findPhoto(id: string) {
    const [vistoria] = await db
      .select({
        photo: vistorias.photo,
        photoMimeType: vistorias.photoMimeType,
      })
      .from(vistorias)
      .where(eq(vistorias.id, id));

    return vistoria;
  }

  async update(id: string, data: UpdateVistoriaDto, photo?: ImagemVistoria) {
    const [vistoria] = await db
      .update(vistorias)
      .set({
        ...(data.pendente !== undefined && { pendente: data.pendente }),
        ...(photo && {
          photo: photo.buffer,
          photoMimeType: photo.mimetype,
        }),
      })
      .where(eq(vistorias.id, id))
      .returning({
        id: vistorias.id,
        userId: vistorias.userId,
        description: vistorias.description,
        photoMimeType: vistorias.photoMimeType,
        latitude: vistorias.latitude,
        longitude: vistorias.longitude,
        pendente: vistorias.pendente,
        createdAt: vistorias.createdAt,
        updatedAt: vistorias.updatedAt,
      });

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
