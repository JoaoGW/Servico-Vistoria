import { schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
import { tableSchema } from "@nozbe/watermelondb";

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        {
          type: "create_table",
          schema: tableSchema({
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
        },
      ],
    },
    {
      toVersion: 3,
      steps: [
        {
          type: "add_columns",
          table: "vistorias",
          columns: [
            { name: "completed_at", type: "number", isOptional: true },
          ],
        },
        {
          type: "add_columns",
          table: "conclusoes_pendentes",
          columns: [
            { name: "concluido_em", type: "number", isOptional: true },
          ],
        },
      ],
    },
  ],
});
