import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { documents } from '../../db/schema.js';

export type CreateDocumentoDto = {
  id: string;
  title: string;
};

export type UpdateDocumentoDto = {
  id: string;
  title?: string;
};

export type ArquivoDocumento = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
};

@Injectable()
export class DocumentosService {
  findAll() {
    return db
      .select({
        id: documents.id,
        title: documents.title,
        fileMimeType: documents.fileMimeType,
        fileName: documents.fileName,
        createdAt: documents.createdAt,
        updatedAt: documents.updatedAt,
      })
      .from(documents);
  }

  async create(data: CreateDocumentoDto, file: ArquivoDocumento) {
    const [documento] = await db
      .insert(documents)
      .values({
        ...data,
        file: file.buffer,
        fileMimeType: file.mimetype,
        fileName: file.originalname,
      })
      .returning();

    return documento;
  }

  async update({ id, ...data }: UpdateDocumentoDto, file?: ArquivoDocumento) {
    const [documento] = await db
      .update(documents)
      .set({
        ...data,
        ...(file && {
          file: file.buffer,
          fileMimeType: file.mimetype,
          fileName: file.originalname,
        }),
      })
      .where(eq(documents.id, id))
      .returning();

    return documento;
  }

  async findFile(id: string) {
    const [documento] = await db
      .select({
        file: documents.file,
        fileMimeType: documents.fileMimeType,
        fileName: documents.fileName,
      })
      .from(documents)
      .where(eq(documents.id, id));

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
