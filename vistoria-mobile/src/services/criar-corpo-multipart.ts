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

/**
 * Remove caracteres inválidos de valores usados nos cabeçalhos multipart.
 * @param valor - Texto que será usado em um cabeçalho multipart.
 * @returns Retorna o texto seguro para incluir no cabeçalho.
 */
function escaparCabecalho(valor: string) {
  return valor.replace(/["\r\n]/g, "_");
}

/**
 * Une partes binárias em um único corpo de requisição.
 * @param partes - Trechos codificados que compõem o corpo multipart.
 * @returns Retorna o conteúdo binário resultante.
 */
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

/**
 * Cria um corpo multipart binário compatível com o fetch nativo do Expo.
 * @param dados - Arquivo e campos textuais que serão enviados na requisição.
 * @returns Retorna o corpo binário e seu cabeçalho Content-Type.
 * @throws Retorna erro quando o arquivo não puder ser lido.
 */
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
