import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { documents } from '../../db/schema.js';

export type CreateDocumentoDto = {
  id: string;
  title: string;
  fileUrl: string;
};

export type UpdateDocumentoDto = {
  id: string;
  title?: string;
  fileUrl?: string;
};

@Injectable()
export class DocumentosService {
  findAll() {
    return db.select().from(documents);
  }

  async create(data: CreateDocumentoDto) {
    const [documento] = await db
      .insert(documents)
      .values(data)
      .returning();

    return documento;
  }

  async update({ id, ...data }: UpdateDocumentoDto) {
    const [documento] = await db
      .update(documents)
      .set(data)
      .where(eq(documents.id, id))
      .returning();

    return documento;
  }

  async remove(id: string) {
    const [documento] = await db
      .delete(documents)
      .where(eq(documents.id, id))
      .returning();

    return documento;
  }
}
