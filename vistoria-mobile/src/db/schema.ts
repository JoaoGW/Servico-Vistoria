import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
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
  ],
});
