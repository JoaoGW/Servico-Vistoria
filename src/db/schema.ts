import {
  boolean,
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Para a tabela de usuários
export const usuarios = pgTable("usuarios", {
  id: uuid("id").defaultRandom().primaryKey(), // ID do usuário
  email: varchar("email", { length: 255 }).notNull().unique(), // Email do usuário
  passwordHash: text("password_hash").notNull(), // Hash da senha do usuário
  createdAt: timestamp("data_criacao", { // Quando o usuário foi criado
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("atualizado_em", { // Quando o usuário foi atualizado
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Para a tabela de vistorias
export const vistorias = pgTable("vistorias", {
  // UUID também pode ser gerado no mobile antes da sincronização.
  id: uuid("id").defaultRandom().primaryKey(), // ID da Vistoria
  userId: uuid("usuario_id") // ID do usuário atribuído à aquela vistoria
    .notNull()
    .references(() => usuarios.id),
  description: text("descricao").notNull(), // Descrição da vistoria
  photoUrl: text("url_foto").notNull(), // URL para a foto da vistoria concluída
  latitude: doublePrecision("latitude").notNull(), // Latitude para verificar o local da vistoria
  longitude: doublePrecision("longitude").notNull(), // Longitude para verificar o local da vistoria
  pendente: boolean("pendente").notNull(), // Mostra se aquela vistoria já terminou ou ainda está pendente
  createdAt: timestamp("data_criacao", { // Usado pela API para comparar qual versão é a mais recente
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("atualizado_em", { // Quando essa vistoria teve o seu status atualizado
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Para a tabela de Documentos
export const documents = pgTable("documentos", {
  id: uuid("id").defaultRandom().primaryKey(), // ID do Documento
  title: varchar("titulo_doc", { length: 255 }).notNull(), // Título do Documento
  fileUrl: text("url_arquivo").notNull(), // URL para o Documento
  createdAt: timestamp("criacao", { // Data de criação do documento
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("atualizado_em", { // Quando o documento foi atualizado
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});