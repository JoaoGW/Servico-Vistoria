import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import type { DocumentoModel } from "@/db/models/Documento";

interface IListaDocumentosProps {
  documentos: DocumentoModel[];
}

export function ListaDocumentos({ documentos }: IListaDocumentosProps) {
  return (
    <Box className="gap-3">
      {documentos.map((documento) => (
        <Box
          key={documento.id}
          className="rounded-xl border border-vistoria-borda bg-vistoria-superficie p-4"
        >
          <Text className="text-base font-bold text-vistoria-titulo">
            {documento.title}
          </Text>
          <Text className="mt-1 text-sm text-vistoria-auxiliar">
            {documento.fileName}
          </Text>
          <Text className="mt-3 text-sm text-vistoria-auxiliar">
            {documento.fileMimeType}
          </Text>
          <Text className="mt-1 text-sm text-vistoria-auxiliar">
            Disponibilizado em {documento.createdAt.toLocaleDateString("pt-BR")}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
