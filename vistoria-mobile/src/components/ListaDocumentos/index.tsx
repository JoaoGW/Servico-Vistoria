import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import type { DocumentoModel } from "@/db/models/Documento";
import { ArrowUpRight } from "lucide-react-native";

interface IListaDocumentosProps {
  documentos: DocumentoModel[];
  documentoAbrindoId: string | null;
  onAbrirDocumento: (documento: DocumentoModel) => void;
}

function obterTipoArquivo(documento: DocumentoModel) {
  const mimeType = documento.fileMimeType.toLowerCase();
  const extensao = documento.fileName.split(".").pop()?.toLowerCase();

  if (mimeType === "application/pdf" || extensao === "pdf") {
    return "Arquivo PDF";
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extensao === "docx"
  ) {
    return "Arquivo DOCX";
  }

  if (mimeType === "application/msword" || extensao === "doc") {
    return "Arquivo DOC";
  }

  return extensao ? `Arquivo ${extensao.toUpperCase()}` : "Arquivo";
}

export function ListaDocumentos({
  documentos,
  documentoAbrindoId,
  onAbrirDocumento,
}: IListaDocumentosProps) {
  return (
    <Box className="gap-3">
      {documentos.map((documento) => {
        const estaAbrindo = documentoAbrindoId === documento.id;

        return (
          <Pressable
            key={documento.id}
            accessibilityHint="Baixa e abre o arquivo no visualizador do dispositivo"
            accessibilityLabel={`Abrir documento: ${documento.title}`}
            accessibilityRole="button"
            accessibilityState={{ busy: estaAbrindo, disabled: estaAbrindo }}
            className="rounded-xl border border-vistoria-borda bg-vistoria-superficie p-4 data-[active=true]:bg-vistoria-fundo data-[disabled=true]:opacity-60"
            disabled={estaAbrindo}
            onPress={() => onAbrirDocumento(documento)}
          >
            <Box className="flex-row items-start justify-between gap-4">
              <Box className="flex-1">
                <Text className="text-base font-bold text-vistoria-titulo">
                  {documento.title}
                </Text>
                <Text className="mt-1 text-sm text-vistoria-auxiliar">
                  {documento.fileName}
                </Text>
              </Box>
              <Icon
                as={ArrowUpRight}
                className="text-vistoria-marca"
                size="lg"
              />
            </Box>
            <Text className="mt-3 text-sm font-semibold text-vistoria-auxiliar">
              {estaAbrindo ? "Abrindo arquivo…" : obterTipoArquivo(documento)}
            </Text>
            <Text className="mt-1 text-sm text-vistoria-auxiliar">
              Disponibilizado em {documento.createdAt.toLocaleDateString("pt-BR")}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}
