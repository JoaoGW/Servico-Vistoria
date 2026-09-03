import { File } from "expo-file-system";

interface IArquivoMultipart {
  campo: string;
  mimeType: string;
  nome: string;
  uri: string;
}

interface ICriarCorpoMultipartProps {
  arquivo: IArquivoMultipart;
  campos: Record<string, string>;
}

function escaparCabecalho(valor: string) {
  return valor.replace(/["\r\n]/g, "_");
}

function juntarPartes(partes: Uint8Array[]) {
  const tamanho = partes.reduce((total, parte) => total + parte.length, 0);
  const corpo = new Uint8Array(tamanho);
  let posicao = 0;

  partes.forEach((parte) => {
    corpo.set(parte, posicao);
    posicao += parte.length;
  });

  return corpo;
}

/** Cria um corpo multipart binário compatível com o fetch nativo do Expo. */
export async function criarCorpoMultipart({
  arquivo,
  campos,
}: ICriarCorpoMultipartProps) {
  const boundary = `----PeacoreVistoria${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2)}`;
  const codificador = new TextEncoder();
  const partes: Uint8Array[] = [];

  Object.entries(campos).forEach(([nome, valor]) => {
    partes.push(
      codificador.encode(
        `--${boundary}\r\nContent-Disposition: form-data; name="${escaparCabecalho(nome)}"\r\n\r\n${valor}\r\n`,
      ),
    );
  });

  const foto = new File(arquivo.uri);
  const conteudo = new Uint8Array(await foto.arrayBuffer());

  partes.push(
    codificador.encode(
      `--${boundary}\r\nContent-Disposition: form-data; name="${escaparCabecalho(arquivo.campo)}"; filename="${escaparCabecalho(arquivo.nome)}"\r\nContent-Type: ${arquivo.mimeType}\r\n\r\n`,
    ),
    conteudo,
    codificador.encode(`\r\n--${boundary}--\r\n`),
  );

  return {
    body: juntarPartes(partes),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}
