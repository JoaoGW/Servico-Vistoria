import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export class ConclusaoPendenteModel extends Model {
  static table = "conclusoes_pendentes";

  @field("vistoria_id") vistoriaId: string;
  @field("latitude") latitude: number;
  @field("longitude") longitude: number;
  @field("foto_uri") fotoUri: string;
  @field("foto_mime_type") fotoMimeType: string;
  @field("foto_nome") fotoNome: string;
  @date("criada_em") criadaEm: Date;
}
