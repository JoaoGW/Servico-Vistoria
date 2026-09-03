import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "documentos",
      columns: [
        { name: "title", type: "string" },
        { name: "file_mime_type", type: "string" },
        { name: "file_name", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "vistorias",
      columns: [
        { name: "user_id", type: "string" },
        { name: "description", type: "string" },
        { name: "photo_mime_type", type: "string", isOptional: true },
        { name: "latitude", type: "number", isOptional: true },
        { name: "longitude", type: "number", isOptional: true },
        { name: "pendente", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "conclusoes_pendentes",
      columns: [
        { name: "vistoria_id", type: "string", isIndexed: true },
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
        { name: "foto_uri", type: "string" },
        { name: "foto_mime_type", type: "string" },
        { name: "foto_nome", type: "string" },
        { name: "criada_em", type: "number" },
      ],
    }),
  ],
});
