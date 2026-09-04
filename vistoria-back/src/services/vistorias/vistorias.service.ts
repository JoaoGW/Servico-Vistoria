import { Injectable } from '@nestjs/common';
import { and, eq, gt, isNull, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { vistorias } from '../../db/schema.js';

export type CreateVistoriaDto = {
  userId: string;
  description: string;
};

export type ImagemVistoria = {
  buffer: Buffer;
  mimetype: string;
};

export type UpdateVistoriaDto = {
  pendente?: boolean;
  completedAt?: Date;
  latitude?: number;
  longitude?: number;
};

type VistoriaRetornada = {
  id: string;
  userId: string;
  description: string;
  photoMimeType: string | null;
  latitude: number | null;
  longitude: number | null;
  pendente: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ResultadoAtualizacaoVistoria =
  | { tipo: 'atualizada'; vistoria: VistoriaRetornada }
  | { tipo: 'conflito'; vistoria: VistoriaRetornada }
  | { tipo: 'nao_encontrada' };

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
        completedAt: vistorias.completedAt,
        createdAt: vistorias.createdAt,
        updatedAt: vistorias.updatedAt,
      })
      .from(vistorias);
  }

  async create(data: CreateVistoriaDto) {
    const [vistoria] = await db
      .insert(vistorias)
      .values({
        userId: data.userId,
        description: data.description,
        pendente: true,
      })
      .returning({
        id: vistorias.id,
        userId: vistorias.userId,
        description: vistorias.description,
        photoMimeType: vistorias.photoMimeType,
        latitude: vistorias.latitude,
        longitude: vistorias.longitude,
        pendente: vistorias.pendente,
        completedAt: vistorias.completedAt,
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

  private camposRetornados() {
    return {
      id: vistorias.id,
      userId: vistorias.userId,
      description: vistorias.description,
      photoMimeType: vistorias.photoMimeType,
      latitude: vistorias.latitude,
      longitude: vistorias.longitude,
      pendente: vistorias.pendente,
      completedAt: vistorias.completedAt,
      createdAt: vistorias.createdAt,
      updatedAt: vistorias.updatedAt,
    };
  }

  private async buscarPorId(id: string) {
    const [vistoria] = await db
      .select(this.camposRetornados())
      .from(vistorias)
      .where(eq(vistorias.id, id));

    return vistoria;
  }

  async update(
    id: string,
    data: UpdateVistoriaDto,
    photo?: ImagemVistoria,
  ): Promise<ResultadoAtualizacaoVistoria> {
    const dadosDaAtualizacao = {
      ...(data.pendente !== undefined && { pendente: data.pendente }),
      ...(data.completedAt !== undefined && { completedAt: data.completedAt }),
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
      ...(photo && {
        photo: photo.buffer,
        photoMimeType: photo.mimetype,
      }),
    };

    const condicaoDeAtualizacao =
      data.pendente === false && data.completedAt
        ? and(
            eq(vistorias.id, id),
            or(
              isNull(vistorias.completedAt),
              gt(vistorias.completedAt, data.completedAt),
            ),
          )
        : and(eq(vistorias.id, id), isNull(vistorias.completedAt));

    const [vistoria] = await db
      .update(vistorias)
      .set(dadosDaAtualizacao)
      .where(condicaoDeAtualizacao)
      .returning(this.camposRetornados());

    if (vistoria) {
      return { tipo: 'atualizada', vistoria };
    }

    const vistoriaAtual = await this.buscarPorId(id);

    if (!vistoriaAtual) {
      return { tipo: 'nao_encontrada' };
    }

    return { tipo: 'conflito', vistoria: vistoriaAtual };
  }

  async remove(id: string) {
    const [vistoria] = await db
      .delete(vistorias)
      .where(eq(vistorias.id, id))
      .returning();

    return vistoria;
  }
}
