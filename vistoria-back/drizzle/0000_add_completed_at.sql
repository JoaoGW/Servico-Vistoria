ALTER TABLE "vistorias" ADD COLUMN "concluido_em" timestamp with time zone;

UPDATE "vistorias"
SET "concluido_em" = "atualizado_em"
WHERE "pendente" = false
  AND "concluido_em" IS NULL;
