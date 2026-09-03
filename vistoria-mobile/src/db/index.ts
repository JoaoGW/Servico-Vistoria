import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { DocumentoModel } from "./models/Documento";
import { VistoriaModel } from "./models/Vistoria";
import { migrations } from "./migrations";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  dbName: "vistoria-mobile",
  schema,
  migrations,
  jsi: false,
  onSetUpError: (error) => {
    console.error("Não foi possível inicializar o banco local.", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [DocumentoModel, VistoriaModel],
});
